import XIcon from "../../assets/XColor.svg";
import WhatsIcon from "../../assets/WhatsAppColor.svg";
import FaceIcon from "../../assets/FaceBookColor.svg";

export const SocialMediaStick = () => {
  return (
    <>
      <div className="flex flex-col max-h-[122px] max-w-[40px] min-w-[40px] lg:max-h-[165px] lg:max-w-[55px] lg:min-w-[55px] sticky top-14 left-96 mt-2">
        <button className="flex justify-center  items-center bg-blueFace w-full h-[55px]">
          <img className="h-[24px] w-[24px]" src={FaceIcon} alt="" />
        </button>
        <button className="flex justify-center  items-center bg-greenWhatsapp w-full h-[55px]">
          <img className="h-[25px] w-[25px]" src={WhatsIcon} alt="" />
        </button>
        <button className="flex justify-center  items-center bg-black w-full h-[55px]">
          <img className="h-[24px] w-[24px]" src={XIcon} alt="" />
        </button>
      </div>
    </>
  );
};
