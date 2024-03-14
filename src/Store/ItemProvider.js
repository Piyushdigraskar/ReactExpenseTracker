import React, { useState } from "react";
import ItemContext from "./ItemContext";

const ItemProvider = (props)=>{

    const [items, setItems] = useState([]);
    const addItemHandler = (item)=>{
        setItems((prevItems) =>{
            const updatedItems = [...prevItems, item];
            return updatedItems;
        })
    } 

    const ItemValue = {
        items:items,
        addItem:addItemHandler
    }


    return <ItemContext.Provider value={ItemValue}>{props.children}</ItemContext.Provider>;
}

export default ItemProvider;