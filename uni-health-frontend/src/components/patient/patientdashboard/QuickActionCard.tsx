import type { QuickActionButtonProps } from "../../../types/patient/type";

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
    icon: Icon,
    label,
    color,
    onClick,
  }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed ${color} hover:shadow-md transition-all group`}
    >
      <div
        className={`w-12 h-12 rounded-full ${color
          .replace("border-", "bg-")
          .replace(
            "200",
            "100"
          )} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}
      >
        <Icon
          className={`w-6 h-6 ${color
            .replace("border-", "text-")
            .replace("200", "600")}`}
        />
      </div>
      <span className="text-sm font-medium text-gray-700 text-center">
        {label}
      </span>
    </button>
  );

  export default QuickActionButton