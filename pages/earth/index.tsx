import { Canvas } from "@react-three/fiber";
import Nav from "components/Nav";
import styles from "styles/Home.module.scss";

const Earth = () => {
    return(
        <div id={styles.Home}>
            <Nav/>
            <div className={styles.wrapper}></div>
            <Canvas>
                <ambientLight/>
                <mesh>
                    <boxGeometry/>
                    <meshStandardMaterial color="black"/>
                </mesh>
            </Canvas>
        </div>
    )
}

export default Earth