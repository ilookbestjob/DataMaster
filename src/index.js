import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Orders from "./Orders";
import Filter from "./Filter";
const InitialState = {
  Orders: [],
  Expanded: [],
  LastExpand: -1,
  OrdersError: ""
};

const Reducer = (state = InitialState, action) => {
  let newState;
  switch (action.type) {
    case "SET_ORDERS":
      newState = { ...state, Orders: action.orders };
      return newState;
    case "SET_ORDERSERROR":
      newState = { ...state, OrdersError: action.error };
      return newState;
    case "TOGGLE_ORDEREXPAND":
      let tempExpanded = [...state.Expanded];
      const EXPANDED_ITEM_INDEX = tempExpanded.findIndex(
        ExpandedItem => ExpandedItem === action.order
      );
      if (EXPANDED_ITEM_INDEX !== -1) {
        tempExpanded.splice(EXPANDED_ITEM_INDEX, 1);
      } else {
        tempExpanded.push(action.order);
      }
      newState = { ...state, Expanded: tempExpanded };
      return newState;
      case "SET_LASTEXPAND":
        newState = { ...state, LastExpand: action.lastexpand};
        return newState;
  
    case "SET_ORDERDATA":
      let tempOrders = [...state.Orders];
      const ORDER_INDEX = tempOrders.findIndex(
        Order => Order.id === state.LastExpand
      );
      console.log(ORDER_INDEX);
      if (ORDER_INDEX !== -1) {
        tempOrders[ORDER_INDEX ].Details=action.orderdata      }
      newState = { ...state, Orders: tempOrders };
      console.log(newState)

      return newState;

    default:
      return state;
  }
};

const store = createStore(Reducer, InitialState);

ReactDOM.render(
  <Provider store={store}>
      <Filter />
    <Orders />
  </Provider>,
  document.getElementById("root")
);
