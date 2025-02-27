import { hasToken } from "./src/utils/auth";
import { fetchApi } from "./src/utils/api";

export const state = {
  data: {
    user: null as any,
    pets: [] as Element[],
    reports: [] as Element[],
    seenPet: {
      id: null as string | null,
    },
    goTo: "" as string,
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
      return await fetchApi(
        "auth",
        "POST",
        data,
        undefined,
        "Error signing up"
      );
    } catch (error) {
      throw error;
    }
  },
  async login(email: string, password: string) {
    try {
      return await fetchApi(
        "auth/token",
        "POST",
        { email, password },
        undefined,
        "Error logging in"
      );
    } catch (error) {
      throw error;
    }
  },
  async getUserId(email: string) {
    try {
      const token = hasToken();

      return await fetchApi(
        "user/id",
        "POST",
        { email },
        token as string,
        "Error getting user id"
      );
    } catch (error) {
      throw error;
    }
  },
  async getUserData(id: number) {
    try {
      const token = hasToken();

      const endpoint = `user/${id}`;

      return await fetchApi(
        endpoint,
        "GET",
        undefined,
        token as string,
        "Error getting user data"
      );
    } catch (error) {
      throw error;
    }
  },
  async createNewReport(
    data: { [key: string]: string | boolean },
    userId: string
  ) {
    try {
      const token = hasToken();

      return await fetchApi(
        "/pets",
        "POST",
        { data, userId },
        token as string,
        "Error creating new pet report"
      );
    } catch (error) {
      throw error;
    }
  },
  async findPets() {
    try {
      return await fetchApi(
        "pets",
        "GET",
        undefined,
        undefined,
        "Error getting pets"
      );
    } catch (error) {
      throw error;
    }
  },
  async updateDataUser(data: { [key: string]: string | boolean }) {
    try {
      const token = hasToken();

      return await fetchApi(
        "user/data",
        "PUT",
        { ...data, id: this.data.user!.id },
        token as string,
        "Error updating user information"
      );
    } catch (error) {
      throw error;
    }
  },
  async updatePassword(data: { [key: string]: string | boolean }) {
    try {
      const token = hasToken();

      return await fetchApi(
        "user/pass",
        "PUT",
        { ...data, id: this.data.user!.id },
        token as string,
        "Error updating user password"
      );
    } catch (error) {
      throw error;
    }
  },
};
