import "./App.css";
import Footer from "./footer";
import Header from "./header";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/page.home";
import Writing from "./pages/page.writing";
import Notes from "./pages/page.notes";
import Projects from "./pages/page.projects";
import About from "./pages/page.about";
import SelectedPost from "./pages/page.selected-post";
import Intro from "./pages/about/page.about.intro";
import History from "./pages/about/page.about.history";
import AboutSkills from "./pages/about/page.about.skills";
import AboutProjects from "./pages/about/page.about.projects";
import Page404 from "./pages/page.404";
import "./api-client.ts";
import Skills from "./pages/page.skills.tsx";
import { useEffect } from "react";
import Contact from "./pages/page.contact.tsx";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [navigate]);

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="posts" element={<Writing />}></Route>
        <Route path="posts/:postId" element={<SelectedPost />}></Route>
        <Route path="notes" element={<Notes />}></Route>
        <Route path="projects" element={<Projects />}></Route>
        <Route path="skills" element={<Skills />}></Route>
        {/* <Route path="sign-up" element={<SignUp/>}></Route> */}
        {/* <Route path="sign-in" element={<SignIn/>}></Route> */}
        <Route path="contact" element={<Contact/>}></Route>
        <Route path="about" element={<About />}>
          <Route path="" element={<Intro />}></Route>
          <Route path="history" element={<History />}></Route>
          <Route path="projects" element={<AboutProjects />}></Route>
          <Route path="skills" element={<AboutSkills />}></Route>
        </Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
