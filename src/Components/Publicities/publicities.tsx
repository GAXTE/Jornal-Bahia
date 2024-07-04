import React, { useState, useEffect, useRef } from "react";
import { usePublicityContext } from "../../Providers/publicity/PublicityContext";

export const Publicities: React.FC = () => {
  const { publicityOthers } = usePublicityContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (publicityOthers.length === 0) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const currentAd = publicityOthers[currentIndex];

    if (currentAd.imageUrl.length > 0) {
      timer = setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % publicityOthers.length
        );
      }, 8000);
    } else if (currentAd.videoUrl.length > 0 && videoRef.current) {
      const handleEnded = () => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % publicityOthers.length
        );
      };

      videoRef.current.addEventListener("ended", handleEnded);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("ended", handleEnded);
        }
      };
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentIndex, publicityOthers]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % publicityOthers.length
        );
      });
    }
  }, [currentIndex]);

  const renderAd = () => {
    const currentAd = publicityOthers[currentIndex];

    if (currentAd.imageUrl.length > 0) {
      return (
        <img
          src={currentAd.imageUrl[0]}
          alt="Anuncio"
          className="w-full h-full object-cover"
        />
      );
    } else if (currentAd.videoUrl.length > 0) {
      return (
        <video
          key={currentAd.id}
          src={currentAd.videoUrl[0]}
          ref={videoRef}
          autoPlay
          className="w-full h-full object-cover"
        />
      );
    }

    return null;
  };

  return (
    <div className="flex md:w-[348px] lg:w-[348px] h-[261px] lg:sticky lg:top-12">
      <div className="w-full h-full">
        {publicityOthers.length > 0 && renderAd()}
      </div>
    </div>
  );
};
