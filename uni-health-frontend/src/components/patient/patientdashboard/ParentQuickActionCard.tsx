import {
  Plus,
  Calendar,
  Shield,
  Download,
  Upload,
  Pill,
  MessageSquare,
  Share2,
  AlertCircle,
} from "lucide-react";
import QuickActionButton from "./QuickActionCard";

const ParentQuickActionCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-blue-600" />
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <QuickActionButton
          icon={Calendar}
          label="Book Appointment"
          color="border-blue-200"
        />
        <QuickActionButton
          icon={Shield}
          label="Manage Access"
          color="border-green-200"
        />
        <QuickActionButton
          icon={Download}
          label="Download Records"
          color="border-purple-200"
        />
        <QuickActionButton
          icon={Upload}
          label="Upload Document"
          color="border-indigo-200"
        />
        <QuickActionButton
          icon={Pill}
          label="Refill Prescription"
          color="border-orange-200"
        />
        <QuickActionButton
          icon={MessageSquare}
          label="Message Doctor"
          color="border-teal-200"
        />
        <QuickActionButton
          icon={AlertCircle}
          label="Emergency Access"
          color="border-red-200"
        />
        <QuickActionButton
          icon={Share2}
          label="Share Records"
          color="border-cyan-200"
        />
      </div>
    </div>
  );
};

export default ParentQuickActionCard;
