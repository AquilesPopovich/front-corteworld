'use client'
import React, { useState } from 'react';
import styles from './crearProducto.module.css';
import axiosURL from '@/axiosConfig/axiosConfig';

interface crearProductoProps {
  crearProducto: boolean;
  setCrearProducto: (value: boolean) => void;
}

const CrearProducto: React.FC<crearProductoProps> = ({ crearProducto, setCrearProducto }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    price: 0,
    destacado: Boolean,
    category: '',
    mark: '',
    discount: 0
  });

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (event: any) => {
    let { name, value } = event.target;
    if (name === 'destacado') {
      value = Boolean(Number(value));
    }
    setNuevoProducto({
      ...nuevoProducto,
      [name]: value
    });
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const { data } = await axiosURL.post('/products', nuevoProducto);
      if (data) {
        console.log('Producto creado:', data);
        setNuevoProducto({
          name: '',
          price: 0,
          destacado: Boolean,
          category: '',
          mark: '',
          discount: 0
        });
      }
  
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
        const cloudinaryResponse = await axiosURL.post(`/imgProduct/upload/${data.id}`, formData);
        console.log(cloudinaryResponse.data); 
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };
  

  if (!crearProducto) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.textBlack}>Crear Producto</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">
              Nombre
            </label>
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
            <label className={styles.label} htmlFor="price">
              Precio
            </label>
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
            <label className={styles.label} htmlFor="destacado">
              Destacado
            </label>
            <input
              className={styles.inputField}
              type="number"
              id="destacado"
              name="destacado"
              required
              value={Number(nuevoProducto.destacado)}
              onChange={handleChange}
            />

          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="category">
              Categoría
            </label>
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
            <label className={styles.label} htmlFor="mark">
              Marca
            </label>
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
          <div>
            <label htmlFor="imgs">Upload File</label>
            <input type="file" onChange={handleFileChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="discount">
              Descuento
            </label>
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
          <button className={`${styles.submitButton} bg-pink-400 `} type="submit">
            Crear Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearProducto;
