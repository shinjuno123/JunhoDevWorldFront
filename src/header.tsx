import { Link, useLocation, useNavigate } from "react-router-dom";
import "material-icons/iconfont/material-icons.scss";
import { useEffect, useRef, useState } from "react";
import { fetchAdminInfo } from "./features/admin/admin.slice";
import { useAppSelector } from "./app/hooks";
import store from "./app/store";
import { logoutUser } from "./features/login/logout.slice";
import Modal, { ModalControl } from "./components/component.modal";
import { verifyAccessToken } from "./features/login/verify-google-oauth";
import { VerifyResponse } from "./features/login/verify-google-oauth";

export default function Header() {
  const [headerState, setHeaderState] = useState('closed');
  const url = useLocation().pathname;
  const { adminInfo } = useAppSelector(state => state.adminManager);
  const { status: regularLoginStatus } = useAppSelector(state => state.loginManager);
  const { loading: googleOauthVerificationLoading } = useAppSelector(state => state.verifyGoogleAccessTokenManager);
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const modal = useRef<ModalControl>(null);


  function setCredentials() {
    const params = new URLSearchParams(window.location.hash.replace("#", "?"));
    const accessToken = params.get('access_token');
    const tokenType = params.get('token_type');
    const expiresIn = params.get('expires_in');
    const startTime = Date.now().toString();

    if (accessToken && tokenType && expiresIn) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("token_type", tokenType);
      localStorage.setItem("expires_in", expiresIn);
      localStorage.setItem("start_time", startTime);
      window.location.hash = '';
    }
  }

  async function logout() {
    await store.dispatch(logoutUser());
    setIsLogined(false);

    // Modal confirm click go back to home
    navigate("/");

    // Minimize the header
    toggleNavigation();

    modal.current?.openModal();
  }

  function toggleNavigation() {
    setHeaderState((headerState === 'closed' ? 'opened' : 'closed'));

    if (headerState === 'closed') {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }



  function closeNavigation() {
    setHeaderState('closed');
    document.body.classList.remove('overflow-y-hidden');
  }

  useEffect(() => {
    store.dispatch(fetchAdminInfo());

    const authKey = localStorage.getItem('auth_key');

    if (authKey) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, [regularLoginStatus]);

  useEffect(() => {
    setCredentials();
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      store.dispatch(verifyAccessToken(accessToken))
        .then((res) => {
          const verifyRes = res.payload as VerifyResponse;

          if (verifyRes.status.is_success) {
            setIsLogined(true);
          } else {
            setIsLogined(false);
          }
        })
    }
  }, []);



  return (
    <>
      <Modal title="Message" message="Your account was logged out successfully!" navigateUrl="/" ref={modal}></Modal>
      <header className="header">
        <div className="header__inner container">
          <Link className="header__brand" to="/">
            <img className="header__avatar" src={adminInfo.avatarUrl} alt={adminInfo.avatarUrl}></img>
            <span className="header__info">
              <span>Junho Shin</span>
              <span className="header__verification">
                <span className="material-icons">check</span>
              </span>
            </span>
          </Link>

          <div className="header__nav">
            <nav className={`nav ${headerState === 'opened' ? 'nav--open' : ''}`}>
              <button className={`iconbtn nav__togglebtn`} onClick={toggleNavigation}>
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
                    className={`nav__item ${url == "/" ? "nav__item--active" : ""
                      }`}
                  >
                    <Link className="nav__link" to="/" onClick={closeNavigation}>
                      <span className="nav__num">01</span> home
                    </Link>
                  </li>
                  <li
                    className={`nav__item ${url.includes("/posts") ? "nav__item--active" : ""
                      }`}
                  >
                    <Link className="nav__link" to="/posts" onClick={closeNavigation}>
                      <span className="nav__num">02</span> writing
                    </Link>
                  </li>
                  <li
                    className={`nav__item ${url.includes("/notes") ? "nav__item--active" : ""
                      }`}
                  >
                    <Link className="nav__link" to="/notes" onClick={closeNavigation}>
                      <span className="nav__num">03</span> notes
                    </Link>
                  </li>
                  <li
                    className={`nav__item ${url.includes("/projects") ? "nav__item--active" : ""
                      }`}
                  >
                    <Link className="nav__link" to="/projects" onClick={closeNavigation}>
                      <span className="nav__num">04</span> projects
                    </Link>
                  </li>

                  <li
                    className={`nav__item ${url.includes("/skills") ? "nav__item--active" : ""
                      }`}
                  >
                    <Link className="nav__link" to="/skills" onClick={closeNavigation}>
                      <span className="nav__num">05</span> Skills
                    </Link>
                  </li>

                  <li
                    className={`nav__item ${url.includes("/about") ? "nav__item--active" : ""
                      }`}
                  >
                    <Link className="nav__link" to="/about" onClick={closeNavigation}>
                      <span className="nav__num">06</span> about
                    </Link>
                  </li>
                  <li className="account" style={{ display: isLogined ? 'none' : 'flex' }}>
                    <button className="login__button" onClick={() => { navigate('/sign-in'); closeNavigation(); }}>Sign in</button>
                    <button className="signup__button" onClick={() => { navigate('/sign-up'); closeNavigation(); }}>Sign up</button>
                  </li>
                  <li className="account" style={{ display: isLogined ? 'flex' : 'none' }}>
                    <button className="signup__button" onClick={logout}>Logout</button>
                  </li>
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
