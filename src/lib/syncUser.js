// src/lib/syncUser.js

export const syncUser = async (getToken) => {
  try {
    // Specify your custom template name (if you have one)
    const token = await getToken({ template: "JWT_Token" });
    if (!token) {
      console.error("Error: No token received from Clerk!");
      return null;
    }

    console.log("Frontend Sent Token:", token); // Debugging

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/sync`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Instead of using response.text(), use response.json() directly:
    const data = await response.json();
    console.log("Raw API Response:", data); // Debugging

    return data;
  } catch (error) {
    console.error("Error syncing user:", error);
    return null;
  }
};

  