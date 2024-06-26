import Link from "next/link";
import Image from "next/image";
import webpay from '@/public/images/webpay.png';
import corteiz from '@/public/images/corteiz.png'
import trapstar from '@/public/images/trapstar.png'
import syna from '@/public/images/syna.png'
import corteworld from '@/public/images/corteWorld.png'
import ig from '@/public/images/ig.webp'
import styles from './footer.module.css';

export const Footer = () => {
    return (
        <>
            <div className='flex flex-col justify-stretch w-screen items-center mt-10'>
                <div className={`flex flex-row justify-center gap-16 items-center z-10 w-4/6 ${styles.logos}`}>
                    <Image src={corteiz} alt="corteiz" width={100} height={50} className={styles.corteiz} />
                    <Image src={trapstar} alt="trapstar" width={150} height={50} />
                    <Image src={syna} alt="syna" width={150} height={50} />
                </div>
                <footer className='bg-black text-white mt-8 z-20 w-screen'>
                    <div className={`font-serif px-4 bg-[#ffffff19] py-8 z-20 flex justify-evenly items-center ${styles.footer}`}>
                        <div className="flex justify-center items-end">
                            <Image src={corteworld} alt="corteworld" />
                            <Link href={'https://www.instagram.com/corteworld.cl/'}>
                                <Image src={ig} alt="ig" width={25} height={25}></Image>
                            </Link>
                        </div>
                        <div className={styles.nosotros}>
                            <h1 className='text-xl font-serif'>Nosotros</h1>
                            <Link href='/tienda'><p>Tienda</p></Link>
                            <Link href='/equipo'>Equipo de desarrollo</Link>
                        </div>
                        <div className={styles.contacto}>
                            <h1 className="text-xl">Contacto</h1>
                            <p className=" text-sm">+56 9 8647 5277</p>
                            <p className="text-sm"> octavitoooibanez@gmail.com</p>
                        </div>
                        <Image src={webpay} alt={"Transbank"} width={300} height={200} className={`size-1/12 ${styles.webpay}`}></Image>
                        {/* <Image src={bc} alt={"BancoEstado"} width={200} height={100} className={`size-1/12 ${styles.be}`}></Image> */}
                    </div>
                </footer>
            </div>
        </>
    )
}
