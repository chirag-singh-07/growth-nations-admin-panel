const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const fetchUserData = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("Invalid user ID");
    }

    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // ✅ avoids Next.js caching
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
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
    const response = await fetch(`${API_BASE_URL}/api/leads`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // ✅ avoids Next.js caching
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchAllyUsers error:", error);
    throw error;
  }
};

export async function fetchExportLeads() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/leads/export/excel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to export leads");
    }

    const blob = await res.blob();
    return blob;
  } catch (error) {
    console.error("fetchExportLeads error:", error);
    throw error;
  }
}

export const fetchDashboardStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stats`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch dashboard stats: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("fetchDashboardStats error:", error);
    throw error;
  }
};

export const fetchRecentUsers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/leads/latest-leads`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return await res.json();
  } catch (error) {
    console.error("fetchRecentUsers error:", error);
    throw error;
  }
};
