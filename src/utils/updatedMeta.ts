interface Props {
  title?: string;
  imageUrl?: string;
}
export const updateMetaTags = ({ title, imageUrl }: Props) => {
  const updateMetaTag = (property: string, content: string) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`);
    if (metaTag) {
      metaTag.setAttribute("content", content);
    } else {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("property", property);
      metaTag.setAttribute("content", content);
      document.head.appendChild(metaTag);
    }
  };

  updateMetaTag("og:url", window.location.href);
  if (title) updateMetaTag("og:title", title);
  if (imageUrl) updateMetaTag("og:image", imageUrl);
};
