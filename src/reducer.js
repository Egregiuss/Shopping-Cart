import React from "react";
import CartItem from "./CartItem";

const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((CartItem) => CartItem.id !== action.id),
    };
  }
  if (action.type === "INCREASE") {
    const tempCart = state.cart.map((CartItem) => {
      if (CartItem.id === action.id) {
        return { ...CartItem, amount: CartItem.amount + 1 };
      }
      return CartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === "DECREASE") {
    const tempCart = state.cart
      .map((CartItem) => {
        if (CartItem.id === action.id) {
          return { ...CartItem, amount: CartItem.amount - 1 };
        }
        return CartItem;
      })
      .filter((CartItem) => CartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, CartItem) => {
        const { price, amount } = CartItem;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.id, loading: false };
  }
  return state;
};

export default reducer;
