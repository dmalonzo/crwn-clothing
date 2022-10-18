import {CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);

    return(
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => (<CartItem key={item.id} CartItem={item} />)
                )) : (
                    <EmptyMessage>Your cart Is empty</EmptyMessage>
                )}
                
            </CartItems>
           <Link to='/checkout'>
                <Button>Go To Checkout</Button>
           </Link>
        </CartDropdownContainer>
    )
}

export default CartDropdown;

