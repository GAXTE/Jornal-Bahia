import { IChildren } from "../../types/DefaultTypes";
import { ListOfCategories } from "./ListOfCategories/ListOfCategories";
import { SearchButton } from "./SearchButton/SearchButton";
import { SocialMedia } from "./SocialMedia/SocialMedia";
import Logo from "../../assets/LOGO EM PNG COM FUNDO TRANSPARENTE.png";
import { HamburgerMenu } from "./HamburgerMenu/HamburgerMenu";
import { RedLine } from "../RedLine/RedLine";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface IHeader extends IChildren {}

export const Header = ({ children }: IHeader) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navi = useNavigate();
  return (
    <>
      <header className="bg-white flex flex-col ">
        <div className="min-h-[83px] container flex justify-between items-center my-[19px] ">
          <SearchButton />
          <img
            className="w-[55vw] max-w-[430px] h-auto max-h-[70px] cursor-pointer"
            src={Logo}
            alt="Logo Jornal da Bahia"
            onClick={() => navi("/")}
          />
          <SocialMedia />
          <HamburgerMenu />
        </div>
        <RedLine />
        <ListOfCategories isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        {children}
      </header>
    </>
  );
};
