const intialCollection = {
  AllCollection: [],
  // DetailCollection: null,
};

export const collectionReducer = (state = intialCollection, action) => {
  const { type, payload } = action;
  let result = []
  console.log("prevState: ", state);
  console.log("action: ", action);
  switch (type) {
    case "ADD_SUB_TO_COLLECTION":
      result = state.AllCollection.map((ParentItem) => {
        if(payload.name.includes(ParentItem.name.toLowerCase())){
          ParentItem.list = [...ParentItem.list, payload.item]
        }
        return ParentItem;
      })
      return { ...state, AllCollection: result };
    case "ADD_TO_COLLECTION":
      result = { ...state, AllCollection: [...state.AllCollection, payload] }
      return result;
    case "DELETE_ALL_COLLECTION":
      return { ...state, AllCollection: [] };
    case "DELETE_ONE_COLLECTION":
      return { ...state, AllCollection: payload };
      case "UPDATE_ONE_COLLECTION":
        result = state.AllCollection.map((ParentItem) => {
          if(ParentItem.name === payload.name){
            ParentItem.name = payload.newName;
          }
          return ParentItem;
        })
        return { ...state, AllCollection: result };
    case "UPDATE_SUB_ONE_COLLECTION":
      result = state.AllCollection.map((ParentItem) => {
        if(ParentItem.name === payload.name){
          ParentItem.list && ParentItem.list.map((item)=>{
            if(item.id === payload.item.id){
              item.title.english = payload.item.title.english || item.title.english;
              item.title.romaji = payload.item.title.romaji || item.title.romaji;
              item.coverImage.large = payload.item.coverImage.large || item.coverImage.large;
            }
            return item;
          })
        }
        return ParentItem;
      })
      return { ...state, AllCollection: result };
    // case "GET_DETAIL_COLLECTION_SUCCESS":
    //   return { ...state, DetailCollection: payload };
    default:
      return state;
  }
};
