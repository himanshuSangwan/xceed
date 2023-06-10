import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import UserService from "../services/UserService";
import GlobalContext from "../context/GlobalContext";
import moment from "moment";

const serv = new UserService();
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const globalCtx = useContext(GlobalContext);
  const [user, setUser] = globalCtx.user;

  const getUserData = async () => {
    try {
      let resp = await serv.getUser(user?._id);
      if (resp.data) {
        setUser({ ...resp.data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <>    <header className="w-100 clearfix topHeader sticky-top" >
    <>
      {" "}
      <header className="w-100 clearfix topHeader sticky-top-header-custom" id="topHeader">
        {/* <div className="topHeaderInner d-flex align-items-center topHeaderInner-custom">
          <div class="mobileLogo d-block d-xl-none mobileLogoCustom">
            <Link href="javascript:void(0);" to="/">
              <img src="/images/logo-2.svg" alt="logo" class="img-fluid" />
            </Link>
          </div>
          <div className="topHeaderLeftSec d-md-block">
            {!location.pathname.includes("setting") && <div className="customWidth"></div>}
          </div>
          <div className="topHeaderRightSec">
            <div className="topHeaderRightInner d-flex align-items-center">
              <div className="toggleIcon headIcon d-none d-md-block d-xl-none">
                <a href="javascript:void(0)">
                  <i className="fa fa-bars" aria-hidden="true" />
                </a>
              </div>
              <div className="notificationIcon headIcon dropdown">
                <a href="javascript:void(0)" onClick={handleShowNotification}>
                  <img
                    src="/images/icons/notification.svg"
                    alt="notification-icon"
                    className="img-fluid notification-icon"
                  />
                  {(notificationList.length > 0 || followReq.length > 0) && (
                    <img
                      src="/images/icons/notification-circle.svg"
                      alt="notification-circle"
                      className="img-fluid notification-circle"
                    />
                  )}
                </a>
                <div
                  className={"dropdown-menu dropdown-notification " + (showNotification && "show")}
                  id="dropdown-notification-id-custom"
                >
                  {showFollowReq ? (
                    <>
                      <div
                        className="notifyHeading d-flex notifyHeading-customSize notifyHeading-customfr-mobile"
                        onClick={handleShowFollowReqList}
                      >
                        <img className="arrow" src="/images/icons/left-arrow.svg" />
                        <h4 className="w-100 mb-0">Follow requests</h4>
                      </div>
                      <div className="dropdownGroup dropdownGroupCustom overflowScrollStop">
                        {followReq.map((item, idx) => {
                          return (
                            <>
                              <a className="dropdown-item position-relative" href="javascript:void(0);">
                                <div className="notifyGroup followReqList">
                                  <div className=" position-relative"></div>
                                  <div
                                    className={
                                      !addClassfull
                                        ? "followReqContant followReqContant-custom w-auto"
                                        : "followReqContant followReqContant-custom-full w-auto"
                                    }
                                  >
                                    <h4>{item?.userId?.user_name}</h4>
                                    <p
                                      className={
                                        !addClassPara ? "paragrapgh_resize_custom" : "paragrapgh_resize_custom_full"
                                      }
                                    >
                                      {item?.userId?.first_name} {item?.userId?.last_name}
                                    </p>
                                    <p
                                      className={
                                        !addClassPara ? "paragrapgh_resize_custom" : "paragrapgh_resize_custom_full"
                                      }
                                    >
                                      {item?.userId?.title}
                                    </p>
                                  </div>
                                  <div className=" text-center d-flex position-absolute end-0 me-2">
                                    {!item.reqStatus ? (
                                      <>
                                        <div className="confirmBtn me-2">
                                          <button
                                            onClick={() => handleAcceptReq(item?.userId?._id)}
                                            className="btn"
                                            type="button"
                                          >
                                            Confirm
                                          </button>
                                        </div>
                                        <div className="confirmBtn confirmBtnCustom">
                                          <button
                                            onClick={() => handleRejectReq(item?.userId?._id)}
                                            className="btn"
                                            type="button"
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </>
                                    ) : item.is_following == "following" ? (
                                      <div className="confirmBtn me-2">
                                        <button
                                          onClick={() => handleUnFollowRequest(item?.userId?._id)}
                                          className="btn"
                                        >
                                          Following
                                        </button>
                                      </div>
                                    ) : item.is_following == "requested" ? (
                                      <div className="confirmBtn me-2">
                                        <button href="javascript:void(0);" className="btn btnColor">
                                          Requested
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="confirmBtn me-2">
                                        <button onClick={() => handleFollowRequest(item?.userId?._id)} className="btn">
                                          Follow
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </a>
                            </>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="notifyHeading notifyHeading-custom-mobile">
                        <div className="notifyHeading-backButton" onClick={() => setShowNotification(false)}>
                          <img className="arrow" src="/images/icons/left-arrow.svg" />
                        </div>
                        <h4 className="mb-0">Notifcations</h4>
                      </div>
                      <div className="dropdownGroup h-100 overflowScrollStop">
                        <a className="dropdown-item" href="javascript:void(0);" onClick={handleShowFollowReqList}>
                          <div className="notifyGroup followReqGroup position-relative">
                            <div className="notifyIcon" style={{ width: followReq.length > 1 ? "40px" : "22px" }}>
                              <div className="userImgProf position-relative">
                                {followReq.length > 0 && (
                                  <div className="taskEmployeeImg rounded-circle" style={{ left: 0 }}></div>
                                )}
                                {followReq.length > 1 && (
                                  <div
                                    className="taskEmployeeImg rounded-circle position-absolute"
                                    style={{ left: 24 }}
                                  ></div>
                                )}
                              </div>
                            </div>
                            <div className="followReqContant">
                              <h4>Follow requests</h4>
                              <p>
                                {followReq.length > 0
                                  ? `${followReq[0]?.userId?.user_name} + ${followReq.length - 1} others`
                                  : "Don't have any follow request now"}
                              </p>
                            </div>
                            <div className="dotsNotify text-center followReqDots">
                              {followReq.length >= 1 ? (
                                <img src="/images/icons/notification-circle.svg" alt="close" />
                              ) : (
                                ""
                              )}
                              <img className="arrow" src="/images/icons/right-arrow.svg" />
                            </div>
                          </div>
                        </a>

                        {notificationList.length > 0 &&
                          notificationList.map((item, idx) => {
                            return (
                              <div>
                                <Link
                                  className="dropdown-item"
                                  to={
                                    item?.groupId?._id && item?.type == "message"
                                      ? "/message/show/" + item?.groupId?._id + "/" + item?.groupId?.latestMessage
                                      : item?.groupId?._id && item?.type == "groupInvite"
                                      ? ""
                                      : "/post/" + item?.postId
                                  }
                                  onClick={() => {
                                    handleShowNotification();
                                    deleteNotification(item._id);
                                  }}
                                >
                                  <div className="notifyGroup">
                                    <div className="notifyIcon">
                                      <img
                                        src={
                                          item.type == "like"
                                            ? "/images/icons/liked.svg"
                                            : item.type == "comment"
                                            ? "/images/icons/comment.svg"
                                            : "/images/icons/share.svg"
                                        }
                                        alt="notification-like"
                                        className="img-fluid notificationLike"
                                      />
                                    </div>
                                    <div className="notifyContant">
                                      <div className="notifyUserImage d-flex justify-content-between">
                                        <div className="userImgProf position-relative">
                                          <div className="taskEmployeeImg rounded-circle" style={{ left: 0 }}></div>
                                        </div>
                                        <div className="closeNotify">
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              e.preventDefault();
                                              deleteNotification(item._id);
                                            }}
                                            className="btn"
                                          >
                                            <img src="/images/icons/close.svg" alt="close" />
                                          </button>
                                        </div>
                                      </div>
                                      <div className="notifyUserTxt d-flex justify-content-between">
                                        <div className="notifyContant">
                                          <p className="mb-0">
                                            <strong>
                                              {item.createdBy?.first_name
                                                ? `${item.createdBy.first_name} ${item.createdBy?.last_name}`
                                                : item.createdBy?.user_name}{" "}
                                              {item.createdBy?.role.includes("userPaid") ? (
                                                <img src="/images/icons/green-tick.svg" />
                                              ) : (
                                                <img src="/images/icons/dot.svg" />
                                              )}{" "}
                                            </strong>{" "}
                                            {item.title}
                                            {item.groupId?._id && item.groupId.chatName && (
                                              <strong>"{item.groupId.chatName}"</strong>
                                            )}
                                          </p>
                                          {console.log("title", item.title)}
                                          <div className="d-flex justify-content-between">
                                            <span>{moment(item?.createdAt).fromNow()}</span>
                                            {item.type == "groupInvite" ? (
                                              <div className="followBtn followBtnSmall">
                                                <a
                                                  href="javascript:void(0);"
                                                  onClick={() =>
                                                    handleJoinGroup(
                                                      item.groupId?._id,
                                                      item._id,
                                                      item.title == "want to join"
                                                        ? item.createdBy?._id
                                                        : item.createdFor,
                                                      item.title
                                                    )
                                                  }
                                                  className={"btn btnColor"}
                                                >
                                                  Accept
                                                </a>{" "}
                                                <a
                                                  href="javascript:void(0);"
                                                  onClick={() => deleteInvitation(item.groupId?._id, item._id)}
                                                  className={"btn btnColor followingBtn"}
                                                >
                                                  Reject
                                                </a>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        </div>
                                        <div className="dotsNotify text-center">
                                          <img src="/images/icons/notification-circle.svg" alt="close" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            );
                          })}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="profileImage headIcon dropdown">
                <a href="javascript:void(0)" data-bs-toggle="dropdown"></a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item dropDownUserProfile" href="javascript:void(0);">
                      <div className="dropdownProfileOuter">
                        <div className="dropdownProfile">
                          <span className="userOnline" />
                        </div>
                        <div className="dropdownTxt dropdownTxtProfile-custom">
                          <h4>
                            {user?.first_name} {user?.last_name}{" "}
                            {user.role.includes("userPaid") ? <img src="/images/icons/green-tick.svg" /> : ""}{" "}
                          </h4>
                          <p>@{user?.user_name}</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      View profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/setting/billing">
                      Billing
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/setting/support">
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/setting">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="javascript:void(0);" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {showNotification && <div onClick={() => setShowNotification(false)} className="modal-backdrop show"></div>} */}
        <div className="NAVBAR">
          <div className="navbar container">
            <div className="logo">
              <h2>E-Learning</h2>
            </div>
            <div className="search-bar">
              <div className="category">
                <div className="category-box">
                  <input type="checkbox" name id />
                  Category
                  <div className="menu-items">
                    <div className="tab">
                      <button className="tablinks" onclick="openCity(event, 'Part1')" id="defaultOpen">
                        Part1
                      </button>
                      <button className="tablinks" onclick="openCity(event, 'Part2')">
                        Part2
                      </button>
                      <button className="tablinks" onclick="openCity(event, 'Part3')">
                        Part3
                      </button>
                    </div>
                    <div id="Part1" className="tabcontent">
                      <ul>
                        <li>dfh</li>
                        <li>fhg</li>
                        <li>ftgethrhtrghghw</li>
                        <li>tdh</li>
                        <li>wdfth</li>
                      </ul>
                      <ul>
                        <li>dfh</li>
                        <li>fhg</li>
                        <li>ftertfhghw</li>
                      </ul>
                      <ul>
                        <li>dfdwrthgwerhgh</li>
                        <li>fhg</li>
                        <li>ftghw</li>
                        <li>tfhgfhdgdh</li>
                        <li>wdfth</li>
                      </ul>
                      <ul>
                        <li>dfh</li>
                        <li>fstgherthrtghhg</li>
                        <li>ftghw</li>
                        <li>tdh</li>
                        <li>wdfth</li>
                      </ul>
                      <ul>
                        <li>dfh</li>
                        <li>fstgherthrtghhg</li>
                        <li>ftghw</li>
                        <li>tdh</li>
                        <li>wdfth</li>
                      </ul>
                    </div>
                    <div id="Part2" className="tabcontent">
                      <h3>Paris</h3>
                      <p>Paris is the capital of France.</p>
                    </div>
                    <div id="Part3" className="tabcontent">
                      <h3>Tokyo</h3>
                      <p>Tokyo is the capital of Japan.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="search">
                <form action>
                  <input type="search" name id placeholder="Search Here" />
                  <button type="submit" />
                </form>
              </div>
            </div>
            <div className="navbuttons">
              <ul>
                <li>
                  <a href>Home</a>
                </li>
                <li>
                  <a href>About</a>
                </li>
                <li>
                  <a href>Product</a>
                </li>
                <li>
                  <a href>About US</a>
                </li>
                <li>
                  <a href id="Profile">
                    Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
