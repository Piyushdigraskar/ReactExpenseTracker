import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import classes from './Items.module.css'
import { useDispatch, useSelector } from "react-redux";
import { editItem } from "../Store/Item";
import { deleteItem } from "../Store/Item";
import { themeActions } from "../Store/Theme";
import { fetchItems } from "../Store/Item";

const Items = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items);
    const darkTheme = useSelector(state => state.theme.showDarkTheme);
    const [isPremium, setIsPremium] = useState(false);
    const [isActivated, setIsActivated] = useState(false); // To track if premium is activated
    const [downloadUrl, setDownloadUrl] = useState('');

    useEffect(() => {
        dispatch(fetchItems()); // Fetch items every time the component re-renders
    }, [dispatch]);

    useEffect(() => {
        const totalExpenses = items.reduce((total, expense) => total + expense.price, 0);
        setIsPremium(totalExpenses > 10000);
    }, [isPremium, items]);

    useEffect(() => {
        const csvContent = items.map(expense => `${expense.category},${expense.price},${expense.description}`).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url); // Set the URL for the download link
        return () => URL.revokeObjectURL(url); // Clean up by revoking the URL when the component unmounts
    }, [items]);

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
            dispatch(editItem(id, updatedExpense));
        }
    }

    const DeleteItemHandler = (id) => {
        dispatch(deleteItem(id));
    }

    const activatePremiumHandler = () => {
        setIsActivated(true); // Activate premium
    }

    const premiumThemeHandler = () => {
        dispatch(themeActions.toggle());
    }

    return (
        <section className={`${classes.section} ${darkTheme ? classes.dark : ''}`}>
            <div className={classes.container}>
                {isPremium && !isActivated && // Render "Activate Premium" button if premium is available and not activated
                    <button onClick={activatePremiumHandler} className={classes.premiumButton}>Activate Premium</button>
                }
                {isActivated && // Render "Toggle" button if premium is activated
                    <button onClick={premiumThemeHandler} className={classes.premiumButton}>Toggle</button>
                }
                {isActivated && 
                   <a  href={downloadUrl} download='file1.csv' className={classes.linkButton}>Download File</a>

                }
                
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
