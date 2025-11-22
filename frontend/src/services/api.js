const API_BASE_URL = "http://localhost:3001/api";

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
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

  async enterRoom(roomId) {
    return this.request(`/rooms/${roomId}`, {
      method: "GET",
    });
  }

  // Questions related methods
  async createQuestion(questionTitle, roomId) {
    return this.request("/questions/create-question", {
      method: "POST",
      body: { questionTitle, roomId },
    });
  }

  async readQuestion(questionId, pass) {
    return this.request("/questions/read-question", {
      method: "PUT",
      body: { questionId, pass },
    });
  }
}

export default new ApiService();
