/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { combineReducer } from "./CombinedReducers";
import { collectionReducer } from "./Reducers";

export const RootContext = createContext({});

export const STORAGE_KEY = "rootState";

const Context = ({ children }) => {
  //#COMBINE STATE
  const rootReducer = { collection: collectionReducer };
  const reducers = useCallback(() => {
    return combineReducer(rootReducer);
  }, []);
  // call the function to get initial state and global reducer
  const [initialState, mainReducer] = reducers();
  // setup useReducer with the returned value of the reducers function
  const [state, dispatch] = useReducer(mainReducer, initialState, () => {
    const Local = localStorage.getItem(STORAGE_KEY);
    const ParseLocal = JSON.parse(Local);
    return Local ? ParseLocal : initialState;
  });

  // CRUD COLLECTION
  const create = (payload) => {
    dispatch({
      type: "ADD_TO_COLLECTION",
      payload,
    });
  };
  const createSubOne = (payload) => {
    dispatch({
      type: "ADD_SUB_TO_COLLECTION",
      payload, // {name: Array, item: Object {}}
    });
  };
  const getOne = (name) => {
    const get = state.collection.AllCollection.filter((item) => item.name.toLowerCase() === name.toLowerCase())
    return get.length > 0 ? get[0] : false;
  };
  const getSubOne = (name, id) => {
    const get = state.collection.AllCollection.filter((item) => item.name === name)[0].list.filter((item) => item.id === id);
    return get.length > 0 ? get[0] : false;
  };
  const deleteAll = () => {
    dispatch({
      type: "DELETE_ALL_COLLECTION",
    });
  };
  const deleteOne = (name) => {
    dispatch({
      type: "DELETE_ONE_COLLECTION",
      payload: state.collection.AllCollection.filter((item) => item.name !== name),
    });
  };
  const deleteSubOne = (name, id) => {
    const res = state.collection.AllCollection.map((item)=>{
      if(item.name === name){
        return {...item, list: item.list.filter((childItem) => childItem.id !== id)}
      }
      return item;
    })
    dispatch({
      type: "DELETE_ONE_COLLECTION",
      payload: res,
    });
  };
  const updateAll = () => {};
  const updateOne = (payload) => {
    dispatch({
      type: "UPDATE_ONE_COLLECTION",
      payload, // {name: String, newName: String}
    });
  };
  const updateSubOne = (payload) => {
    dispatch({
      type: "UPDATE_SUB_ONE_COLLECTION",
      payload, // {name: String, item: Object {}}
    });
  };
  const updateSelectedCollection = (payload) => {
    dispatch({
      type: "DELETE_ONE_COLLECTION",
      payload, 
    });
  };
  // const createAll = () => {};
  // const createOne = (id) => {};

  // pass in the returned value of useReducer
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      // action collection
      create,
      getOne,
      getSubOne,
      deleteAll,
      deleteOne,
      deleteSubOne,
      updateAll,
      createSubOne,
      updateOne,
      updateSubOne,
      updateSelectedCollection,
      // updateOne,
      // createAll,
      // createOne,
    }),
    [state, dispatch,
      // action collection
      create,
      getOne,
      getSubOne,
      deleteAll,
      deleteOne,
      deleteSubOne,
      updateAll,
      createSubOne,
      updateOne,
      updateSubOne,
      updateSelectedCollection]
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <RootContext.Provider value={contextValue}>{children}</RootContext.Provider>
  );
};

export const GetRootContext = () => useContext(RootContext);

export const withContext = (Component) => {
  return (props) => {
    return (
      <RootContext.Consumer>
        {(value) => {
          return <Component {...props} {...value} />;
        }}
      </RootContext.Consumer>
    );
  };
};

export default Context;
