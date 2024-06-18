import { usePostContext } from "../../Providers/post/PostContext";

export const MostRead = () => {
  const { postMostState } = usePostContext();
  if (!postMostState) {
    return null;
  }
  return (
    <>
      <div className=" max-w-[600px] mt-[57px]">
        <h2 className="mb-[26px] title-1">Mais lidos</h2>
        <ul className="flex flex-col gap-[25px] mb-12 ">
          {postMostState.slice(0, 3).map((post) => (
            <li key={post.id} className="flex gap-[41px] items-center">
              <img src={post.photoUrls[0]} alt={"texto alternativo"} />
              <div className="flex flex-col gap-[6px]">
                <strong>{post.categories[0].name}</strong>
                <h3 className="text-lg">{post.title}</h3>
                {/* <span>{post.createdAt}</span> */}
              </div>
            </li>
          ))}
          <button className="text-primaryRed">Ler mais</button>
        </ul>
      </div>
    </>
  );
};
