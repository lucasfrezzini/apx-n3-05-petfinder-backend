const API_URL = "http://localhost:3000/api";

export const state = {
  data: {
    user: null,
    pets: [],
    reports: [],
  },
  getState() {
    if (!this.data.user) {
      const state = localStorage.getItem("state");
      if (state) {
        this.data = JSON.parse(state);
      }
    }
    return this.data;
  },
  setState(newState: any) {
    this.data = newState;
    localStorage.setItem("state", JSON.stringify(this.data));
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
      throw error;
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

      if (response.status === 200) {
        return responseData;
      } else {
        throw new Error("Error logging in");
      }
    } catch (error) {
      throw error;
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
      throw error;
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
      throw error;
    }
  },
  async createNewReport(
    data: { [key: string]: string | boolean },
    userId: string
  ) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }
      console.log("Data:", data);
      console.log("User id:", userId);

      const response = await fetch(`${API_URL}/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data, userId }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Pet report created:", responseData);
        return responseData;
      } else {
        throw new Error("Error creating new pet report");
      }
    } catch (error) {
      throw error;
    }
  },
  async findPets() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${API_URL}/pets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        return responseData;
      } else {
        throw new Error("Error getting pets");
      }
    } catch (error) {
      throw error;
    }
  },
};
