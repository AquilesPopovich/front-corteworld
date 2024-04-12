'use client'
import React, { useState, useEffect } from 'react';
import styles from './carrousel.module.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Image from 'next/image';

export default function Carrousel(){
    const [slide, setSlide] = useState(0);

    const images = [
        {
          id: 1,
          img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1709065707/gaming-pcs-banner_ICUE-CERTIFIED_u7iiww.webp',
          width: 1920,
          height: 1080
        },
        {
          id: 2,
          img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1709065875/razer-brand-banner_rhgfqp.jpg',
          width: 1920,
          height: 1080
        },
        {
          id: 3,
          img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1709065874/Banner-Corsair_lo7guo.jpg',
          width: 1920,
          height: 1080
        },
        {
          id: 4,
          img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1709065706/11042020_iPhoneProMax_STORY_LEVEL_BANNER_1600x483_etzjyz.jpg',
          width: 1600,
          height: 483
        },
        {
          id: 5,
          img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1709066043/gnp-20super-2560_r1i44o.jpg',
          width: 2560,
          height: 1080
        },
        {
          id: 6,
          img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1709066044/key_bg_sqajgy.jpg',
          width: 1920,
          height: 1080
        }
      ];

      const nextSlide = () => {
        setSlide(slide === images.length - 1 ? 0 : slide + 1);
      }

      const prevSlide = () => {
        setSlide(slide === 0 ? images.length - 1 : slide - 1);
      }

      useEffect(() => {
        const interval = setInterval(() => {
          nextSlide();
        }, 8000);

        return () => clearInterval(interval);
      }, [slide]);

      return (
        <div className={styles.holeContainer}>
          <ArrowBackIosNewIcon
            className={`${styles.arrowButton}`}
            style={{ left: '1rem' }}
            onClick={prevSlide}
          />
          {images.map((item, idx) => (
            <Image
              key={item.id}
              src={item.img}
              alt={`banner ${idx}`}
              className={slide === idx ? styles.slide : styles.slideHidden}
              width={item.width}
              height={item.height}
            />
          ))}
          <ArrowForwardIosIcon
            className={`${styles.arrowButton}`}
            style={{ right: '1.5rem' }}
            onClick={nextSlide}
          />
          <span className={styles.indicators}>
            {images.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlide(index)}
                className={slide === index ? styles.indicator : styles.indicatorHidden}
              ></div>
            ))}
          </span>
        </div>
      );
}
