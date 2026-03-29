function loginReducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.email };
    case "SET_PASSWORD":
      return { ...state, password: action.password };
  }
}

export default loginReducer;
