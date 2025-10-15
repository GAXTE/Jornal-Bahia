import { Footer } from "../../Components/Footer/Footer";
import { Header } from "../../Components/Header/Header";
import { ListPosts } from "../../Components/ListPosts/ListPosts";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";
import { usePostContext } from "../../Providers/post/PostContext";
import { AdSense } from "../../Components/AdSense/AdSense";

export const MostReadPage = () => {
  const { postMostState } = usePostContext();
  return (
    <>
      <Header />
      <main className="container">
        {postMostState.length > 0 && <PublicityBanner />}
        <ListPosts posts={postMostState}>
          <p>Mais lidos:</p>
        </ListPosts>

        {/* AdSense apenas se houver posts */}
        {postMostState.length > 0 && (
          <section className="my-8 flex justify-center">
            <AdSense adSlot="2902002028" />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};
