import { Activity, Shield, Zap, Satellite } from 'lucide-react';
import gsap from 'gsap';
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
      label:
        'Seamless Wi-Fi switching with blockchain-powered decentralized networks. Share bandwidth securely and earn tokens.',
      value: 'Decentralized Wi-Fi',
    },
    {
      icon: <Shield className="w-5 h-5 text-green-500" />,
      label:
        'Enhanced data privacy and security for public 5G/LTE networks with resilient infrastructure.',
      value: 'Cellular 5G/LTE',
    },
    {
      icon: <Activity className="w-5 h-5 text-purple-500" />,
      label:
        'Optimized IoT communication with reduced latency and enhanced security for connected devices.',
      value: 'LoRaWAN',
    },
    {
      icon: <Satellite className="w-5 h-5 text-orange-500" />,
      label:
        'Global connectivity through blockchain-optimized satellite networks with faster transmission and lower costs.',
      value: 'Satellite',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-start p-6 space-y-3 bg-zinc-900/40 backdrop-blur-sm rounded-xl border border-zinc-800/50 shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]"
          ref={(el) => {
            if (el) {
              gsap.from(el, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power3.out',
              });
            }
          }}
        >
          <div className="p-3 rounded-full bg-zinc-800/50 ring-1 ring-zinc-700/50">
            {metric.icon}
          </div>
          <div className="text-2xl font-bold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent text-center">
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
