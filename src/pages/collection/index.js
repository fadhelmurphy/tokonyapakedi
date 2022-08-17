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
      <h1>Collection Page</h1>

      <div className="container">
        <div className="collection-list">
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
            onDelete={(val) => deleteOne(val.name)}
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
      <style jsx="true">
        {`
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
