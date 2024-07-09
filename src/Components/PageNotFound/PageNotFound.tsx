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
    <div className="container mt-auto">
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className="">
                <h1 className="my-2 text-gray-800 font-bold text-2xl">Pagina nao Encontrada</h1>
                <p className="my-2 text-gray-800">Retorne a pagina inicial</p>
                <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Voltar
                </button>
              </div>
            </div>
            {/* <div>
              <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
            </div> */}
          </div>
        </div>
        <div>
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </div>
  );
};
