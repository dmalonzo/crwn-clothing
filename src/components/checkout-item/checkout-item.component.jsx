import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({CartItem}) => {
    const { name, imageUrl, price, quantity } = CartItem;
    const{addItemToCart, removeItemFromCart, deleteItemFromCart} = useContext(CartContext);

    const addProductToCart = () => addItemToCart(CartItem);
    const removeProductFromCart = () => removeItemFromCart(CartItem);
    const deleteProductFromCart = () => deleteItemFromCart(CartItem); 

    return(
        <div className='checkout-item-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='checkout-details'>
                <span className='name'>{name}</span>
                <span className='price'>
                    <Link onClick={removeProductFromCart}><b> &lt; </b></Link>
                        {quantity} 
                    <Link onClick={addProductToCart}><b> &gt; </b></Link>
                    x ${price}
                    <Link onClick={deleteProductFromCart}><b>X</b></Link>

                </span>
            </div>
        </div>
    )
}

export default CheckoutItem;