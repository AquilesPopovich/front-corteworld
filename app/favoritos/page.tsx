'use client'
import React from 'react'
import { useSelector } from 'react-redux';
import CardProducto from '../ui/cards/productos/cardProducto/CardProducto';
import { Menu } from '../ui/menu/Menu';

const Favoritos = () => {

  const favorites = useSelector((state: any) => state.favorites.favorites);



  return (
    <>
    <Menu/>
    <div style={{ marginTop: '110px' }}>
        <h2>Productos Favoritos</h2>
      {favorites.map((product: any) => (
        <CardProducto  key={product.id}
        id={product.id}
        name={product.name}
        segundaimg={product.segundaimg}
        img={product.img}
        mark={product.mark}
        price={product.price}  />
      ))}
    </div>
    </>
  )
}

export default Favoritos