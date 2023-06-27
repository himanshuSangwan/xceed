import { useState, useContext, useEffect, useRef } from "react";
import OwlCarousel from "react-owl-carousel";
export default function Carousel({ itm, handleQuizze }) {
  const startPosition = useRef(0);
  return (
    <OwlCarousel
      className="owl-carousel owl-carousel-custom owl-theme lessonOwlCarousel slideshow-container"
      loop={false}
      margin={20}
      responsiveClass={true}
      dots={false}
      nav={false}
      slideBy={1}
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
      startPosition={startPosition.current}
      onDragged={({ item, page }) => {
        startPosition.current = item.index;
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
                  {i.option.map((opt) => {
                    return (
                      <div>
                        <input
                          type="radio"
                          id={opt}
                          name={i._id}
                          defaultValue={opt}
                          onChange={(e) => handleQuizze(itm._id, i._id, e.target.value)}
                          // onChange={(e) =>
                          //   i.correct_answers.includes(e.target.value)
                          //     ? handleQuizze(itm._id, i.marks)
                          //     : handleQuizze(itm._id, -i.marks)
                          // }
                        />
                        <label htmlFor={opt}>{opt}</label>
                      </div>
                    );
                  })}
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </OwlCarousel>
  );
}
