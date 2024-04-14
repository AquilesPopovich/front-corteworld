import { ProductsList } from "@/app/types"
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { AppDispatch } from "../store"

interface Products {
    products: ProductsList
    searchProducts: ProductsList
    deletedProducts: ProductsList
    searchDeletedProducts: ProductsList
}

const initialState: Products = {
    products: [],
    searchProducts: [],
    deletedProducts: [],
    searchDeletedProducts: []
}

export const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.products = [...action.payload]
            state.searchProducts = [...action.payload]
        },
        searchProducts: (state, action) => {
            state.products = [...action.payload]
        },
        getDeletedProducts: (state, action) => {
            state.deletedProducts = [...action.payload]
            state.searchDeletedProducts = [...action.payload]
        },
        searchDeletedProducts: (state,action ) => {
            state.searchDeletedProducts = [...action.payload]
        }
    }
})

export const getAllProducts = () => async (dispatch: AppDispatch) => {
    try {
        const { data } = await axios.get('/products');
        if (data.status === true) {
            dispatch(getProducts(data.findProducts));
        } else dispatch(getProducts([]));
    } catch (error) {
        if (error instanceof Error) throw Error(error.message)
    }
}

export const getAllDeletedProducts = () => async (dispatch: AppDispatch) => {
    try {
        const {data} = await axios.get('/products/deleted');
        if(data.status) dispatch(getDeletedProducts(data.findDeletedProducts));
        else dispatch(getDeletedProducts([]));
    } catch (error) {
        if (error instanceof Error) throw Error(error.message)
    }
}

export const searchOneProduct = (product: string, state: ProductsList) => async (dispatch: AppDispatch) => {
    try {
        dispatch(searchProducts(state.filter(productFound => {
            return productFound.name.toLowerCase().startsWith(product);
        })))
    } catch (error) {
        if (error instanceof Error) throw Error(error.message)
    }
}

export const searchOneDeletedProduct = (product: string, state: ProductsList) => async (dispatch: AppDispatch) => {
    try {
        dispatch(searchDeletedProducts(state.filter(productFound => {
            return productFound.name.toLocaleLowerCase().startsWith(product);
        })))
    } catch (error) {
        if (error instanceof Error) throw Error(error.message)
    }
}

export const { getProducts, searchProducts, getDeletedProducts, searchDeletedProducts } = ProductsSlice.actions;

export default ProductsSlice.reducer;