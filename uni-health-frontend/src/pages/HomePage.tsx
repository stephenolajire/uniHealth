import Hero from "../components/landing/Hero";
import Stat from "../components/landing/Stat";
import About from "../components/landing/About";
import Services from "../components/landing/OurService";
import HowItWorks from "../components/landing/HowItWorks";
import Contact from "../components/landing/Contact";
import Newsletter from "../components/landing/NewsLetter";


export default function UniHealthEnhanced() {
  // const getUserLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setUserLocation({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       },
  //       () => {
  //         setUserLocation({ lat: 40.7589, lng: -73.9851 });
  //       }
  //     );
  //   } else {
  //     setUserLocation({ lat: 40.7589, lng: -73.9851 });
  //   }
  // };

  return (
    <main className="min-h-screen ">
      <section>
        <Hero />
      </section>
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <Stat />
      </section>
      <section
        className="py-20 bg-blue-50 relative overflow-hidden "
        id="about"
      >
        <About />
      </section>

      <section id="service" className="py-20 relative bg-white overflow-hidden">
        <Services />
      </section>

      <section
        id="benefits"
        className="py-20 bg-blue-50 relative overflow-hidden"
      >
        <HowItWorks />
      </section>
      <section id="contact" className=" relative">
        <Contact />
      </section>
      <section id="newsletter" className="relative bg-white overflow-hidden">
        <Newsletter />
      </section>
    </main>
  );
}
