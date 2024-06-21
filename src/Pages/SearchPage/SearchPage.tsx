import { useParams } from "react-router-dom";
import { Header } from "../../Components/Header/Header";
import { ListPosts } from "../../Components/ListPosts/ListPosts";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";
import { usePostContext } from "../../Providers/post/PostContext";
import { useEffect, useState } from "react";
import { IPost } from "../../types/PostTypes";

export const SearchPage = () => {
  const { searchPost } = useParams();
  const { search, AllPosts } = usePostContext();
  const [searchResult, setSeachResult] = useState<IPost[]>([]);
  useEffect(() => {
    if (AllPosts && searchPost) {
      setSeachResult(search(AllPosts, searchPost));
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
