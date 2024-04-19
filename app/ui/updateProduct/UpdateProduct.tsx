import React, { useEffect, useState } from 'react';
import styles from './loggin.module.css';
import { useDispatch } from 'react-redux';
import axiosURL from '@/axiosConfig/axiosConfig';
import { getProducts } from '@/redux/features/productsSlice';

interface updateProductProps {
    id: string,
    updateProduct: boolean;
    setUpdateProduct: (value: boolean) => void;
  }

const UpdateProduct: React.FC<updateProductProps> = ({ id, updateProduct, setUpdateProduct }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    mark: '',
    discount: ''
  });

  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchData = async() =>{
        try {
            const {data} = await axiosURL(`/productos/${id}`)
            if(data){
                setNuevoProducto(data)
            }
        } catch (error) {
            
        }
    }
    fetchData()
  })

  const handleChange = (event: any) => {
    setNuevoProducto({
      ...nuevoProducto,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const {data} = await axiosURL.patch(`/productos/${id}`, nuevoProducto); 
      if (data) {
        dispatch(getProducts())
        setUpdateProduct(false)
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };


  if(!updateProduct) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.textBlack}>Crear Producto</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Nombre</label>
            <input
              className={styles.inputField}
              type="text"
              id="name"
              name="name"
              required
              value={nuevoProducto.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="price">Precio</label>
            <input
              className={styles.inputField}
              type="number"
              id="price"
              name="price"
              required
              value={nuevoProducto.price}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="stock">Stock</label>
            <input
              className={styles.inputField}
              type="number"
              id="stock"
              name="stock"
              required
              value={nuevoProducto.stock}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="category">Categoría</label>
            <input
              className={styles.inputField}
              type="text"
              id="category"
              name="category"
              required
              value={nuevoProducto.category}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="mark">Marca</label>
            <input
              className={styles.inputField}
              type="text"
              id="mark"
              name="mark"
              required
              value={nuevoProducto.mark}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="discount">Descuento</label>
            <input
              className={styles.inputField}
              type="number"
              id="discount"
              name="discount"
              required
              value={nuevoProducto.discount}
              onChange={handleChange}
            />
          </div>
          <button className={`${styles.submitButton} bg-pink-400 `} type="submit">Crear Producto</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
