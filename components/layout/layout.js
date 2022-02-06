
import HomeHeader from "../headers/HomeHeader";
import SideBar from "../sidebar/SideBar";
import styles from "./layout.module.css";

export default function Layout(props) {
    return (
        <>
            <div className={styles.container}>
                <SideBar />
                {props.children}
            </div>
        </>
    )
}