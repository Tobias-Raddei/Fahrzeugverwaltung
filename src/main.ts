import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import Vehicle from './classes/vehicle.js';
import Evehicle from './classes/evehicle.js';
import TestData from './testData.js';

function initialize(){
    const testData = new TestData;
    const data: Vehicle[] = createDataArray(testData);
    
    doSmth(data, testData);
}

async function doSmth(data: Vehicle[], testData: TestData){
    let close: string = "";
    let currentData = data;
    const reader = readline.createInterface({input, output});
    do{
        console.log("\nChoose what to do next!");
        console.log("1: Rent out a Vehicle");
        console.log("2: Add a Vehicle to the fleet");
        console.log("3: Return a previously rented out vehicle");
        console.log("4: Show the status of all vehicles in your fleet");
        console.log("5: Charge one of your electric vehicles");
        console.log("6: Drive one of the rented out vehicles");
        //console.log("Choose what to do next!");
        
        const state = await reader.question(":");
        switch(state){
            case "1":
                await rentOut(currentData, reader);
                break;
            case "2":
                currentData = await addVehicle(testData, reader);
                break;
            case "3":
                await returnVehicle(currentData, reader);
                break;
            case "4":
                printAllVehicles(currentData, reader);
                break;
            case "5":
                await chargeVehicle(currentData, reader);
                break;
            case "6":
                await driveVehicle(currentData, reader);
                break;
            default:
                console.log(`Invalid entry "${state}". Please select one of the given options!`);
        }
        console.log("\nWould you like to continue? If you choose no, the application closes.");
        close = (await reader.question("[y/n]:")).trim();
    }while(close.toLowerCase() !== 'n');

    reader.close();
}

