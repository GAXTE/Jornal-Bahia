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
        <img className=" h-[25px] cursor-pointer" src={x} alt="instagram" />
        <img className=" h-[25px]  cursor-pointer" src={insta} alt="whatsapp" />
        <img className=" h-[25px]  cursor-pointer" src={face} alt="x" />
      </div>
    </>
  );
};
