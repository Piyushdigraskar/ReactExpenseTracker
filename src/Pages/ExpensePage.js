import React, { Fragment } from "react";
import Expense from "../Expense/Expense";
import Items from "../Expense/Items";

const ExpensePage = ()=>{
    return <Fragment>
        <Expense />
        <Items />
    </Fragment>;
}

export default ExpensePage;