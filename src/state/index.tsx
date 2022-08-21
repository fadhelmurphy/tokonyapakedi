/* eslint-disable react-hooks/exhaustive-deps */
import APP_STATE_NAME from "constants/app.name";
import React, { useMemo } from "react";
// import userReducer from "state/reducers/userReducer";
import CollectionReducer from "./reducers/collectionReducer";
import {
  AppStateActionTypes,
  IGlobalStateInterface,
  TypeMapper,
} from "./types";

const initialState: IGlobalStateInterface = {
//   user: localStorage.getItem(APP_STATE_NAME)
//     ? JSON.parse(localStorage.getItem(APP_STATE_NAME)!)
//     : { isAuthenticated: false, profile: {} },
  collection: {
    AllCollection: [],
  },
};

type ContextState = {
  state: IGlobalStateInterface;
  dispatch: React.Dispatch<TypeMapper<AppStateActionTypes>>;
  create: (props:any) => void;
  getOne: (props: any) => void;
  getSubOne: (a: any, b: any) => void;
  deleteAll: (props: any) => void;
  deleteOne: (props: any) => void;
  deleteSubOne: (a: any, b: any) => void;
  updateAll: (props: any) => void;
  createSubOne: (props: any) => void;
  updateOne: (props: any) => void;
  updateSubOne: (props: any) => void;
  updateSelectedCollection: (props: any) => void;
};

const AppContext = React.createContext<ContextState>({
  dispatch: () => null,
  state: initialState,
  create: () => null,
  getOne: () => null,
  getSubOne: () => null,
  deleteAll: () => null,
  deleteOne: () => null,
  deleteSubOne: () => null,
  updateAll: () => null,
  createSubOne: () => null,
  updateOne: () => null,
  updateSubOne: () => null,
  updateSelectedCollection: () => null,
});

const combinedReducers = (
  { 
    // user, 
    collection }: any,
  action: AppStateActionTypes
) => ({
//   user: userReducer(user, action),
  collection: CollectionReducer(collection, action),
});

const AppState = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = React.useReducer(
    combinedReducers,
    initialState,
    () => {
      const Local: any = localStorage.getItem(APP_STATE_NAME);
      const ParseLocal = JSON.parse(Local);
      return Local ? ParseLocal : initialState;
    }
  );
  //   console.log(state, "JOSS");

  // CRUD COLLECTION
  const create = (payload: any): void => {
    dispatch({
      type: "ADD_TO_COLLECTION",
      payload,
    });
  };
  const createSubOne = (payload: any): void => {
    dispatch({
      type: "ADD_SUB_TO_COLLECTION",
      payload, // {name: Array, item: Object {}}
    });
  };
  const getOne = (name: string): void => {
    const get = state.collection.AllCollection.filter(
      (item: any) => item.name.toLowerCase() === name.toLowerCase()
    );
    return get.length > 0 ? get[0] : false;
  };
  const getSubOne = (name: string, id: number): void => {
    const get = state.collection.AllCollection.filter(
      (item: any) => item.name.toLowerCase() === name.toLowerCase()
    )[0].list.filter((item: { id: number }) => item.id === id);
    return get.length > 0 ? get[0] : false;
  };
  const deleteAll = () => {
    dispatch({
      type: "DELETE_ALL_COLLECTION",
    });
  };
  const deleteOne = (name: string): void => {
    dispatch({
      type: "DELETE_ONE_COLLECTION",
      payload: state.collection.AllCollection.filter(
        (item: any) => item.name !== name
      ),
    });
  };
  const deleteSubOne = (name: string, id: number): void => {
    const res = state.collection.AllCollection.map((item: any) => {
      if (item.name === name) {
        return {
          ...item,
          list: item.list.filter(
            (childItem: { id: number }) => childItem.id !== id
          ),
        };
      }
      return item;
    });
    dispatch({
      type: "DELETE_ONE_COLLECTION",
      payload: res,
    });
  };
  const updateAll = () => {};
  const updateOne = (payload: any): void => {
    dispatch({
      type: "UPDATE_ONE_COLLECTION",
      payload, // {name: String, newName: String}
    });
  };
  const updateSubOne = (payload: any): void => {
    dispatch({
      type: "UPDATE_SUB_ONE_COLLECTION",
      payload, // {name: String, item: Object {}}
    });
  };
  const updateSelectedCollection = (payload: any): void => {
    dispatch({
      type: "DELETE_ONE_COLLECTION",
      payload,
    });
  };

  const contextValue: any = useMemo(
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
    }),
    [
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
    ]
  );

//   console.log(contextValue, "contextValue");

  React.useEffect(() => {
    localStorage.setItem(APP_STATE_NAME, JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const withContext = (Component: any) => {
  return (props: any) => {
    return (
      <AppContext.Consumer>
        {(value: any) => {
          return <Component {...props} {...value} />;
        }}
      </AppContext.Consumer>
    );
  };
};

export { AppContext };

export default AppState;
