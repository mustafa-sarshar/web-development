import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
    let { selectedYear } = props.selected;
    const yearChangeHandler = (evt) => {
        props.onFilterChange({ year: evt.target.value });
    };

    return (
        <div className="expenses-filter">
            <div className="expenses-filter__control">
                <label>Filter by year</label>
                <select value={selectedYear} onChange={yearChangeHandler}>
                    <option value="all">All</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                </select>
            </div>
        </div>
    );
};

export default ExpensesFilter;
