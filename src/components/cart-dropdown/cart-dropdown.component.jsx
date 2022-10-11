import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => (<CartItem key={item.id} CartItem={item} />))}
            </div>
           <Link to='/checkout'>
                <Button>Go To Checkout</Button>
           </Link>
        </div>
    )
}

export default CartDropdown;

