"use strict";

const racers = require("./racers.json");
const mods = require("./mods.json");
const tyres = mods.tyre;
const motors = mods.motor;
const opponents = [];
for (let racer of racers) {
  opponents.push([racer.username, racer.skill]);
}

const prompt = require("prompt-sync")({ sigint: true });

const setUser = (users) => {
    let name = prompt("Username:");
    let currentUser = users.find(function (el) {
      return el.username === name;
    } || null
     );
     if (currentUser == null) {
         console.log("User not found, please try again");
         setUser(users)
        //  If user is entered correctly the first time, this works great, BUT:
        //  If the user is entered wrong once, the function will run again, BUT even if the user is entered correctly on the second attempt, 
        // the return is undefined
     } else {
         console.log(`Hello there ${currentUser.username} `);
        //  EVEN THOUGH if I console log currentUser right here, on a second attempt, it logs as the correct user,
        // Back in the app, the user variable this function is returning to shows undefined
         return currentUser
     }
};


const modSelectorMenu = (modType, modTypeStr, budget) => {
    console.log(`Current budget: $${budget}`);
  let selector = 1;
  for (let mod of modType) {
    console.log(`${selector}. ${mod.name}, price: ${mod.price}`);
    mod.selection = selector;
    selector++;
  }  
  const ans = prompt(`What type of ${modTypeStr} would you like? `);
    return modType.find(function (el) {
      if (el.selection == ans) {
          if (budget >= el.price) {
               budget = budget - el.price
          return el.performance
        } else {
              console.clear();
            console.log("No offence but you're really povvo");
             budget = prompt("Please enter an increased budget")
              return modSelectorMenu(modType, modTypeStr, budget);
        }
      }
    });
};
// Getting the modTypeStr is janky, and would like to be able to pull it itself, but struggling to figure that out
// The above function works except for the budget, it does not update between each call of the function.
  

const race = (userCar, opponentCar) => {
  const userTotal =
    userCar.racerSkill + userCar.motor.performance + userCar.tyre.performance;
  const opponentTotal =
    opponentCar.racer[1] +
    opponentCar.motor.performance +
      opponentCar.tyre.performance;
    
    console.log(userTotal);
    console.log(opponentTotal);

  if (userTotal > opponentTotal) {
    console.log("You totally Whipped and nae nae'd on that scrub!");
  } else if (userTotal == opponentTotal) {
      console.log("Unbelievable! It's a tie!!!!");
  } else {
    console.log("Get rekt nerd, back to the lobby, GG");
  }
};

const user = setUser(racers);


const menuLoop = function () {
    const myCar = {};
    myCar.racerSkill = user.skill;
    const opponentCar = {};
    opponentCar.racer =
        opponents[Math.floor(Math.random() * opponents.length)]; 
    opponentCar.tyre = tyres[Math.floor(Math.random() * tyres.length)];
    opponentCar.motor = motors[Math.floor(Math.random() * motors.length)];
    console.clear();

    console.log(`You're matched up against the legendary racer ${opponentCar.racer[0]}`);

    console.log("Lets build your car!");

    let budget = prompt("What is your budget? $");

    myCar.tyre = modSelectorMenu(tyres, "tyre", budget);

    // Despite my budget being updated from the above function, it seems to only update within the functiion
    // Once I run the below function, the budget is the same as the original value that I had entered
    myCar.motor = modSelectorMenu(motors, "motor", budget);

    race(myCar, opponentCar);

    const retryInput = prompt("Would you like to race again? y/n ")
    if (retryInput == "y") {
        console.clear()
        menuLoop()
    } else {
        console.log("Goodbye");
    }

}

menuLoop()