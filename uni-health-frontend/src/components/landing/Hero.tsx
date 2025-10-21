import { ArrowRight, Shield, Globe} from "lucide-react";

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Your Health, Anywhere</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Healthcare
              <br />
              Without{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                Borders
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              One unified health record. Accessible worldwide. You control who sees it. 
              No more repeating diagnoses. Just seamless, informed care everywhere you go.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium group">
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium">
                Find Providers
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-blue-300"
                  />
                ))}
              </div>
              <div>
                <p className="font-semibold text-gray-900">Trusted by 50,000+</p>
                <p className="text-sm text-gray-500">healthcare providers</p>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {/* Patient Card Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-500">PAT20150234</p>
                </div>
                <Shield className="w-5 h-5 text-green-500 ml-auto" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Blood Type</p>
                  <p className="text-2xl font-bold text-gray-900">O+</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Allergies</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Visit</span>
                  <span className="text-gray-900 font-medium">City Hospital, NY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Prescriptions</span>
                  <span className="text-gray-900 font-medium">3 active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shared With</span>
                  <span className="text-gray-900 font-medium">5 providers</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                View Full Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;