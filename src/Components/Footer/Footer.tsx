import { SocialMedia } from "../Header/SocialMedia/SocialMedia";
import { RedLine } from "../RedLine/RedLine";

const styleSocialMediaFooter: React.CSSProperties = {
  display: "flex",
};

export const Footer = () => {
  return (
    <footer className=" bg-gray">
      <RedLine />
      <div className="container min-h-[187px] lg:min-h-[106px]">
        <div className="flex flex-col items-center justify-center gap-[20px] min-h-[187px] lg:min-h-[106px] lg:flex-row lg:items-center lg:justify-between ">
          <p className="footer-text max-w-[232px] text-center lg:text-nowrap">
            Todos os direitos reservados Jornal da Bahia
          </p>
          <SocialMedia style={styleSocialMediaFooter} />
        </div>
      </div>
    </footer>
  );
};
