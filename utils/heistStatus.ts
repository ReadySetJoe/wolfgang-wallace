// Utility functions for checking heist completion status

export const isHeistCompleted = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'heist_completed' && value === 'true') {
      return true;
    }
  }
  return false;
};

export const getHeistCompletionTime = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'heist_completion_time') {
      return value;
    }
  }
  return null;
};

export const clearHeistStatus = (): void => {
  if (typeof window === 'undefined') return;
  
  // Clear the cookies by setting them to expire in the past
  document.cookie = 'heist_completed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'heist_completion_time=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};