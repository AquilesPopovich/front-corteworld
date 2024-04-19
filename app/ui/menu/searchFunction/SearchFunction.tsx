'use client'

import { useAppDispatch } from "@/redux/hook"
import SearchIcon from '@mui/icons-material/Search';
import styles from './searchFunction.module.css';
import { getAllProducts, searchOneProduct } from "@/redux/features/productsSlice";

interface Props {
    status: boolean
}

export const SearchProduct: React.FC<Props> = ({ status }) => {
    const dispatch = useAppDispatch();

    const searchByCoincidence = async(event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        dispatch(searchOneProduct(event.target.value.toLowerCase()));
        if(!event.target.value.length) dispatch(getAllProducts());
      }

    // const handleReset = async (): Promise<void> => {
    //     try {
    //         if (status) {
    //             await dispatch(getAllProducts());
    //         } else {
    //             await dispatch(getAllDeletedProducts());
    //         }
    //         setProductName('');
    //     } catch (error) {
    //         if (error instanceof Error) throw Error(error.message)
    //     }
    // }

    return (
        <>
            <div className={`flex items-center ${styles.searchContainer}`}>
                <SearchIcon className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Busca un producto"
                    className={`${styles.searchInput} text-black`}
                    style={{ fontSize: '1.2rem', paddingLeft: '15px' }}
                    onChange={searchByCoincidence}
                />
            </div>
        </>
    )
}