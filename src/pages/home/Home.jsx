import React from 'react'
import Layout from '../../components/layout/Layout'
import Herosection from '../../components/herosection/Herosection';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productcard/ProductCard';
import Track from '../../components/track/Track';
import Testimonial from '../../components/Testonomial/Testonomial';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
;

function Home() {
    const dispatch = useDispatch();
    const cartItem = useSelector((state) => state.cart)

    console.log(cartItem)

    const addCart = () => {
        dispatch(addToCart("shirt"));
    }

    const deleteCart = () => {
        dispatch(deleteFromCart("shirt"));
    }
    return (
        <Layout>
            <Herosection />
            <Filter />
            <ProductCard />
            <Track />
            <Testimonial />

        </Layout>
    )
}

export default Home;
