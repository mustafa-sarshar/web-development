var players = {
    "Kobe Bryant": {
        "team": "Lakers",
        "points": 1970
    },
    "Dirk Nowitzki": {
        "team": "Mavericks",
        "points": 2027
    },
    "Tracy McGrady": {
        "team": "Magic",
        "points": 1998
    },
    "Shaquille O'Neal": {
        "team": "Lakers",
        "points": 2800
    },
    "Vince Carter": {
        "team": "Raptors",
        "points": 1244
    },
    "Allen Iverson": {
        "team": "76ers",
        "points": 1500
    },
};


function updateRecord(obj, player_name, prop, new_value) {
    if (obj.hasOwnProperty(player_name)) { 
        if (obj[player_name].hasOwnProperty(prop)) {
            if (new_value === "") {
                delete obj[player_name][prop];
            } else {
                obj[player_name][prop] = new_value;
            };
        } else {
            console.log(`${player_name} doesn't have ${prop}. The new property will be created!`);
            obj[player_name][prop] = "";
            updateRecord(obj, player_name, prop, new_value);
        };
    } else {
        console.log("The record doesn't exist!");
    };
};

var players_JSON = JSON.parse(JSON.stringify(players));

player_name = "Kobe Bryant";
console.log(player_name + "'s record: " + JSON.stringify(players_JSON[player_name]));

player_name = "Kobe Bryant";
prop = "team";
new_value = "retired";
updateRecord(players_JSON, player_name, prop, new_value);
console.log(player_name + "'s record: " + JSON.stringify(players_JSON[player_name]));

player_name = "Allen Iverson";
prop = "team";
new_value = "";
updateRecord(players_JSON, player_name, prop, new_value);
console.log(player_name + "'s record: " + JSON.stringify(players_JSON[player_name]));

player_name = "Vince Carter";
prop = "height";
new_value = 198;

updateRecord(players_JSON, player_name, prop, new_value);
console.log(player_name + "'s record: " + JSON.stringify(players_JSON[player_name]));