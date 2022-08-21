export type TypeMapper<T> = {
    [Prop in keyof T]: T[K]
}
export type TypeMapper2<T> = {
    [Prop in keyof T]: T[K]
}
// export type TypeMapper2<T> = {
//     [K in keyof T]: K extends undefined ? K : { type: K, payload: T[K] }
// }

type UserActionsType = {
    ['loginSuccess']: {
        isAuthnticated: boolean,
        profile: {
            username: string,
        },
    },
    ['loginFailure']: {

    },
    ['loginStart']: {

    },
    ['logoutUser']:{}
}
type CollectionActionsType = {
    ['ADD_SUB_TO_COLLECTION']: {
    },
    ['ADD_TO_COLLECTION']: {
    },
    ['DELETE_ALL_COLLECTION']: {
    },
    ['DELETE_ONE_COLLECTION']: {
    },
    ['UPDATE_ONE_COLLECTION']: {
    },
    ['UPDATE_SUB_ONE_COLLECTION']: {
    },
}
type LecturerActionsType = {
    ['fetchLecturersSuccess']: {
        isAuthnticated: boolean,
        profile: {
            username: string,

        }
    },
    ['fetChLecturersFailure']: {

    },
    ['fetchLecturersStart']: {

    }
}

export type IuserStateType={
    isAuthenticated:boolean
    profile:{
        [x:string]:any
    }
}

export type ICollectionStateType={
    AllCollection: any[]
}

export type IGlobalStateInterface = {
    // user:IuserStateType
    collection: ICollectionStateType
    [x:string]:any
}
export type AppStateActionTypes =  
// TypeMapper2<UserActionsType>[keyof UserActionsType] | 
TypeMapper2<CollectionActionsType>[keyof CollectionActionsType]




