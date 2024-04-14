'use client'

import { getAllDeletedProducts, getAllProducts, searchOneDeletedProduct, searchOneProduct } from "@/redux/features/productsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import styles from './searchFunction.module.css';

interface Props {
    status: boolean
}

export const SearchProduct: React.FC<Props> = ({ status }) => {

    const searchProduct = useAppSelector(state => state.productsSlice.searchProducts);
    const searchProductDeleted = useAppSelector(state => state.productsSlice.searchDeletedProducts);

    const [productName, setProductName] = useState('');
    const dispatch = useAppDispatch();

    const searchByCoincidence = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const productString = event.target.value.toLowerCase();
        if (productString.length === 0) {
            if (status) {
                await dispatch(getAllProducts());
            } else {
                await dispatch(getAllDeletedProducts());
            }
        } else {
            if (status) {
                await dispatch(searchOneProduct(productString, searchProduct));
            } else {
                await dispatch(searchOneDeletedProduct(productString, searchProductDeleted));
            }
        }
        setProductName(productName);
    }

    const handleReset = async (): Promise<void> => {
        try {
            if (status) {
                await dispatch(getAllProducts());
            } else {
                await dispatch(getAllDeletedProducts());
            }
            setProductName('');
        } catch (error) {
            if (error instanceof Error) throw Error(error.message)
        }
    }

    return (
        <>
            <div className={`flex items-center ${styles.searchContainer}`}>
                <SearchIcon className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Busca un producto"
                    className={`${styles.searchInput} text-black`}
                    style={{ fontSize: '13px', paddingLeft: '15px' }}
                />
            </div>
        </>
    )
}