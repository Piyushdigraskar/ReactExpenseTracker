import React from "react";

const ItemContext = React.createContext({
    items:[],
    addItem: (item)=>{},
    editItem: (id, updatedItem)=>{},
    deleteItem: (id)=>{}
})

export default ItemContext;