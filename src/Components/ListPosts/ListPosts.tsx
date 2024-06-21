import React from "react";
import { IPost } from "../../types/PostTypes";

interface IProps {
  children: React.ReactElement;
  posts?: IPost[];
}
export const ListPosts = ({ children, posts }: IProps) => {
  return (
    <>
      <section className="flex flex-col items-start justify-center max-w-[546px] min-w-[348px] w-full mt-[33px]">
        <div className="tittle-1-mobile lg:tittle-list-post">
          {children}
          <span className="opaque-text">{posts?.length} resultados</span>
        </div>
        <ul>
          {posts?.map((post) => (
            <li key={post.id} className="mt-[25px]">
              <div className="flex flex-col items-center justify-center">
                <img
                  src={post.photoUrls}
                  alt={""}
                  className="max-w-[348px] max-h-[188px] rounded-lg object-cover lg:max-w-[249px] lg:min-w-[249px] lg:max-h-[249px] lg:min-h-[249px]"
                />
                <h3 className="tittle-2-mobile lg:tittle-2">{post.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
