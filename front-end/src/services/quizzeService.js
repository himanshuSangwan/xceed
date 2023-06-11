import util from "../util/util";
import axios from "axios";
export default class QuizzeService {
  async quizzeList(data) {
    try {
      const Obj = Object.keys(data).reduce((object, key) => {
        if (data[key] !== "") {
          object[key] = data[key];
        }
        return object;
      }, {});
      return await util.sendApiRequest("/quizze/list", "POST", true, Obj);
    } catch (err) {
      throw err;
    }
  }

  async getQuizze(quizzeId) {
    try {
      return await util.sendApiRequest("/quizze/" + quizzeId, "GET", true);
    } catch (err) {
      throw err;
    }
  }
}
