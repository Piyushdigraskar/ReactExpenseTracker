import React from "react";

const ItemContext = React.createContext({
    items:[],
    addItem: (item)=>{}

})

export default ItemContext;