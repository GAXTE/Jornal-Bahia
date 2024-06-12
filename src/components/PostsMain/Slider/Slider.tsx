import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCategoryContext } from "../../../Providers/category/CategoryContext";

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const { PostsMain } = useCategoryContext();

  const posts = PostsMain.slice(-4);
  const images = posts.map((post) => post.photoUrls[0]);
  const titles = posts.map((post) => post.title);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

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
        <img
          src={images[current]}
          alt="slide"
          className="w-[637px] h-[499px] object-cover min-h-[463px] rounded-md"
        />
        <button className="absolute top-[32px] left-[45px] bg-red-500 rounded-[4px] w-[97px] h-[33px] lg:w-[120px] lg:h-[39]">
          Principais
        </button>
        <div className="absolute top-2/3 min-h-[108px] max-w-[540px] ml-[45px] mr-[52px]">
          <p className="text-wrap text-[#ffffff] font-extrabold lg:text-[30px] text-[22px] line-clamp-4">
            {titles[current]}
          </p>
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-400 text-white p-2 rounded-full mx-3"
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
            className="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-400 text-white p-2 rounded-full mx-3"
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

export default Slider;
