import { 
  UserPlus, 
  FileCheck, 
  Share2, 
  Hospital, 
  Shield, 
  ArrowRight 
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up and create your secure health profile in minutes",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: FileCheck,
    title: "Upload Records",
    description: "Easily upload your existing medical records and documents",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Shield,
    title: "Set Permissions",
    description: "Control who can access your medical information",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Share2,
    title: "Share Securely",
    description: "Safely share your records with healthcare providers worldwide",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Hospital,
    title: "Access Anywhere",
    description: "Get treatment without repeating tests or paperwork",
    color: "bg-pink-50 text-pink-600",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How UniHealth Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple steps to take control of your healthcare journey and access your medical records anywhere
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center">
                {/* Step Number */}
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mb-4">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`rounded-lg p-4 ${step.color} mb-4`}>
                  <step.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {step.description}
                </p>

                {/* Arrow for all except last item */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;