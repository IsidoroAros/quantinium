import { Activity, Shield, Zap, Scale } from "lucide-react";

/**
 * Interface for metric data
 */
interface Metric {
  icon: JSX.Element;
  label: string;
  value: string;
}

/**
 * Metrics component that displays key platform statistics.
 * Shows important metrics with icons and animations.
 * 
 * @returns {JSX.Element} The rendered metrics component
 */
export function Metrics() {
  const metrics: Metric[] = [
    {
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      label: "Transaction Speed",
      value: "100k TPS",
    },
    {
      icon: <Shield className="w-5 h-5 text-green-500" />,
      label: "Security Score",
      value: "99.99%",
    },
    {
      icon: <Activity className="w-5 h-5 text-purple-500" />,
      label: "Network Uptime",
      value: "99.999%",
    },
    {
      icon: <Scale className="w-5 h-5 text-orange-500" />,
      label: "Decentralization Index",
      value: "0.92",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-6 space-y-3 bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800/50 shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]"
        >
          <div className="p-3 rounded-full bg-zinc-800/50 ring-1 ring-zinc-700/50">
            {metric.icon}
          </div>
          <div className="text-2xl font-bold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
            {metric.value}
          </div>
          <div className="text-sm text-zinc-400 text-center">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
}