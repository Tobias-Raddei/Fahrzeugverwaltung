import Vehicle from './vehicle.js';
 class Evehicle extends Vehicle{
    private _currentCharge: number;
    public constructor(
        type: string, 
        name: string, 
        costPerMinute: number, 
        protected readonly usage: number
    ){
        super(type, name, costPerMinute);
        this._currentCharge = 100;
    }

    public override drive(distance: number): void {
        if (!this.isRented) {
            console.error(`Error driving ${this.name}: Can not drive a vehicle that is not rented out!`);
            return;
        }

        let usedEnergy = this.usage * distance;
        if (usedEnergy > 100) usedEnergy = 100;

        this._currentCharge = Math.max(0, this.currentCharge - usedEnergy);

        console.log(`${this.name} was driven for ${distance}km`);
        console.log(`${usedEnergy}% was used. Battery is at ${this.currentCharge}%`);
    }

    public charge(percentage: number): void{
        if (this.isRented) {
            console.error(`An error occured while charging ${this.name}: A vehicle that is rented out can not be charged!`);
            return;
        }

        if (percentage < 0) {
            console.error(`An error occured while charging ${this.name}: Charging percentage must be a positive number!`);
            return;
        }

        if (percentage + this.currentCharge <= 100) {
            this._currentCharge += percentage;
            console.log(`Battery charged to ${this.currentCharge}%`);
        } else {
            const unusedCharge = percentage - (100 - this.currentCharge);
            this._currentCharge = 100;
            console.log(`You tried overcharging the battery. Charging was aborted at 100%.`);
            console.log(`Unused charge: ${unusedCharge}`);
        }
    }

    public override printStatus(): void {
        const rentedSymbol = (this.isRented || this.currentCharge < 50) ? 'x' : 'o';
        console.log(
            `${this.type.padEnd(16)}`+
            `${this.name.padEnd(30)}`+
            `${rentedSymbol.padEnd(8)}`+
            `${this.costPerMinute.toString().padEnd(20)}`+
            `${String(this._currentCharge)}%`
        );
    }

    public get currentCharge(): number {
        return this._currentCharge;
    }
 }

export default Evehicle;