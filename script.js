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
  let currentUser = users.find(
    function (el) {
      return el.username === name;
    } || null
  );
  if (currentUser == null) {
    console.log("User not found, please try again");
    setUser(users);
    //  If user is entered correctly the first time, this works great, BUT:
    //  If the user is entered wrong once, the function will run again, BUT even if the user is entered correctly on the second attempt,
    // the return is undefined
  } else {
    console.log(`Hello there ${currentUser.username} `);
    //  EVEN THOUGH if I console log currentUser right here, on a second attempt, it logs as the correct user,
    // Back in the app, the user variable this function is returning to shows undefined
    return currentUser;
  }
};

const modSelectorMenu = (mods, budget, userCar) => {
  for (let modType in mods) {
    console.clear();
    let selector = 1;
    for (let mod of mods[modType]) {
      console.log(`${selector}. ${mod.name}, price: ${mod.price}`);
      mod.selection = selector;
      selector++;
    }
    console.log(`Current budget: $${budget}`);
    const ans = prompt(`What type of ${modType} would you like? `);
       mods[modType].find(function (el) {
      if (el.selection == ans) {
        if (budget >= el.price) {
          budget = budget - el.price;
          userCar[modType] = el.performance;
        } else {
          console.clear();
          console.log("No offence but you're really povvo");
          budget = prompt("Please enter an increased budget");
          return modSelectorMenu(mods, budget, userCar);
        }
      }
    });
  }
};

const race = (userCar, opponentCar) => {

  console.log(`You're matched up against the fierce ${opponentCar.racer[0]}, with a ${opponentCar.motor.name} and ${opponentCar.tyre.name}`);
  prompt('Press enter to race!')
  console.clear();
  const userTotal =
    userCar.racerSkill + userCar.motor + userCar.tyre;
  const opponentTotal =
    opponentCar.racer[1] +
    opponentCar.motor.performance +
      opponentCar.tyre.performance;

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

    modSelectorMenu(mods, budget, myCar);

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
