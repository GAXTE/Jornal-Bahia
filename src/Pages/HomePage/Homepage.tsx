import { Header } from "../../Components/Header/Header";
import { PostsMain } from "../../Components/PostsMain/PostsMain";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";

export const Homepage = () => {
  return (
    <>
      <Header />
      <PublicityBanner />
      <PostsMain />
    </>
  );
};
