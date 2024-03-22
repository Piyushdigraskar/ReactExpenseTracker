import React from "react";
import { v4 as uuidv4 } from 'uuid';
import classes from './Items.module.css'
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../Store/Item";

const Items = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items);

    const EditItemHandler = (id) => {
        const newCategory = prompt('Enter new category:');
        const newPrice = prompt('Enter new price:');
        const newDescription = prompt('Enter new description:');
        
        if (newCategory !== null && newPrice !== null && newDescription !== null) {
            const updatedExpense = {
                id: id,
                category: newCategory,
                price: parseFloat(newPrice),
                description: newDescription
            };
            dispatch(itemActions.editItem(id, updatedExpense));
        }
    }

    const DeleteItemHandler = (id) => {
        dispatch(itemActions.deleteItem(id));
    }

    return (
        <section className={classes.section}>
            <div className={classes.container}>
                <ul className={classes.list}>
                    {items.map((expense) => (
                        <li key={uuidv4()} className={classes.item}>
                            <span>{expense.category}</span> - <span>{expense.price}$</span> - <span>{expense.description}</span>
                            <button type="button" onClick={() => EditItemHandler(expense.idd)}>Edit</button>
                            <button type="button" onClick={() => DeleteItemHandler(expense.idd)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Items;
