#!/usr/env node

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomElement = (arr) => arr[randomNumber(0, arr.length - 1)];
const args = process.argv.slice(2)
const splittedArgs = args.map((str) => str.split("="))

const usersChoice = {
  strategy: splittedArgs[0][1] || "switch",
  times: Number(splittedArgs[1][1]) || 10,
  doors: Number(splittedArgs[2][1]) || 3,
}

let allDoors = [];
let pickedDoor;
let counter = 0;
let doorWithCar;

const generateDoors = (arr, num) => {
  for (let i = 1; i <= num; i++) {
    arr.push({ hasCar: false, isOpened: false })
  }
  doorWithCar = randomElement(arr);
  const indexOfDoorWithCar = arr.indexOf(doorWithCar)
  arr[indexOfDoorWithCar]["hasCar"] = true;
}


const pickADoor = (doors) => {
  pickedDoor = randomElement(doors);
}

const showGoat = (doors) => {
  const goatsOnly = doors.filter(door => !door.hasCar && door !== pickedDoor);
  for (const door of doors) {
    if (goatsOnly.includes(door)) {
      door["isOpened"] = true;
    }
  }
};

const pickADoorAgain = (doors) => {
    const newPickedDoor = doors.filter(door => (door !== pickedDoor) && (!door.isOpened));
    const indexOfNewDoor = doors.indexOf(newPickedDoor[0]);
    pickedDoor = allDoors[indexOfNewDoor];
}


const playTheGame = (strategy, times, doors) => {
  if(strategy !== "stick" && strategy !== "switch") {
    console.log("Please choose your strategy");
    return;
  }
  for (let i = 0; i <= times; i++) {
    generateDoors(allDoors, doors);
    pickADoor(allDoors);
    showGoat(allDoors);
    if (strategy == "switch") {
      pickADoorAgain(allDoors)
    }
    if (allDoors.indexOf(pickedDoor) == allDoors.indexOf(doorWithCar)) {
      counter += 1;
   }
   allDoors = [];
  }
}

const successPercentage = (num) => {
  const result = counter > 0 ? Math.round(100 * (counter / num)) : "No success"
    return result
}

playTheGame(usersChoice.strategy, usersChoice.times, usersChoice.doors)
successPercentage(usersChoice.times)
