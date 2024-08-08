import React, { useEffect, useState } from "react";
import { Footer } from "../../Components/Footer/Footer";
import { Header } from "../../Components/Header/Header";
import { LatestNews } from "../../Components/LatestNews/LatesteNews";
import { MostRead } from "../../Components/MostRead/MostRead";
import { PostCategories } from "../../Components/PostCategories/PostCatories";
import { PostsMain } from "../../Components/PostsMain/PostsMain";
import { Publicities } from "../../Components/Publicities/publicities";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";
import logo from "../../assets/LogoBa.png";
import { IPost } from "../../types/PostTypes";
import { usePostContext } from "../../Providers/post/PostContext";

export const Homepage = () => {
  const { getAllPosts } = usePostContext();
  const [allPosts, setAllPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const initialPosts = await getAllPosts();
      setAllPosts(initialPosts);
    };

    fetchInitialPosts();

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
        <section className="flex flex-col-reverse gap-7 md:items-center lg:items-start lg:flex-row lg:justify-between  lg:relative">
          <LatestNews posts={allPosts} />
          <Publicities />
        </section>
      </main>
      <Footer />
    </>
  );
};
