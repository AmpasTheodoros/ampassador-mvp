export const syncUser = async (getToken) => {
    try {
      const token = await getToken();
      if (!token) {
        console.error("Error: No token received from Clerk!");
        return null;
      }
  
      console.log("Frontend Sent Token:", token); // ✅ Debugging
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/sync`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Ensure JWT token is correctly sent
          "Content-Type": "application/json",
        },
      });
  
      const text = await response.text();
      console.log("Raw API Response:", text); // ✅ Print backend response
  
      return JSON.parse(text);
    } catch (error) {
      console.error("Error syncing user:", error);
      return null;
    }
  };
  