import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredDate, setEnteredDate] = useState("");
    const titleChangeHandler = (evt) => {
        setEnteredTitle(evt.target.value);
        console.log("Entered Title:", enteredTitle);
    };
    const amountChangeHandler = (evt) => {
        setEnteredAmount(evt.target.value);
        console.log("Entered Amount:", enteredAmount);
    };
    const dateChangeHandler = (evt) => {
        setEnteredDate(evt.target.value);
        console.log("Entered Date:", enteredDate);
    };
    const onSubmitHandler = (evt) => {
        evt.preventDefault();
        const expenseDate = {
            title: enteredTitle,
            amount: +enteredAmount,
            date: new Date(enteredDate),
        };
        props.onSaveExpenseData(expenseDate);
        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredDate("");
    };
    return (
        <form onSubmit={onSubmitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input
                        type="text"
                        value={enteredTitle}
                        onChange={titleChangeHandler}
                    />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={enteredAmount}
                        min="0.01"
                        step="0.01"
                        onChange={amountChangeHandler}
                    />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input
                        type="date"
                        value={enteredDate}
                        min="2019-01-01"
                        max="2022-12-31"
                        onChange={dateChangeHandler}
                    />
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button type="submit">Add Expense</button>
            </div>
        </form>
    );
};

export default ExpenseForm;
