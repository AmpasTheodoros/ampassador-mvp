// src/lib/syncUser.js

// Use localStorage to prevent multiple sync attempts
const SYNC_ATTEMPTED_KEY = 'user_sync_attempted';

export const syncUser = async (getToken) => {
  // Check if we've already attempted to sync in this session
  if (localStorage.getItem(SYNC_ATTEMPTED_KEY) === 'true') {
    console.log('User sync already attempted in this session, skipping');
    return { skipped: true };
  }

  try {
    const token = await getToken({ template: "JWT_Token" });
    if (!token) {
      console.error("Error: No token received from Clerk!");
      return null;
    }

    localStorage.setItem(SYNC_ATTEMPTED_KEY, 'true');

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/sync`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.warn('Rate limit exceeded for user sync. Will try again in next session.');
        return { rateLimit: true };
      }
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("User sync successful");
    return data;
  } catch (error) {
    console.error("Error syncing user:", error);
    return null;
  }
};