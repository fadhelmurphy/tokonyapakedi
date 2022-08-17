import React, { useState } from "react";
import { GetRootContext, RootContext, withContext } from "../../store/Context";
// import Pagination from "../components/pagination";
import { Input } from "../../components/form";
import { useParams } from "react-router-dom";
const Button = React.lazy(() => import("../../components/button"));
const Drawer = React.lazy(() => import("../../components/drawer"));
const CollectionCard = React.lazy(() =>
  import("../../components/collectioncard")
);

const DetailCollection = (props) => {
  const router = useParams();
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
  const res = getOne(router.id);
  console.log(res)
  return (
    <>
      <div className="container">
      {res && (<h1>{res.name}</h1>)}
        <div className="collection-list">
            <p>Your Content here</p>
        </div>
      </div>
      
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

export default withContext(DetailCollection);
