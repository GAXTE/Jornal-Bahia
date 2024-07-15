import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCategoryContext } from "../../../Providers/category/CategoryContext";
import { useNavigate } from "react-router-dom";

export const Slider = () => {
  const [current, setCurrent] = useState(0);
  const { PostsMain } = useCategoryContext();
  const sortedPostsMain = [...PostsMain].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const images = sortedPostsMain.slice(0, 5).map((post) => post.photoUrls[0]);
  const titles = sortedPostsMain.slice(0, 5).map((post) => post.title);
  const id = sortedPostsMain.slice(0, 5).map((post) => post.id);
  const MAX_CHARS = 80;
  let categorie = "";
  const navi = useNavigate();

  function truncateText(text: string, maxChars: number): string {
    return text?.length > maxChars ? `${text.substring(0, maxChars)}...` : text;
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length !== 0 || titles.length !== 0) {
    categorie = sortedPostsMain[current].categories[0].id;
  }

  const handleCategoryClick = (categoryId: string) => {
    navi(`/viewpost/${categoryId}`);
  };
  return (
    <div className="relative max-w-[600px] min-w-[320px]">
      <motion.div
        key={current}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="max-w-[600px] min-w-[320px] w-full"
      >
        <img src={images[current]} className="w-[637px] h-[499px] object-cover min-h-[463px] rounded-2xl" />
        <span
          className="cursor-pointer absolute top-[12px] left-[45px] label-category"
          style={{ background: "var(--color-primary)" }}
          onClick={() => navi(`/categories/${categorie}`)}
        >
          Principais
        </span>
        <div
          className="cursor-pointer absolute top-2/3 min-w-[300px] min-h-[108px] md:ml-7 max-w-[540px]  pl-3 py-2 bg-black bg-opacity-60 rounded-lg "
          onClick={() => handleCategoryClick(id[current])}
        >
          <p className="text-wrap text-[#ffffff] font-extrabold lg:text-[30px] text-[22px] line-clamp-4 mx-auto">
            {truncateText(titles[current], MAX_CHARS)}
          </p>
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-400 text-white p-1  mx-3 bg-black bg-opacity-60 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left "
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-400 text-white p-1  mx-3 bg-black bg-opacity-60 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
};
