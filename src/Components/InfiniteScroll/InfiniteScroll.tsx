import { useEffect, useRef } from "react";

interface IInfiniteScroll {
  Callback: () => void;
}

export const InfiniteScroll = ({ Callback }: IInfiniteScroll) => {
  const divInfiniteScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      const ratio = entry.intersectionRatio;

      if (ratio > 0) {
        console.log("Intersecting");
        Callback();
      }
    });

    if (divInfiniteScrollRef.current) {
      intersectionObserver.observe(divInfiniteScrollRef.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, [divInfiniteScrollRef]);

  return <div className="infiniteScroll py-4" ref={divInfiniteScrollRef}></div>;
};
