import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../Components/Header/Header";
import { ListPosts } from "../../Components/ListPosts/ListPosts";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";
import { usePostContext } from "../../Providers/post/PostContext";
import { IPost } from "../../types/PostTypes";
import { Footer } from "../../Components/Footer/Footer";
import logo from "../../assets/LogoBa.png";
import { Api } from "../../Services/api";

export const PostCategoriesPage = () => {
  const { AllPosts } = usePostContext();
  const { categorieId } = useParams();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (AllPosts) {
        const { data } = await Api.get(`post/category/${categorieId}`);
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
  }, [categorieId, AllPosts]);
  return (
    <>
      <Header />
      <main className="container">
        <PublicityBanner />
        {posts.length > 0 && (
          <ListPosts posts={posts}>
            <></>
          </ListPosts>
        )}{" "}
        {/* Verifica se posts não está vazio */}
      </main>
      <Footer />
    </>
  );
};
