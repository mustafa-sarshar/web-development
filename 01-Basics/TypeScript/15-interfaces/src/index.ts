// Interface for objects
interface IsPerson {
  name: string;
  age: number;
  speak(text: string): void;
  spend(amount: number): number;
}

// Person object
const mike: IsPerson = {
  name: "Mike",
  age: 55,
  speak(text: string): void {
    console.log(text);
  },
  spend(amount: number): number {
    return amount;
  },
};

// Interface for classes
interface IsAnimal {
  name: string;
  race: string;
  bite(): void;
  eat(food: string): void;
}

// Animal class
class Animal implements IsAnimal {
  name: string;
  race: string;

  constructor(name: string, race: string) {
    this.name = name;
    this.race = race;
  }

  bite(): void {
    console.log(`${this.name} is biting!`);
  }

  eat(food: string): void {
    console.log(
      `${this.name} is eating ${food}, because he/she is ${this.race}`
    );
  }
}
