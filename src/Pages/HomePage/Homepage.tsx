import { useEffect } from "react";
import { Footer } from "../../Components/Footer/Footer";
import { Header } from "../../Components/Header/Header";
import { LatestNews } from "../../Components/LatestNews/LatesteNews";
import { MostRead } from "../../Components/MostRead/MostRead";
import { PostCategories } from "../../Components/PostCategories/PostCatories";
import { PostsMain } from "../../Components/PostsMain/PostsMain";
import { Publicities } from "../../Components/Publicities/publicities";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";
import { AdSense } from "../../Components/AdSense/AdSense";
import logo from "../../assets/LogoBa.png";

export const Homepage = () => {
  useEffect(() => {
    const faviconLink = document.querySelector("link[rel~='icon']");
    const logoUrl = logo;

    if (faviconLink) {
      (faviconLink as HTMLLinkElement).href = logoUrl;
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href = logoUrl;
      document.head.appendChild(newFavicon);
    }

    document.title = "Jornal da Bahia";
  }, []);
  return (
    <>
      <Header />
      <main className="container">
        <PublicityBanner />
        <PostsMain />
        <section className="flex flex-col-reverse items-center mt-[57px] lg:flex-row lg:items-start lg:justify-between">
          <MostRead />
          <PostCategories />
        </section>

        {/* AdSense após conteúdo substancial */}
        <section className="my-8 flex justify-center">
          <AdSense adSlot="2902002028" />
        </section>

        <section className="flex flex-col-reverse gap-7 md:items-center lg:items-start lg:flex-row lg:justify-between  lg:relative">
          <LatestNews />
          <Publicities />
        </section>
      </main>
      <Footer />
    </>
  );
};
