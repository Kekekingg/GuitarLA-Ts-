import { db } from "../data/db";
import { Guitar, CartItem } from "../types";

// Only the actions that can support the reducer
export type CartActions = 
    { type: 'add-to-card', payload: {item: Guitar} } | 
    { type: 'remove-from-card', payload: {id: Guitar['id']}} |
    { type: 'decrease-quantity', payload: {id: Guitar['id']} } |
    { type: 'increase-quantity', payload: {id: Guitar['id']} } |
    { type: 'clear-cart' }


export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState : CartState = {
    data: db,
    cart: initialCart()
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5

// Autocompleted on the reducer
export const cartReducer = (
        state: CartState = initialState,
        action: CartActions
    ) => {

    //all the actions
    if(action.type === "add-to-card") {

        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)

        let updatedCart : CartItem[] = []

        if(itemExists) { // Exist on the cart
            updatedCart = state.cart.map(item => {
                if(item.id === action.payload.item.id) {
                    if(item.quantity < MAX_ITEMS) {
                        return {...item, quantity : item.quantity + 1}
                    } else {
                        return item
                    }
                } else {
                    return item
                }
            })
        } else {
            const newItem : CartItem = {...action.payload.item, quantity : 1}
            updatedCart = [...state.cart, newItem]
        }

        return {
            ...state,
            cart : updatedCart
        }
    }

    if(action.type === "remove-from-card") {

        const updatedCart = state.cart.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            cart : updatedCart
        }
    }

    if(action.type === "decrease-quantity") {
        const updatedCart = state.cart.map( item => {
            if(item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })

        return {
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === "increase-quantity") {
        const updatedCart = state.cart.map( item => {
            if(item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })

        return {
            ...state,
            cart : updatedCart
        }
    }

    if(action.type === 'clear-cart') {
        return {
            ...state, 
            cart: []
        }
    }

    // Always have a return to the state
    return state
}