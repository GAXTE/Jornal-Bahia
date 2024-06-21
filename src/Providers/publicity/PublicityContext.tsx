import React, { useContext, useEffect, useState } from "react";
import { Api } from "../../Services/api";

interface Props {
  children: React.ReactNode;
}

interface Publicity {
  id: string;
  description: string;
  type: string;
  imageUrl: string;
  videoUrl: string;
  link: string;
}

interface IPublicityContext {
  getAllPublicity: () => void;
  publicityBanners: Publicity[];
  publicityOthers: Publicity[];
}

export const PublicityContext = React.createContext<IPublicityContext>({
  getAllPublicity: async () => {},
  publicityBanners: [],
  publicityOthers: [],
});

export const PublicityProvider: React.FC<Props> = ({ children }) => {
  const [publicityBanners, setPublicityBanners] = useState<Publicity[]>([]);
  const [publicityOthers, setPublicityOthers] = useState<Publicity[]>([]);

  const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 horas em milissegundos

  const getAllPublicity = async () => {
    const cachedBanners = sessionStorage.getItem("publicityBanners");
    const cachedOthers = sessionStorage.getItem("publicityOthers");
    const cachedTimestamp = sessionStorage.getItem("publicityTimestamp");
    const currentTime = Date.now();

    if (
      cachedBanners &&
      cachedOthers &&
      cachedTimestamp &&
      currentTime - parseInt(cachedTimestamp) < CACHE_TTL
    ) {
      setPublicityBanners(JSON.parse(cachedBanners));
      setPublicityOthers(JSON.parse(cachedOthers));
      return;
    }

    try {
      const { data }: { data: Publicity[] } = await Api.get("/ad");
      const banners = data.filter((item) => item.type === "0");
      const others = data.filter((item) => item.type !== "0");

      sessionStorage.setItem("publicityBanners", JSON.stringify(banners));
      sessionStorage.setItem("publicityOthers", JSON.stringify(others));
      sessionStorage.setItem("publicityTimestamp", currentTime.toString());

      setPublicityBanners(banners);
      setPublicityOthers(others);
    } catch (error) {}
  };

  useEffect(() => {
    getAllPublicity();
    const interval = setInterval(() => {
      sessionStorage.removeItem("publicityBanners");
      sessionStorage.removeItem("publicityOthers");
      sessionStorage.removeItem("publicityTimestamp");
      getAllPublicity();
    }, CACHE_TTL);
    return () => clearInterval(interval);
  }, []);

  return (
    <PublicityContext.Provider
      value={{
        getAllPublicity,
        publicityBanners,
        publicityOthers,
      }}
    >
      {children}
    </PublicityContext.Provider>
  );
};

export const usePublicityContext = () => useContext(PublicityContext);
