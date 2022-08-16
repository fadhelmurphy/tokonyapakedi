import React from "react";
import ProductCard from "../../components/productcard";

export default function Mobile({ title = "", data = [] }) {
  return (
    <>
      <div className="grid">
        <div className="col-12">
          <div className="head">
            <span className="title">{title}</span>
          </div>
          <div className="content">
            <div className="child-list-products-mobile">
            {
                data && data.map((item, idx)=> item && (
                    <ProductCard key={idx} isMobile={false} {...item} />
                ))
            }
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .child-list-products-mobile {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 15px;
          }
        `}
      </style>
    </>
  );
}
