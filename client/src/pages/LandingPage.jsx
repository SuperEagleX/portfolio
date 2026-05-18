import ParticleCanvas from '../components/ParticleCanvas';
import ShootingStars from '../components/ShootingStars';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import Competitions from '../components/Competitions';
import Volunteer from '../components/Volunteer';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <>
      <div className="grid-bg" />
      <ParticleCanvas />
      <ShootingStars />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Competitions />
        <Volunteer />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
