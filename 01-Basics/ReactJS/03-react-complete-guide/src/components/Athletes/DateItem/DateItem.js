import "./DateItem.css";

function DateItem(props) {
    const year = props.date.getFullYear();
    const month = props.date.toLocaleString("en-US", { month: "long" });
    const day = props.date.toLocaleString("en-US", { day: "2-digit" });

    return (
        <div className="date-item">
            <div className="date-item__month">{month}</div>
            <div className="date-item__year">{year}</div>
            <div className="date-item__day">{day}</div>
        </div>
    );
}
export default DateItem;
