import { useState, useEffect } from "react";
import { usePublicityContext } from "../../Providers/publicity/PublicityContext";

export const PublicityBanner = () => {
  const { publicityBanners, getAllPublicity: getAllPublicty } = usePublicityContext();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await getAllPublicty();
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % publicityBanners.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [publicityBanners]);

  if (publicityBanners.length === 0) {
    return;
  }

  return (
    <section className="cursor-pointer container flex justify-center items-center mt-[16px] lg:mt-[37px]">
      <div>
        <a href={publicityBanners[currentBannerIndex].link} target="_blank" rel="noopener noreferrer">
          <img
            src={publicityBanners[currentBannerIndex].imageUrl}
            alt={publicityBanners[currentBannerIndex].description}
            className="h-[43px] w-[348px] md:w-[600px] max-w-full lg:h-[90px] lg:w-[728px] object-cover"
          />
        </a>
      </div>
    </section>
  );
};
