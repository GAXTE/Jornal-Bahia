import { IChildren } from "../../types/DefaultTypes";
import { ListOfCategories } from "./ListOfCategories/ListOfCategories";
import { SearchButton } from "./SearchButton/SearchButton";
import { SocialMedia } from "./SocialMedia/SocialMedia";

interface IHeader extends IChildren {
  classname?: string;
}

export const Header = ({ children, classname }: IHeader) => {
  return (
    <>
      <header>
        <div className="container">
          <SearchButton />
          <img src="" alt="" />
          <SocialMedia />
        </div>
        <div></div>
        <ListOfCategories />
        {children}
      </header>
    </>
  );
};
