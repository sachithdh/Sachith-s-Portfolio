import WorkExperience from "./sections/workExperience/WorkExperience";
import FeaturedProjects from "./sections/featuredProjects/FeaturedProjects";
import SynthEraHero from "./sections/hero/SynthEraHero";
import AboutMe from "./sections/aboutMe/AboutMe";
import SkillsTechnologies from "./sections/skillsTechnologies/SkillsTechnologies";
import ContactMe from "./sections/contactMe/ContactMe";

function App() {
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

export default App;
