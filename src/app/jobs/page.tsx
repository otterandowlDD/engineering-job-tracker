"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type JobStatus =
  | "Applied"
  | "In Evaluation"
  | "HR Contact"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Closed";

type Job = {
  id: string;
  company: string;
  role: string;
  location: string;
  appliedAt: string;
  source: string;
  status: JobStatus;
  nextAction: string;
  salary: string;
  notes: string;
};

const STORAGE_KEY = "ning-job-tracker-v1";
const statuses: JobStatus[] = [
  "Applied",
  "In Evaluation",
  "HR Contact",
  "Interview",
  "Offer",
  "Rejected",
  "Closed",
];

const statusStyles: Record<JobStatus, string> = {
  Applied: "bg-sky-50 text-sky-700 border-sky-200",
  "In Evaluation": "bg-amber-50 text-amber-700 border-amber-200",
  "HR Contact": "bg-violet-50 text-violet-700 border-violet-200",
  Interview: "bg-orange-50 text-orange-700 border-orange-200",
  Offer: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 border-rose-200",
  Closed: "bg-stone-100 text-stone-600 border-stone-200",
};

const seedJobs: Job[] = [
  {
    id: "bgrimm-sales-engineer-electrical-20260910",
    company: "B.Grimm Technologies Company Limited",
    role: "Sales Engineer (Electrical)",
    location: "Huai Khwang / Bang Kapi, Bangkok",
    appliedAt: "2026-09-10 14:15",
    source: "B.Grimm Careers",
    status: "In Evaluation",
    nextAction: "Wait for application update / recruiter contact",
    salary: "",
    notes: "Application submitted on B.Grimm candidate portal.",
  },
];

function formatDate(value: string) {
  if (!value) return "—";
  return value.replace("T", " ");
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(seedJobs);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | JobStatus>("All");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setJobs(JSON.parse(stored));
    } catch {
      // Keep seed data if browser storage is unavailable or malformed.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch {
      // App remains usable even if localStorage is unavailable.
    }
  }, [jobs]);

  const visibleJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesFilter = filter === "All" || job.status === filter;
      const matchesSearch =
        !q ||
        [job.company, job.role, job.location, job.source, job.notes]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [jobs, search, filter]);

  const activeCount = jobs.filter(
    (job) => !["Rejected", "Closed"].includes(job.status),
  ).length;
  const interviewCount = jobs.filter((job) => job.status === "Interview").length;
  const offerCount = jobs.filter((job) => job.status === "Offer").length;

  function updateStatus(id: string, status: JobStatus) {
    setJobs((current) =>
      current.map((job) => (job.id === id ? { ...job, status } : job)),
    );
  }

  function removeJob(id: string) {
    setJobs((current) => current.filter((job) => job.id !== id));
  }

  function addJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const company = String(form.get("company") || "").trim();
    const role = String(form.get("role") || "").trim();
    if (!company || !role) return;

    const newJob: Job = {
      id: `${Date.now()}`,
      company,
      role,
      location: String(form.get("location") || "").trim(),
      appliedAt: String(form.get("appliedAt") || "").trim(),
      source: String(form.get("source") || "").trim(),
      status: (String(form.get("status") || "Applied") as JobStatus),
      nextAction: String(form.get("nextAction") || "").trim(),
      salary: String(form.get("salary") || "").trim(),
      notes: String(form.get("notes") || "").trim(),
    };

    setJobs((current) => [newJob, ...current]);
    event.currentTarget.reset();
    setShowForm(false);
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-[#20252b]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <a href="/" className="text-sm font-semibold text-[#ff642c] hover:underline">
              ← Portfolio
            </a>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">Job Application Tracker</h1>
            <p className="mt-1 text-sm text-slate-500">
              Track every application, status change, interview and next action in one place.
            </p>
          </div>
          <button
            onClick={() => setShowForm((value) => !value)}
            className="rounded-xl bg-[#ff642c] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#e95725]"
          >
            {showForm ? "Close" : "+ Add Job"}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Jobs</p>
            <p className="mt-2 text-3xl font-bold">{activeCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Interviews</p>
            <p className="mt-2 text-3xl font-bold">{interviewCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Offers</p>
            <p className="mt-2 text-3xl font-bold">{offerCount}</p>
          </div>
        </section>

        {showForm && (
          <form onSubmit={addJob} className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Add application</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input name="company" required placeholder="Company *" className="rounded-xl border border-slate-300 px-4 py-3" />
              <input name="role" required placeholder="Role *" className="rounded-xl border border-slate-300 px-4 py-3" />
              <input name="location" placeholder="Location" className="rounded-xl border border-slate-300 px-4 py-3" />
              <input name="source" placeholder="Source / job board" className="rounded-xl border border-slate-300 px-4 py-3" />
              <input name="appliedAt" type="datetime-local" className="rounded-xl border border-slate-300 px-4 py-3" />
              <input name="salary" placeholder="Salary / expected compensation" className="rounded-xl border border-slate-300 px-4 py-3" />
              <select name="status" defaultValue="Applied" className="rounded-xl border border-slate-300 px-4 py-3">
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>
              <input name="nextAction" placeholder="Next action" className="rounded-xl border border-slate-300 px-4 py-3" />
            </div>
            <textarea name="notes" placeholder="Notes" className="mt-4 min-h-24 w-full rounded-xl border border-slate-300 px-4 py-3" />
            <button className="mt-4 rounded-xl bg-[#ff642c] px-5 py-3 text-sm font-bold text-white">Save Job</button>
          </form>
        )}

        <section className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search company, role, source..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 md:max-w-md"
          />
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value as "All" | JobStatus)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option>All</option>
            {statuses.map((status) => <option key={status}>{status}</option>)}
          </select>
        </section>

        <section className="mt-6 space-y-5">
          {visibleJobs.map((job) => (
            <article key={job.id} className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold">{job.role}</h2>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[job.status]}`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="mt-2 font-semibold text-slate-700">{job.company}</p>
                  <p className="mt-1 text-sm text-slate-500">📍 {job.location || "Location not added"}</p>
                </div>

                <select
                  value={job.status}
                  onChange={(event) => updateStatus(job.id, event.target.value as JobStatus)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold"
                >
                  {statuses.map((status) => <option key={status}>{status}</option>)}
                </select>
              </div>

              <div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Applied</p>
                  <p className="mt-1 text-sm font-semibold">{formatDate(job.appliedAt)}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Source</p>
                  <p className="mt-1 text-sm font-semibold">{job.source || "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Salary</p>
                  <p className="mt-1 text-sm font-semibold">{job.salary || "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Next Action</p>
                  <p className="mt-1 text-sm font-semibold">{job.nextAction || "—"}</p>
                </div>
              </div>

              {job.notes && <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">{job.notes}</p>}

              <div className="mt-5 flex justify-end">
                <button onClick={() => removeJob(job.id)} className="text-xs font-semibold text-slate-400 hover:text-rose-600">
                  Remove
                </button>
              </div>
            </article>
          ))}

          {visibleJobs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
              No applications match this view.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
