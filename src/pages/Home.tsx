import { InfiniteMarquee } from "@/components/marquee/marquee";
import { Metrics } from "@/components/metrics/metrics";

/**
 * Home page component that serves as the landing page for the application.
 * Displays the main heading, introductory text, metrics, and scrolling marquee.
 * 
 * @returns {JSX.Element} The rendered home page
 */
export function Home() {
  return (
    <div className="flex-1 w-full">
      <div className="max-w-[1240px] mx-auto px-4 py-12 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to Quantinium
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            A groundbreaking institutional-grade blockchain infrastructure that establishes 
            a new industry standard for speed, security, and reliability. The first and 
            only platform to seamlessly integrate decentralization, scalability, 
            sustainability, and cybersecurity.
          </p>
        </div>

        <Metrics />
        
        <div className="w-full overflow-hidden">
          <InfiniteMarquee />
        </div>
      </div>
    </div>
  );
}