import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import Button from '../../components/button/button.component';

const Checkout = () =>{
    const {cartItems, totalPrice} = useContext(CartContext);

    return(
        <div>
            Product
            Description
            Quantity
            Price
            Remove
            {cartItems.map((item) => (<CheckoutItem key={item.id} CartItem={item} />))}
            <Button>Checkout</Button>

            <div><h1>TOTAL: </h1></div>  
            <span>{totalPrice}</span>
        </div>
    );



};


export default Checkout;