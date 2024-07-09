import insta from "../../../assets/instagram.png";
import x from "../../../assets/x-twitter.png";
import face from "../../../assets/facebook.png";

import React from "react";

interface ISocialMedia {
  style?: React.CSSProperties;
}

export const SocialMedia = ({ style }: ISocialMedia) => {
  return (
    <>
      <div
        style={style}
        className="min-w-[103px] min-h-[25px] justify-between items-center hidden lg:flex"
      >
        <a
          href="https://x.com/jornaldabahia01?t=rnDshPoVgRn7b5WA-VRL8A&s=09"
          target="_blank"
        >
          <img className=" h-[25px] cursor-pointer" src={x} alt="X" />
        </a>
        <a href="https://www.instagram.com/jornaldabahia.ba/" target="_blank">
          <img
            className=" h-[25px]  cursor-pointer"
            src={insta}
            alt="instagram"
          />
        </a>
        <a href="" target="_blank">
          <img
            className=" h-[25px]  cursor-pointer"
            src={face}
            alt="FaceBook"
          />
        </a>
      </div>
    </>
  );
};
