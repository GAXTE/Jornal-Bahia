import { useParams } from "react-router-dom";
import { Footer } from "../../Components/Footer/Footer";
import { Header } from "../../Components/Header/Header";
import { PublicityBanner } from "../../Components/PublicityBanner/PublicityBanner";
import { SocialMediaStick } from "../../Components/SocialMediaStick/SocialMediaStick";
import { ViewPost } from "../../Components/ViewPost/ViewPost";
import { usePostContext } from "../../Providers/post/PostContext";
import { useEffect, useState } from "react";
import { IPost } from "../../types/PostTypes";
import animationData from "../../assets/Animation - 1718972246036.json";
import Lottie from "react-lottie";
import { LatestNews } from "../../Components/LatestNews/LatesteNews";
import { AdSense } from "../../Components/AdSense/AdSense";

export const PostViewPage = () => {
  const { getPostById } = usePostContext();
  const { postId } = useParams();
  const [post, setPost] = useState<IPost>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (postId) {
      setError(false);
      const fetchPost = async () => {
        try {
          const postDetails = await getPostById(postId);
          setPost(postDetails);
          document.title = postDetails?.title || "Post View";
        } catch (error) {
          setError(true);
        }
      };
      fetchPost();
    }
  }, [postId, getPostById]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Header />
      <main className="container flex flex-col items-center mb-4">
        {error ? null : <PublicityBanner />}
        <div className="flex mt-10 gap-3 justify-between w-full max-w-[330px] md:max-w-[660px] lg:max-w-[740px] lg:w-[740px]">
          <div className="flex flex-col gap-14 w-full max-w-[290px] md:max-w-[620px]">
            {post && <ViewPost post={post} />}
            {error && (
              <div className="py-[100px] flex flex-col items-center tittle-2">
                <Lottie options={defaultOptions} />
                <span>Nenhum post Encontrado</span>
              </div>
            )}

            {/* AdSense após conteúdo do post - só exibe se não houver erro */}
            {!error && post && (
              <section className="my-8 flex justify-center">
                <AdSense adSlot="2902002028" />
              </section>
            )}

            <LatestNews />
          </div>
          {error ? null : <SocialMediaStick />}
        </div>
      </main>
      <Footer />
    </>
  );
};
