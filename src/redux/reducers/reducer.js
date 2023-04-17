const INITIAL_STATES = {
  user: null,
  loader: false,
};

export default function (state = INITIAL_STATES, action) {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        posts: [],
      };
    case 'LOADER_START':
      return {
        ...state,
        loader: true,
      };
    case 'LOADER_STOP':
      return {
        ...state,
        loader: false,
      };

    default:
      return state;
  }
}
