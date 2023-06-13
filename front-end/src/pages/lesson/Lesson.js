import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import LessonService from "../../services/lessonService";
import SectionService from "../../services/sectionService";
import QuizzeResultService from "../../services/quizzeResultService";
import moment from "moment";
import GlobalContext from "../../context/GlobalContext";
import OwlCarousel from "react-owl-carousel";
import ScrollMore from "../../shared/ScrollMore";
import Carousel from "../../shared/Carousel";
const lessonServ = new LessonService();
const sectionServ = new SectionService();
const qResultServ = new QuizzeResultService();
export default function Lesson() {
  const param = useParams();
  const globalCtx = useContext(GlobalContext);
  const [isAuthentiCated, setIsAuthentiCated] = globalCtx.auth;
  const [lessonData, setLessonData] = useState({});
  const [sectionList, setSectionList] = useState([]);
  const [sectionCount, setSectionCount] = useState(0);
  const [quizzeMarks, setQuizzeMarks] = useState({});
  const [startPositon, setStartPosition] = useState(1);
  const startPosition = useRef(0);
  const [search, setSearch] = useState({
    filter: {
      lesson_id: param.lesson_id,
    },
    start: 0,
    length: 1,
  });
  let loading = false;
  useEffect(() => {
    getLesson();
  }, [param]);
  useEffect(() => {
    getSectionList();
  }, [param, search]);
  const getLesson = async () => {
    try {
      let resp = await lessonServ.getLesson(param.lesson_id);
      if (resp.data) {
        setLessonData({ ...resp.data });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getSectionList = async () => {
    try {
      if (loading == false && (sectionCount == 0 || sectionCount > sectionList.length)) {
        loading = true;
        const obj = search;
        let resp = await sectionServ.sectionList(obj);
        if (resp.data) {
          setSectionList(sectionList.length > 0 && search.start != 0 ? [...sectionList, ...resp.data] : resp.data);
          setSectionCount(resp.total);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  function reachedBottomCall() {
    let searchTemp = { ...search };
    searchTemp.start = search.start + search.length;
    setSearch(searchTemp);
  }
  const handleQuizze = (section_id, marks) => {
    let quizzeResult = quizzeMarks;
    if (!quizzeResult[section_id]) {
      quizzeResult[section_id] = 0;
    }
    quizzeResult[section_id] = quizzeResult[section_id] + marks > 0 ? quizzeResult[section_id] + marks : 0;
    setQuizzeMarks({ ...quizzeResult });
  };
  const submitResult = async (id, detail) => {
    let obj = {
      quizzeScore: quizzeMarks[id],
      quizzeId: detail._id,
      sectionId: id,
      lessonId: detail.lesson_id,
      totalMarks: detail.total_marks,
      min_marks: detail.min_marks,
    };
    let resp = await qResultServ.sendQuizzeResult(obj);
    let sectionListTemp = sectionList;
    sectionListTemp[sectionListTemp.map((i) => i._id).indexOf(id)].quizzeResult = resp.data;
    setSectionList([...sectionListTemp]);
    if (quizzeMarks[id] > detail.min_marks) {
      alert("Congretulations! You did a great job");
    } else {
      alert("OOPS! Please try again");
    }
  };
  return (
    <div className="lessonPage">
      <div class="container">
        <h2 class="">{lessonData.title}</h2>
        <div className="d-flex justify-content-between">
          <p class="mainh3" style={{ width: "35%" }}>
            {lessonData.desc}
          </p>
          <img src={lessonData.banner} className="img-fluid" style={{ width: "60%" }} />
        </div>
      </div>
      <ScrollMore
        className="updatesCardSectionRow"
        id="post list"
        reachedBottomCall={reachedBottomCall}
        useWindowScroll={true}
      >
        {sectionList.map((itm, idx) => {
          let link = itm.video_link;
          let video_id = itm.video_link.slice(link.indexOf("v=") + 2, link.indexOf("&", link.indexOf("v=")));
          return (
            <div class="container mt-5 me-1">
              <h2 class="">{itm.title}</h2>
              <p class="mainh3" style={{ width: "90%" }}>
                {itm.desc}
              </p>
              <iframe
                width="80%"
                height="464"
                src={`https://www.youtube.com/embed/${video_id}?mute=1&enablejsapi=1`}
                frameBorder="0"
                allowFullScreen
                title="Embedded youtube"
              />
              {isAuthentiCated ? (
                itm.quizze && (
                  <div className="Ques-Slider">
                    {itm.quizzeResult && itm.quizzeResult.quizzeScore > itm.quizzeResult.min_marks ? (
                      <div className=" quelifiedTxt d-flex justify-content-between">
                        <p className="">Quizze quelified!!!</p>
                        <p className="">
                          {itm.quizzeResult.quizzeScore} / {itm.quizzeResult.totalMarks}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="quelifiedTxt startTxt">Let's have a quick quizze</p>
                        <Carousel itm={itm} handleQuizze={handleQuizze} />
                        <div className="loginBtn mt-4">
                          <button
                            className="btn btnColor w-100 logBTN"
                            type="button"
                            onClick={() => submitResult(itm._id, itm.quizze)}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <p className="quelifiedTxt authTxt">Please Login or Signup to give Quizze</p>
              )}
            </div>
          );
        })}
      </ScrollMore>
    </div>
  );
}
