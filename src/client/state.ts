const API_URL = "http://localhost:3000/api";

export const state = {
  data: {
    user: null,
    pets: [],
    reports: [],
  },
  getState() {
    return this.data;
  },
  setState(newState: any) {
    this.data = newState;
  },
  async signup(data: { [key: string]: string | boolean }) {
    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        return responseData;
      } else {
        throw new Error("Error signing up");
      }
    } catch (error) {
      return error;
    }
  },
  async login(email: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        return responseData;
      } else {
        throw new Error("Error logging in");
      }
    } catch (error) {
      return error;
    }
  },
  async getUserId(email: string) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${API_URL}/user/id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();

      if (response.ok) {
        return responseData.id;
      } else {
        throw new Error("Error getting user id");
      }
    } catch (error) {
      return error;
    }
  },
  async getUserData(id: number) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${API_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        return responseData;
      } else {
        throw new Error("Error getting user data");
      }
    } catch (error) {
      return error;
    }
  },
};
