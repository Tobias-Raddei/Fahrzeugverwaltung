import type { Vehicle } from '../interfaces/vehicle.ts';
class VehicleObj implements Vehicle {
    protected isRented: boolean;

    public constructor (protected readonly type: string, protected readonly name: string, protected readonly costPerMinute: number){
        this.isRented =  false;
    }

    public rent(duration: number): number{
        if(this.isRented) return -1;
        this.isRented = true;
        return this.costPerMinute * duration;
    }

    public drive(distance: number): void{
        try{
            if(this.isRented) console.log(`${this.name} was driven for ${distance}km`);
            else throw new Error("Can not drive a vehicle that is not rented out!");
        }catch(err){
            console.log(`Error driving ${this.name}: ${err}`);
        }
    }

    public returnVehicle(): void{
        try{
            if(this.isRented) this.isRented = false;
            else throw new Error("Can not return a vehicle that is not rented out!")
        }catch(err){
            console.log(`Error returning ${this.name}: ${err}`);
        }
        
    }

    public printStatus(): void{
        console.log("TODO: insert propper status message!");
    }

    public getName(): string{
        return this.name;
    }
}

export default VehicleObj;