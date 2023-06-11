import util from "../util/util";
import axios from "axios";
export default class SectionService {
  async sectionList(data) {
    try {
      const Obj = Object.keys(data).reduce((object, key) => {
        if (data[key] !== "") {
          object[key] = data[key];
        }
        return object;
      }, {});
      return await util.sendApiRequest("/section/list", "POST", true, Obj);
    } catch (err) {
      throw err;
    }
  }

  async getSection(sectionId) {
    try {
      return await util.sendApiRequest("/section/" + sectionId, "GET", true);
    } catch (err) {
      throw err;
    }
  }
}
