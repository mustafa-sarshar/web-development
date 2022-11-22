import Athletes from "./components/Athletes/Athletes";

function App() {
    const athletes = [
        {
            _id: "0001",
            sport: "Basketball",
            name: "Michael Jordan",
            birthDate: new Date(1899, 10, 10),
            overall: 99,
        },
        {
            _id: "0002",
            sport: "Soccer",
            name: "Christiano Ronaldo",
            birthDate: new Date(1899, 10, 10),
            overall: 96,
        },
        {
            _id: "0003",
            sport: "Tennis",
            name: "Rafael Nadal",
            birthDate: new Date(1899, 10, 10),
            overall: 89,
        },
        {
            _id: "0004",
            sport: "Swimming",
            name: "Michael Phelps",
            birthDate: new Date(1899, 10, 10),
            overall: 99,
        },
        {
            _id: "0005",
            sport: "Boxing",
            name: "Mike Tyson",
            birthDate: new Date(1899, 10, 10),
            overall: 95,
        },
    ];
    return (
        <div>
            <h1>Best athletes in the World</h1>
            <section className="">
                <Athletes athletes={athletes} />
            </section>
        </div>
    );
}

export default App;
