class Traveler {

    constructor(name) {
        this.name = name;
        this.food = 1
        this.isHealthy = true;
    }


    hunt() {
        console.log(this.food)
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
        if (this.passengers.filter(passenger => (passenger.isHealthy === false))) {
            return true
        } else {
            return false
        }
    }
    //totalFood() - Returns the total amount of food among all passengers in the wagon.
    totalFood() {
        return this.passengers.reduce(passenger => passenger.food)
    }
}

let wagon = new Wagon(2)
// Create three travelers
let henrietta = new Traveler('Henrietta')
let juan = new Traveler('Juan')
let maude = new Traveler('Maude')
console.log(`Wagon Seat Count?: ${wagon.getAvailableSeatCount()} – EXPECTED: 2. The wagon starts with 2 seats. We haven't added travelers to the wagon yet.`)
wagon.join(henrietta)
console.log(`Wagon Seat Count?: ${wagon.getAvailableSeatCount()} – EXPECTED: 1. Henrietta just joined.`)
wagon.join(juan)
wagon.join(maude)  // There is no room for her!
console.log(`Wagon Seat Count?: ${wagon.getAvailableSeatCount()} – EXPECTED: 0 – There is no room for Maude, but Juan was able to join.`)
henrietta.hunt()   // Henrietta goes in search of food.
juan.eat()         // Juan eats – as Juan does. 🤣
juan.eat()         // Juan has run out of food!
console.log(juan)
console.log(`Wagon Should Quarantine?: ${wagon.shouldQuarantine()} – EXPECTED: true. Juan has run out of food and become unhealthy!`)
console.log(`Wagon's Total Food?: ${wagon.totalFood()} – EXPECTED: 3.`)
