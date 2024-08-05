import { useState, useRef } from "react";
import burgerMenu from "../../../assets/burgerMenu.png";
import { ListOfCategories } from "../ListOfCategories/ListOfCategories";
import { SocialMedia } from "../SocialMedia/SocialMedia";
import close from "../../../assets/close.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export const HamburgerMenu = () => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Dentro do seu componente, após a declaração do estado isModalOpen

  useEffect(() => {
    if (isModalOpen) {
      // Impede o rolamento da página
      document.body.style.overflow = "hidden";
    } else {
      // Permite o rolamento da página
      document.body.style.overflow = "";
    }

    // Limpeza: Reverte para o estilo original quando o componente é desmontado
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]); // Dependências do efeito: reage às mudanças em isModalOpen

  const modalSocialMediaStyle: React.CSSProperties = {
    display: "inline-flex",
    // marginBottom: "23px",
    marginTop: "23px",
    backgroundColor: "white",
    maxHeight: "50px",
    height: "50px",
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
      <AnimatePresence>
        {isModalOpen && (
          <div
            onClick={closeModalIfClickedOutside}
            className="fixed inset-0 bg-opacity-50 z-50 flex justify-center pt-[128px]  lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, x: 50 }}
              ref={modalContentRef}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full flex flex-col  items-center overflow-y-auto  "
            >
              <button
                className="self-end sticky top-2 mt-2 mr-7"
                onClick={toggleModal}
              >
                <img src={close} alt="close button" />
              </button>
              <ListOfCategories
                style={modalListStyle}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
              />
              <SocialMedia style={modalSocialMediaStyle} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
