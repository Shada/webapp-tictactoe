import http from "../http-common";

class GameDataService {
  getAll() {
    return http.get("/games/");
  }
  
  get(id) {
    return http.get(`/games/${id}/`);
  }
  
  create(data) {
    return http.post("/games/", data);
  }
  
  update(id, data) {
    return http.put(`/games/${id}/`, data);
  }
  
  patch(id, data) {
    return http.patch(`/games/${id}/`, data);
  }
}

export default new GameDataService();
