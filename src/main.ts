import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import VehicleObj from './classes/vehicleObj.js';
import Evehicle from './classes/evehicle.js';
import TestData from './testData.js';
import { read } from 'node:fs';
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
    const testData = new TestData;
    var data: VehicleObj[] = [];
    testData.getBikes().forEach(element => {
        data.push(element);
    });
    testData.getEbikes().forEach(element => {
        data.push(element);
    });
    testData.getScooters().forEach(element => {
        data.push(element);
    });
    
    doSmth(data);
}

async function doSmth(data: VehicleObj[]){
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
                await rentOut(data, reader);
                break;
            case "2":
                break;
            case "3":
                break;
            case "4":
                await printAllVehicles(data, reader);
                break;
            case "5":
                break;
            default:
                console.log(`Invalid entry ${state}. Please select one of the given options!`);
        }
        console.log("Would you like to continue? If you choose no, the application closes.");
        console.log("[y/n]:");
        close = (await reader.question(":")).trim();
    }while(close.toLowerCase() != 'n');
    reader.close();
}

async function printAllVehicles(data: VehicleObj[], reader: readline.Interface){
    console.log(
        "Number".padEnd(8)+
        "Type".padEnd(16)+
        "Name".padEnd(24)+
        "is available".padEnd(16)+
        "currentCharge");
    for(let i = 0; i < data.length; i++){
        process.stdout.write(String(i) + "\t");
        data[i]?.printStatus();
    }
    console.log("Press enter to continue.");
    await reader.question(":");
}

async function rentOut(data: VehicleObj[], reader: readline.Interface){
    console.log("Which vehicle would you like to rent out?");
    try{
        console.log("Enter vehicle number");
        const vNumberString: string = await reader.question(":");
        const vNumber: number = Number(vNumberString);
        if(isNaN(vNumber)) throw new Error("Not a valid number!");
        if(vNumber > data.length - 1) throw new Error("Vehicle number must be within the limits of fleet length!");
        if(vNumber < 0) throw new Error("Vehicle number must be a positive number!");
        if(!Number.isInteger(vNumber))throw new Error("Vehicle number must be a whole number!");
        console.log("Enter renting duration");
        const rentDurationString = await reader.question(":");
        const rentDuration: number = Number(rentDurationString);
        if(isNaN(rentDuration)) throw new Error("Not a valid number!");
        data[vNumber]?.rent(rentDuration);
    }catch(err){
        console.log(`Error renting out vehicle: ${err}`);
    }
}

initialize();