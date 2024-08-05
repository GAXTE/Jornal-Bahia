import XIcon from "../../assets/XColor.svg";
import WhatsIcon from "../../assets/WhatsAppColor.svg";
import FaceIcon from "../../assets/FaceBookColor.svg";
import { useLocation } from "react-router-dom";

export const SocialMediaStick = () => {
  const location = useLocation();
  const idPage = location.pathname.split("/").pop();
  const pageUrl = encodeURIComponent(`https://jornaldabahia.app.br/${idPage}`);
  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${pageUrl}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareOnX = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${pageUrl}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    window.open(facebookUrl, "_blank");
  };

  return (
    <>
      <div className="flex flex-col max-h-[122px] max-w-[40px] min-w-[40px] lg:max-h-[165px] lg:max-w-[55px] lg:min-w-[55px] sticky top-14 left-96 ">
        <button
          onClick={shareOnFacebook}
          className="flex justify-center items-center bg-blueFace w-full h-[55px]"
        >
          <img className="h-[24px] w-[24px]" src={FaceIcon} alt="Facebook" />
        </button>
        <button
          onClick={shareOnWhatsApp}
          className="flex justify-center items-center bg-greenWhatsapp w-full h-[55px]"
        >
          <img className="h-[25px] w-[25px]" src={WhatsIcon} alt="WhatsApp" />
        </button>
        <button
          onClick={shareOnX}
          className="flex justify-center items-center bg-BlackX w-full h-[55px]"
        >
          <img className="h-[24px] w-[24px]" src={XIcon} alt="X" />
        </button>
      </div>
    </>
  );
};
