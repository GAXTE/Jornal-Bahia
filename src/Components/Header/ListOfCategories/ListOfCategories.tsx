import React from "react";

interface IListOfCategories {
  style?: React.CSSProperties;
}

export const ListOfCategories = ({ style }: IListOfCategories) => {
  return (
    <>
      <div className="container hidden lg:flex  min-h-[52px] items-center " style={style}>
        <ul
          className="text-nowrap hidden lg:flex gap-[23px] w-full justify-between font-primaryFont text-16px font-medium overflow-hidden"
          style={style}
        >
          <li className="cursor-pointer">Politica</li>
          <li className="cursor-pointer">Esportes</li>
          <li className="cursor-pointer">Municípios</li>
          <li className="cursor-pointer">Educação</li>
          <li className="cursor-pointer">Saúde</li>
          <li className="cursor-pointer">Entretenimento</li>
          <li className="cursor-pointer">JB Agro</li>
          <li className="cursor-pointer">Turismo</li>
          <li className="cursor-pointer">Salvador</li>
          <li className="cursor-pointer">Artigos</li>
          <li className="cursor-pointer">Justiça</li>
          <li className="cursor-pointer">Colunistas</li>
          <li className="cursor-pointer">Bahia</li>
          <li className="cursor-pointer">Eleições 2024:</li>
        </ul>
      </div>
    </>
  );
};
