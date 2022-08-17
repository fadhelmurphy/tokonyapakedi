import React, { useState } from "react";
import { withContext } from "../../store/Context";
import { Input } from "../../components/form";
const Button = React.lazy(() => import("../../components/button"));
const Drawer = React.lazy(() => import("../../components/drawer"));
const CollectionCard = React.lazy(() =>
  import("../../components/collectioncard")
);

const Collection = (props) => {
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

  const onAdd = () => {
    setFormNewCollection(undefined);
    handleShowDrawer("addCollection", true);
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
      <div className="container">
        <div className="collection-list">
        <h1>Your Collection</h1>
          <div onClick={() => onAdd()} className="action-card">
            <p>ADD</p>
          </div>
          {state?.collection?.AllCollection?.length === 0 && (
            <p>There's no collection yet</p>
          )}
          <CollectionCard
            isMobile={isMobile}
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
            onDelete={(val) => {
              setCurrentCollection(val);
              handleShowDrawer("deleteConfirmation", true);
            }}
          />
        </div>
      </div>
      <Drawer
        isMobile={isMobile}
        contentBackground="#ffffff"
        title="Edit Collection"
        show={showDrawer && showDrawer.editCollection}
        onSave={() => {
            
          if (!isNotValid) {
            const isCollectionExist = getOne(formNewCollection?.name);
            if (!isCollectionExist) {
                handleShowDrawer("editCollection", false);
                handleShowDrawer("listCollection", true);
                updateOne({
                  name: currentCollection.name,
                  newName: formNewCollection?.name,
                });
            } else {
              alert("Name Already exist! Please choose another name");
            }
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
        contentBackground="#ffffff"
        show={showDrawer && showDrawer.deleteConfirmation}
        zIndex={6}
        onHide={() => {
          handleShowDrawer("deleteConfirmation", false);
          // handleShowDrawer("address", true);
        }}
        type="confirmation"
        message="Are you sure you want to delete this collection?"
        onSave={() => {
          deleteOne(currentCollection.name);
          handleShowDrawer("deleteConfirmation", false);
          // handleShowDrawer("address", true);
        }}
      />

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
        onHide={() => {
          handleShowDrawer("addCollection", false);
        }}
        onBack={() => {
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
      <style jsx="true">
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
            background: #1B8884;
            text-decoration: none;
            color: #fff;
            margin: 10px 0 0 0;
            box-sizing: border-box;
            cursor: pointer;
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
export default withContext(Collection);
