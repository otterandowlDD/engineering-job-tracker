// src/hooks/useJobs.ts
// State layer — สมองของ app: ถือข้อมูล + CRUD + sync localStorage อัตโนมัติ

"use client";

import { useCallback, useEffect, useState } from "react";
import type { JobApplication } from "@/types/job";
import { loadJobs, saveJobs } from "@/lib/storage";

export function useJobs() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);

  // flag กันการ save ทับข้อมูลจริงด้วย [] ตอน render แรก
  const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setJobs(loadJobs());

  setIsLoaded(true);
}, []);

  // Auto-save: ทุกครั้งที่ jobs เปลี่ยน — แต่ต้องโหลดเสร็จก่อนเท่านั้น
  useEffect(() => {
    if (isLoaded) {
      saveJobs(jobs);
    }
  }, [jobs, isLoaded]);

  /** เพิ่มงานใหม่ — ระบบใส่ id และ timestamp ให้เอง */
  const addJob = useCallback(
    (data: Omit<JobApplication, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const newJob: JobApplication = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      setJobs((prev) => [newJob, ...prev]); // งานใหม่ขึ้นบนสุด
    },
    []
  );

  /** แก้ไขงาน — ส่งเฉพาะ field ที่เปลี่ยน ระบบอัปเดต updatedAt ให้ */
  const updateJob = useCallback(
    (id: string, patch: Partial<Omit<JobApplication, "id" | "createdAt">>) => {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === id
            ? { ...job, ...patch, updatedAt: new Date().toISOString() }
            : job
        )
      );
    },
    []
  );

  /** ลบงาน */
  const deleteJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }, []);

  /** แทนที่ข้อมูลทั้งหมด — ใช้ตอน import ไฟล์ backup */
  const replaceAllJobs = useCallback((next: JobApplication[]) => {
    setJobs(next);
  }, []);

  return { jobs, isLoaded, addJob, updateJob, deleteJob, replaceAllJobs };
}