import actions from "./actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.LOG_IN:
      return { ...state, user: action.payload };
    case actions.LOG_OUT:
      return { ...state, user: null };

    case actions.CURRENT_AUTHOR:
      return { ...state, author: action.payload };
    default:
      return state;
  }
};
