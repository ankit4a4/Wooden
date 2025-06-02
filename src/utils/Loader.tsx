import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import style from "./Loader.module.css"
const Loader: React.FC = () => {
    return (
        <div>
            <div className={style.loader}>
                <FaSpinner className={style.spinner} size={32} />
            </div>
        </div>
    )
}

export default Loader
