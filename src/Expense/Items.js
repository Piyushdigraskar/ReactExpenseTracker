import React, { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import classes from './Items.module.css'
import ItemContext from "../Store/ItemContext";

const Items = () => {
    const itemCtx = useContext(ItemContext);

    return <section className={classes.section}>
        <div className={classes.container}>
            <ul className={classes.list}>
                {itemCtx.items.map((expense) => (
                    <li key={uuidv4()} className={classes.item}>
                        <span>{expense.category}</span> - <span>{expense.price}$</span> - <span>{expense.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    </section>
}

export default Items;