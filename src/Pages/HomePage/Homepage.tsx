import { Header } from "../../Components/Header/Header";
import { MostRead } from "../../Components/MostRead/MostRead";
import { PostsMain } from "../../Components/PostsMain/PostsMain";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";

export const Homepage = () => {
  return (
    <>
      <Header />
      <main className="container">
        <PublicityBanner />
        <PostsMain />
        <MostRead />
      </main>
    </>
  );
};