function printAllVehicles(data: Vehicle[], reader: readline.Interface){
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

async function rentOut(data: Vehicle[], reader: readline.Interface){
    console.log("Which vehicle would you like to rent out?");
    try{
        const vNumberS: string = await reader.question("Enter vehicle number:");
        const vNumber: number = Number(vNumberS);

        if(Number.isNaN(vNumber)) throw new Error("Vehicle number must be a number!");
        if(vNumber < 0 || vNumber > data.length - 1) throw new Error("Vehicle number is out of bounds!");
        if(!Number.isInteger(vNumber))throw new Error("Vehicle number must be a whole number!");

        const vehicle = data[vNumber];
        if (!vehicle) return;

        const rentDurationString = await reader.question("Enter renting duration:");
        const rentDuration: number = Number(rentDurationString);
        if(isNaN(rentDuration) || rentDuration <= 0) throw new Error("Not a valid number!");

        const rentPrice = vehicle.rent(rentDuration);
        if (rentPrice === -1) {
            console.error(`Vehicle ${vehicle.name} is already rented out!`);
            return;
        }

        console.log(`${vehicle.name} was rented out for ${rentDuration} minutes for a cost of ${rentPrice}`);
    }catch(err: any){
        console.log("Error renting out vehicle: " + err.message);
    }
}

async function addVehicle(testData: TestData, reader: readline.Interface): Promise<Vehicle[]> {
    console.log("Adding a new vehicle to the fleet:");
    
    try{
        //Vehicle Type
        console.log("Enter type of new vehicle(Bicycle, E-Bike or E-Scooter)");
        const vType = (await reader.question(":")).trim();
        if(!["Bicycle", "E-Bike", "E-Scooter"].includes(vType)) throw new Error(`${vType} is not a valid vehicle type!`);
        
        //Vehicle Name
        console.log("Enter the name of the new vehicle");
        const vName = (await reader.question(":")).trim();
        
        //Vehicle's cost per minute
        console.log("Enter the vehicle's cost per minute");
        const vCostPerMinuteS = await reader.question(":");
        const vCostPerMinute = Number(vCostPerMinuteS);
        if(Number.isNaN(vCostPerMinute)) throw new Error("The entered cost is not a number!");
        if(vCostPerMinute < 0.01 || vCostPerMinute > 0.5) throw new Error("This cost is unrealistic!");
        
        //Usage only for E-Vehicles
        if(["E-Bike", "E-Scooter"].includes(vType)){
            console.log("Enter the vehicle's usage per km in %");
            const evUsageS = await reader.question(":");
            const evUsage = Number(evUsageS);
            if(Number.isNaN(evUsage)) throw new Error("The entered usage is not a number!");
            if(evUsage < 0.5 || evUsage > 5) throw new Error("The entered usage is unrealistic!");

            const newEVehicle = new Evehicle(vType, vName, vCostPerMinute, evUsage);
            testData.addVehicle(vType, newEVehicle);
        }else{
            const newVehicle = new Vehicle(vType, vName, vCostPerMinute);
            testData.addVehicle(vType, newVehicle);
        }

        console.log(`Successfully added ${vName} to the fleet.`);
    }catch(err: any){
        console.log("Error adding new vehicle to fleet: " + err.message);
    }
    
    return createDataArray(testData);
}

async function returnVehicle(data: Vehicle[], reader: readline.Interface){
    try{
        const vNumberS: string = await reader.question("Enter the number of the returned vehicle:");
        const vNumber: number = Number(vNumberS);

        if(Number.isNaN(vNumber) || !Number.isInteger(vNumber)) throw new Error("Vehicle number must be a whole number!");
        if(vNumber < 0 || vNumber >= data.length) throw new Error("The entered number is outside of the range of valid indices!");
        
        const vehicle = data[vNumber];
        if (vehicle) {
            vehicle.returnVehicle();
            console.log(`${vehicle.name} has been returned.`);
        }
    }catch(err: any){
        console.log("Error returning vehicle: " + err.message);
    }
}

async function chargeVehicle(data: Vehicle[], reader: readline.Interface) {
    try{
        //Vehicle number
        const vNumberS: string = await reader.question("Enter the number of the vehicle you would like to charge:");
        const vNumber: number = Number(vNumberS);
        
        if(Number.isNaN(vNumber) || !Number.isInteger(vNumber)) throw new Error("Vehicle number must be a whole number!");
        if(vNumber < 0 || vNumber > data.length - 1) throw new Error("The entered number is outside of the range of valid indices!");
        
        const vehicle = data[vNumber];
        if(!(vehicle instanceof Evehicle))throw new Error(`The given vehicle at number ${vNumber} is not electric!`);
        
        //Charge amount
        const chargeAmountS = await reader.question("Enter the percentage amount by which you would like to charge the vehicle:");
        const chargeAmount = Number(chargeAmountS);
        if(Number.isNaN(chargeAmount)) throw new Error("The charge amount must be a number!");
        
        vehicle.charge(chargeAmount);
        
        //console output
        console.log(`Vehicle ${vehicle.name} has been charged to ${vehicle.currentCharge}%`);
    }catch(err: any){
        console.log("Error charging vehicle: " + err.message);
    }
}

async function driveVehicle(data: Vehicle[], reader: readline.Interface) {
    try{
        //Vehicle number
        const vNumberS: string = await reader.question("Enter the number of the vehicle you would like to drive:");
        const vNumber: number = Number(vNumberS);
        if(Number.isNaN(vNumber) || !(Number.isInteger(vNumber))) throw new Error("Vehicle number must be a whole number!");
        if(vNumber < 0 || vNumber > data.length - 1) throw new Error("The entered number is outside of the range of valid indices!");
        
        //driving distance
        const distanceS: string = await reader.question("Enter  the distance you would like to drive in km:");
        const distance = Number(distanceS);
        if(Number.isNaN(distance) || distance <= 0) throw new Error("The driving distance must be a positive number!");
        
        data[vNumber]?.drive(distance);
    }catch(err: any){
        console.log("Error driving vehicle: " + err.message);
    }
}

function createDataArray(testData: TestData){
    return [...testData.getBikes(), ...testData.getEbikes(), ...testData.getScooters()];
}

initialize();