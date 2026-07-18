import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db";
import type { Guitar, CartItem } from '../types';

export const useCart = () => {

    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    //Sin una DB para guardar el estado del carrito se puede usar el localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addToCart(item : Guitar) {

        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

        if (itemExists >= 0) {
           // cart[itemExists].quantity++;//Esto muta el estado directamente, no es recomendable en React
           if(cart[itemExists].quantity >= MAX_ITEMS) return;//Limita la cantidad a 5 por producto
            const updatedCart = [...cart];//Crea una copia del carrito
            updatedCart[itemExists].quantity++;//Incrementa la cantidad del item en la copia
            setCart(updatedCart);//Actualiza el estado con la copia modificada
        } else {
            const newItem : CartItem = {...item, quantity: 1}
            setCart([...cart, newItem]);
        }


    }


    //Remueve un item del carrito
    function removeFromCart(id : Guitar['id']) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    //Decrementa las cantidades
    function decreaseQuantity(id : Guitar['id']) {
        //Recrea un nuevo carrito para no mutar el estado directamente
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity > MIN_ITEMS ) {
                return {
                    ...item, 
                    quantity: item.quantity - 1
                }
            } 
            return item;
        })
        setCart(updatedCart);
    }

    //Incrementa las cantidades
    function increaseQuantity(id : Guitar['id']) {
        //Recrea un nuevo carrito para no mutar el estado directamente
        const updatedCart = cart.map(item => { 
            if(item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item;
        })
        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

     //State derivado 
    const isEmpty = useMemo(() => cart.length === 0, [cart])//Cada que el carrito cmabie se renderisa toda la app

    //Reducer para calcular el total
    const cartTotal = useMemo (() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

    //Si existen varios states es mejor usar un objeto que un array para devolverlos
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}