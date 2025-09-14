const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

export const fetchUserData = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("Invalid user ID");
    }
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
};

export const fetchAllyUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leads`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
};
