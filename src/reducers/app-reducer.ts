import { ls } from 'lib/ls';
import { Book, BookLanding, CartItemType } from 'types';

export type AppActions =
  | {
      type: 'add-cart';
      payload: { item: Book };
    }
  | { type: 'remove-from-cart'; payload: { id: BookLanding['id'] } }
  | { type: 'decrease-quantity'; payload: { id: BookLanding['id'] } }
  | { type: 'increase-quantity'; payload: { id: BookLanding['id'] } }
  | { type: 'clear-cart' }
  | { type: 'fetch-data'; payload: { data: BookLanding[] } };

export type AppState = {
  data: BookLanding[];
  cart: CartItemType[];
};
const MAX_ITEMS = 5;
const MIN_ITEMS = 1;
export const initialState = {
  data: [],
  cart: ls.get<CartItemType[]>('cart') ?? [],
};

export function appReducer(
  state: AppState = initialState,
  action: AppActions,
): AppState {
  if (action.type === 'add-cart') {
    const updatedData = state.data.map((item) =>
      item.id === action.payload.item.id ? { ...item, selected: true } : item,
    );
    const itemExists = state.cart.find(
      (item) => item.id === action.payload.item.id,
    );

    let updatedCart: CartItemType[] = [];

    if (itemExists) {
      updatedCart = state.cart.map((item) =>
        item.id === action.payload.item.id && item.cantidad < MAX_ITEMS
          ? { ...item, cantidad: item.cantidad + 1 }
          : item,
      );
    } else {
      updatedCart = [...state.cart, { ...action.payload.item, cantidad: 1 }];
    }
    return {
      ...state,
      data: updatedData,
      cart: updatedCart,
    };
  }

  if (action.type === 'remove-from-cart') {
    const updatedData = state.data.map((item) =>
      item.id === action.payload.id ? { ...item, selected: false } : item,
    );
    const updatedCart = state.cart.filter(
      (item) => item.id !== action.payload.id,
    );
    return {
      ...state,
      data: updatedData,
      cart: updatedCart,
    };
  }

  if (action.type === 'decrease-quantity') {
    const updatedCar = state.cart.map((item) => {
      if (item.id === action.payload.id && item.cantidad > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.cantidad - 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart: updatedCar,
    };
  }

  if (action.type === 'increase-quantity') {
    const updatedCar = state.cart.map((item) => {
      if (item.id === action.payload.id && item.cantidad < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.cantidad + 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart: updatedCar,
    };
  }

  if (action.type === 'clear-cart') {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === 'fetch-data') {
    const updatedData: BookLanding[] = action.payload.data.map((item) => ({
      ...item,
      selected: false,
    }));
    return {
      ...state,
      data: updatedData,
    };
  }

  return state;
}
