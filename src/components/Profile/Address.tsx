import React from 'react'
import style from "../../Style/Profile/Address.module.css"
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";



const Address: React.FC = () => {
    const Address = [
        {
            address: "2715 Ash Dr. San Jose, South Dakota 83475 2715 Ash Dr. San Jose, South Dakota 83475"
        }
    ]
    return (
        <div className={style.address_main_container}>

            <div className={style.address_container}>
                <p><b>ADDRESS</b></p>
                <div className={style.Address_details}>

                    {
                        Address.map((item, index) => (
                            <div className={style.Current_address_box} key={index}>
                                <p> Your Current Address</p>
                                <div className={style.Current_address}>
                                    <p>{item.address}</p>
                                    <div className={style.Current_address_DeleteBtn}>
                                        <span><MdDeleteOutline /></span>
                                    </div>
                                    <div className={style.Current_address_editBtn}>
                                        <span><CiEdit /></span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                   
                    <div className={style.Current_address_box}>
                        <p>Add Your New Address </p>
                        <textarea name="" id="" placeholder='Add new address'></textarea>

                        <div className={style.Current_address_box_button}>
                            <button>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address
