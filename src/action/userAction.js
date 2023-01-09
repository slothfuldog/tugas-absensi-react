export const loginAction = (data) => {
    return(
        {
            type: "LOGIN_ACTION",
            payload: data 
        }
    )
}
export const logoutAction = () =>{
    return({
        type: "LOGOUT_ACTION"
    })
}
export const loginStatus = () => {
    return({
        type: "LOGIN_AUTH"
    })
}
export const loginStatusFalse = () => {
    return({
        type: "LOGIN_AUTH_FALSE"
    })
}
export const isLoading = () => {
    return({
        type: "IS_LOADING"
    })
}
export const doneLoading = () => {
    return({
        type: "DONE_LOADING"
    })
}