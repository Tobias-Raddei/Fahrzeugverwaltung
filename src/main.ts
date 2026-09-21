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
    let data: VehicleObj[] = createDataArray(testData);
    
    doSmth(data, testData);
}

async function doSmth(data: VehicleObj[], testData: TestData){
    let close: string = "";
    let state: number;
    const reader = readline.createInterface({input, output});
    do{
        console.log("Choose what to do next!");
        console.log("1: Rent out a Vehicle");
        console.log("2: Add a Vehicle to the fleet");
        console.log("3: Return a previously rented out vehicle");
        console.log("4: Show the status of all vehicles in your fleet");
        console.log("5: Charge one of your electric vehicles");
        console.log("6: Drive one of the rented out vehicles");
        //console.log("Choose what to do next!");
        
        const state = await reader.question("");
        switch(state){
            case "1":
                await rentOut(data, reader);
                break;
            case "2":
                data = await addVehicle(testData, reader);
                break;
            case "3":
                await returnVehicle(data, reader);
                break;
            case "4":
                printAllVehicles(data, reader);
                break;
            case "5":
                await chargeVehicle(data, reader);
                break;
            case "6":
                await driveVehicle(data, reader);
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

function printAllVehicles(data: VehicleObj[], reader: readline.Interface){
    console.log(
        "Number".padEnd(8)+
        "Type".padEnd(16)+
        "Name".padEnd(24)+
        "is available".padEnd(16)+
        "cost per minute".padEnd(20)+
        "currentCharge");
    for(let i = 0; i < data.length; i++){
        process.stdout.write(String(i).padEnd(10));
        data[i]?.printStatus();
    }
}

async function rentOut(data: VehicleObj[], reader: readline.Interface){
    console.log("Which vehicle would you like to rent out?");
    try{
        console.log("Enter vehicle number");
        const vNumberS: string = await reader.question(":");
        const vNumber: number = Number(vNumberS);
        if(Number.isNaN(vNumber)) throw new Error("Vehicle numebr must be a number!");
        if(vNumber > data.length - 1) throw new Error("Vehicle number must be within the limits of fleet length!");
        if(vNumber < 0) throw new Error("Vehicle number must be a positive number!");
        if(!Number.isInteger(vNumber))throw new Error("Vehicle number must be a whole number!");
        console.log("Enter renting duration");
        const rentDurationString = await reader.question(":");
        const rentDuration: number = Number(rentDurationString);
        if(isNaN(rentDuration)) throw new Error("Not a valid number!");
        const rentPrice = data[vNumber]?.rent(rentDuration);
        console.log(`${data[vNumber]?.getName()} was rented out for ${rentDuration} minutes for a cost of ${rentPrice}`);
    }catch(err){
        console.log(`Error renting out vehicle: ${err}`);
    }
}

async function addVehicle(testData: TestData, reader: readline.Interface): Promise<VehicleObj[]> {
    console.log("Adding a new vehicle to the fleet:");
    let vType: string = "";
    let vName: string = "";
    let vCostPerMinuteS: string = "";
    let vCostPerMinute: number = 0;
    let evUsageS: string = "";
    let evUsage: number = 0;
    
    try{
        //Vehicle Type
        console.log("Enter type of new vehicle");
        console.log("Type must be either Bicycle, E-Bike or E-Scooter");
        vType = await reader.question(":");
        if(!["Bicycle", "E-Bike", "E-Scooter"].includes(vType)) throw new Error(`${vType} is not a valid vehicle type!`);
        
        //Vehicle Name
        console.log("Enter the name of the new vehicle");
        vName = await reader.question(":");
        
        //Vehicle's cost per minnute
        console.log("Enter the vehicle's cost per minute");
        vCostPerMinuteS = await reader.question(":");
        vCostPerMinute = Number(vCostPerMinuteS);
        if(Number.isNaN(vCostPerMinute)) throw new Error("The entered cost is not a number!");
        if(vCostPerMinute < 0.01 || vCostPerMinute > 0.5) throw new Error("This cost is unrealistic!");
        
        //Usage only for E-Vehicles
        if(["E-Bike", "E-Scooter"].includes(vType)){
            console.log("Enter the vehicle's usage per km in %");
            evUsageS = await reader.question(":");
            evUsage = Number(evUsageS);
            if(Number.isNaN(evUsage)) throw new Error("The entered usage is not a number!");
            if(evUsage < 0.5 || evUsage > 5) throw new Error("The entered usage is unrealistic!");
        }
        
    }catch(err){
        console.log("Error adding new vehicle to fleet: " + err);
    }
    //Instantiating new vehicle and adding to test data
    if(["E-Bike", "E-Scooter"].includes(vType)){
        const newEVehicle = new Evehicle(vType, vName, vCostPerMinute, evUsage);
        testData.addVehicle(vType, newEVehicle);
    }else{
        const newVehicle = new VehicleObj(vType, vName, vCostPerMinute);
        testData.addVehicle(vType, newVehicle);
    }
    return createDataArray(testData);
}

async function returnVehicle(data: VehicleObj[], reader: readline.Interface){
    console.log("Enter the number of the returned vehicle");
    
    try{
        const vNumberS: string = await reader.question(":");
        const vNumber: number = Number(vNumberS);
        if(Number.isNaN(vNumber)) throw new Error("Vehicle numebr must be a number!");
        if(!Number.isInteger(vNumber)) throw new Error("The vhehicle number must be a whole number!");
        if(vNumber < 0 || vNumber > data.length - 1) throw new Error("The entered number is outside of the range of valid indeces!");
        data[vNumber]?.returnVehicle();
        console.log(`${data[vNumber]?.getName()} has been returned.`);
    }catch(err){
        console.log("Error returning vehicle: " + err);
    }
}

async function chargeVehicle(data: VehicleObj[], reader: readline.Interface) {
    console.log("Enter the number of the vehicle you would like to charge");
    try{
        //Vehicle number
        const vNumberS: string = await reader.question(":");
        const vNumber: number = Number(vNumberS);
        if(Number.isNaN(vNumber)) throw new Error("Vehicle numebr must be a number!");
        if(!Number.isInteger(vNumber)) throw new Error("The vhehicle number must be a whole number!");
        if(vNumber < 0 || vNumber > data.length - 1) throw new Error("The entered number is outside of the range of valid indeces!");
        if(!(data[vNumber] instanceof Evehicle))throw new Error(`The given vehicle at number ${vNumber} is not electric!`);
        //Charge amount
        console.log("Enter the percentage amout by which you would like to charge the vehicle");
        const chargeAmountS = await reader.question(":");
        const chargeAmount = Number(chargeAmountS);
        if(Number.isNaN(chargeAmount)) throw new Error("The charge amount must be a number!");
        data[vNumber].charge(chargeAmount);
        //console output
        console.log(`Vehicle ${data[vNumber].getName()} has been charged to ${data[vNumber].getCurrentCharge()}%`);
    }catch(err){
        console.log("Error charging vehicle: " + err);
    }
}

async function driveVehicle(data: VehicleObj[], reader: readline.Interface) {
    console.log("Enter the number of the vehicle you would like to drive");
    try{
        //Vehicle number
        const vNumberS: string = await reader.question(":");
        const vNumber: number = Number(vNumberS);
        if(Number.isNaN(vNumber)) throw new Error("Vehicle numebr must be a number!");
        if(!(Number.isInteger(vNumber))) throw new Error("The vhehicle number must be a whole number!");
        if(vNumber < 0 || vNumber > data.length - 1) throw new Error("The entered number is outside of the range of valid indeces!");
        //if(!(data[vNumber] instanceof Evehicle))throw new Error(`The given vehicle at number ${vNumber} is not electric!`);
        //driving distance
        console.log("Enter  the distance you would like to drive in km");
        const distanceS: string = await reader.question(":");
        const distance = Number(distanceS);
        if(Number.isNaN(distance)) throw new Error("The driving distance must be a number!");
        data[vNumber]?.drive(distance);
    }catch(err){
        console.log("Error driving vehicle: " + err);
    }
}

function createDataArray(testData: TestData){
    let data: VehicleObj[] = [];
    testData.getBikes().forEach(element => {
        data.push(element);
    });
    testData.getEbikes().forEach(element => {
        data.push(element);
    });
    testData.getScooters().forEach(element => {
        data.push(element);
    });
    return data;
}

initialize();