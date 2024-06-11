import { IChildren } from "../../types/DefaultTypes";
import { ListOfCategories } from "./ListOfCategories/ListOfCategories";
import { SearchButton } from "./SearchButton/SearchButton";
import { SocialMedia } from "./SocialMedia/SocialMedia";
import Logo from "../../assets/Logo-DOE9XU4E 1.png";
import { HamburgerMenu } from "./HamburgerMenu/HamburgerMenu";
import { RedLine } from "../RedLine/RedLine";

interface IHeader extends IChildren {
  // classname?: string;
}

export const Header = ({ children }: IHeader) => {
  return (
    <>
      <header className="my-0 mx-auto flex-col ">
        <div className="container flex justify-between items-center my-[19px] ">
          <SearchButton />
          <img className="" src={Logo} alt="Logo Jornal da Bahia" />
          <SocialMedia />
          <HamburgerMenu />
        </div>
        <RedLine />
        <div className="container">
          <ListOfCategories />
        </div>
        {children}
      </header>
    </>
  );
};
