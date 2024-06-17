import eagle from "../../assets/Moks/eagle.png";
import dogs from "../../assets/Moks/dogs.png";
import woman from "../../assets/Moks/woman.png";

export const MostRead = () => {
  return (
    <>
      <div className=" max-w-[600px] mt-[57px]">
        <h2 className="mb-[26px] title-1">Mais lidos</h2>
        <ul className="flex flex-col gap-[25px] mb-12 ">
          <li className="flex gap-[41px] items-center">
            <img src={eagle} alt="" />
            <div className="flex flex-col gap-[6px]">
              <strong>categoria</strong>
              <h3 className="text-lg">
                Notícia bombástica sobre um assunto polêmico que viralizou no
                TikTok
              </h3>
              <span>há 2 horas</span>
            </div>
          </li>
          <li className="flex gap-[41px] items-center">
            <img src={dogs} alt="" />
            <div className="flex flex-col gap-[6px]">
              <strong>categoria</strong>
              <h3 className="text-lg">
                Notícia bombástica sobre um assunto polêmico que viralizou no
                TikTok
              </h3>
              <span>há 2 horas</span>
            </div>
          </li>
          <li className="flex gap-[41px] items-center">
            <img src={woman} alt="" />
            <div className="flex flex-col gap-[6px]">
              <strong>categoria</strong>
              <h3 className="text-lg">
                Notícia bombástica sobre um assunto polêmico que viralizou no
                TikTok
              </h3>
              <span>há 2 horas</span>
            </div>
          </li>
        </ul>
        <button className="text-primaryRed">Ler mais</button>
      </div>
    </>
  );
};
