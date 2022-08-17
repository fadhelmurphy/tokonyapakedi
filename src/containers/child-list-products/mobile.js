import React from "react";
import ProductCard from "../../components/productcard";

export default function Mobile({ title = "", data = [], ...props }) {
  return (
    <>
        <div className="section">
          <div className="head">
            <h1 className="title">{title}</h1>
          </div>
          <div className="content">
            <div className="child-list-products-mobile">
            {
                data && data.map((item, idx)=> item && (
                    <ProductCard key={idx} isMobile={false} {...props} {...item} />
                ))
            }
            </div>
          </div>
        </div>
      <style jsx="true">
        {`
        .section {
            background: #fff;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 20px;
        }
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
