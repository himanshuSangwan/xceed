import util from "../util/util";
import axios from "axios";
export default class LessonService {
  async lessonList(data) {
    try {
      const classObj = Object.keys(data).reduce((object, key) => {
        if (data[key] !== "") {
          object[key] = data[key];
        }
        return object;
      }, {});
      return await util.sendApiRequest("/lesson/list", "POST", true, classObj);
    } catch (err) {
      throw err;
    }
  }

  async getLesson(classId) {
    try {
      return await util.sendApiRequest("/lesson/" + classId, "GET", true);
    } catch (err) {
      throw err;
    }
  }
}
