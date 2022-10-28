const
    express = require("express"),
    serveIndex = require("serve-index"),
    Joi = require("joi");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use("", (req, res, next) => {
    console.log("Request type:", req.method, "@", req.url);
    next();
});

// app.use("/public", express.static("public"));
app.use("/public", serveIndex("public"));

const playerJoiSchema = {
    name: Joi.string().min(5).required(),
    team: Joi.string().min(3).required(),
    points: Joi.number().integer().required()
}

let lstPlayers = [
    {
        id: 0,
        name: "Kobe Bryant",
        team: "Lakers",
        points: 1970
    },
    {
        id: 1,
        name: "Dirk Nowitzki",
        team: "Mavericks",
        points: 2027
    },
    {
        id: 2,
        name: "Tracy McGrady",
        team: "Magic",
        points: 1998
    },
    {
        id: 3,
        name: "Shaquille O'Neal",
        team: "Lakers",
        points: 2800
    },
    {
        id: 4,
        name: "Vince Carter",
        team: "Raptors",
        points: 1244
    },
    {
        id: 5,
        name: "Allen Iverson",
        team: "76ers",
        points: 1500
    }
];
let playerLastId = lstPlayers.length;

function findPlayerById(playerId) {
    if (typeof playerId === "string")
        playerId = parseInt(playerId);
    return lstPlayers.find(player => player.id === playerId);
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/players", (req, res) => {
    res.send(lstPlayers);
});

app.post("/api/players", (req, res) => {
    const validationResult = Joi.validate(req.body, playerJoiSchema);
    if (validationResult.error)
        return res.status(400) // 400 Error: Bad Request
            .send(validationResult.error.details[0].message);

    const player = {
        id: playerLastId++,
        name: req.body.name,
        team: req.body.team,
        points: parseInt(req.body.points)
    }
    lstPlayers.push(player);
    res.send(player);
});

app.put("/api/players/:id", (req, res) => {
    const player = findPlayerById(req.params.id);
    if (!player)
        return res.status(404) // 404 Error: Not existing
            .send("No player found!!!");

    const validationResult = Joi.validate(req.body, playerJoiSchema);
    if (validationResult.error)
        return res.status(400) // 400 Error: Bad Request
            .send(validationResult.error.details[0].message);

    player.name = req.body.name;
    player.team = req.body.team;
    player.points = req.body.points;

    res.send(player);
});

app.delete("/api/players/:id", (req, res) => {
    const player = findPlayerById(req.params.id);
    if (!player)
        return res.status(404) // 404 Error: Not existing
            .send("No player found!!!");

    const objIndex = lstPlayers.indexOf(player);
    lstPlayers.splice(objIndex, 1);

    res.send(player);
});

app.get("/api/players/:id", (req, res) => {
    const player = findPlayerById(req.params.id);
    if (!player)
        res.status(404) // 404 Error: Not existing
            .send("No player found!!!");
    else
        res.send(player);
});

app.get("/public", (req, res) => {
    res.send("Hi");
})

app.listen(PORT, () => {
    console.log("The server is running on port", PORT);
});