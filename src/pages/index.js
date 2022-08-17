import React, { useEffect, useState } from "react";
import { withContext } from "../store/Context";
import { _getAll } from "../helpers/fetchers";
import ChildListProducts from "../containers/child-list-products";
import { ScrollToUp } from "../helpers/utils";
// import Pagination from "../components/pagination";
import { Input } from "../components/form";
const Button = React.lazy(() => import("../components/button"));
const Drawer = React.lazy(() => import("../components/drawer"));
const Pagination = React.lazy(() => import("../components/pagination"));

const Home = (props) => {
  const {
    state,
    getOne,
    deleteAll,
    create,
    updateOne,
    deleteOne,
    createSubOne,
    updateSelectedCollection,
  } = props;
  const [formNewCollection, setFormNewCollection] = useState();
  const [currentCollection, setCurrentCollection] = useState({});
  const [showDrawer, setShowDrawer] = useState({
    listCollection: false,
    detailCollection: false,
    addCollection: false,
    editCollection: false,
  });
  const [page, setPage] = useState(1);
  const [isNotValid, setNotValid] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState({});
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
  const handleShowDrawer = (key, val) =>
    setShowDrawer((prev) => ({ ...prev, [key]: val }));
  // deleteAll();
  // const getOneCollection = getOne(16498);
  const { result, loading, refetch } = _getAll({ page, perPage: 16 });
  // result && create(result);
  // result && deleteAll();
  // updateOne({id:updateOne, title: {english: "Padelpop"}})
  // useEffect(() => {
  //   // updateOne({id:updateOne, title: {english: "Padelpop"}})
  // }, [])
  const isMobile = Boolean(
    window.navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );
  const onAdd = (val) => {
    setSelectedAnime(val);
    handleShowDrawer("listCollection", true);
  };
  const HandleLoadMore = async (e) => {
    ScrollToUp();
    setPage(e);
    refetch(e);
  };
  const HandleChangeSelect = async (opt, val) => {
    if (opt === "name") {
      setFormNewCollection((prev) => ({
        ...prev,
        name: val,
      }));
    }
  };
  const HandleGetOneCollection = (name) => {
    setCurrentCollection(getOne(name));
  };

  // console.log(selectedAnime, "selectedAnime")
  console.log(state?.collection?.AllCollection, "JOSS");

  return (
    <>
      <h1>Product List</h1>
      {loading}
      <div className="container">
        {result && result.media && (
          <ChildListProducts
            isMobile={isMobile}
            data={result.media}
            onAdd={(val) => onAdd(val)}
          />
        )}
        {result && result.pageInfo && (
          <Pagination
            page={result?.pageInfo?.currentPage}
            total_page={result?.pageInfo?.lastPage}
            update_page={(e) => HandleLoadMore(e)}
            is_mobile={false}
          />
        )}
      </div>
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
        onBack={() => {
          handleShowDrawer("listCollection", false);
        }}
        onSelect={() => {
          const selected = state?.collection?.AllCollection.filter(
            (item) => item.selected
          );
          const name = selected.map((item) => item.name.toLowerCase());
          selected?.length > 0 && createSubOne({ name, item: selectedAnime });
          updateSelectedCollection(
            state?.collection?.AllCollection.map((item) => {
              item.selected = false;
              return item;
            })
          );
          handleShowDrawer("listCollection", false);
        }}
        type="type-1"
        saveTitle="ADD NEW COLLECTION"
      >
        <div className="collection-list">
          {state?.collection?.AllCollection?.length === 0 && (
            <p>There's no collection yet</p>
          )}
          {state?.collection?.AllCollection?.map((item, idx) => (
            <div
              key={idx}
              className={`collection-card${item.selected ? " active" : ""}`}
            >
              <div className="collection-card-content">
                <h3>{item.name}</h3>
              </div>
              <div className="collection-card-footer">
                <div className="action">
                  <Button
                    color="#000"
                    size="medium"
                    variant="primary"
                    font_family="Poppins"
                    font_weight="500"
                    on_click={() => {
                      HandleChooseCollection({
                        key: idx,
                        selected: item.selected,
                      });
                    }}
                  >
                    Choose
                  </Button>
                  <Button
                    color="#000"
                    size="medium"
                    variant="secondary"
                    font_family="Poppins"
                    font_weight="500"
                    on_click={() => {
                      HandleGetOneCollection(item.name);
                      handleShowDrawer("detailCollection", true);
                    }}
                  >
                    SEE LIST
                  </Button>
                  <Button
                    color="#000"
                    size="medium"
                    variant="secondary"
                    font_family="Poppins"
                    font_weight="500"
                    on_click={() => {
                      HandleGetOneCollection(item.name);
                      handleShowDrawer("editCollection", true);
                      setFormNewCollection({ name: item.name });
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
                    on_click={() => deleteOne(item.name)}
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
        title={currentCollection.name}
        show={showDrawer && showDrawer.detailCollection}
        onHide={() => {
          handleShowDrawer("listCollection", false);
          handleShowDrawer("detailCollection", false);
        }}
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
        <div className="collection-list"></div>
      </Drawer>
      <Drawer
        isMobile={isMobile}
        contentBackground="#ffffff"
        title="Edit Collection"
        show={showDrawer && showDrawer.editCollection}
        onHide={() => {
          handleShowDrawer("listCollection", false);
          handleShowDrawer("editCollection", false);
        }}
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
        onHide={() => {
          handleShowDrawer("listCollection", false);
          handleShowDrawer("addCollection", false);
        }}
        onSave={() => {
          if (!isNotValid) {
            handleShowDrawer("addCollection", false);
            handleShowDrawer("listCollection", true);
            create({
              name: formNewCollection?.name,
              list: [],
              selected: false,
            });
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
export default withContext(Home);
