import { createContext, useState, useEffect  } from "react";

const addCartItem = (cartItems, productToAdd) =>{

    const existingCartItem = cartItems.find((cartItem)=>cartItem.id===productToAdd.id);


    if(existingCartItem){
        return cartItems.map((cartItem)=>cartItem.id===productToAdd.id ? {...cartItem, quantity:cartItem.quantity + 1} : cartItem);
    }

    return [...cartItems,{...productToAdd, quantity:1}];
}

const deleteItem = (cartItems, productToDelete) =>{
    const updateCart = cartItems.filter((cartItem)=>cartItem.id != productToDelete.id);
    return updateCart.map((cartItem)=>cartItem);
}

const removeCartItem = (cartItems, productToRemove) =>{
    let updateCart = cartItems;


        updateCart = cartItems.filter((cartItem)=>{
            if(cartItem.id===productToRemove.id){
                if(cartItem.quantity-1 <= 0)
                   return false;
            }   
            return true;
        })
        
      return updateCart.map((cartItem)=>cartItem.id===productToRemove.id ? {...cartItem, quantity:cartItem.quantity - 1} : cartItem);
}

/*
const sumCart = (cartItems) =>{
    console.log('hit');
    let value = 0;
    for(let item of cartItems){
        value = value + (item.quantity*item.price);
    }

    return value;
}
*/

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>[],
    removeItemFromCart: ()=>[],
    deleteItemFromCart: ()=>[],
    sumCartItems: ()=>[],
    totalPrice: 0,
    cartCount: 0,
});


export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [ cartItems, setCartItems] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
    const [ totalPrice, setTotalPrice ] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,cartItem)=> total + cartItem.quantity,0)
        const newPrice = cartItems.reduce((total,cartItem)=>total + (cartItem.price * cartItem.quantity),0)

        setTotalPrice(newPrice)
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) =>{
        setCartItems(removeCartItem(cartItems,productToRemove));
    }

    const deleteItemFromCart = (productToDelete) =>{
        setCartItems(deleteItem(cartItems,productToDelete));
    }
/*
    const sumCartItems = () =>{
        sumCart(cartItems);
    }
*/

    const value = {isCartOpen,setIsCartOpen, addItemToCart, removeItemFromCart, deleteItemFromCart, totalPrice, cartItems, cartCount};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

