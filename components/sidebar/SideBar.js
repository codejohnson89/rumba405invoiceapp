import Image from 'next/image'
import styles from './sidebar.module.css'
import rumba405 from '/public/assets/rumba405.jpg'

export default function SideBar() {
    return (
        <>
            <div className={styles.container}>
                <Image className={styles.image} src={rumba405} width={100} height={100} alt="site logo"/>
            </div>
        </>
    )
}