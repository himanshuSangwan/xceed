import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import LessonService from "../../services/lessonService";
import moment from "moment";
const lessonServ = new LessonService();
export default function LessonList() {
  const param = useParams();
  const [lessonList, setLessonList] = useState([]);
  useEffect(() => {
    getLessonList();
  }, [param]);
  const getLessonList = async () => {
    try {
      let obj = { filter: { ...param } };
      let resp = await lessonServ.lessonList(obj);
      if (resp.data) {
        setLessonList([...resp.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="d-flex align-item-center justify-content-center mt-5 ">
      <div className="lessonsListSec">
        <div className="lessonsListInnerSec">
          {lessonList.map((lssn) => (
            <div className="lessonsVideoListOuter ">
              <Link to={`/lessondetail/${lssn._id}`} className="lessonsVideoList d-flex">
                <div className="lessonsVideo">
                  <img
                    src={lssn.banner}
                    style={{ width: "320px", height: "175px" }}
                    alt="video"
                    className="img-fluid"
                  />
                </div>
                <div className="lessonsVideoContant">
                  <div className="lessonsVideoTxt">
                    <h4 className="mb-0">{lssn.title}</h4>
                    <p className="mb-0">{lssn.desc}</p>
                    {/* <span>Rahul</span> */}
                  </div>
                  <div className="videoTime">
                    <p className="mb-0">
                      <img src="/images/watch.svg" alt="down-arrow" className="img-fluid me-1" /> Uploaded at:{" "}
                      {moment(lssn.createdAt).format("DD MMMM YYYY")}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
