import VehicleObj = require('./classes/vehicleObj');
import Evehicle = require('./classes/evehicle');
function initialize(){
    const myBicycle = new VehicleObj("Bicycle","myBike", 0.05);
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
    myEbike.return();
    /*var close: string = "";
    do{

    }while(close.toLowerCase() != 'y');*/

}

initialize();