class Player {
    constructor(fname, lname, age=0, height=0, team="NA", position="NA", years_of_pro=0) {
        return ( {fname, lname, age, height, team, position, years_of_pro} );
    };
};

let player = new Player("Michae", "Jordan");
console.log(player);


// Getter and setter
class Manager {
    constructor(fname, lname, age=0, education_level=0, years_of_experience=0, salary=0) {
        this.fname = fname;
        this.lname = lname;
        this.age = age;
        this.years_of_experience = years_of_experience;
        if (salary == 0) {
            this._salary = years_of_experience**2 * education_level**2 * 100;            
        } else {            
            this._salary = salary;
        };        
    };

    // getter
    get earnings() {
        return this._salary;
    };
    // setter
    set earnings(new_salary) {
        this._salary = new_salary;
    };
};

let manager = new Manager("Adam", "Silver", 60, 2, 20);
console.log(manager);

manager.earnings = 250000;
console.log(manager);
