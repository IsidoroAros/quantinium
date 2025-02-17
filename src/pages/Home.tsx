import { InfiniteMarquee } from '@/components/marquee/marquee';
import { Metrics } from '@/components/metrics/metrics';

/**
 * Home page component that serves as the landing page for the application.
 * Displays the main heading, introductory text, metrics, and scrolling marquee.
 *
 * @returns {JSX.Element} The rendered home page
 */
export function Home() {
  return (
    <main className="relative w-full min-h-screen flex flex-col bg-background">
      {/* Video Container */}
      <div className="absolute top-0 left-0 w-full min-h-screen overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="../../public/video/landing.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Container */}
      <div className="relative top-20 flex-1 w-full max-w-[1240px] mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-white">
              Welcome to Quantinium
            </h1>
            <p className="text-sm md:text-md leading-6 md:leading-8 text-muted-foreground max-w-2xl mx-auto">
              A groundbreaking institutional-grade blockchain infrastructure
              that establishes a new industry standard for speed, security, and
              reliability. The first and only platform to seamlessly integrate
              decentralization, scalability, sustainability, and cybersecurity.
            </p>
          </div>

          {/* Metrics Section */}
          <div className="w-full">
            <Metrics />
          </div>

          {/* Marquee Section */}
        </div>
      </div>
      <div className="w-full my-20">
        <InfiniteMarquee />
      </div>
    </main>
  );
}
