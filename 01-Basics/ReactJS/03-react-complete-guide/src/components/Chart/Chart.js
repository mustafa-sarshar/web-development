import ChartBar from "./ChartBar/ChartBar";
import "./Chart.css";

const Chart = (props) => {
    const maxValue = Math.max(
        ...props.dataPoints.map((dataPoint) => dataPoint.value)
    );
    return (
        <div className="chart">
            {props.dataPoints.map((dataPoint) => (
                <ChartBar
                    key={dataPoint.key}
                    value={dataPoint.value}
                    label={dataPoint.label}
                    maxValue={maxValue}
                />
            ))}
        </div>
    );
};

export default Chart;
