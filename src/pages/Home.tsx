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
    <main className="flex-1 w-full min-h-screen bg-background">
      <div className="w-full h-auto relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <video className="w-full h-auto" autoPlay muted loop playsInline>
          <source src="../../public/video/landing.mp4" type="video/mp4" />
        </video>
      </div>

      <div className=" mx-auto px-4 py-12 space-y-12 absolute top-20 left-0 right-0 bottom-0 z-10">
        <div className="mx-auto text-center space-y-6 max-w-[1240px]">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-white">
            Welcome to Quantinium
          </h1>
          <p className="text-md leading-8 text-muted-foreground max-w-2xl mx-auto">
            A groundbreaking institutional-grade blockchain infrastructure that
            establishes a new industry standard for speed, security, and
            reliability. The first and only platform to seamlessly integrate
            decentralization, scalability, sustainability, and cybersecurity.
          </p>
        </div>

        <div className="w-full max-w-[1240px] mx-auto">
          <Metrics />
        </div>

        <div className="w-full overflow-hidden">
          <InfiniteMarquee />
        </div>
      </div>
    </main>
  );
}
