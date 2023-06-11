import util from "../util/util";
import axios from "axios";
export default class QuizzeResultService {
  async sendQuizzeResult(data) {
    try {
      return await util.sendApiRequest("/quizzeresult", "POST", true, data);
    } catch (err) {
      throw err;
    }
  }

  async quizzeresultList(data) {
    try {
      const quizzeresult = Object.keys(data).reduce((object, key) => {
        if (data[key] !== "") {
          object[key] = data[key];
        }
        return object;
      }, {});
      return await util.sendApiRequest("/quizzeresult/list", "POST", true, quizzeresult);
    } catch (err) {
      throw err;
    }
  }

  async getQuizzeResult(id) {
    try {
      return await util.sendApiRequest("/quizzeresult/" + id, "GET", true);
    } catch (err) {
      throw err;
    }
  }
  async deleteQuizzeResult(id) {
    try {
      return await util.sendApiRequest("/quizzeresult/" + id, "DELETE", true);
    } catch (err) {
      throw err;
    }
  }
}
