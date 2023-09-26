var player = {
    "name": "Michael Jordan",
    "height": 198,
    "position": "SG",
    "team": "Chigago Bulls",
    "league": "NBA",
    "team_mates": [
        "Scottie Pippen",
        "Dennis Rodman",
        "Toni Kukoc",
        "Steve Kerr",
    ],
};

console.log(player);
console.log("He changed his team to Washington Wizards");
// He changed his team to Washington Wizards
player.team = "Washington Wizards";
player.team_mates = [
    "Jerry Stackhouse",
    "Brendan Haywood",
    "Tyronn Lue",
    "Kwame Brown",
    "Bryon Russell",
];

console.log(player);

// Add new property to the object
player.shoe_size = 50;
console.log(player);

// Delete the new property
delete player.shoe_size;
console.log(player);

function getPlayersInfo(obj, prop) {
    return obj[prop];
};

function checkObjectProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
};

var prop = "height";
var info = "Not available";
if (checkObjectProperty(player, prop)) {
    info = getPlayersInfo(player, prop);
};
console.log(`Info about the player's ${prop}: ${info}`);
