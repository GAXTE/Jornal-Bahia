import { Footer } from "../../Components/Footer/Footer";
import { Header } from "../../Components/Header/Header";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";
import { SocialMediaStick } from "../../Components/SocialMediaStick/SocialMediaStick";

import { ViewPost } from "../../Components/ViewPost/ViewPost";
import { usePostContext } from "../../Providers/post/PostContext";

export const PostViewPage = () => {
  const { AllPosts } = usePostContext();
  console.log(AllPosts);
  const posts = AllPosts ? AllPosts : [];
  const post = posts[2];

  return (
    <>
      <Header />
      <main className=" container flex flex-col items-center mb-4">
        <PublicityBanner />
        <div className="flex mt-10 gap-3 justify-between  lg:w-[740px]  ">
          <div className="flex flex-col ">
            <ViewPost post={post} />
          </div>
          <SocialMediaStick />
        </div>
      </main>
      <Footer />
    </>
  );
};
