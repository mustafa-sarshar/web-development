import Athlete from "./AthleteItem/AthleteItem";
import Card from "../UI/Card/Card";
import "./Athletes.css";

function Athletes(props) {
    return (
        <Card className="athletes-container">
            <Athlete athleteInfo={props.athletes[0]} />
            <Athlete athleteInfo={props.athletes[1]} />
            <Athlete athleteInfo={props.athletes[2]} />
            <Athlete athleteInfo={props.athletes[3]} />
            <Athlete athleteInfo={props.athletes[4]} />
        </Card>
    );
}
export default Athletes;
