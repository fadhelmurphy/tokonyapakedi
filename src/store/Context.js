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
  const getOne = (id) => {
    return state.collection.AllCollection.filter((item) => item.id === id)[0];
  };
  const deleteAll = () => {
    dispatch({
      type: "DELETE_ALL_COLLECTION",
    });
  };
  const deleteOne = (id) => {
    dispatch({
      type: "DELETE_ONE_COLLECTION",
      payload: state.collection.AllCollection.filter((item) => item.id !== id),
    });
  };
  const updateAll = () => {};
  const updateOne = (payload) => {
    dispatch({
      type: "UPDATE_ONE_COLLECTION",
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
      deleteAll,
      deleteOne,
      updateAll,
      updateOne,
      // createAll,
      // createOne,
    }),
    [state, dispatch]
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
