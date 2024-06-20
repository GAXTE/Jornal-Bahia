import { Header } from "../../Components/Header/Header";
import { LatestNews } from "../../Components/LatestNews/LatesteNews";
import { MostRead } from "../../Components/MostRead/MostRead";
import { PostCategories } from "../../Components/PostCategories/PostCatories";
import { PostsMain } from "../../Components/PostsMain/PostsMain";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";

export const Homepage = () => {
  return (
    <>
      <Header />
      <main className="container">
        <PublicityBanner />
        <PostsMain />
        <section className="flex mt-[57px] ">
          <MostRead />
          <PostCategories />
        </section>
        <section>
          <LatestNews />
        </section>
      </main>
    </>
  );
};
