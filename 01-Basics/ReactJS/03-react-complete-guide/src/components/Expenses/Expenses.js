import { useState } from "react";
import ExpensesList from "./ExpensesList/ExpensesList";
import Card from "../UI/Card/Card";
import ExpensesFilter from "./ExpensesFilter/ExpensesFilter";
import "./Expenses.css";

const Expenses = (props) => {
    const [filterYear, setFilterYear] = useState("2020");

    const onFilterChangeHandler = (filter) => {
        const { year } = filter;
        setFilterYear(year);
    };

    const filteredExpenses = props.items.filter((item) => {
        if (filterYear !== "all") {
            return item.date.getFullYear().toString() === filterYear;
        }
        return props.items;
    });

    return (
        <Card className="expenses">
            <ExpensesFilter
                selected={{ selectedYear: filterYear }}
                onFilterChange={onFilterChangeHandler}
            />
            <ExpensesList items={filteredExpenses} />
        </Card>
    );
};

export default Expenses;
