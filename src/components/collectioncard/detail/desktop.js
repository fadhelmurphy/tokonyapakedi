import React from "react";
const Button = React.lazy(() => import("../../button"));

export default function Desktop({ data = [], onChoose = () => {}, onInfo = () => {}, onEdit = () => {}, onDelete = () => {} }) {
  return (
    <>
      {data?.map((item, idx) => (
        <div
          key={idx}
          className={`collection-card${item.selected ? " active" : ""}`}
        >
          <div className="collection-card-content">
            <a href={`/collection/${item.name}`}>
              <h3>{item.name}</h3>
            </a>
          </div>
          <div className="collection-card-footer">
            <div className="action">
              <Button
                size="medium"
                variant="primary"
                font_family="Poppins"
                font_weight="500"
                on_click={() => {
                  // HandleChooseCollection({
                  //   key: idx,
                  //   selected: item.selected,
                  // });
                  onChoose({
                    key: idx,
                    selected: item.selected,
                  });
                }}
              >
                {item.selected? "Unselect" : "Choose"}
              </Button>
              <Button
                color="#000"
                size="medium"
                variant="secondary"
                font_family="Poppins"
                font_weight="500"
                on_click={() => {
                  onInfo(item);
                  // HandleGetOneCollection(item.name);
                  // handleShowDrawer("detailCollection", true);
                }}
              >
                INFO
              </Button>
              <Button
                color="#000"
                size="medium"
                variant="secondary"
                font_family="Poppins"
                font_weight="500"
                on_click={() => {
                  window.location = `${process.env.REACT_APP_BASEURL}/collection/${item?.name}`;
                }}
              >
                DETAILS
              </Button>
              <Button
                color="#000"
                size="medium"
                variant="secondary"
                font_family="Poppins"
                font_weight="500"
                on_click={() => {
                  onEdit(item);
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
                font_family="Poppins"
                font_weight="500"
                on_click={() => {
                  // deleteOne(item.name)
                  onDelete(item);
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
          .collection-card h4 {
            font-family: "Poppins";
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 22px;
            letter-spacing: 0.04em;
            text-transform: capitalize;
            margin-bottom: 9px;
            display: flex;
            align-items: center;
          }
          .collection-card-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px;
          }
          .collection-card-content a {
            text-decoration: none;
            color: #000;
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
