import React from "react";
import { capitalizeFirstLetter } from "../../../helpers/utils";
const Button = React.lazy(() => import("../../button"));

export default function Desktop({ data = [], onChoose = () => {}, onInfo = () => {}, onEdit = () => {}, onDelete = () => {} }: any) {
  return (
    <>
      {data?.map((item: any, idx: any) => (
        <div
          key={idx}
          className={`collection-card${item.selected ? " active" : ""}`}
        >
          <div className="collection-card-content">
            <a href={`/collection/${item.name}`}>
              <h2>{capitalizeFirstLetter(item.name)}</h2>
            </a>
            <div className="bannerImage">
            <a href={`/collection/${item.name}`}>
              <img src={item.list[0]?.bannerImage || "https://via.placeholder.com/900x200?text=No%20Image%20Found"} alt={item.name}/>
              </a>
            </div>
          </div>
          <div className="collection-card-footer">
            <div className="action">
              <Button
                color="#000"
                size="medium"
                variant="secondary"
                font_family="system-ui"
                font_weight="500"
                on_click={() => {
                  return onEdit(item);
                  // HandleGetOneCollection(item.name);
                  // handleShowDrawer("editCollection", true);
                  // setFormNewCollection({ name: item.name });
                }}
              >
                EDIT
              </Button>
              <Button
                color="#000"
                size="medium"
                variant="secondary"
                font_family="system-ui"
                font_weight="500"
                on_click={() => {
                  // deleteOne(item.name)
                  return onDelete(item);
                    // deleteOne(item.name)
                }}
              >
                DELETE
              </Button>
            </div>
          </div>
        </div>
      ))}
      <style>
        {`
          .collection-card {
            border: 1px solid #dfe3e8;
          }
          .collection-card.active {
            border: 1px solid #000;
          }
          .collection-card h2 {
            font-family: "system-ui";
            text-transform: capitalize;
            display: flex;
            align-items: center;
          }
          .collection-card-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px;
            position: relative;
          }
          .collection-card-content a {
            text-decoration: none;
            color: #fff;
            position: absolute;
            z-index: 4;
          }
          .collection-card-content .bannerImage {
            width: 100%;
            height: 200px;
            background: #f2f2f2;
            position: relative;
            overflow: hidden;
            z-index: 1;
          }
          .collection-card-content .bannerImage a {
            display: block;
            height: 100%;
            width: 100%;
          }
          .collection-card-content .bannerImage img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .collection-card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f9fafb;
            padding: 15px;
          }
          .collection-card-footer .action button:not(:first-child) {
            margin: 0 0 0 10px;
          }
        `}
      </style>
    </>
  );
}
