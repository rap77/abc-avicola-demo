"use client";
// Auth simulada + compras mock. SOLO localStorage. Cero red. (AT-DEMO-001 §4)
export const DEMO_EMAIL = "demo@abcavicola.com"; // email FICTICIO de muestra
const K_USER = "abc_demo_user";
const K_PURCHASED = "abc_demo_purchased";
const K_PROGRESS = (id: string) => `abc_demo_progress_${id}`;

export function getUser(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(K_USER);
}
export function login(email: string) { localStorage.setItem(K_USER, email); }
export function logout() {
  localStorage.removeItem(K_USER);
}
export function getPurchased(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(K_PURCHASED) ?? "[]"); } catch { return []; }
}
export function markPurchased(id: string) {
  const p = new Set(getPurchased()); p.add(id);
  localStorage.setItem(K_PURCHASED, JSON.stringify([...p]));
}
export function clearPurchased() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(K_PURCHASED);
}
export function getProgress(id: string): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(K_PROGRESS(id)) ?? "[]"); } catch { return []; }
}
export function setLessonDone(id: string, lessonId: string, done: boolean) {
  const s = new Set(getProgress(id));
  if (done) s.add(lessonId); else s.delete(lessonId);
  localStorage.setItem(K_PROGRESS(id), JSON.stringify([...s]));
}
