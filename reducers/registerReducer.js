function registerReducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.email };
    case "SET_PASSWORD":
      return { ...state, password: action.password };
    case "SET_CONFIRM":
      return { ...state, confirm: action.confirm };
  }
}

export default registerReducer;
