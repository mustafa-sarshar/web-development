import { useState } from "react";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
    const [showAddPanel, setShowAddPanel] = useState(false);

    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString(),
        };
        props.onAddExpense(expenseData);
        setShowAddPanel(false);
    };

    const showFormHandler = () => {
        setShowAddPanel(true);
    };

    const hideAddPanelHandler = () => {
        setShowAddPanel(false);
    };

    return (
        <div className="new-expense">
            {!showAddPanel && (
                <button onClick={showFormHandler}>Add New Expense</button>
            )}
            {showAddPanel && (
                <ExpenseForm
                    onSaveExpenseData={saveExpenseDataHandler}
                    onCancel={hideAddPanelHandler}
                />
            )}
        </div>
    );
};

export default NewExpense;
