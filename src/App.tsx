import { Routes, Route } from "react-router-dom";
import TopNavBar from "./components/topNavBar/TopNavBar";
import WorkExperience from "./sections/workExperience/WorkExperience";
import FeaturedProjects from "./sections/featuredProjects/FeaturedProjects";
import SynthEraHero from "./sections/hero/SynthEraHero";
import AboutMe from "./sections/aboutMe/AboutMe";
import SkillsTechnologies from "./sections/skillsTechnologies/SkillsTechnologies";
import ContactMe from "./sections/contactMe/ContactMe";
import BlogList from "./sections/blog/BlogList";
import BlogPost from "./sections/blog/BlogPost";

function Portfolio() {
  return (
    <main className="app-container">
      <SynthEraHero />
      <AboutMe />
      <WorkExperience />
      <FeaturedProjects />
      <SkillsTechnologies />
      <ContactMe />
    </main>
  );
}

function App() {
  return (
    <>
      <TopNavBar />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </>
  );
}

export default App;
