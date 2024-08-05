import insta from "../../../assets/instagram.png";
import x from "../../../assets/x-twitter.png";
import face from "../../../assets/facebook.png";
import whatsApp from "../../../assets/whatsapp-black.svg";

import React from "react";

interface ISocialMedia {
  style?: React.CSSProperties;
}

export const SocialMedia = ({ style }: ISocialMedia) => {
  return (
    <>
      <div
        style={style}
        className="lg:min-w-[103px] lg:min-h-[25px] h-[40px] justify-between items-center hidden lg:flex gap-2"
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
        {/* <a href="">
          <img
            className=" h-[25px]  cursor-pointer"
            src={face}
            alt="FaceBook"
          />
        </a> */}
        <a href="https://wa.me/+557193485952" target="_blank">
          <img
            className=" h-[25px]  cursor-pointer"
            src={whatsApp}
            alt="whatsApp"
          />
        </a>
      </div>
    </>
  );
};
