import { createSign } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "1ae8Bp5h_ragKMSL-b-pnagnY3blTQEW41jt8Wcx8XU0";
const SHEET_NAME = "Applications";

function base64url(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !rawKey) {
    throw new Error("Google Sheets credentials are not configured on Vercel.");
  }

  const privateKey = rawKey.replace(/\\n/g, "\n");
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    }),
  );
  const unsigned = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = signer
    .sign(privateKey, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Google auth failed (${response.status}).`);
  const json = await response.json();
  return json.access_token as string;
}

async function sheetsFetch(path: string, init?: RequestInit) {
  const token = await getAccessToken();
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google Sheets API failed (${response.status}): ${text.slice(0, 300)}`);
  }
  return response.json();
}

function rowToJob(row: string[], rowNumber: number) {
  return {
    id: `sheet-${rowNumber}`,
    rowNumber,
    company: row[0] || "",
    role: row[1] || "",
    source: row[2] || "",
    appliedAt: row[3] || "",
    status: row[4] || "Applied",
    resumeVersion: row[5] || "",
    documentsSent: row[6] || "",
    salary: row[7] || "",
    location: row[8] || "",
    contact: row[9] || "",
    lastAction: row[10] || "",
    nextAction: row[11] || "",
    notes: row[12] || "",
    outcome: row[13] || "",
    interviewStatus: row[14] || "",
  };
}

export async function GET() {
  try {
    const range = encodeURIComponent(`${SHEET_NAME}!A3:O1000`);
    const data = await sheetsFetch(`/values/${range}`);
    const rows: string[][] = data.values || [];
    const jobs = rows
      .map((row, index) => rowToJob(row, index + 3))
      .filter((job) => job.company || job.role)
      .reverse();
    return NextResponse.json({ jobs, source: "google-sheet" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load jobs." },
      { status: 503 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const job = await request.json();
    const values = [[
      job.company || "",
      job.role || "",
      job.source || "",
      job.appliedAt || "",
      job.status || "Applied",
      job.resumeVersion || "",
      job.documentsSent || "",
      job.salary || "",
      job.location || "",
      job.contact || "",
      job.lastAction || "Application added from web tracker",
      job.nextAction || "",
      job.notes || "",
      job.outcome || "",
      job.interviewStatus || "",
    ]];
    const range = encodeURIComponent(`${SHEET_NAME}!A:O`);
    await sheetsFetch(`/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
      method: "POST",
      body: JSON.stringify({ values }),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to add job." },
      { status: 503 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const rowNumber = Number(body.rowNumber);
    if (!Number.isInteger(rowNumber) || rowNumber < 3) {
      return NextResponse.json({ error: "Invalid sheet row." }, { status: 400 });
    }

    const fieldToColumn: Record<string, string> = {
      company: "A",
      role: "B",
      source: "C",
      appliedAt: "D",
      status: "E",
      resumeVersion: "F",
      documentsSent: "G",
      salary: "H",
      location: "I",
      contact: "J",
      lastAction: "K",
      nextAction: "L",
      notes: "M",
      outcome: "N",
      interviewStatus: "O",
    };

    const updates = Object.entries(body)
      .filter(([key]) => key in fieldToColumn)
      .map(([key, value]) => ({
        range: `${SHEET_NAME}!${fieldToColumn[key]}${rowNumber}`,
        values: [[value ?? ""]],
      }));

    if (!updates.length) return NextResponse.json({ ok: true });

    await sheetsFetch(`/values:batchUpdate`, {
      method: "POST",
      body: JSON.stringify({ valueInputOption: "USER_ENTERED", data: updates }),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update job." },
      { status: 503 },
    );
  }
}
