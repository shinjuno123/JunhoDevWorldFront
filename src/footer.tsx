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
                  style={{stopColor: "rgb(0, 27, 122)"}}
                ></stop>
                <stop
                  offset="200%"
                  style={{stopColor: "rgb(0, 0, 0)"}}
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
                  dur="4.5s"
                  calcMode="spline"
                  values="200 230; -50 180; 200 230"
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
                  dur="3s"
                  calcMode="spline"
                  values="-180 230;0 220;-180 230"
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
                <a href="https://www.linkedin.com/in/junho-shin-18b883234" role="outer-website-link" aria-label="Link to LinkedIn" aria-hidden="false"><LinkedInIcon viewBox="0 0 25 23"/></a>
            </li>
            <li>
              <a href="https://github.com/shinjuno123" role="outer-website-link" aria-label="Link to Github" aria-hidden="false"><GitHubIcon viewBox="0 0 25 23"/></a>
            </li>
          </ul>
          <ul className="links">
            <li>
              <Link role="Link To Home page" to={'/'} type="text" aria-label="Home Page Link">Home</Link>
            </li>
            <li>
              <Link role="Link To About page"  to={'/about'} aria-label="About Page Link">About</Link>
            </li>
            <li>
              <Link role="Link To Contract page"  to={'/contact'} aria-label="Contact Page Link">Contact</Link>
            </li>
            <li>
              <a role="Link To Current Working Page" href={'https://www.bobsweep.com/'} aria-label="Current Working Company Page Link">Work: bObsweep</a>
            </li>
          </ul>
          <p className="legal"><strong>© 2023-2024</strong></p>
        </section>
      </footer>
    </>
  );
}
