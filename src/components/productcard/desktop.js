import React from "react";

export default function Desktop({ href = "", coverImage: {
    large = ""
}, title: {
    english = "",
    romaji ="",
} }) {
  return (
    <>
      <div className="product-card-desktop">
        <div className="img-product">
            <a href={href}>
                <img src={large} />
            </a>
        </div>
        <div className="title">
            <span className="english">
                {english}
            </span>
            <span className="romaji">
                {romaji}
            </span>
        </div>
        <div class="action-card"><p>ADD</p></div>
      </div>
      <style>
        {`
        div.action-card {
            height: auto;
            width: 100%;
            box-sizing: border-box;
            z-index: 1;
            transition: all .5s ease;
          }
          div.action-card p {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 35px;
            background: #000;
            text-decoration: none;
            color: #fff;
            margin: 10px 0 0 0;
            box-sizing: border-box;
            cursor: pointer;
          }
            .img-product {
                width: 100%;
                height: 200px;
                background: #f2f2f2;
                position: relative;
                overflow: hidden;
            }
            .img-product a {
                display: block;
                height: 100%;
                width: 100%;
            }
            .img-product a img {
                object-fit: cover;
                height: 100%;
                width: 100%;
            }
            .title .english {
                font-size: 14px;
                font-weight: 600;
                line-height: 16px;
                margin: 10px 0 0 0;
                text-transform: uppercase;
                text-decoration: none;
                cursor: pointer;
                color: #000;
                word-break: break-word;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
            .title .romaji {
                font-size: 12px;
                font-weight: 400;
                line-height: 16px;
                color: #000;
                margin: 10px 0 0 0;
                text-transform: capitalize;
                /* word-break: break-word; */
                overflow: hidden;
                /* text-overflow: ellipsis; */
                display: -webkit-box;
                /* -webkit-line-clamp: 1; */
                -webkit-box-orient: vertical;
            }
        `}
      </style>
    </>
  );
}
