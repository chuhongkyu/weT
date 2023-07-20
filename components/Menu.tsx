import { motion } from "framer-motion";
import styles from "styles/Layout.module.scss";

const Menu = () => {
    return(
        <motion.div 
            id={styles.Mobile_Menu}
            initial={{x: "100%"}}
            animate={{x:0}}
            >

        </motion.div>
    )
}

export default Menu