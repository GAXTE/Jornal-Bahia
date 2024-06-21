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
        className="w-24 h-6 max-w-[103px] max-h-[25px] justify-between items-center hidden lg:flex"
      >
        <img className=" h-5 max-h-[24px] cursor-pointer" src={x} alt="instagram" />
        <img className="  h-6 max-h-[24px] cursor-pointer" src={insta} alt="whatsapp" />
        <img className="  h-6 max-h-[24px] cursor-pointer" src={face} alt="x" />
      </div>
    </>
  );
};
