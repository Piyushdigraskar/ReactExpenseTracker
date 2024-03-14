import React, { useContext, useRef, useState } from "react";
import classes from './Expense.module.css';
import ItemContext from "../Store/ItemContext";


const Expense = () => {
    const [category, setCategory] = useState('');
    const priceInputRef = useRef();
    const descriptionInputRef = useRef();
    const itemCtx = useContext(ItemContext);

    const SubmitHandler = (event) => {
        event.preventDefault();
        const enteredPrice = priceInputRef.current.value;
        const enteredDesc = descriptionInputRef.current.value;
        itemCtx.addItem({
            price:enteredPrice,
            description:enteredDesc,
            category:category
        })

        priceInputRef.current.value = '';
        descriptionInputRef.current.value = '';

    }

    const categoryChangeHandler = (event)=>{
        event.preventDefault();
        setCategory(event.target.value)
    }

    return <section className={classes.expense}>
        <h1>Add Expense Page</h1>
        <form onSubmit={SubmitHandler}>
            <div className={classes.control}>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" ref={priceInputRef} required></input>
            </div>
            <div className={classes.control}>
                <label htmlFor="description">Description:</label>

                <input type="text" id="description" ref={descriptionInputRef} required></input>

            </div>
            <div className={classes.control}>
                <label htmlFor="option"></label>
                <select id="option" onChange={categoryChangeHandler}>
                    <option value="">Select an option</option>
                    <option value="food">Food</option>
                    <option value="petrol">Petrol</option>
                    <option value="salary">Salary</option>
                </select>
            </div>
            <div className={classes.actions}>
                <button>Add Expense</button>
            </div>
        </form>
    </section>
}

export default Expense;