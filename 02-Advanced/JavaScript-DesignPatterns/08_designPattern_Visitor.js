// ... Category: Visitor Pattern
// Purpose: To extend a library
// Define Objects

function Player(name, performanceLevel) {
    this.name = name;
    this.performanceLevel = performanceLevel;
}
Player.prototype = {
    getPerformanceLevel: function () {
        return this.performanceLevel;
    },
    setPerformanceLevel: function (newPerformanceLevel) {
        this.performanceLevel = newPerformanceLevel;
    },
    accept: function (visitorFunction) {
        visitorFunction(this);
    }
}

function increasePerformanceLevel(player) {     // Define the Visitor 
    player.setPerformanceLevel(player.getPerformanceLevel() + 10);
}

const player1 = new Player("Player 1", 65);
const player2 = new Player("Player 2", 60);

console.log(`${player1.name}'s performance level is\t\t${player1.getPerformanceLevel()}\tat the moment.`);
player1.accept(increasePerformanceLevel);
console.log(`${player1.name}'s performance level is\t\t${player1.getPerformanceLevel()}\tafter 1 week training.`);

console.log(`${player2.name}'s performance level is\t\t${player2.getPerformanceLevel()}\tat the moment.`);
player2.accept(increasePerformanceLevel);
player2.accept(increasePerformanceLevel);
console.log(`${player2.name}'s performance level is\t\t${player2.getPerformanceLevel()}\tafter 2 weeks training.`);
