import Evehicle from "./classes/evehicle.js";
import VehicleObj from "./classes/vehicleObj.js";

class TestData{
    public constructor(){
        var bikes: VehicleObj[] = [];
        var eBikes: Evehicle[] = [];
        var eScooters: Evehicle[] = [];

        bikes.push(new VehicleObj("Bicycle", "MegaBike 900", 0.05));
        bikes.push(new VehicleObj("Bicycle", "UltraBike 2k15", 0.05));
        bikes.push(new VehicleObj("Bicycle", "Super Sonic Racer", 0.05));
        bikes.push(new VehicleObj("Bicycle", "Nut Cracker", 0.05));
        bikes.push(new VehicleObj("Bicycle", "Inspire 5", 0.05));

        eBikes.push(new Evehicle("E-Bike", "MegaBike 900e", 0.1, 2));
        eBikes.push(new Evehicle("E-Bike", "Fast Blazer 5", 0.1, 2));
        eBikes.push(new Evehicle("E-Bike", "Trail Ripper 9", 0.1, 2));
        eBikes.push(new Evehicle("E-Bike", "Tesla Coil Super", 0.1, 2));
        eBikes.push(new Evehicle("E-Bike", "Infinity and Beyond", 0.1, 2));

        eScooters.push(new Evehicle("E-Scooter", "ToyTransport X", 0.07, 2));
        eScooters.push(new Evehicle("E-Scooter", "TechTrash Elite", 0.07, 2));
        eScooters.push(new Evehicle("E-Scooter", "The Urban Obstacle Prime", 0.07, 2));
        eScooters.push(new Evehicle("E-Scooter", "ScrapStreamer Eco", 0.07, 2));
        eScooters.push(new Evehicle("E-Scooter", "MayhemMatrix Quantum", 0.07, 2));
    }
}

export default TestData;