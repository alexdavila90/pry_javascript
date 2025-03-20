export class Flat {
    #city;
    #streetName;
    #streetNumber;
    #areaSize;
    #hasAC;
    #yearBuilt;
    #rentPrice;
    #dateAvailable;
    #imageSource;

    constructor(city, streetName, streetNumber, areaSize, hasAC, yearBuilt, rentPrice, dateAvailable, imageSource) {
        this.#city = city;
        this.#streetName = streetName;
        this.#streetNumber = streetNumber;
        this.#areaSize = areaSize;
        this.#hasAC = hasAC;
        this.#yearBuilt = yearBuilt;
        this.#rentPrice = rentPrice;
        this.#dateAvailable = dateAvailable;
        this.#imageSource=imageSource;
    }

    get city() {
        return this.#city;
    }
    
    get streetName() {
        return this.#streetName;
    }
    
    get streetNumber() {
        return this.#streetNumber;
    }
    
    get areaSize() {
        return this.#areaSize;
    }
    
    get hasAC() {
        return this.#hasAC;
    }
    
    get yearBuilt() {
        return this.#yearBuilt;
    }
    
    get rentPrice() {
        return this.#rentPrice;
    }
    
    get dateAvailable() {
        return this.#dateAvailable;
    }
    
    get imageSource() {
        return this.#imageSource;
    }
    
    toJSON() {
        return {
            city: this.#city,
            streetName: this.#streetName,
            streetNumber: this.#streetNumber,
            areaSize: this.#areaSize,
            hasAC: this.#hasAC,
            yearBuilt: this.#yearBuilt,
            rentPrice: this.#rentPrice,
            dateAvailable: this.#dateAvailable,
            imageSource: this.#imageSource
        };
    }

}

