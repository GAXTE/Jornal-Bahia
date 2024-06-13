import React from "react";

interface IListOfCategories {
  style?: React.CSSProperties;
}

export const ListOfCategories = ({ style }: IListOfCategories) => {
  return (
    <>
      <div
        className="container hidden lg:flex  min-h-[52px] items-center "
        style={style}
      >
        <ul
          className="text-nowrap hidden lg:flex gap-[23px] w-full justify-between font-primaryFont text-16px font-medium overflow-hidden"
          style={style}
        >
          <li>Politica</li>
          <li>Esportes</li>
          <li>Municípios</li>
          <li>Educação</li>
          <li>Saúde</li>
          <li>Entretenimento</li>
          <li>JB Agro</li>
          <li>Turismo</li>
          <li>Salvador</li>
          <li>Artigos</li>
          <li>Justiça</li>
          <li>Colunistas</li>
          <li>Bahia</li>
          <li>Eleições 2024:</li>
        </ul>
      </div>
    </>
  );
};
