export class Cart{
    constructor(products){
        this.id = Product.newId();
        this.products = products;
    }
    static newId() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}