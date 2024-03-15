import React, { useEffect, useState } from "react";
import ItemContext from "./ItemContext";
import axios from "axios";

const ItemProvider = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItemFromServer();
    }, [])

    const fetchItemFromServer = () => {
        axios.get(`https://expense-tracker--react-default-rtdb.firebaseio.com/expense.json`)
            .then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    //Object.values convert it to array before senfding it to setItems
                    const fetchedItems = Object.values(response.data || {})
                    setItems(fetchedItems);
                } else {
                    throw new Error('Items cannot be obtained from firebase');
                }
            })
            .catch(error => {
                console.error('response error', error);
            });
    };
    

    const addItemHandler = (item) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems, item];
            addItemOnServer(item);
            return updatedItems;
        })
    }

    const addItemOnServer = async (item) => {
        console.log(item);
        try {
            const response = await axios.post(`https://expense-tracker--react-default-rtdb.firebaseio.com/expense.json`, item);

            if (response.status === 200) {
                console.log('Item added Successfully');
            } else {
                throw new Error('Item not added to firebase');
            }
        } catch (error) {
            console.error('Response error on adding',error)
        }
    }

    const ItemValue = {
        items: items,
        addItem: addItemHandler
    }


    return <ItemContext.Provider value={ItemValue}>{props.children}</ItemContext.Provider>;
}

export default ItemProvider;