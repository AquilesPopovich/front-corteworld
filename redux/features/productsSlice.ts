import { ProductsList } from "@/app/types/typeProduct"
import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "../store"
import axiosURL from "@/axiosConfig/axiosConfig"

interface Products {
    products: ProductsList
    searchProducts: ProductsList
    productsForFilter: ProductsList
}

const initialState: Products = {
    products: [],
    searchProducts: [],
    productsForFilter: [],
}

export const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.products = [...action.payload]
            state.searchProducts = [...action.payload]
            state.productsForFilter = [...action.payload]
        },
        searchProducts: (state, action) => {
            state.productsForFilter = state.products.filter(product => {
                return product.name.toLowerCase().startsWith(action.payload)
            })
        },
        filterMarkProducts: (state, action) => {
            state.productsForFilter = state.products.filter(product => {
                return product.mark === action.payload
            })
        },
        filterCategoryProducts: (state, action) => {
            state.productsForFilter = state.products.filter(product => {
                return product.category === action.payload
            })
        },
        orderProductsState: (state, action) => {
            if (action.payload === 'A-Name') state.productsForFilter = [...state.productsForFilter].sort((a, b) => a.name.localeCompare(b.name))
            else if (action.payload === 'D-Name') state.productsForFilter = [...state.productsForFilter].sort((a, b) => b.name.localeCompare(a.name))
            else if (action.payload === 'A-Price') state.productsForFilter = [...state.productsForFilter].sort((a, b) => a.price - b.price)
            else if (action.payload === 'D-Price') state.productsForFilter = [...state.productsForFilter].sort((a, b) => b.price - a.price)
            else if (action.payload === 'A-Date') state.productsForFilter = [...state.productsForFilter].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            else if (action.payload === 'D-Date') state.productsForFilter = [...state.productsForFilter].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        }
    }
})

export const getAllProducts = () => async (dispatch: AppDispatch) => {
    try {
        const { data } = await axiosURL.get('/products');
        if (data) {
            dispatch(getProducts(data));
        } else dispatch(getProducts([]));
    } catch (error) {
        if (error instanceof Error) throw Error(error.message)
    }
}

export const searchOneProduct = (product: string) => async (dispatch: AppDispatch) => {
    try {
        if(product) dispatch(searchProducts(product));
        else await dispatch(getAllProducts());
    } catch (error) {
        if (error instanceof Error) throw Error(error.message)
    }
}

export const filterByMark = (mark: string) => async (dispatch: AppDispatch) => {
    try {
        if (mark) dispatch(filterMarkProducts(mark));
        else await dispatch(getAllProducts());

    } catch (error) {
        if (error instanceof Error) throw Error(error.message)
    }
}

export const filterByCategory = (category: string) => async(dispatch: AppDispatch) => {
    try {
        if(category) dispatch(filterCategoryProducts(category));
        else await dispatch(getAllProducts());
    } catch (error) {
        
    }
}

export const orderProducts = (order: string) => async (dispatch: AppDispatch) => {
    try {
        if (order) dispatch(orderProductsState(order));
        else await dispatch(getAllProducts());
    } catch (error) {
        if (error instanceof Error) throw Error(error.message)
    }
}

export const { getProducts, searchProducts, filterMarkProducts, filterCategoryProducts, orderProductsState } = ProductsSlice.actions;

export default ProductsSlice.reducer;