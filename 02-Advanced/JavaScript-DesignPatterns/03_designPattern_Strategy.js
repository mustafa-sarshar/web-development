// ... Category: Strategy Pattern
// Purpose: 
// Define Objects

function Strategy1() {
    this.strategyName = "Strategy 1";
    this.runStrategy = (param) => {
        return this.strategyName + " works on " + param;
    }
}

function Strategy2() {
    this.strategyName = "Strategy 2";
    this.runStrategy = (param) => {
        return this.strategyName + " works on " + param;
    }
}

function Strategy3() {
    this.strategyName = "Strategy 3";
    this.runStrategy = (param) => {
        return this.strategyName + " works on " + param;
    }
}

function StrategyManagementSystem() {
    this.strategy = undefined;
    this.setStrategy = (strategy) => {
        this.strategy = strategy;
    }
    this.runStrategy = (param) => {
        return this.strategy.runStrategy(param);
    }
}

const strategies = [
    new Strategy1,
    new Strategy2,
    new Strategy3
];

const stManageSys = new StrategyManagementSystem()

strategies.forEach(strategy => {
    stManageSys.setStrategy(strategy);
    console.log(stManageSys.runStrategy(strategy.strategyName));
}) 