class Traveler {

    constructor(name) {
        this.name = name;
        this.food = 1;
        this.isHealthy = true
    }


    hunt() {
        //console.log(this.food)
        let foodQty = this.food + 2
        this.food = foodQty
        return this.food

    }

    eat() {
        let consume = this.food - 1;
        if (consume > 0) {
            this.isHealthy = true
            return this.food = consume
        }
        else if (consume <= 0) {
            this.food = 0
            //alert(this.name + " food supply reached to 0. It's time for a hunt")
            return this.isHealthy = false
        } else {
            return this.isHealthy = true
        }
    }
}

class Wagon {
    constructor(capacity) {
        this.capacity = capacity;
        this.passengers = []

    }
    //getAvailableSeatCount() – Returns the number of empty seats, determined by the capacity set when the wagon was created, subtracted by the number of passengers currently on board.
    getAvailableSeatCount() {
        //console.log(this.passengers)
        let openSeats = this.capacity - this.passengers.length
        return 'Only ' + openSeats + ' left'
    }
    //join(traveler) - Adds the traveler to the wagon if there is space. If the wagon is already at maximum capacity, don't add them.
    join(traveler) {
        if (this.capacity > this.passengers.length) {
            this.passengers.push(traveler)
            //console.log(this.passengers)
        }
        else {
            //alert('Wagon has reached it/s max capacity. Search for another wagon.')
        }
    }
    //shouldQuarantine() - Returns true if there is at least one unhealthy person in the wagon. Return false if not.
    shouldQuarantine() {
        if (this.passengers.map(passenger => (passenger.isHealthy)).includes(false)) {
            return true
        } else {
            return false
        }

    }
    //totalFood() - Returns the total amount of food among all passengers in the wagon.
    totalFood() {
        return this.passengers.map(passenger => passenger.food).reduce((sum, food) => sum + food, 0)

    }
}

//Create 2 new child classes from the Traveler class:
//The Doctor Class
//The Doctor class will extend the traveler class and have one additional method:

//heal(traveler) - set the traveler's isHealthy property to true.
class Doctor extends Traveler {
    constructor(name) {
        super(name)
    }

    heal(traveler) {
        return traveler.isHealthy = true
    }
}
//The Hunter Class
//The Hunter class will extend the traveler class, but it will start with 2 food instead of 1. The Hunter class should also have the following methods:

//hunt() - Increase the hunter's food by 5. (A normal traveler gains only 2.)
class Hunter extends Traveler {
    constructor(name) {
        super(name)
        this.food = 2
    }
    hunt() {
        let foodQty = this.food + 5
        return this.food = foodQty
    }
    //eat() - Consumes 2 units of food. If the hunter doesn't have 2 food when they are instructed to eat, they eat as much as they can (0 or 1 unit), but the hunter is no longer healthy
    eat() {
        let consume = this.food - 2
        if (consume > 1) {
            this.isHealthy = true
            return this.food = consume
        } if (consume <= 0) {
            this.isHealthy = false
            return this.food = 0
        }
       else if (consume <= 1) {
           return this.food = consume
            //alert(this.name + " food supply reached to 0. It's time for a hunt")
            //this.isHealthy = true
        }

    }
    //giveFood(traveler, numOfFoodUnits) - Transfers numOfFoodUnits from the hunter to the traveler. If the hunter doesn't have enough food, then no food should be transferred.'
    giveFood(traveler, numOfFoodUnits) {
        if (this.food <= 0) {
            return 'Food Qty is too low to share' + numOfFoodUnits + '.'
        } else if (this.food >= numOfFoodUnits) {
            this.food -= numOfFoodUnits
            traveler.food += numOfFoodUnits

        }
        /*else if (this.food === numOfFoodUnits) {
            this.food = 0
            this.isHealthy = false
            traveler.food 
            //How to transfer numOfFoodUnits to traveler here
            return this.food
        }*/
        /*else if (this.food > 1) {
            this.isHealthy = true
            this.food = this.food - numOfFoodUnits
            //How to transfer numOfFoodUnits to traveler here
        }*/

    }


}
// Create a wagon that can hold 4 people
let wagon = new Wagon(4);
// Create five travelers
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
wagon.join(maude); // There isn't room for her!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
sarahunter.hunt(); // gets 5 more food
drsmith.hunt();
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan is now hungry (sick)
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // She only has 1, so she eats it and is now sick
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);