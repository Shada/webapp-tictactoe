import http from "../http-common";

class MoveDataService {
  getAll() {
    return http.get("/moves");
  }
  
  create(data) {
    return http.post("/moves/", data);
  }
  
  findByGame(game) {
    return http.get(`/moves?game=${game}`);
  }
}

export default new MoveDataService();
