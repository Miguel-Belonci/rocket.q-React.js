const API_BASE_URL = "http://localhost:3001/api";

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem("@Auth:token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    };

    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Room related methods
  async createRoom(password) {
    return this.request("/rooms/create", {
      method: "POST",
      body: { password },
    });
  }

  async enterRoom(code) {
    return this.request(`/rooms/${code}`, {
      method: "GET",
    });
  }

  async deleteRoom(pass, code) {
    return this.request("/rooms/delete", {
      method: "DELETE",
      body: { pass, code },
    });
  }

  // Questions related methods
  async createQuestion(questionTitle, code) {
    return this.request("/questions/create-question", {
      method: "POST",
      body: { questionTitle, code },
    });
  }

  async readQuestion(questionId, pass) {
    return this.request("/questions/read-question", {
      method: "PUT",
      body: { questionId, pass },
    });
  }

  async deleteQuestion(questionId, pass) {
    return this.request(`/questions/delete-question`, {
      method: "DELETE",
      body: { pass, questionId },
    });
  }

  // Login and Submit related methods
  async createUser(email, password) {
    return this.request("/register/create", {
      method: "POST",
      body: { email, password },
    });
  }

  async auth(email, password) {
    return this.request("/register/auth", {
      method: "POST",
      body: { email, password },
    });
  }

  // user related methods
  async changePassword(password, newPassword) {
    return this.request("/user/new-password", {
      method: "POST",
      body: { password, newPassword },
    });
  }

  async getUsers() {
    return this.request("/user/users-list", {
      method: "GET",
    });
  }
}

export default new ApiService();
