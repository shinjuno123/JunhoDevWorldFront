export default function Footer() {
  return (
    <>
      {/* <footer className="footer">
        <div className="container footer__inner">
          <p className="footer__item">
            <strong>© 2023-2024</strong>
            <br />
            <a href="/">Junho Shin</a>
          </p>

          <p className="footer__item">
            <strong>Work</strong>
            <br />
            <a href="https://www.bobsweep.com/" rel="me">
              bObsweep
            </a>
          </p>

          <p className="footer__item">
            <strong>Social</strong>
            <br />
            <a href="https://github.com/shinjuno123" rel="me">
              Github
            </a>
            <a href="https://www.linkedin.com/in/junho-shin-18b883234" rel="me">
              LinkedIn
            </a>
          </p>


        </div>
      </footer> */}

      <footer>
        <div className="background">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink={"http://www.w3.org/1999/xlink"}
            x="0px"
            y="0px"
            width="100%"
            height="100%"
            viewBox="0 0 1600 900"
          >
            <defs>
              <linearGradient id="bg" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{stopColor: "rgba(53, 127, 242, 0.6)"}}
                ></stop>
                <stop
                  offset="100%"
                  style={{stopColor: "rgba(38, 89, 190, 0.06)"}}
                ></stop>
              </linearGradient>
              <path
                id="wave"
  
                fill="url(#bg)"
                d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
      s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
              />
            </defs>
            <g>
              <use xlinkHref="#wave" opacity=".6">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  dur="8s"
                  calcMode="spline"
                  values="270 230; -334 180; 270 230"
                  keyTimes="0; .5; 1"
                  keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                  repeatCount="indefinite"
                />
              </use>
              <use xlinkHref="#wave" opacity=".7">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  dur="6s"
                  calcMode="spline"
                  values="-270 230;243 220;-270 230"
                  keyTimes="0; .6; 1"
                  keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                  repeatCount="indefinite"
                />
              </use>
              <use xlinkHref="#wave" opacity=".9">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  dur="4s"
                  calcMode="spline"
                  values="0 230;-140 200;0 230"
                  keyTimes="0; .4; 1"
                  keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                  repeatCount="indefinite"
                />
              </use>
            </g>
          </svg>
        </div>

        <section>
          <ul className="socials">
            <li>
              <a className="fa-brands fa-linkedin"></a>
            </li>
            <li>
              <a className="fa-brands fa-instagram"></a>
            </li>
          </ul>
          <ul className="links">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
          <p className="legal"><strong>© 2023-2024</strong></p>
        </section>
      </footer>
    </>
  );
}
