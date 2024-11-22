import { Link, useLocation } from "react-router-dom";
import "material-icons/iconfont/material-icons.scss";
import { useEffect, useRef, useState } from "react";
import { fetchAdminInfo } from "./features/admin/admin.slice";
import { useAppSelector } from "./app/hooks";
import store from "./app/store";
import Modal, { ModalControl } from "./components/component.modal";

export default function Header() {
  const [headerState, setHeaderState] = useState("closed");
  const [isThemeColorControlOpen, setIsThemeColorControlOpen] = useState(false);
  const [themeMode, setThemeMode]  = useState(localStorage.getItem("themeMode")? localStorage.getItem("themeMode"):'light');
  const url = useLocation().pathname;
  const { adminInfo } = useAppSelector((state) => state.adminManager);
  const { status: regularLoginStatus } = useAppSelector(
    (state) => state.loginManager
  );
  // const navigate = useNavigate();
  // const [isLogined, setIsLogined] = useState<boolean>(false);
  const logoutModal = useRef<ModalControl>(null);
  const loginModal = useRef<ModalControl>(null);

  function toggleIsLightDarkControlOpen() {
    if (isThemeColorControlOpen) {
      setIsThemeColorControlOpen(false);
    } else {
      setIsThemeColorControlOpen(true);
    }
  }

  function applyThemeMode(themeName: string) {
    setThemeMode(themeName);
    localStorage.setItem('themeMode', themeName);
    document.querySelector('body')?.setAttribute('data-theme', themeName);
    setIsThemeColorControlOpen(false);
  }

  // function setCredentials() {
  //   const params = new URLSearchParams(window.location.hash.replace("#", "?"));
  //   const accessToken = params.get('access_token');
  //   const tokenType = params.get('token_type');
  //   const expiresIn = params.get('expires_in');
  //   const startTime = Date.now().toString();

  //   if (accessToken && tokenType && expiresIn) {
  //     localStorage.setItem("access_token", accessToken);
  //     localStorage.setItem("token_type", tokenType);
  //     localStorage.setItem("expires_in", expiresIn);
  //     localStorage.setItem("start_time", startTime);
  //     window.location.hash = '';
  //   }
  // }

  // async function logout() {
  //   await store.dispatch(logoutUser());
  //   setIsLogined(false);

  //   // Modal confirm click go back to home
  //   navigate("/");

  //   // Minimize the header
  //   toggleNavigation();

  //   localStorage.clear();

  //   logoutModal.current?.openModal();
  // }

  function toggleNavigation() {
    setHeaderState(headerState === "closed" ? "opened" : "closed");

    if (headerState === "closed") {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }

  function closeNavigation() {
    setHeaderState("closed");
    document.body.classList.remove("overflow-y-hidden");
  }

  useEffect(() => {
    store.dispatch(fetchAdminInfo());
    const themeMode = localStorage.getItem('themeMode')
    document.querySelector('body')?.setAttribute('data-theme', themeMode? themeMode:'light');

    // const authKey = localStorage.getItem('auth_key');

    // if (authKey) {
    //   setIsLogined(true);
    // } else {
    //   setIsLogined(false);
    // }
  }, [regularLoginStatus]);

  useEffect(() => {
    // setCredentials();
    // const accessToken = localStorage.getItem('access_token');
    // if (accessToken) {
    //   store.dispatch(verifyAccessToken(accessToken))
    //     .then((res) => {
    //       const verifyRes = res.payload as VerifyResponse;
    //       // if (verifyRes.status.is_success) {
    //       //   setIsLogined(true);
    //       //   if (!localStorage.getItem('login_status')) {
    //       //     loginModal.current?.openModal();
    //       //   }
    //       //   localStorage.setItem('login_status', 'exist');
    //       // } else {
    //       //   localStorage.setItem('login_status', 'exist');
    //       //   setIsLogined(false);
    //       // }
    //     })
    // }
  }, []);

  return (
    <>
      <Modal
        title="Message"
        message="Login successful!"
        navigateUrl="/"
        ref={loginModal}
      ></Modal>
      <Modal
        title="Message"
        message="Your account was logged out successfully!"
        navigateUrl="/"
        ref={logoutModal}
      ></Modal>
      <header className="header theme--default">
        <div
          className={`dark-mode__toggle ${isThemeColorControlOpen ? "open" : ""}`}
        >
          <ul className={`${isThemeColorControlOpen ? "open" : ""}`}>
            <li className={`${themeMode === 'light'? 'selected':''}`} onClick={()=> applyThemeMode('light')} style={{backgroundColor: "white", color: 'black'}}>
              <p>Light {themeMode === 'light'? '(SELECTED)':''}</p>
            </li>
            <li className={`${themeMode === 'dark'? 'selected':''}`} onClick={()=> applyThemeMode('dark')} style={{backgroundColor: "black", color: 'white'}}>
              <p>Dark {themeMode === 'dark'? '(SELECTED)':''}</p>
            </li>
          </ul>
          <div onClick={() => toggleIsLightDarkControlOpen()}>
            <button type="button">
              Click to{" "}
              <strong>{isThemeColorControlOpen ? "Close" : "Open"}</strong>{" "}
              Theme Color Control
            </button>
          </div>
        </div>
        <div className="header__inner container">
          <Link className="header__brand" to="/">
            <img
              className="header__avatar"
              src={adminInfo.avatarUrl}
              alt={adminInfo.avatarUrl}
            ></img>
            <span className="header__info">
              <span>Junho Shin</span>
              <span className="header__verification">
                <span className="material-icons">check</span>
              </span>
            </span>
          </Link>

          <div className="header__nav">
            <nav
              className={`nav ${headerState === "opened" ? "nav--open" : ""}`}
            >
              <button
                className={`iconbtn nav__togglebtn`}
                onClick={toggleNavigation}
              >
                <span className="menuicon">
                  <span className="menuicon__bar"></span>
                  <span className="menuicon__bar"></span>
                  <span className="menuicon__bar"></span>
                  <span className="menuicon__bar"></span>
                </span>
              </button>

              <div className="nav__content">
                <ul className="nav__menu" id="nav__menu">
                  <li
                    className={`nav__item ${
                      url == "/" ? "nav__item--active" : ""
                    }`}
                  >
                    <Link
                      className="nav__link"
                      to="/"
                      onClick={closeNavigation}
                    >
                      <span className="nav__num">01</span> home
                    </Link>
                  </li>
                  <li
                    className={`nav__item ${
                      url.includes("/posts") ? "nav__item--active" : ""
                    }`}
                  >
                    <Link
                      className="nav__link"
                      to="/posts"
                      onClick={closeNavigation}
                    >
                      <span className="nav__num">02</span> writing
                    </Link>
                  </li>
                  <li
                    className={`nav__item ${
                      url.includes("/notes") ? "nav__item--active" : ""
                    }`}
                  >
                    <Link
                      className="nav__link"
                      to="/notes"
                      onClick={closeNavigation}
                    >
                      <span className="nav__num">03</span> notes
                    </Link>
                  </li>
                  <li
                    className={`nav__item ${
                      url.includes("/projects") ? "nav__item--active" : ""
                    }`}
                  >
                    <Link
                      className="nav__link"
                      to="/projects"
                      onClick={closeNavigation}
                    >
                      <span className="nav__num">04</span> projects
                    </Link>
                  </li>

                  <li
                    className={`nav__item ${
                      url.includes("/skills") ? "nav__item--active" : ""
                    }`}
                  >
                    <Link
                      className="nav__link"
                      to="/skills"
                      onClick={closeNavigation}
                    >
                      <span className="nav__num">05</span> Skills
                    </Link>
                  </li>

                  <li
                    className={`nav__item ${
                      url.includes("/about") ? "nav__item--active" : ""
                    }`}
                  >
                    <Link
                      className="nav__link"
                      to="/about"
                      onClick={closeNavigation}
                    >
                      <span className="nav__num">06</span> about
                    </Link>
                  </li>
                  {/* <li className="account" style={{ display: isLogined ? 'none' : 'flex' }}>
                    <button className="login__button" onClick={() => { navigate('/sign-in'); closeNavigation(); }}>Sign in</button>
                    <button className="signup__button" onClick={() => { navigate('/sign-up'); closeNavigation(); }}>Sign up</button>
                  </li>
                  <li className="account" style={{ display: isLogined ? 'flex' : 'none' }}>
                    <button className="signup__button" onClick={logout}>Logout</button>
                  </li> */}
                </ul>
              </div>

              <div className="nav__bg">
                <div className="nav__bg__circle"></div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
