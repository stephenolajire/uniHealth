import { Users2, Heart, MapPin, TrendingUp } from "lucide-react"

const StatData = [
    {
        icon: Users2,
        value: "100K+",
        label: "Active Users",
    },
    {
        icon: Heart,
        value: "1000+",
        label: "Providers",
    },
    {
        icon: MapPin,
        value: "50+",
        label: "Countries",
    },
    {
        icon: TrendingUp,
        value: "99.9%",
        label: "Uptime",
    },
]

const Stat = () => {
  return (
    <div className="w-full flex items-center justify-center ">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12 content-center w-full">
        {StatData.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center justify-center space-x-2 w-full">
            <stat.icon className="h-15 w-15 text-blue-600" />
            <div>
              <p className="text-xl md:text-2xl lg:text-3xl text-center font-semibold">{stat.value}</p>
              <p className="text-base md:text-lg text-center text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stat
