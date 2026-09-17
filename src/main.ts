import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import VehicleObj from './classes/vehicleObj.js';
import Evehicle from './classes/evehicle.js';
import TestData from './testData.js';
function initialize(){
    /*const myBicycle = new VehicleObj("Bicycle","myBike", 0.05);
    const myEbike = new Evehicle("Ebike", "myEbike", 0.1, 2);

    myBicycle.printStatus();
    myEbike.printStatus();

    myBicycle.return();

    let bikeCost = myBicycle.rent(60);
    let ebikeCost = myEbike.rent(60);

    console.log(`Bike Cost: ${bikeCost} \tEbike Cost: ${ebikeCost}`);

    myBicycle.drive(5);
    myEbike.drive(3.45);

    console.log(`${myEbike.getName()}: ${myEbike.getCurrentCharge()}`);

    myBicycle.return();
    myEbike.return();*/
    var data = new TestData;
    doSmth(data);
}

async function doSmth(data: TestData){
    var close: string = "";
    var state: number;
    const reader = readline.createInterface({input, output});
    do{
        console.log("Choose what to do next!");
        console.log("1: Rent out a Vehicle");
        console.log("2: Add a Vehicle to the fleet");
        console.log("3: Return a previously rented out vehicle");
        console.log("4: Show the status of all vehicles in your fleet");
        console.log("5: Charge one of your electric vehicles");
        //console.log("Choose what to do next!");
        
        const state = await reader.question("");
        switch(state){
            case "1":
                break;
            case "2":
                break;
            case "3":
                break;
            case "4":
                break;
            case "5":
                break;
            default:
                console.log(`Invalid entry ${state}. Please select one of the given options!`);
        }
        console.log("Would you like to continue? If you choose no, the application closes.");
        console.log("[y/n]:");
    }while(close.toLowerCase() != 'y');
    reader.close();
}

initialize();