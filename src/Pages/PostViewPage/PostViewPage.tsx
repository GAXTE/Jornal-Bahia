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
import { Helmet } from "react-helmet";

export const PostViewPage = () => {
  const { getPostById } = usePostContext();
  const { AllPosts } = usePostContext();
  const { postId } = useParams();
  const [post, setPost] = useState<IPost>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (postId) {
      setError(false);
      const fetchPost = async () => {
        try {
          window.scrollTo(0, 0);
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
      <Helmet>
        <title>{post?.title || "Post View"}</title>
        <meta property="og:title" content={post?.title || "Post View"} />
        <meta
          property="og:image"
          content={post?.photoUrls[0] || "URL_da_imagem_padrao"}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="URL da página" />
        {/* <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630"> */}
      </Helmet>
      <Header />
      <main className="container flex flex-col items-center mb-4">
        {error ? null : <PublicityBanner />}
        <div className="flex mt-10 gap-3 justify-between lg:w-[740px]">
          <div className="flex flex-col gap-14">
            {post && <ViewPost post={post} />}
            {error && (
              <div className="py-[100px] flex flex-col items-center tittle-2">
                <Lottie options={defaultOptions} />
                <span>Nenhum post Encontrado</span>
              </div>
            )}
            <LatestNews posts={AllPosts!} />
          </div>
          {error ? null : <SocialMediaStick />}
        </div>
      </main>
      <Footer />
    </>
  );
};
