import { useParams } from "react-router-dom";
import { Header } from "../../Components/Header/Header";
import { ListPosts } from "../../Components/ListPosts/ListPosts";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";
import { usePostContext } from "../../Providers/post/PostContext";
import { useEffect, useState } from "react";
import logo from "../../assets/LogoBa.png";
import { IPost } from "../../types/PostTypes";

export const SearchPage = () => {
  const { searchPost } = useParams();
  const { search, AllPosts } = usePostContext();
  const [searchResult, setSeachResult] = useState<IPost[]>([]);
  useEffect(() => {
    if (AllPosts && searchPost) {
      setSeachResult(search(AllPosts, searchPost));
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
  }, [search]);
  return (
    <>
      <Header />
      <PublicityBanner />
      <main className="container">
        <ListPosts posts={searchResult}>
          <p>Resultado da pesquisa: {searchPost}</p>
        </ListPosts>
      </main>
    </>
  );
};
