import WorkExperience from "./sections/workExperience/WorkExperience";
import FeaturedProjects from "./sections/featuredProjects/FeaturedProjects";
import SynthEraHero from "./sections/hero/SynthEraHero";
import AboutMe from "./sections/aboutMe/AboutMe";
import SkillsTechnologies from "./sections/skillsTechnologies/SkillsTechnologies";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="app-container">
      <SynthEraHero />
      <AboutMe />
      <WorkExperience />
      <FeaturedProjects />
      <SkillsTechnologies />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
