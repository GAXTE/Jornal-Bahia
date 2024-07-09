import Lottie from "react-lottie";
import animationData from "../../assets/404Page.json";
export const PageNotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <main className="container h-screen  justify-center flex  flex-col items-center">
      <div>
        <Lottie options={defaultOptions} />
      </div>
      <div className=" flex flex-col items-center">
        <h1 className="my-2 text-gray-800 font-bold text-2xl">
          Pagina não Encontrada
        </h1>
        <button className="sm:w-full lg:w-auto my-2 border-2 rounded md py-4 px-8 text-center  text-black hover:border-primary hover:text-primary ">
          Retorne a pagina inicial
        </button>
      </div>
    </main>
  );
};
