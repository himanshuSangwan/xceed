import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { useFormik } from "formik";
import * as Yup from "yup";
import GlobalContext from "../../context/GlobalContext";

const serv = new UserService();

const ValidateSchema = Yup.object({
  email: Yup.string().required("Email is a required field").email(),
  password: Yup.string().required("Password is a required field"),
  full_name: Yup.string().required("Full Name is a required field"),
});
function Signup() {
  const navigate = useNavigate();
  const globalCtx = useContext(GlobalContext);
  const [isAuthentiCated, setIsAuthentiCated] = globalCtx.auth;
  const [user, setUser] = globalCtx.user;
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginObj, setLoginObj] = new useState({
    email: "",
    password: "",
    full_name: "",
  });

  const onSubmit = async (values) => {
    let obj = { ...values };
    try {
      const resp = await serv.signup(obj);
      if (resp?.data) {
        localStorage.setItem("user", JSON.stringify(resp.data));
        localStorage.setItem("token", resp.token);
        setIsAuthentiCated(true);
        setUser(resp.data);
        navigate("/");
      } else {
        setErrorMsg(resp.err);
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
    <main className="w-100 clearfix socialMediaTheme bgColor">
      {/* login page Start*/}
      <div className="main_container position-relative">
        <div className="sigUpSection sigUpSection-customPadding">
          <div className="text-center mt-5">
            <h2>Join XSEED ED</h2>
            <p className="pb-2 pb-sm-4">Create an account to continue.</p>
          </div>
          <div className="signUpform signUpform-paddingCustom">
            <div className="signUpInnerForm logInform">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3 mb-sm-4 commonform">
                  <label htmlFor="username" className="form-label">
                    Full Name*
                  </label>
                  {/* <input type="text" className="form-control" id="username" defaultValue="Michael42" /> */}
                  <input
                    className={
                      "form-control" + (formik.touched.full_name && formik.errors.full_name ? " is-invalid" : "")
                    }
                    placeholder=""
                    name="full_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.full_name}
                  />
                  {formik.touched.full_name && formik.errors.full_name ? (
                    <div className="valid_feedbackMsg">{formik.errors.full_name}</div>
                  ) : null}
                </div>
                <div className="mb-3 mb-sm-4 commonform">
                  <label htmlFor="userEmail" className="form-label">
                    Email*
                  </label>
                  {/* <input type="text" className="form-control" id="userEmail" defaultValue="michaelphilip@gmail.com" /> */}
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
                    Create Password*
                  </label>
                  <div className="position-relative">
                    <input
                      className={
                        "form-control" + (formik.touched.password && formik.errors.password ? " is-invalid" : "")
                      }
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
                          <img src="/images/Hide-pass.svg" className="showLoginPass" onClick={handleShowPassword} />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>
                {errorMsg && <div className="valid_feedbackMsg text-center">{errorMsg}</div>}
                <div className="loginBtn  btn-signup">
                  <button type="submit" href="javascript:void(0);" className="btn btnColor w-100">
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="signInLink signInLink-custom text-center">
            <p>
              Already have account ?
              <a href="javascript:void(0)" className="ms-2" onClick={() => navigate("/login")}>
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* login page End */}
    </main>
  );
}
export default Signup;
