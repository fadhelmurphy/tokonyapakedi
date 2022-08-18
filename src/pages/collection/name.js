import React, { useState } from "react";
import { GetRootContext, RootContext, withContext } from "../../store/Context";
import styled from "@emotion/styled";
// import Pagination from "../components/pagination";
import { Input } from "../../components/form";
import { useNavigate, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../helpers/utils";
import { css } from "@emotion/css";
const Button = React.lazy(() => import("../../components/button"));
const Drawer = React.lazy(() => import("../../components/drawer"));
const CollectionCard = React.lazy(() =>
  import("../../components/collectioncard")
);
const Layout = React.lazy(() => import("../../containers/layout"));

const DetailCollection = (props) => {
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
  const [formNewCollection, setFormNewCollection] = useState();
  const [isNotValid, setNotValid] = useState(false);
  const HandleChangeSelect = async (opt, val) => {
    if (opt === "name") {
      setFormNewCollection((prev) => ({
        ...prev,
        name: val,
      }));
    }
  };
  const title = capitalizeFirstLetter((currentCollection?.name) || "Loading...");
  const CollectionList = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding: 20px;
  
  & .collection-card h2 {
    font-family: "system-ui";
    font-style: normal;
    font-weight: 600;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  & .collection-card-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
  }
  & .collection-card-content a {
    text-decoration: none;
    color: #000;
  }
  & .collection-card-content .grid .col-8 {
    align-self: center;
    padding: 10px;
  }
  & .collection-card-content .grid .col-4 img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  & .collection-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f9fafb;
    padding: 15px;
  }
  & .collection-card-footer .action button:not(:first-child) {
    margin: 0 0 0 10px;
  }
  `
  
  const ActionCard = styled.div`
  height: auto;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  & p {
    font-weight: 500;
    border-radius: 5px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 35px;
    background: #1b8884;
    text-decoration: none;
    color: #fff;
    margin: 10px 0 0 0;
    box-sizing: border-box;
    cursor: pointer;
  }
`;
const ContainerAction = styled.div`
display: grid;
grid-template-columns: repeat(${isMobile ? "1" : "2"}, 1fr);
grid-gap: 16px;
padding: 20px;
`
  return (
    <Layout title={title}>
      <>
        <div className="container">
        <div className={CollectionList}>
            <ContainerAction>
            {currentCollection && (
              <h1>{title}</h1>
            )}
            <ActionCard onClick={() => {
              handleShowDrawer("editCollection", true);
              setFormNewCollection({ name: title });
            }} className="action-card">
              <p>Edit</p>
            </ActionCard>
            </ContainerAction>
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
                        font_family="system-ui"
                        font_weight="500"
                        on_click={() => {
                          setSelectedAnime(item);
                          handleShowDrawer("deleteConfirmation", true);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Drawer
          isMobile={isMobile}
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
                navigate(`/collection/${formNewCollection?.name}`)
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
          <div className={CollectionList}>
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
      </>
    </Layout>
  );
};

export default withContext(DetailCollection);
