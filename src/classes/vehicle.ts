import type { VehicleI } from '../interfaces/vehicle.js';
class Vehicle implements VehicleI {
    public isRented: boolean = false;

    public constructor (
        public readonly type: string, 
        public readonly name: string, 
        protected readonly costPerMinute: number
    ){}

    public rent(duration: number): number{
        if(this.isRented) return -1;
        this.isRented = true;
        return this.costPerMinute * duration;
    }

    public drive(distance: number): void{
        if (!this.isRented) {
            console.error(`Error driving ${this.name}: Can not drive a vehicle that is not rented out!`);
            return;
        }
        console.log(`${this.name} was driven for ${distance}km`);
    }

    public returnVehicle(): void{
        if (!this.isRented) {
            console.error(`Error returning ${this.name}: Can not return a vehicle that is not rented out!`);
            return;
        }
        this.isRented = false;
        
    }

    public printStatus(): void{
        const rentedSymbol = this.isRented ? 'x' : 'o';
        console.log(
            `${this.type.padEnd(16)}`+
            `${this.name.padEnd(30)}`+
            `${rentedSymbol.padEnd(8)}`+
            `${this.costPerMinute.toString().padEnd(20)}`
        );
    }
}

export default Vehicle;