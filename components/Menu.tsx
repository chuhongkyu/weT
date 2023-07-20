import { motion } from "framer-motion";
import { ReactNode } from "react";
import styles from "styles/Layout.module.scss";

interface IChild {
    children: ReactNode
}

const Menu = ({children}:IChild) => {
    return(
        <motion.div 
            id={styles.Mobile_Menu}
            initial={{x: "100%"}}
            animate={{x:0}}
            >    
            {children}
        </motion.div>
    )
}

export default Menu