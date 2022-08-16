import React, { useEffect } from "react";
import { withContext } from "../store/Context";
import { _getAll } from "../helpers/fetchers";
import ChildListProducts from "../containers/child-list-products";

const Home = (props) => {
  const { getOne, deleteAll, create, updateOne } = props;
  deleteAll();
  // const getOneCollection = getOne(16498);
  const { result, loading } = _getAll();
  // result && create(result);
  // result && deleteAll();
  // updateOne({id:updateOne, title: {english: "Padelpop"}})
  // useEffect(() => {
  //   // updateOne({id:updateOne, title: {english: "Padelpop"}})
  // }, [])
  var isMobile = Boolean(
    window.navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return (
    <>
      <h1>NGANU</h1>
      {loading}
      <div className="container">
        <ChildListProducts isMobile={isMobile} data={result} />
      </div>
    </>
  );
};
export default withContext(Home);
