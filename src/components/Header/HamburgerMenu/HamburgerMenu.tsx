import { useState } from "react";
import burgerMenu from "../../../assets/burgerMenu.png";
import { ListOfCategories } from "../ListOfCategories/ListOfCategories";
import { SocialMedia } from "../SocialMedia/SocialMedia";

export const HamburgerMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const modalComponentStyle = {
    display: "block",
  };
  return (
    <>
      <div onClick={toggleModal} className=" lg:hidden">
        <img src={burgerMenu} alt="" />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <ListOfCategories style={modalComponentStyle} />
            <SocialMedia style={modalComponentStyle} />
            <button onClick={toggleModal}>Fechar</button>
          </div>
        </div>
      )}
    </>
  );
};
