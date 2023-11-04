function notNull(value, field) {
    if (value == null || value == undefined) {
      throw new Error(`el valor de ${field} no puede ser nulo ni indefinido`);
    }
    return value;
  }

export class Product{
    constructor(title, description, price, thumbnail, code, stock){
        this.id = Product.newId();
        this.title = notNull(title, "titulo");
        this.description = description;
        this.price = notNull(price, "precio");
        this.thumbnail = thumbnail;
        this.code = notNull(code, "código");
        this.stock = notNull(stock, "stock");
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