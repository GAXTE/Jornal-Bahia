import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../Components/Header/Header";
import { ListPosts } from "../../Components/ListPosts/ListPosts";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";
import { usePostContext } from "../../Providers/post/PostContext";
import { IPost } from "../../types/PostTypes";
import { Footer } from "../../Components/Footer/Footer";

export const PostCategoriesPage = () => {
  const { AllPosts } = usePostContext();
  const { categorieId } = useParams();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (AllPosts) {
      const filteredPosts = AllPosts.filter((post) => post.categories[0].id === categorieId);
      setPosts(filteredPosts);
    }
  }, [categorieId, AllPosts]);

  return (
    <>
      <Header />
      <main className="container">
        <PublicityBanner />
        <ListPosts posts={posts}>
          <p>Categoria: {posts[0]?.categories[0].name}</p>
        </ListPosts>
      </main>
      <Footer />
    </>
  );
};
