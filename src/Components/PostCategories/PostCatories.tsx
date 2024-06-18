import eagle from "../../assets/Moks/eagle.png";

export const PostCategories = () => {
  return (
    <>
      <div className="flex-col">
        <span>categoria</span>
        <div className="flex flex-col">
          <img className="max-w-[348px] max-h-[188px]" src={eagle} alt="" />
          <h2>
            Notícia bombástica sobre um assunto polêmico que viralizou no TikTok
          </h2>
          <span>há 2 horas</span>
        </div>
        <ul>
          <li>
            <strong>categoria</strong>
            <h3>
              Notícia bombástica sobre um assunto polêmico que viralizou no
              TikTok
            </h3>
            <span>há 2 horas</span>
          </li>
          <li>
            <strong>categoria</strong>
            <h3>
              Notícia bombástica sobre um assunto polêmico que viralizou no
              TikTok
            </h3>
            <span>há 2 horas</span>
          </li>
          <li>
            <strong>categoria</strong>
            <h3>
              Notícia bombástica sobre um assunto polêmico que viralizou no
              TikTok
            </h3>
            <span>há 2 horas</span>
          </li>
          <li>
            <strong>categoria</strong>
            <h3>
              Notícia bombástica sobre um assunto polêmico que viralizou no
              TikTok
            </h3>
            <span>há 2 horas</span>
          </li>
        </ul>
      </div>
    </>
  );
};
