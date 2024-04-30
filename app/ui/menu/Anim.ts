export const menuSlide = {
    initial: {
      clipPath: "circle(0% at 0% 50%)" // Establece el clipPath inicial como un círculo con radio 0 a la izquierda
    },
    enter: {
      scale: 1, // Escala completa (visible)
      opacity: 1, // Hace el menú completamente visible
      clipPath: "circle(100% at 0% 50%)", // Expande el clipPath a un círculo completo a la izquierda
      transition: { 
        duration: 0.7, 
        ease: [0.76, 0, 0.24, 1] // Curva de animación personalizada
      }
    },
    exit: {
      clipPath: "circle(0% at 0% 50%)", // Vuelve a establecer el clipPath como un círculo con radio 0 a la izquierda al salir
      transition: { 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1] // Curva de animación personalizada
      }
    }
  };
  

export const slide = {
    initial: { x: -80 },
    enter: (i: number) => ({ x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }),
    exit: (i: number) => ({ x: -80, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } })
}

export const scale = {
    open: { scale: 1, transition: { duration: 0.3 } },
    closed: { scale: 0, transition: { duration: 0.4 } }
}
