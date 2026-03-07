import WorkExperience from "./sections/workExperience/WorkExperience";
import FeaturedProjects from "./components/FeaturedProjects";
import SynthEraHero from "./sections/hero/SynthEraHero";
import AboutMe from "./sections/aboutMe/AboutMe";
import Skills from "./components/Skills";
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
      <Skills />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
