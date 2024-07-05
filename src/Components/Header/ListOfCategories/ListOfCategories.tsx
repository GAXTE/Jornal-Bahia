import React from "react";
import { useNavigate } from "react-router-dom";

interface IListOfCategories {
  style?: React.CSSProperties;
}

export const ListOfCategories = ({ style }: IListOfCategories) => {
  const navi = useNavigate();
  const categories = [
    { name: "Politica", id: "5064e3f6-c20e-4eff-9fc8-f7c1355e1453", color: "" },
    { name: "Esportes", id: "de96ec9d-8326-4a0d-983b-404d10fb15f4", color: "" },
    { name: "Municípios", id: "7c9868a2-143b-40ba-b3df-7b5586fc0cbc", color: "" },
    { name: "JB Agro", id: "b9c2c9b6-17f3-4c08-8d7b-4064126c0f56", color: "#00cc00" },
    { name: "Educação", id: "dc95e1f8-6dd3-45dd-8277-96a06724f864", color: "" },
    { name: "Saúde", id: "2c209f4d-3712-4ac3-988a-1dd3b806aab2", color: "" },
    { name: "Entretenimento", id: "c2a0194e-9ccb-4c48-8314-9cfb576ab745", color: "" },
    { name: "Turismo", id: "5254340e-8934-4839-aa07-52aba0a4f7f3", color: "" },
    { name: "Salvador", id: "7a45a066-1270-4c38-9adf-476bb6a150e2", color: "" },
    { name: "Artigos", id: "3da103ea-aca1-494e-8ea8-9d2956e9d9d4", color: "" },
    { name: "Justiça", id: "41ae17d8-52b3-46a7-b571-e7f0208d6bd9", color: "" },
    { name: "Colunistas", id: "adb30b70-de63-4724-86d8-d2d80d2b6cda", color: "" },
    { name: "Bahia", id: "747b19d9-ec5b-43b8-a3b7-8ac83da1f870", color: "" },
    { name: "Eleições 2024", id: "176845d4-80ed-4390-bce1-a0d5cf99a662", color: "" },
  ];
  const handleCategoryClick = (categoryId: string) => {
    navi(`/categories/${categoryId}`);
  };
  return (
    <>
      <div className="container hidden lg:flex  min-h-[52px] items-center " style={style}>
        <ul
          className="menu-text text-nowrap hidden lg:flex gap-[23px] lg:justify-center w-full justify-between font-primaryFont text-16px font-medium"
          style={style}
        >
          {categories.map((category) => (
            <li
              className="cursor-pointer"
              style={{ color: category.color }}
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
