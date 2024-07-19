import XIcon from "../../assets/XColor.svg";
import WhatsIcon from "../../assets/WhatsAppColor.svg";
import FaceIcon from "../../assets/FaceBookColor.svg";

interface Props {
  title?: string;
  imageUrl?: string;
}

export const SocialMediaStick = ({ title, imageUrl }: Props) => {
  const pageUrl = encodeURIComponent(window.location.href);

  const message =
    encodeURIComponent(
      `🌟 Últimas Notícias do Jornal da Bahia 🌟 \n ${title} \n Compartilhe essa notícia com seus amigos e fique por dentro dos acontecimentos mais importantes: \n \n`
    ) +
    " " +
    pageUrl;

  const updateMetaTags = () => {
    const shareDataRaw = localStorage.getItem("share");
    const shareData = shareDataRaw ? JSON.parse(shareDataRaw) : null;
    if (shareData) {
      if (shareData.title) {
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", shareData.title);
      }

      if (shareData.content) {
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription)
          ogDescription.setAttribute(
            "content",
            shareData.content.replace(/<[^>]*>?/gm, "").substring(0, 200)
          );
      }

      if (shareData.photoUrls && shareData.photoUrls.length > 0) {
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) ogImage.setAttribute("content", shareData.photoUrls[0]);
      }

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", window.location.href);
    }
  };

  const shareOnWhatsApp = () => {
    updateMetaTags();
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareOnX = () => {
    updateMetaTags();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${message}&url=${pageUrl}&hashtags=Notícias,JornalDaBahia&via=JornalDaBahia`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnFacebook = () => {
    updateMetaTags();
    const safeImageUrl = imageUrl || "";
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&picture=${encodeURIComponent(
      safeImageUrl
    )}&title=${encodeURIComponent(title ? title : "Jornal da Bahia")}&description=${message}`;
    window.open(facebookUrl, "_blank");
  };

  return (
    <div className="flex flex-col max-h-[122px] max-w-[40px] min-w-[40px] lg:max-h-[165px] lg:max-w-[55px] lg:min-w-[55px] sticky top-14 left-96 mt-2">
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
      <button onClick={shareOnX} className="flex justify-center items-center bg-black w-full h-[55px]">
        <img className="h-[24px] w-[24px]" src={XIcon} alt="Twitter" />
      </button>
    </div>
  );
};
