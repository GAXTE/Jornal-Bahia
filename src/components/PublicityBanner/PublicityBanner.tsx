import { useState, useEffect } from "react";
import { usePublicityContext } from "../../Providers/publicity/PublicityContext";

export const PublicityBanner = () => {
  const { publicityBanners, getAllPublicty } = usePublicityContext();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await getAllPublicty();
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % publicityBanners.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [publicityBanners]);

  if (publicityBanners.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container flex justify-center items-center">
      <div>
        <img
          src={publicityBanners[currentBannerIndex].imageUrl}
          alt={publicityBanners[currentBannerIndex].description}
          className="h-[43px] w-[348px] max-w-full lg:h-[90px] lg:w-[728px] object-cover"
        />
      </div>
    </section>
  );
};
