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
  let posts: IPost[] = [];
  if (AllPosts) {
    posts = AllPosts!.filter((post) => post.categories[0].id === categorieId);
  }
  return (
    <>
      <Header />
      <main className="container ">
        <PublicityBanner />
        <ListPosts posts={posts}>
          <p>Categoria 1</p>
        </ListPosts>
      </main>
      <Footer />
    </>
  );
};
