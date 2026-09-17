import type { Vehicle } from '../interfaces/vehicle';
class Bicycle implements Vehicle {
    protected isRented: boolean;

    public constructor (protected readonly name: string, protected readonly costPerMinute: number){
        this.isRented =  false;
    }

    public rent(duration: number): number{
        this.isRented = true;
        return this.costPerMinute * duration;
    }

    public drive(distance: number): void{
        console.log(`${this.name} was driven for ${distance}km`);
    }

    public return(): void{
        this.isRented = false;
    }

    public printStatus(): void{
        console.log("TODO: insert propper status message!");
    }
}

export * from './bicycle';