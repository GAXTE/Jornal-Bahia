import { usePostContext } from "../../Providers/post/PostContext";

export const MostRead = () => {
  const { postMostState } = usePostContext();
  if (!postMostState) {
    return null;
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
                className=" max-w-[full] max-h-[188px] rounded-lg lg:max-w-[249px] lg:min-w-[249px] lg:max-h-[249px] lg:min-h-[249px] object-cover"
                src={post.photoUrls[0]}
                alt={"texto alternativo"}
              />
              <div className="flex flex-col items-start gap-[12px]">
                <strong className="label-mobile">
                  {post.categories[0].name}
                </strong>
                <h3 className="tittle-2-mobile">{post.title}</h3>
                <span className="opaque-text mt-[22px]">há 2 horas</span>
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
