import React, { useEffect, useState } from "react";
import { GetRootContext, RootContext, withContext } from "../../store/Context";
import { _getAll, _getDetail } from "../../helpers/fetchers";
import ChildListProducts from "../../containers/child-list-products";
import { ScrollToUp } from "../../helpers/utils";
// import Pagination from "../components/pagination";
import { Input } from "../../components/form";
import { useNavigate, useParams } from "react-router-dom";
const Button = React.lazy(() => import("../../components/button"));
const Drawer = React.lazy(() => import("../../components/drawer"));
const CollectionCard = React.lazy(() =>
  import("../../components/collectioncard")
);
const ChildDetailAnime = React.lazy(() =>
  import("../../containers/child-detail-anime")
);

const Detail = (props) => {
  const router = useParams();
  const navigate = useNavigate();
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
  const { result, loading } = _getDetail({ id: router?.id });
  const handleShowDrawer = (key, val) =>
    setShowDrawer((prev) => ({ ...prev, [key]: val }));
  const [selectedAnime, setSelectedAnime] = useState({});
  const [showDrawer, setShowDrawer] = useState({
    listCollection: false,
    detailCollection: false,
    addCollection: false,
    editCollection: false,
  });

  const [formNewCollection, setFormNewCollection] = useState();
  const [currentCollection, setCurrentCollection] = useState({});
  const HandleChooseCollection = (params) => {
    const { key, selected } = params;

    const updatedList =
      state?.collection?.AllCollection &&
      state?.collection?.AllCollection.map((item, idx) => {
        if (idx === key) {
          return { ...item, selected: !selected };
        }
        return { ...item };
      });

    updateSelectedCollection(updatedList);
  };

  const HandleGetOneCollection = (name) => {
    setCurrentCollection(getOne(name));
  };

  const onAdd = (val) => {
    setSelectedAnime(val);
    handleShowDrawer("listCollection", true);
  };

  const [isNotValid, setNotValid] = useState(false);

  const HandleChangeSelect = async (opt, val) => {
    if (opt === "name") {
      setFormNewCollection((prev) => ({
        ...prev,
        name: val,
      }));
    }
  };
  return (
    <>
      {result && (
        <ChildDetailAnime
          isMobile={isMobile}
          {...result}
          onAdd={(val) => onAdd(val)}
        />
      )}

      <Drawer
        isMobile={isMobile}
        contentBackground="#ffffff"
        title="Your Collection"
        show={showDrawer && showDrawer.listCollection}
        onHide={() => {
          handleShowDrawer("listCollection", false);
        }}
        onSave={() => {
          setFormNewCollection(undefined);
          handleShowDrawer("listCollection", false);
          handleShowDrawer("addCollection", true);
        }}
        onSelect={() => {
          const selected = state?.collection?.AllCollection.filter(
            (item) => item.selected
          );
          const name = selected.map((item) => item.name.toLowerCase());
          let canAdd = [];
          name.map((thename) => {
            const get = getSubOne(thename, selectedAnime.id);
            if (get) {
              canAdd.push(thename);
            }
          });
          if (canAdd.length > 0) {
            canAdd.map((item) => {
              alert(
                `${
                  selectedAnime.title.english || selectedAnime.title.romaji
                } already added to ${item}, please select another collection`
              );
            });
          } else {
            selected?.length > 0 && createSubOne({ name, item: selectedAnime });
            updateSelectedCollection(
              state?.collection?.AllCollection.map((item) => {
                item.selected = false;
                return item;
              })
            );
            handleShowDrawer("listCollection", false);
          }
        }}
        type="type-1"
        saveTitle="ADD NEW COLLECTION"
      >
        <div className="collection-list">
          {state?.collection?.AllCollection?.length === 0 && (
            <p>There's no collection yet</p>
          )}
          <CollectionCard
            data={state?.collection?.AllCollection}
            onChoose={({ key, selected }) =>
              HandleChooseCollection({
                key,
                selected,
              })
            }
            onInfo={(val) => {
              HandleGetOneCollection(val.name);
              handleShowDrawer("detailCollection", true);
            }}
            onEdit={(val) => {
              HandleGetOneCollection(val.name);
              handleShowDrawer("editCollection", true);
              setFormNewCollection({ name: val.name });
            }}
            onDelete={(val) => deleteOne(val.name)}
          />
        </div>
      </Drawer>
      <Drawer
        isMobile={isMobile}
        contentBackground="#ffffff"
        title={currentCollection.name}
        show={showDrawer && showDrawer.detailCollection}
        onSave={() => {
          handleShowDrawer("detailCollection", false);
          handleShowDrawer("listCollection", true);
        }}
        onBack={() => {
          handleShowDrawer("listCollection", true);
          handleShowDrawer("detailCollection", false);
        }}
        type="type-1"
        saveTitle="ADD NEW COLLECTION"
      >
        <div className="collection-list">
          {currentCollection?.list?.length === 0 && <p>There's no movie yet</p>}
          {currentCollection?.list?.map((item, idx) => (
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
                    <h2>{item.title?.english || item.title?.romaji}</h2>

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
                      window.location = `${process.env.REACT_APP_BASEURL}/anime/${item?.id}`;
                    }}
                  >
                    SEE DETAIL
                  </Button>
                  <Button
                    color="#000"
                    size="medium"
                    variant="secondary"
                    font_family="Poppins"
                    font_weight="500"
                    on_click={() => {
                      deleteSubOne(currentCollection.name, item.id);
                      handleShowDrawer("detailCollection", false);
                      handleShowDrawer("listCollection", true);
                    }}
                  >
                    DELETE
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Drawer>
      <Drawer
        isMobile={isMobile}
        contentBackground="#ffffff"
        title="Edit Collection"
        show={showDrawer && showDrawer.editCollection}
        onSave={() => {
          if (!isNotValid) {
            handleShowDrawer("editCollection", false);
            handleShowDrawer("listCollection", true);
            updateOne({
              name: currentCollection.name,
              newName: formNewCollection?.name,
            });
          }
        }}
        onBack={() => {
          handleShowDrawer("listCollection", true);
          handleShowDrawer("editCollection", false);
        }}
        type="type-1"
        saveTitle="SUBMIT"
      >
        <div className="collection-list">
          <Input
            label="Name"
            value={formNewCollection?.name || ""}
            onChange={(val) => HandleChangeSelect("name", val)}
            validation={!formNewCollection?.name?.length > 0}
            ifNotValid={(val) => setNotValid(val)}
            placeholder="Example : MEME"
          />
        </div>
      </Drawer>
      <Drawer
        isMobile={isMobile}
        contentBackground="#ffffff"
        title="New Collection"
        show={showDrawer && showDrawer.addCollection}
        onSave={() => {
          if (!isNotValid) {
            const isCollectionExist = getOne(formNewCollection?.name);
            if (!isCollectionExist) {
              handleShowDrawer("addCollection", false);
              handleShowDrawer("listCollection", true);
              create({
                name: formNewCollection?.name,
                list: [],
                selected: false,
              });
            } else {
              alert("Name Already exist! Please choose another name");
            }
          }
        }}
        onBack={() => {
          handleShowDrawer("listCollection", true);
          handleShowDrawer("addCollection", false);
        }}
        type="type-1"
        saveTitle="SUBMIT"
      >
        <div className="collection-list">
          <Input
            label="Name"
            value={formNewCollection?.name || ""}
            onChange={(val) => HandleChangeSelect("name", val)}
            validation={!formNewCollection?.name?.length > 0}
            ifNotValid={(val) => setNotValid(val)}
            placeholder="Example : MEME"
          />
        </div>
      </Drawer>

      <style jsx>
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
          .collection-card-content .grid .col-8 {
            align-self: center;
          }
          .collection-card-content .grid .col-4 {
            padding: 10px;
          }
          .collection-card-content .grid .col-4 img {
            width: 100%;
            height: 150px;
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
export default withContext(Detail);
