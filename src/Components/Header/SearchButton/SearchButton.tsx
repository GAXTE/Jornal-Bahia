import { useState } from "react";
import { motion } from "framer-motion";
import search from "../../../assets/search.png";

export const SearchButton = () => {
  const [inputVisible, setInputVisible] = useState(false);

  const toggleInput = () => {
    setInputVisible(!inputVisible);
  };

  return (
    <nav className="menu relative">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={toggleInput}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <img src={search} alt="" />
      </motion.button>
      {inputVisible && (
        <motion.div
          className="input-container p-[6px]  "
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "28px",
            left: 22,
            width: "200px",
            borderRadius: "5px",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1,
          }}
        >
          <input
            className="bg-bodyColor max-w-[230px] h-[30px] w-full border-none outline-none rounded-md "
            type="text"
            placeholder="Buscar..."
            style={{
              paddingLeft: "16px",
            }}
          />
          {""}
        </motion.div>
      )}
    </nav>
  );
};
