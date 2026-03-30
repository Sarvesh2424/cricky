function postReducer(state, action) {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.title };
    case "SET_CONTENT":
      return { ...state, content: action.content };
  }
}

export default postReducer;
