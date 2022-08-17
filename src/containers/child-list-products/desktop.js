import React from "react";
import ProductCard from "../../components/productcard";

export default function Desktop({ title = "", data = [], ...props }) {
  return (
    <>
    <div className="section">
        <div className="head">
          <h1 className="title">{title}</h1>
        </div>
        <div className="content">
          <div className="child-list-products-desktop">
            {
                data && data.map((item, idx)=> item && (
                    <ProductCard key={idx} {...props} isMobile={false} {...item} />
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
            .child-list-products-desktop {
                display: grid;
                grid-template-columns: repeat(5,1fr);
                grid-gap: 15px;
            }
        `}
      </style>
    </>
  );
}
