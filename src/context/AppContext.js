import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const contextStore = createContext({});
const { Provider } = contextStore;

function reducer(state, action) {
  const { type } = action;
  const nextState = { ...state };

  switch (type) {
    case 'updateModelLink':
      nextState.modelURL = action.payload;
      break;
    case 'updateModels':
      nextState.models = action.payload;
      break;
    case 'setHomeLoading':
      nextState.homePageLoading = action.payload;
      break;
    default:
      throw new Error(`Action: ${type} is unsupported`);
  }
  return { ...nextState };
}

/** The initial state here is updating our state object.
 * The React Context creates a Provider with a value that is passed across the component heirarchy.
 * Sharing the context object allows consumers to subscribe to the Provider's value.
 * In this case, subscribing to the context object allows you to access 'state' and 'dispatch'.
 * The context is intitially empty until the Provider sets the value.
 * The Provider's value is 2 objects: a store, and a dipatch function that accepts an action.
 * The action will include a type property (to be fed into the reducer switch statement above),
 *   and typically a payload (data to be used by that action type).
 *
 *      function dispatch(action){...}
 *        - @param action: {type: <string>, payload:{data}}
 *        - @returns: <void>
 *        - calls reducer w/ the reducer's instance state and the dispatch's action param
 * */
function StateProvider({ children, initialState }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

StateProvider.propTypes = {
  children: PropTypes.element.isRequired,
  initialState: PropTypes.shape({}).isRequired,
};

export { contextStore, StateProvider };
