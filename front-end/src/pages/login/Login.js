import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { useFormik } from "formik";
import * as Yup from "yup";
import GlobalContext from "../../context/GlobalContext";

const serv = new UserService();
const ValidateSchema = Yup.object({
  email: Yup.string().required("Email is a required field"),
  password: Yup.string().required("Password is a required field"),
});
function Login() {
  const navigate = useNavigate();
  const globalCtx = useContext(GlobalContext);
  const [isAuthentiCated, setIsAuthentiCated] = globalCtx.auth;
  const [user, setUser] = globalCtx.user;
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginObj, setLoginObj] = new useState({
    email: "",
    password: "",
  });

  const onSubmit = async (values) => {
    let obj = { ...values };
    try {
      const resp = await serv.login(obj);
      if (resp?.token) {
        setIsAuthentiCated(true);
        setUser(resp.data);
        navigate("/");
      } else {
        setErrorMsg(resp);
      }
    } catch (err) {
      err = JSON.parse(err.message);
      setErrorMsg(err.err);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues: loginObj,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  });
  return (
    <>
      <main className="w-100 clearfix socialMediaTheme mt-5">
        {/* login page Start*/}
        <div className="login_heading">
          <h2>Log in</h2>
        </div>
        <div className="logInform">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3 mb-sm-4 commonform">
              <label htmlFor="username" className="form-label">
                Username or Email*
              </label>
              {/* <input type="text" className="form-control" id="username" defaultValue="michaelphilip@gmail.com" required /> */}
              <input
                className={"form-control" + (formik.touched.email && formik.errors.email ? " is-invalid" : "")}
                placeholder=""
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="valid_feedbackMsg">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="commonform">
              <label htmlFor="passwordLogin" className="form-label">
                Password*
              </label>
              <div className="position-relative">
                {/* <input type="password" className="form-control" id="passwordLogin" defaultValue={123123123} /> */}
                <input
                  className={"form-control" + (formik.touched.password && formik.errors.password ? " is-invalid" : "")}
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="valid_feedbackMsg">{formik.errors.password}</div>
                ) : null}
                <span className="showHidetoggle">
                  {!formik.errors.password ? (
                    showPassword ? (
                      <img src="/images/show_pass.svg" className="showLoginPass" onClick={handleShowPassword} />
                    ) : (
                      <img src="/images/Hide-pass.svg" className="hideLoginPass" onClick={handleShowPassword} />
                    )
                  ) : (
                    ""
                  )}
                </span>
              </div>
            </div>
            {/* <a href="javascript:void(0)" className="forget_pass my-3" onClick={() => navigate("/forgotpassword")}>
              Forgot Password?
            </a> */}
            {errorMsg && <div className="valid_feedbackMsg text-center">{errorMsg}</div>}
            <div className="loginBtn">
              <button type="submit" href="javascript:void(0);" className="btn btnColor w-100">
                Log In
              </button>
            </div>
          </form>
        </div>
        <div className="loginPara text-center mt-3">
          <div className="notA_member">
            <span />
            <p className="mb-0">Not a member?</p>
            <span />
          </div>
          <p>
            <a href="javascript:void(0)" className="join" onClick={() => navigate("/signup")}>
              <span className="underline_span-text">Join</span>
            </a>{" "}
            to unlock the best of XSEED Ed.
          </p>
        </div>
        {/* login page End */}
      </main>
    </>
  );
}
export default Login;
