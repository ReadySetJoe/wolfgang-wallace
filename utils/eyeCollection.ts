import Cookies from "js-cookie";

const COOKIE_NAME = "collected_eyes";
const COOKIE_EXPIRY = 365; // days

export interface CollectedEye {
  id: string;
  collectedAt: string;
}

export function getCollectedEyes(): CollectedEye[] {
  const cookieValue = Cookies.get(COOKIE_NAME);
  if (!cookieValue) return [];

  try {
    return JSON.parse(cookieValue);
  } catch {
    return [];
  }
}

export function collectEye(eyeId: string): boolean {
  const collected = getCollectedEyes();

  // Check if already collected
  if (collected.some((eye) => eye.id === eyeId)) {
    return false;
  }

  // Add new eye
  const newEye: CollectedEye = {
    id: eyeId,
    collectedAt: new Date().toISOString(),
  };

  collected.push(newEye);
  Cookies.set(COOKIE_NAME, JSON.stringify(collected), {
    expires: COOKIE_EXPIRY,
  });

  return true;
}

export function getCollectionCount(): number {
  return getCollectedEyes().length;
}

export function hasCollectedEye(eyeId: string): boolean {
  return getCollectedEyes().some((eye) => eye.id === eyeId);
}

export function resetCollection(): void {
  Cookies.remove(COOKIE_NAME);
}
