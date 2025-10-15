import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../../Components/Header/Header";
import { ListPosts } from "../../Components/ListPosts/ListPosts";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";
import { usePostContext } from "../../Providers/post/PostContext";
import { IPost } from "../../types/PostTypes";
import { Footer } from "../../Components/Footer/Footer";
import logo from "../../assets/LogoBa.png";
import { Api } from "../../Services/api";
import { AdSense } from "../../Components/AdSense/AdSense";

export const PostCategoriesPage = () => {
  const location = useLocation();

  const { AllPosts } = usePostContext();
  const categoryId = location.pathname.split("/").pop();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (AllPosts || location) {
        const { data } = await Api.get(`post/category/${categoryId}`);

        setPosts(data);
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
      }
    };
    fetchPosts();
  }, [AllPosts, location]);

  return (
    <>
      <Header />
      <main className="container">
        {posts.length > 0 && <PublicityBanner />}
        {posts.length > 0 && (
          <ListPosts posts={posts}>
            <></>
          </ListPosts>
        )}{" "}
        {/* Verifica se posts não está vazio */}
        {/* AdSense apenas se houver posts */}
        {posts.length > 0 && (
          <section className="my-8 flex justify-center">
            <AdSense adSlot="2902002028" />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};
