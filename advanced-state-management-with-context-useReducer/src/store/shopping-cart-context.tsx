import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";


interface CartItem {
    id: string;
    quantity: number;
    name: string;
    price: number;
}

interface CartContextType {
    items: CartItem[];
    addItemToCart: (id: string) => void;
    updateCartItemQuantity: (id: string, amount: number) => void;
}

export const CartContext = createContext<CartContextType>({
    items: [],
    addItemToCart: (id: string) => { },
    updateCartItemQuantity: (id: string, amount: number) => { }
});
function shoppingCartReducer(state: any, action: any) {
    let updatedItems = null;;
    switch (action.type) {
        case 'ADD_ITEM':
            updatedItems = [...state.items];

            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem.id === action.payload
            );
            const existingCartItem = updatedItems[existingCartItemIndex];

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                const product = DUMMY_PRODUCTS.find(
                    (product) => product.id === action.payload
                );
                if (!product) {
                    return state;
                }
                updatedItems.push({
                    id: action.payload,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                });
            }

            return {
                ...state, // not needed here because we have only one value
                items: updatedItems,
            };
        case 'UPDATE_ITEM':
            updatedItems = [...state.items];
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.productId
            );

            const updatedItem = {
                ...updatedItems[updatedItemIndex],
            };

            updatedItem.quantity += action.payload.amount;

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }

            return {
                ...state,
                items: updatedItems,
            };

        default:
            return state;
    }
}



export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
        items: [],
    });

    function handleAddItemToCart(id: string) {
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: id,
        });
    }

    function handleUpdateCartItemQuantity(productId: string, amount: number): void {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                productId,
                amount,
            },
        });
    }
    const cxtValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateCartItemQuantity: handleUpdateCartItemQuantity,
    }

    return <CartContext.Provider value={cxtValue}>{children}</CartContext.Provider>;
};

