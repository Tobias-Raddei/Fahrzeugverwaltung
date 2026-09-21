import Evehicle from "./classes/evehicle.js";
import Vehicle from "./classes/vehicle.js";

class TestData{
    protected bikes: Vehicle[] = [];
    protected eBikes: Evehicle[] = [];
    protected eScooters: Evehicle[] = [];

    public constructor(){
        this.bikes.push(
            new Vehicle("Bicycle", "MegaBike 900", 0.05),
            new Vehicle("Bicycle", "UltraBike 2k15", 0.05),
            new Vehicle("Bicycle", "Super Sonic Racer", 0.05),
            new Vehicle("Bicycle", "Nut Cracker", 0.05),
            new Vehicle("Bicycle", "Inspire 5", 0.05)
        );

        this.eBikes.push(
            new Evehicle("E-Bike", "MegaBike 900e", 0.1, 2),
            new Evehicle("E-Bike", "Fast Blazer 5", 0.1, 2),
            new Evehicle("E-Bike", "Trail Ripper 9", 0.1, 2),
            new Evehicle("E-Bike", "Tesla Coil Super", 0.1, 2),
            new Evehicle("E-Bike", "Infinity and Beyond", 0.1, 2)
        );

        this.eScooters.push(
            new Evehicle("E-Scooter", "ToyTransport X", 0.07, 2),
            new Evehicle("E-Scooter", "TechTrash Elite", 0.07, 2),
            new Evehicle("E-Scooter", "The Urban Obstacle Prime", 0.07, 2),
            new Evehicle("E-Scooter", "ScrapStreamer Eco", 0.07, 2),
            new Evehicle("E-Scooter", "MayhemMatrix Quantum", 0.07, 2)
        );
    }

    public getBikes(): Vehicle[]{
        return this.bikes;
    }

    public getEbikes(): Evehicle[]{
        return this.eBikes;
    }

    public getScooters(): Evehicle[]{
        return this.eScooters;
    }

    public addVehicle(type: string, vehicle: Vehicle | Evehicle): void{
        switch(type){
            case "Bicycle":
                if (vehicle instanceof Evehicle || !(vehicle instanceof Vehicle)) {
                    console.error("Error inserting Bicycle: Wrong Object type or incompatible object type!");
                    return;
                }
                this.bikes.push(vehicle);
                break;
            case "E-Bike":
                if (!(vehicle instanceof Evehicle)) {
                    console.error("Error inserting E-Bike: Object must be an instance of Evehicle!");
                    return;
                }
                this.eBikes.push(vehicle);
                break;
            case "E-Scooter":
                if (!(vehicle instanceof Evehicle)) {
                    console.error("Error inserting E-Scooter: Object must be an instance of Evehicle!");
                    return;
                }
                this.eScooters.push(vehicle);
                break;
            default:
                console.error(`Error inserting Vehicle: Unknown type string "${type}"!`);
        }
    }
}

export default TestData;