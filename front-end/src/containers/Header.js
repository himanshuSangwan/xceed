import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import UserService from "../services/UserService";
import ClassService from "../services/classService";
import GlobalContext from "../context/GlobalContext";
import moment from "moment";

const serv = new UserService();
const classServ = new ClassService();
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const globalCtx = useContext(GlobalContext);
  const [user, setUser] = globalCtx.user;
  const [isAuthentiCated, setIsAuthentiCated] = globalCtx.auth;
  const [classList, setClassList] = useState([]);
  useEffect(() => {
    getClassList();
  }, []);
  const getUserData = async () => {
    try {
      let resp = await serv.getUser(user?._id);
      if (resp.data) {
        setUser([...resp.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getClassList = async () => {
    try {
      let resp = await classServ.classList({});
      if (resp.data) {
        setClassList([...resp.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogOut = () => {
    setIsAuthentiCated(false);
    setUser({});
    localStorage.clear();
  };
  return (
    <>
      {" "}
      <header className="w-100 clearfix topHeader sticky-top-header-custom" id="topHeader">
        <div className="NAVBAR">
          <div className="navbar container">
            <Link to="/">
              <div className="logo">
                <h2>XSEED ED</h2>
              </div>
            </Link>
            <div className="search-bar">
              <div className="category">
                <div className="category-box">
                  <input type="checkbox" name="check" id />
                  Courses
                  <div className="menu-items">
                    {classList.length > 0 &&
                      classList.map((itm, idx) => {
                        return (
                          <div id={`Part${idx}`} key={idx} className="tabcontent">
                            <h3>Class {itm.title}</h3>
                            <ul>
                              {itm.subject_list.length > 0 &&
                                itm.subject_list.map((sub, subIdx) => {
                                  return (
                                    <li>
                                      <Link
                                        to={`lesson/${itm._id}/${sub._id}`}
                                        className={!sub.is_active || !itm.is_active ? "disabled" : ""}
                                        style={{ color: "gray" }}
                                      >
                                        {sub.title}
                                      </Link>
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        );
                      })}
                    {/* <div id="Part3" className="tabcontent">
                      <h3>Class 5</h3>
                      <ul>
                        <li>
                          <a className="disabled">Math</a>
                        </li>
                        <li>
                          <Link to={""}>Science</Link>
                        </li>
                        <li>
                          <a className="disabled">Engilsh</a>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="search disabled">
                <form action>
                  <input type="search" name id placeholder="Search Here" />
                  <button type="submit" />
                </form>
              </div>
            </div>
            <div className="navbuttons">
              <ul>
                {isAuthentiCated ? (
                  <>
                    <li>
                      <a href="javascript:void(0)" id="Profile">
                        {user?.first_name} {user?.last_name}
                      </a>
                    </li>
                    <li onClick={handleLogOut}>
                      <div className="loginBtn">
                        <button type="button" className="btn btnColor w-100 logBTN">
                          Logout
                        </button>
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to={"/login"}>Login</Link>
                    </li>
                    <p>/</p>
                    <li>
                      <Link to={"/signup"}>SignUp</Link>
                    </li>
                  </>
                )}
                {/* <li>
                  <a href>About US</a>
                </li>
                <li>
                  <a href id="Profile">
                    Profile
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
