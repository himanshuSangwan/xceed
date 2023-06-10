import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import OwlCarousel from "react-owl-carousel";
function DefaultLayout({ children }) {
  const location = useLocation();
  const [layoutRequired, setLayoutRequired] = useState(true);
  const [headerRequired, setHeaderRequired] = useState(true);
  useEffect(() => {
    if (location.pathname == "/usersuggestion") {
      setLayoutRequired(false);
    } else {
      setLayoutRequired(true);
    }
    if (location.pathname == "/createpost") {
      setHeaderRequired(false);
    } else {
      setHeaderRequired(true);
    }
    // var objDiv = document.getElementById("theme-contant");
    // objDiv.scrollTop = objDiv.scrollHeight;
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className={"w-100 clearfix " + (headerRequired && " socialMediaTheme")}>
      <div className={"themeContant " + (location.pathname.includes("message") && "messageHeightFix")}>
        <Header />

        {children}
      </div>
    </main>
  );
}
export default DefaultLayout;
