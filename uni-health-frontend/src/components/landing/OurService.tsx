import {
  Globe,
  Shield,
  FileText,
  Hospital,
  Share2,
  UserCog,
  Clock,
  Activity
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Global Health Records Access",
    description: "Access your complete medical history from anywhere in the world. No more carrying paper records or repeating tests unnecessarily.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Shield,
    title: "Consent Management",
    description: "Stay in control of your health data. Grant and revoke access to healthcare providers with our secure consent management system.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: FileText,
    title: "Digital Health Passport",
    description: "Carry your entire medical history in your pocket. Share relevant information instantly with healthcare providers.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Hospital,
    title: "Provider Network",
    description: "Connect with healthcare providers worldwide who are part of our trusted network for seamless care coordination.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Share2,
    title: "Secure Data Sharing",
    description: "Share your medical records securely with specialists and healthcare providers across different institutions.",
    color: "bg-pink-50 text-pink-600",
  },
  {
    icon: UserCog,
    title: "Patient Portal",
    description: "Manage your health profile, appointments, and medical documents through our intuitive patient portal.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Clock,
    title: "Quick Emergency Access",
    description: "Provide emergency responders instant access to critical medical information when seconds count.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: Activity,
    title: "Health Analytics",
    description: "Get insights into your health trends and receive personalized recommendations for better healthcare outcomes.",
    color: "bg-teal-50 text-teal-600",
  },
];

const Services = () => {
  return (
    <section id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Revolutionizing healthcare accessibility through secure, seamless,
            and patient-centered solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`rounded-lg p-3 inline-block ${service.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;