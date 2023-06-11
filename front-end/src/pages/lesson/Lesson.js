import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import LessonService from "../../services/lessonService";
import SectionService from "../../services/sectionService";
import moment from "moment";
import OwlCarousel from "react-owl-carousel";
import ScrollMore from "../../shared/ScrollMore";
const lessonServ = new LessonService();
const sectionServ = new SectionService();
export default function Lesson() {
  const param = useParams();
  const [lessonData, setLessonData] = useState({});
  const [sectionList, setSectionList] = useState([]);
  const [sectionCount, setSectionCount] = useState(0);
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
              {itm.quizze && (
                <div className="Ques-Slider">
                  <p>Let's have quick quizze</p>
                  <OwlCarousel
                    className="owl-carousel owl-carousel-custom owl-theme lessonOwlCarousel slideshow-container"
                    loop={false}
                    margin={20}
                    responsiveClass={true}
                    dots={true}
                    nav={true}
                    slideBy={1}
                    // navText={[
                    //   "<div class='carousel-right-btn-custom'><i class='fa-solid fa-angle-left'></i></div>",
                    //   "<div class='carousel-right-btn-custom'><i class='fa-solid fa-angle-right'></i></div>",
                    // ]}
                    responsive={{
                      0: {
                        items: 1,
                      },
                      576: {
                        items: 1,
                      },
                      768: {
                        items: 1,
                      },
                    }}
                  >
                    {itm.quizze.questions.map((i, j) => {
                      return (
                        <div className="mySlides d-block">
                          <div className="numbertext">
                            {j + 1} / {itm.quizze.questions.length}
                          </div>
                          <div className="Content">
                            <h3>{i.question}</h3>
                            <div className="anss">
                              <form action>
                                <div>
                                  <input type="radio" id="A" name="age" defaultValue={30} />
                                  <label htmlFor="A">Parmjeet Singh Gill</label>
                                </div>
                                <div>
                                  <input type="radio" id="B" name="age" defaultValue={60} />
                                  <label htmlFor="B">Naresh Kumar</label>
                                </div>
                                <div>
                                  <input type="radio" id="C" name="age" defaultValue={100} />
                                  <label htmlFor="C">Kala Bhaat</label>
                                </div>
                                <div>
                                  <input type="radio" id="D" name="age" defaultValue={100} />
                                  <label htmlFor="C">Tau</label>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </OwlCarousel>
                </div>
              )}
            </div>
          );
        })}
      </ScrollMore>
    </div>
  );
}
