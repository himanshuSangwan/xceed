import util from "../util/util";
import axios from "axios";
export default class ClassService {
  async classList(data) {
    try {
      const classObj = Object.keys(data).reduce((object, key) => {
        if (data[key] !== "") {
          object[key] = data[key];
        }
        return object;
      }, {});
      return await util.sendApiRequest("/class/list", "POST", true, classObj);
    } catch (err) {
      throw err;
    }
  }

  async getClass(classId) {
    try {
      return await util.sendApiRequest("/class/" + classId, "GET", true);
    } catch (err) {
      throw err;
    }
  }
}
