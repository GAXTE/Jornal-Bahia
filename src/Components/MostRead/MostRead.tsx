import { useNavigate } from "react-router-dom";
import { usePostContext } from "../../Providers/post/PostContext";
import { DateComponent } from "../Date/Date";

export const MostRead = () => {
  const { postMostState } = usePostContext();
  const navi = useNavigate();
  if (!postMostState) {
    return null;
  }

  const handlePostClick = (postId: string) => {
    navi(`/viewpost/${postId}`);
  };

  const MAX_CHARS = 80; // Exemplo: limite de 100 caracteres

  function truncateText(text: string, maxChars: number): string {
    return text?.length > maxChars ? `${text.substring(0, maxChars)}...` : text;
  }
  return (
    <>
      <div className="flex flex-col w-full max-w-[600px] lg:max-w-[600px] ">
        <h2 className="mb-[18px] tittle-1-mobile lg:title-1 lg:mb-[26px]">
          Mais lidos
        </h2>
        <ul className="flex flex-col gap-[25px] mb-12 ">
          {postMostState.slice(0, 3).map((post) => (
            <li
              key={post.id}
              className="flex flex-col lg:flex-row gap-[20px] lg:gap-[41px]  lg:items-center"
            >
              <img
                onClick={() => handlePostClick(post.id)}
                className="cursor-pointer max-w-[full] max-h-[188px] rounded-lg lg:max-w-[249px] lg:min-w-[249px] lg:max-h-[249px] lg:min-h-[249px] object-cover"
                src={post.photoUrls[0]}
                alt={"texto alternativo"}
              />
              <div className="flex flex-col items-start gap-[12px]">
                <strong className="label-mobile">
                  {post.categories[0].name}
                </strong>
                <h3
                  className=" cursor-pointer tittle-2-mobile"
                  onClick={() => handlePostClick(post.id)}
                >
                  {truncateText(post.title, MAX_CHARS)}
                </h3>
                <DateComponent data={post.createdAt} />
              </div>
            </li>
          ))}
          <button className="label font-semibold self-start mt-[15px]">
            Ler mais
          </button>
        </ul>
      </div>
    </>
  );
};
