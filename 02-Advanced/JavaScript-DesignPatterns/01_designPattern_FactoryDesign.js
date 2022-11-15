// Creational Category: Factor Pattern 
// Define Objects
function Player(name) {
    this.name = name;
    this.role = "Player";
}

function Trainer(name) {
    this.name = name;
    this.role = "Trainer";
}

function ClubFactory() {
    this.create = (name, role) => {
        switch (role) {
            case 1:
                return new Player(name);
                break;
            case 2:
                return new Trainer(name);
                break;
        }
    }
}

function greetMembers(member) {
    console.log(`Welcome, dear ${member.name}.\t\tGood luck at your position as ${member.role} in our club.`);
}

const clubFactory = new ClubFactory();
const clubMembers = [];
clubMembers.push(clubFactory.create("Pat Joee", 1));
clubMembers.push(clubFactory.create("Lionel Bash", 1));
clubMembers.push(clubFactory.create("John Dick", 1));
clubMembers.push(clubFactory.create("Evin Gusie", 2));
clubMembers.push(clubFactory.create("Derek Rosch", 2));

clubMembers.forEach(member => {
    greetMembers(member);
});