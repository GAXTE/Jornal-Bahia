import { IChildren } from "../../types/DefaultTypes";
import { ListOfCategories } from "./ListOfCategories/ListOfCategories";
import { SearchButton } from "./SearchButton/SearchButton";
import { SocialMedia } from "./SocialMedia/SocialMedia";
import Logo from "../../assets/Logo-DOE9XU4E 1.png";
import { HamburgerMenu } from "./HamburgerMenu/HamburgerMenu";
import { RedLine } from "../RedLine/RedLine";

interface IHeader extends IChildren {}

export const Header = ({ children }: IHeader) => {
  return (
    <>
      <header className="bg-white flex flex-col ">
        <div className="min-h-[83px] container flex justify-between items-center my-[19px] ">
          <SearchButton />
          <img
            className="w-[48vw] max-w-[231px] h-auto max-h-[47px] cursor-pointer"
            src={Logo}
            alt="Logo Jornal da Bahia"
          />
          <SocialMedia />
          <HamburgerMenu />
        </div>
        <RedLine />
        <ListOfCategories />
        {children}
      </header>
    </>
  );
};
