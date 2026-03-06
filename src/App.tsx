import WorkExperience from "./components/WorkExperience";
import FeaturedProjects from "./components/FeaturedProjects";
import SynthEraHero from "./components/hero/SynthEraHero";
import AboutMe from "./components/AboutMe";

function App() {
  return (
    <main className="app-container">
      <SynthEraHero />
      <AboutMe />
      <WorkExperience />
      <FeaturedProjects />
    </main>
  );
}

export default App;
