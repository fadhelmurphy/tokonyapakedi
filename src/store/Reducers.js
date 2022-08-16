const intialCollection = {
  AllCollection: [],
  DetailCollection: null,
};

export const collectionReducer = (state = intialCollection, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TO_COLLECTION":
      return { ...state, AllCollection: [...state.AllCollection, ...payload] };
    case "DELETE_ALL_COLLECTION":
      return { ...state, AllCollection: [] };
    case "DELETE_ONE_COLLECTION":
      return { ...state, AllCollection: payload };
    case "UPDATE_ONE_COLLECTION":
      const result = state.AllCollection.map((item)=>{
        if(item.id === payload.id){
          item.title.english = payload.title.english || item.title.english;
          item.title.romaji = payload.title.romaji || item.title.romaji;
          item.coverImage.large = payload.coverImage.large || item.coverImage.large;
        }
        return item;
      })
      return { ...state, AllCollection: result };
    case "GET_DETAIL_COLLECTION_SUCCESS":
      return { ...state, DetailCollection: payload };
    default:
      return state;
  }
};
