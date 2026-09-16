import { Routes, Route } from "react-router-dom";
import WorkExperience from "./sections/workExperience/WorkExperience";
import FeaturedProjects from "./sections/featuredProjects/FeaturedProjects";
import SynthEraHero from "./sections/hero/SynthEraHero";
import AboutMe from "./sections/aboutMe/AboutMe";
import SkillsTechnologies from "./sections/skillsTechnologies/SkillsTechnologies";
import ContactMe from "./sections/contactMe/ContactMe";
import Blog from "./sections/blog/Blog";
import CreatePost from "./sections/blog/CreatePost";
import BlogPostPage from "./sections/blog/BlogPostPage";
import Login from "./sections/auth/Login";

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
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/create" element={<CreatePost />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
