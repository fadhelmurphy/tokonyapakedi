import React, { useState } from "react";
import { GetRootContext, RootContext, withContext } from "../../store/Context";
// import Pagination from "../components/pagination";
import { Input } from "../../components/form";
import { useNavigate, useParams } from "react-router-dom";
const Button = React.lazy(() => import("../../components/button"));
const Drawer = React.lazy(() => import("../../components/drawer"));
const CollectionCard = React.lazy(() =>
  import("../../components/collectioncard")
);

const DetailCollection = (props) => {
  const router = useParams();
  let navigate = useNavigate();
  const {
    state,
    getOne,
    getSubOne,
    deleteAll,
    create,
    updateOne,
    deleteOne,
    deleteSubOne,
    createSubOne,
    updateSelectedCollection,
  } = props;
  const isMobile = Boolean(
    window.navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );
  const currentCollection = getOne(router.name);
  const handleShowDrawer = (key, val) =>
    setShowDrawer((prev) => ({ ...prev, [key]: val }));
  const [selectedAnime, setSelectedAnime] = useState({});
  const [showDrawer, setShowDrawer] = useState({
    listCollection: false,
    detailCollection: false,
    addCollection: false,
    editCollection: false,
    deleteConfirmation: false,
  });
  return (
    <>
      <div className="container">
        <div className="collection-list">
          {currentCollection && <h1>{currentCollection.name}</h1>}
          {currentCollection && currentCollection?.list?.length === 0 && (
            <p>There's no movie yet</p>
          )}
          {currentCollection &&
            currentCollection?.list?.map((item, idx) => (
              <div
                key={idx}
                className={`collection-card${item.selected ? " active" : ""}`}
              >
                <div className="collection-card-content">
                  <div className="grid">
                    <div className="col-4">
                      <img src={item.coverImage.large} alt="image detail" />
                    </div>
                    <div className="col-8">
                      <h2 onClick={() => navigate(`/anime/${item.id}`)}>
                        {item.title?.english || item.title?.romaji}
                      </h2>

                      <span className="rating">
                        <p>
                          Rating : <b>{item.averageScore}%</b>
                        </p>
                      </span>

                      <span className="genres">
                        <p>
                          Genre :{" "}
                          <b>
                            {
                              // Checks whether genre has true in order to display
                              item.genres && item.genres.length >= 1
                                ? item.genres.join(", ")
                                : "Unknown"
                            }
                          </b>
                        </p>
                      </span>

                      <span className="episodes">
                        <p>
                          Episodes : <b>{item.episodes}</b>
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="collection-card-footer">
                  <div className="action">
                    <Button
                      color="#000"
                      size="medium"
                      variant="secondary"
                      font_family="Poppins"
                      font_weight="500"
                      on_click={() => {
                        setSelectedAnime(item);
                        handleShowDrawer("deleteConfirmation", true);
                      }}
                    >
                      DELETE
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Drawer
        contentBackground="#ffffff"
        show={showDrawer && showDrawer.deleteConfirmation}
        zIndex={6}
        onHide={() => {
          handleShowDrawer("deleteConfirmation", false);
          // handleShowDrawer("address", true);
        }}
        type="confirmation"
        message="Are you sure you want to delete this movie?"
        onSave={() => {
          deleteSubOne(currentCollection.name, selectedAnime.id);
          handleShowDrawer("deleteConfirmation", false);
          // handleShowDrawer("address", true);
        }}
      />
      <style jsx="true">
        {`
          .collection-card h2 {
            font-family: "Poppins";
            font-style: normal;
            font-weight: 600;
            text-transform: capitalize;
            display: flex;
            align-items: center;
            cursor: pointer;
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
          .collection-card-content .grid .col-8 {
            align-self: center;
            padding: 10px;
          }
          .collection-card-content .grid .col-4 img {
            width: 100%;
            height: 200px;
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
          .collection-list {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 16px;
            padding: 20px;
          }
        `}
      </style>
    </>
  );
};

export default withContext(DetailCollection);
