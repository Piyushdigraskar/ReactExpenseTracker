import React, { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import classes from './Items.module.css'
import ItemContext from "../Store/ItemContext";

const Items = () => {
    const itemCtx = useContext(ItemContext);

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
            itemCtx.editItem(id, updatedExpense);
        }
    }

    const DeleteItemHandler = (id) => {
        itemCtx.deleteItem(id);
    }

    return (
        <section className={classes.section}>
            <div className={classes.container}>
                <ul className={classes.list}>
                    {itemCtx.items.map((expense) => (
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
