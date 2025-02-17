/**
 * Interface for marquee item data
 */
interface MarqueeItem {
  id: number;
  text: string;
}

/**
 * Double infinite marquee component that displays scrolling text in opposite directions.
 * Creates a dynamic, continuous scrolling effect with hover pause.
 * 
 * @returns {JSX.Element} The rendered marquee component
 */
export function InfiniteMarquee() {
  const items: MarqueeItem[] = [
    { id: 1, text: "Groundbreaking Blockchain Infrastructure" },
    { id: 2, text: "Industry-Leading Speed" },
    { id: 3, text: "Unmatched Security" },
    { id: 4, text: "Enterprise-Grade Reliability" },
    { id: 5, text: "True Decentralization" },
    { id: 6, text: "Infinite Scalability" },
    { id: 7, text: "Sustainable Architecture" },
    { id: 8, text: "Advanced Cybersecurity" },
  ];

  // Double the items to ensure smooth infinite scroll
  const doubledItems = [...items, ...items];

  return (
    <div className="relative flex flex-col gap-4 py-4 overflow-hidden">
      {/* Top marquee */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee group-hover:pause-animation flex whitespace-nowrap">
          {doubledItems.map((item, idx) => (
            <span
              key={`${item.id}-${idx}`}
              className="text-lg font-medium px-6 py-2 bg-zinc-800 mx-2"
            >
              {item.text}
            </span>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 group-hover:pause-animation flex whitespace-nowrap">
          {doubledItems.map((item, idx) => (
            <span
              key={`${item.id}-${idx}-clone`}
              className="text-lg font-medium px-6 py-2 bg-zinc-800 mx-2"
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom marquee (reverse direction) */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee-reverse group-hover:pause-animation flex whitespace-nowrap">
          {[...doubledItems].reverse().map((item, idx) => (
            <span
              key={`${item.id}-${idx}-reverse`}
              className="text-lg font-medium px-6 py-2 bg-zinc-800 mx-2"
            >
              {item.text}
            </span>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2-reverse group-hover:pause-animation flex whitespace-nowrap">
          {[...doubledItems].reverse().map((item, idx) => (
            <span
              key={`${item.id}-${idx}-reverse-clone`}
              className="text-lg font-medium px-6 py-2 bg-zinc-800 mx-2"
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}