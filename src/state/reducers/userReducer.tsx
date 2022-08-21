import { AppStateActionTypes, IuserStateType } from "state/types"

function userReducer(state: IuserStateType, action: AppStateActionTypes) {
    switch (action.type) {
        case "loginStart":
            return { ...state }
        case "loginFailure":
            return { ...state }
        case 'loginSuccess':
            return { ...state, ...action.payload }
        case "logoutUser":
            return {
                isAuthenticated: false,
                profile: {}
            }
        default:
            return state

    }
}

export default userReducer;
