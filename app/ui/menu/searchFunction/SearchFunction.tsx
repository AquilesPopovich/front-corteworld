'use client'

import { useAppDispatch } from "@/redux/hook"
import SearchIcon from '@mui/icons-material/Search';
import styles from './searchFunction.module.css';
import { getAllProducts, searchOneProduct } from "@/redux/features/productsSlice";

export const SearchProduct = () => {
    const dispatch = useAppDispatch();

    const searchByCoincidence = async(event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        dispatch(searchOneProduct(event.target.value.toLowerCase()));
        if(!event.target.value.length) dispatch(getAllProducts());
      }
      
    return (
        <>
            <div className={`flex items-center ${styles.searchContainer}`}>
                <SearchIcon className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Busca un producto"
                    className={`${styles.searchInput} text-black`}
                    style={{ paddingLeft: '15px' }}
                    onChange={searchByCoincidence}
                />
            </div>
        </>
    )
}