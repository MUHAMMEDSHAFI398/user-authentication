export const storeuserData =(userData)=>{
    return (dispatch)=>{
        dispatch({
            type:"storeuserData",
            userData:userData,
        })
    }
}