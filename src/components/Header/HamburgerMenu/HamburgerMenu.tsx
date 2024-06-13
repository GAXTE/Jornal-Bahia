import { useState, useRef } from "react";
import burgerMenu from "../../../assets/burgerMenu.png";
import { ListOfCategories } from "../ListOfCategories/ListOfCategories";
import { SocialMedia } from "../SocialMedia/SocialMedia";
import close from "../../../assets/close.svg";

export const HamburgerMenu = () => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const modalSocialMediaStyle: React.CSSProperties = {
    display: "inline-flex",
    marginBottom: "23px",
    backgroundColor: "white",
    maxHeight: "100px",
    height: "100px",
  };

  const modalListStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "23px",
    overflowY: "auto",
  };

  const closeModalIfClickedOutside = (event: React.MouseEvent) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target as Node)
    ) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div onClick={toggleModal} className="lg:hidden cursor-pointer">
        <img src={burgerMenu} alt="" />
      </div>
      {isModalOpen && (
        <div
          onClick={closeModalIfClickedOutside}
          className="fixed inset-0 bg-opacity-50 z-50 flex justify-center pt-[130px] lg:hidden"
        >
          <div
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
            className="bg-white  w-full flex flex-col  items-center overflow-y-auto  "
          >
            <button
              className="self-end sticky top-2 mt-2 mr-7"
              onClick={toggleModal}
            >
              <img src={close} alt="close button" />
            </button>
            <ListOfCategories style={modalListStyle} />
            <SocialMedia style={modalSocialMediaStyle} />
          </div>
        </div>
      )}
    </>
  );
};
