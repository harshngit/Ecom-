import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfi';
import { update } from 'firebase/database';
function MyState(props) {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';

        }
    }

    const edithandle = (item) => {
        setProducts(item)
    }

    const updateProduct = async (item) => {
        setLoading(true)
        try {
            await setDoc(doc(fireDB, "products", products.id), products)
            toast.success("Product updated successfully")
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)
        } catch (error) {
            // console.log(error)
            setLoading(false)
        }
        setProduct("")
    }

    // const updateProduct = async (item) => {
    //     setLoading(true)
    //     try {
    //         await setDoc(doc(fireDb, "products", products.id), products);
    //         toast.success("Product Updated successfully")
    //         getProductData();
    //         setLoading(false)
    //         window.location.href = '/dashboard'
    //     } catch (error) {
    //         setLoading(false)
    //         console.log(error)
    //     }
    //     setProducts("")
    // }

    const deleteProduct = async (item) => {
        setLoading(true)
        try {
            setLoading(true)
            await deleteDoc(doc(fireDB, "products", item.id))
            toast.success("Product deleted successfully")
            setLoading(false)
            getProductData()
        } catch (error) {
            console.log(error)
            setLoading(flase)
        }
    }

    const [products, setProducts] = useState(
        {
            title: "",
            price: "",
            imageurl: "",
            category: "",
            description: "",
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
    );



    const addProduct = async () => {

        if (products.title == null || products.price == null || products.imageurl == null || products.category == null || products.description == null) {
            return toast.error("All feild should be required")
        }

        const productRef = collection(fireDB, 'products')
        setLoading(true)
        try {
            await addDoc(productRef, products)
            toast.success("All product add successful")
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    const [product, setProduct] = useState([]);

    const getProductData = async () => {
        setLoading(true)
        try {
            const q = query(
                collection(fireDB, 'products'),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productArray)
                setLoading(false)
            })

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getProductData();
    }, [])

    // Get Order

    const [order, setOrder] = useState([])

    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "orders"))
            const orderArray = [];
            result.forEach((doc) => {
                orderArray.push(doc.data());
                setLoading(false)
            })
            setOrder(orderArray)
            console.log(orderArray)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getOrderData();
    }, [])

    // User data

    const [user, setUser] = useState([]);

    const getUserData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "users"))
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false)
            });
            setUser(usersArray);
            console.log(usersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getProductData();
        getOrderData();
        getUserData();
    }, []);

    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')


    const [loading, setLoading] = useState(false);

    return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading, products, product, setProduct, setProducts, addProduct, edithandle, updateProduct, deleteProduct, order, user, searchkey, setSearchkey, filterType, setFilterType,
            filterPrice, setFilterPrice
        }} >
            {props.children}
        </MyContext.Provider>
    )
}


export default MyState
