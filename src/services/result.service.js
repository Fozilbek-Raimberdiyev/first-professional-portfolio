import { $axios } from "./auth";
export default {
  getResult(query, page,limit) {
    return $axios.get("/results", {
      params: {
        query,
        page,
        limit
      },
    });
  },
  addComment(data) {
    return $axios.post("/results/addComment", data)
  }
};
