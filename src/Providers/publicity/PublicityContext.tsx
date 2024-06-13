import React, { useContext, useEffect, useState } from "react";
import { Api } from "../../Services/api";
import Cache from "js-cache";

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
  getAllPublicty: () => void;
  publicityBanners: Publicity[];
  publicityOthers: Publicity[];
}

export const PublicityContext = React.createContext<IPublicityContext>({
  getAllPublicty: async () => {},
  publicityBanners: [],
  publicityOthers: [],
});

export const cache = new Cache();

export const PublictyProvider: React.FC<Props> = ({ children }) => {
  const [publicityBanners, setPublicityBanners] = useState<Publicity[]>([]);
  const [publicityOthers, setPublicityOthers] = useState<Publicity[]>([]);

  const getAllPublicty = async () => {
    const cachedBanners = cache.get("publicityBanners");
    const cachedOthers = cache.get("publicityOthers");

    if (cachedBanners && cachedOthers) {
      setPublicityBanners(cachedBanners);
      setPublicityOthers(cachedOthers);
      return;
    }

    try {
      const { data }: { data: Publicity[] } = await Api.get("/ad");
      const banners = data.filter((item) => item.type === "0");
      const others = data.filter((item) => item.type !== "0");

      cache.set("publicityBanners", banners, 86400000);
      cache.set("publicityOthers", others, 86400000);

      setPublicityBanners(banners);
      setPublicityOthers(others);
    } catch (error) {}
  };

  useEffect(() => {
    getAllPublicty();
  }, []);

  return (
    <PublicityContext.Provider value={{ getAllPublicty, publicityBanners, publicityOthers }}>
      {children}
    </PublicityContext.Provider>
  );
};

export const usePublicityContext = () => useContext(PublicityContext);
