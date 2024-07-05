import { motion } from "framer-motion";
import search from "../../../assets/search.png";
import React, { useEffect, useRef, useState } from "react";

export const SearchButton = () => {
  const [inputVisible, setInputVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const toggleInput = () => {
    setInputVisible(!inputVisible);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchTerm) {
      window.location.href = `/search/${searchTerm}`;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputContainerRef.current &&
      event.target instanceof Node &&
      !inputContainerRef.current.contains(event.target)
    ) {
      setInputVisible(false);
    }
  };

  const handleEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setInputVisible(false);
    }
  };

  useEffect(() => {
    if (inputVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape as any);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape as any);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape as any);
    };
  }, [inputVisible]);

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
          ref={inputContainerRef}
          className="input-container p-[6px]"
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
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
        </motion.div>
      )}
    </nav>
  );
};
