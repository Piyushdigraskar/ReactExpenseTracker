import React, { useRef } from "react";
import classes from './Expense.module.css';


const Expense = () => {

    const priceInputRef = useRef();
    const descriptionInputRef = useRef();

    const SubmitHandler = (event) => {
        event.preventDefault();
        const enteredPrice = priceInputRef.current.value;
        const enteredDesc = descriptionInputRef.current.value;
        console.log(enteredPrice, enteredDesc);


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
                <select id="option">
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