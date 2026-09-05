// src/lib/storage.ts
// Persistence layer — จุดเดียวในระบบที่แตะ localStorage
// ถ้าอนาคตย้ายไป database แก้ไฟล์นี้ไฟล์เดียว

import type { JobApplication } from "@/types/job";

const STORAGE_KEY = "engineering-job-tracker:jobs";

/** อ่านรายการงานทั้งหมดจาก localStorage */
export function loadJobs(): JobApplication[] {
  // กัน SSR: ฝั่ง server ไม่มี window/localStorage
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return []; // ยังไม่เคยบันทึกอะไรเลย

    const parsed: unknown = JSON.parse(raw);

    // กันข้อมูลเสียหาย: ต้องเป็น array เท่านั้น
    if (!Array.isArray(parsed)) return [];

    return parsed as JobApplication[];
  } catch {
    // JSON เสีย หรือ storage อ่านไม่ได้ — คืนค่าว่าง อย่าให้ app พัง
    return [];
  }
}

/** บันทึกรายการงานทั้งหมดลง localStorage — คืน true ถ้าสำเร็จ */
export function saveJobs(jobs: JobApplication[]): boolean {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    return true;
  } catch {
    // storage เต็ม หรือถูกปิด (เช่น private mode)
    return false;
  }
}

/** Export ข้อมูลทั้งหมดเป็นไฟล์ JSON — mitigation กรณี browser data ถูกล้าง */
export function exportJobsToFile(jobs: JobApplication[]): void {
  const blob = new Blob([JSON.stringify(jobs, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `job-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/** อ่านไฟล์ JSON ที่ export ไว้ กลับเข้าระบบ — คืน null ถ้าไฟล์ใช้ไม่ได้ */
export function parseImportedFile(text: string): JobApplication[] | null {
  try {
    const parsed: unknown = JSON.parse(text);
    if (!Array.isArray(parsed)) return null;

    // ตรวจขั้นต่ำ: ทุก item ต้องมี id และ company
    const valid = parsed.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "company" in item
    );

    return valid ? (parsed as JobApplication[]) : null;
  } catch {
    return null;
  }
}