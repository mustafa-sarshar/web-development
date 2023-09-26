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

const getInfoAboutThePerson = function(player_name) {
    const info = `${player_name} plays in ${players[player_name].team} and has got ${players[player_name].points} points.`;
    return info;
};

player_name = "Allen Iverson";
console.log(getInfoAboutThePerson(player_name));


function makeList(data) {
    const resultDisplayArray = [];
    let data_sub;
    let spaceCharacter_main;
    let spaceCharacter_sub;
    let msg;
    
    for (const [key_main, value_main] of Object.entries(data)) {
        data_sub = "";
        spaceCharacter_main = "\t";        
        msg = "";
        for (const [key_sub, value_sub] of Object.entries(value_main)) {
            spaceCharacter_sub = "\t";
            msg = `${key_sub}: ${value_sub}`;
            if (msg.length < 15) { spaceCharacter_sub += "\t"; };
            data_sub += `${msg}${spaceCharacter_sub}`;            
        };
        msg = `${key_main} -->`;
        if (msg.length < 16) { spaceCharacter_main += "\t"; };
        msg = `${key_main} -->${spaceCharacter_main} ${data_sub}`;
        console.log(msg);
        resultDisplayArray.push(msg);
    }
    return resultDisplayArray;
};

makeList(players);