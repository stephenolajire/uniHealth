import { 
  Globe, 
  Shield, 
  Users, 
  Activity, 
  Clock, 
  Database 
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Globe,
      title: "Global Healthcare Access",
      description: "Access your medical records anywhere in the world, breaking down geographical barriers in healthcare.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "State-of-the-art encryption and privacy controls ensure your medical data stays confidential.",
    },
    {
      icon: Users,
      title: "Patient-Centered Care",
      description: "Put patients in control of their health journey with complete access to their medical history.",
    },
    {
      icon: Activity,
      title: "Improved Outcomes",
      description: "Reduce medical errors and duplicate tests with comprehensive health records access.",
    },
    {
      icon: Clock,
      title: "Time-Efficient",
      description: "Streamline healthcare delivery by eliminating redundant procedures and paperwork.",
    },
    {
      icon: Database,
      title: "Comprehensive Records",
      description: "Store and manage all your medical data in one secure, accessible location.",
    },
  ];

  return (
    <section id="about" className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-5xl text-gray-900 font-bold mb-4">
            Revolutionizing Global Healthcare Access
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We're building a future where your medical history is always at your fingertips,
            ensuring seamless healthcare delivery anywhere in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <img
              src="/about.png"
              alt="Modern Healthcare Technology"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white py-4 px-6 rounded-lg shadow-lg">
              <p className="font-semibold text-xl">10,000+</p>
              <p className="text-sm">Healthcare Partners</p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Join us in transforming healthcare accessibility and patient care worldwide
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Join Our Network
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;