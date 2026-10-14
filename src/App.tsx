import { Routes, Route } from "react-router-dom";
import TopNavBar from "./components/topNavBar/TopNavBar";
import WorkExperience from "./sections/workExperience/WorkExperience";
import FeaturedProjects from "./sections/featuredProjects/FeaturedProjects";
import BlogPreview from "./sections/blogPreview/BlogPreview";
import Hero from "./sections/hero/Hero";
import AboutMe from "./sections/aboutMe/AboutMe";
import SkillsTechnologies from "./sections/skillsTechnologies/SkillsTechnologies";
import ContactMe from "./sections/contactMe/ContactMe";
import BlogList from "./sections/blog/BlogList";
import BlogPost from "./sections/blog/BlogPost";
import { useSmoothScroll } from "./utils/smoothScroll";

function Portfolio() {
  return (
    <>
      <TopNavBar />
      <main className="app-container">
        <Hero />
        <AboutMe />
        <WorkExperience />
        <BlogPreview />
        <FeaturedProjects />
        <SkillsTechnologies />
        <ContactMe />
      </main>
    </>
  );
}

function App() {
  useSmoothScroll();

  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogPost />} />
    </Routes>
  );
}

export default App;
