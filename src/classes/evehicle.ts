import vehicleObj from './vehicleObj.js';
 class Evehicle extends vehicleObj{
    protected currentCharge: number;
    public constructor(protected readonly type: string, protected readonly name: string, protected readonly costPerMinute: number, protected readonly usage: number){
        super(type, name, costPerMinute);
        this.currentCharge = 100;
    }

    public override drive(distance: number): void {
        try{
            if(this.isRented){
                let usedEnergy = this.usage * distance;
                if(usedEnergy > 100) usedEnergy = 100;
                this.currentCharge -= usedEnergy;
                console.log(`${this.name} was driven for ${distance}km`);
                console.log(`${usedEnergy}% was used. Battery is at ${this.currentCharge}%`);
            }else throw new Error("Can not drive a vehicle that is not rented out!");
        }catch(err){
            console.log(`Error driving ${this.name}: ${err}`);
        }
    }

    public charge(percentage: number): void{
        try{
            if(this.isRented) throw new Error("A bicycle that is rented out can not be charged!");
            if(percentage < 0) throw new Error("Charging percentage must be a positive number!");
            if(percentage + this.currentCharge <= 100){
                this.currentCharge += percentage;
            }else{
                console.log(`You tried overcharging the battery. Charging was abborted at ${this.currentCharge}%.`);
                console.log(`Unused charge: ${percentage - (this.currentCharge - 100)}`);
                this.currentCharge = 100;
            }
        }catch(err){
            console.log(`An error occured while charging ${this.name}: ${err}`);
        }
    }

    public override printStatus(): void {
        var rentedSymbol: string;
        if(this.isRented || this.currentCharge < 50) rentedSymbol = 'x';
        else rentedSymbol = 'o';
        console.log(
            `${this.type.padEnd(16)}`+
            `${this.name.padEnd(30)}`+
            `${rentedSymbol.padEnd(8)}`+
            `${this.costPerMinute}`.padEnd(20)+
            `${String(this.currentCharge)}`
        );
    }

    public getCurrentCharge(): number{
        return this.currentCharge;
    }
 }

export default Evehicle;