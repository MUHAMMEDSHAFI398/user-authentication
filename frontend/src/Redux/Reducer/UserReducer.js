const initialState = {
userData: {},
    };
    
    const UserReducer = (prevState = initialState, action) => {
      switch (action.type) {
        case "storeuserData":
          return {
            ...prevState,
            userData: action.userData,
          };
  
        default:
          return initialState;
    
      }
    };
    
    export default UserReducer;