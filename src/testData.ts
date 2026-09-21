import Evehicle from "./classes/evehicle.js";
import VehicleObj from "./classes/vehicleObj.js";

class TestData{
    protected bikes: VehicleObj[] = [];
    protected eBikes: VehicleObj[] = [];
    protected eScooters: VehicleObj[] = [];

    public constructor(){
        this.bikes.push(new VehicleObj("Bicycle", "MegaBike 900", 0.05));
        this.bikes.push(new VehicleObj("Bicycle", "UltraBike 2k15", 0.05));
        this.bikes.push(new VehicleObj("Bicycle", "Super Sonic Racer", 0.05));
        this.bikes.push(new VehicleObj("Bicycle", "Nut Cracker", 0.05));
        this.bikes.push(new VehicleObj("Bicycle", "Inspire 5", 0.05));

        this.eBikes.push(new Evehicle("E-Bike", "MegaBike 900e", 0.1, 2));
        this.eBikes.push(new Evehicle("E-Bike", "Fast Blazer 5", 0.1, 2));
        this.eBikes.push(new Evehicle("E-Bike", "Trail Ripper 9", 0.1, 2));
        this.eBikes.push(new Evehicle("E-Bike", "Tesla Coil Super", 0.1, 2));
        this.eBikes.push(new Evehicle("E-Bike", "Infinity and Beyond", 0.1, 2));

        this.eScooters.push(new Evehicle("E-Scooter", "ToyTransport X", 0.07, 2));
        this.eScooters.push(new Evehicle("E-Scooter", "TechTrash Elite", 0.07, 2));
        this.eScooters.push(new Evehicle("E-Scooter", "The Urban Obstacle Prime", 0.07, 2));
        this.eScooters.push(new Evehicle("E-Scooter", "ScrapStreamer Eco", 0.07, 2));
        this.eScooters.push(new Evehicle("E-Scooter", "MayhemMatrix Quantum", 0.07, 2));
    }

    public getBikes(): VehicleObj[]{
        return this.bikes;
    }

    public getEbikes(): VehicleObj[]{
        return this.eBikes;
    }

    public getScooters(): VehicleObj[]{
        return this.eScooters;
    }

    public addVehicle(type: string, vehicle: VehicleObj | Evehicle): void{
        switch(type){
            case "Bicycle":
                try{
                    //console.log("vehicle type: " + typeof(vehicle));
                    //console.log("VehicleObj type: " + typeof(VehicleObj));
                    if(!(vehicle instanceof VehicleObj)) throw new Error("Wrong Object type for given type string, or incompadible object type!");
                    this.bikes.push(vehicle);
                }catch(err){
                    console.log(`Error inserting Bicycle into test data: ${err}`);
                }
                break;
            case "E-Bike":
                try{
                    if(!(vehicle instanceof VehicleObj)) throw new Error("Wrong Object type for given type string!");
                    this.eBikes.push(vehicle);
                }catch(err){
                    console.log(`Error inserting E-Bike into test data: ${err}`);
                }
                break;
            case "E-Scooter":
                try{
                    if(!(vehicle instanceof VehicleObj)) throw new Error("Wrong Object type for given type string!");
                    this.eScooters.push(vehicle);
                }catch(err){
                    console.log(`Error inserting E-Scooter into test data: ${err}`);
                }
                break;
            default:
                try{
                    throw new Error("Wrong type string for Vehicle insertion into test data!");
                }catch(err){
                    console.log(`Error inserting Vehicle into test data: ${err}`);
                }
        }
    }
}

export default TestData;