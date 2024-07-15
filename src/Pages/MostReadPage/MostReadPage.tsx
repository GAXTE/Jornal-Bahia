import { Footer } from "../../Components/Footer/Footer";
import { Header } from "../../Components/Header/Header";
import { ListPosts } from "../../Components/ListPosts/ListPosts";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";
import { usePostContext } from "../../Providers/post/PostContext";

export const MostReadPage = () => {
  const { postMostState } = usePostContext();
  return (
    <>
      <Header />
      <main className="container">
        <PublicityBanner />
        <ListPosts posts={postMostState}>
          <p>Mais lidos:</p>
        </ListPosts>
      </main>
      <Footer />
    </>
  );
};
