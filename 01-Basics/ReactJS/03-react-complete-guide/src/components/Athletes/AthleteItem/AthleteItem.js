import DateItem from "../DateItem/DateItem";
import Card from "../../UI/Card/Card";
import "./AthleteItem.css";

function Athlete(props) {
    return (
        <Card className="athlete-info">
            <DateItem date={props.athleteInfo.birthDate} />
            <div className="athlete-info__sport">{props.athleteInfo.sport}</div>
            <div className="athlete-info__name">
                <h2>{props.athleteInfo.name}</h2>
                <div className="athlete-info__overall">
                    <span>overall: </span>
                    {props.athleteInfo.overall}
                </div>
            </div>
        </Card>
    );
}

export default Athlete;
