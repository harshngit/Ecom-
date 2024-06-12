import React from 'react'
import Layout from '../../components/layout/Layout'

const Allproducts = () => {
    return (
        <Layout>
            <h1 className='text-center p-5 font-bold text-2xl'>All Products</h1>
            <ProductCard />
        </Layout>
    )
}

export default Allproducts
