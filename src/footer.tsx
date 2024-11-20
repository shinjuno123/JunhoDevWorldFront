import { Link } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    <>
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
                  offset="200%"
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
              <use xlinkHref="#wave" opacity=".8">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  dur="8s"
                  calcMode="spline"
                  values="300 230; -50 180; 300 230"
                  keyTimes="0; .5; 1"
                  keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                  repeatCount="indefinite"
                />
              </use>
              <use xlinkHref="#wave" opacity=".9">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  dur="6s"
                  calcMode="spline"
                  values="-270 230;200 220;-270 230"
                  keyTimes="0; .6; 1"
                  keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                  repeatCount="indefinite"
                />
              </use>
              <use xlinkHref="#wave" opacity="1">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  dur="4s"
                  calcMode="spline"
                  values="0 230;-0 200;0 230"
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
                <a href="https://www.linkedin.com/in/junho-shin-18b883234"><LinkedInIcon viewBox="0 0 25 23"/></a>
            </li>
            <li>
              <a href="https://github.com/shinjuno123"><GitHubIcon viewBox="0 0 25 23"/></a>
            </li>
          </ul>
          <ul className="links">
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/about'}>About</Link>
            </li>
            <li>
              <Link to={'/'}>Contact</Link>
            </li>
            <li>
              <a href={'https://www.bobsweep.com/'}>Work: bObsweep</a>
            </li>
          </ul>
          <p className="legal"><strong>© 2023-2024</strong></p>
        </section>
      </footer>
    </>
  );
}
