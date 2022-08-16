import React from "react";
import ProductCard from "../../components/productcard";

export default function Desktop({ title = "", data = [], ...props }) {
  return (
    <>
    <div className="grid">
    <div className="col-12">
        <div className="head">
          <span className="title">{title}</span>
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
    </div>
      <style jsx>
        {`
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
