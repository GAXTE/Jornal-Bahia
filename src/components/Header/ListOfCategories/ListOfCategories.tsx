import React from "react";

interface IListOfCategories {
  style?: React.CSSProperties;
}

export const ListOfCategories = ({ style }: IListOfCategories) => {
  return (
    <>
      <div style={style}>
        <ul className="container hidden lg:flex">
          <li>Category 1</li>
          <li>Category 2</li>
          <li>Category 3</li>
        </ul>
      </div>
    </>
  );
};
