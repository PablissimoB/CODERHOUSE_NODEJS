import fs from 'fs'
import readline from 'readline';
import { Product } from './product.js';

//crear interfaz de consola
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

export class ProductManager {
    constructor(archivo){
        this.path = archivo;
    }

    //Agregar producto (CREATE)
    addProduct(){
        const products = this.readProducts();
        let title;
        let description;
        let price;
        let thumbnail;
        let code;
        let stock;
        rl.question('Ingresa titulo*: ', (answerTitle) => {
            title = answerTitle;
            rl.question('Ingresa descripcion: ', (answerDescription) => {
                description = answerDescription; 
              rl.question('Ingresa precio*: ', (answerPrice) => {
                price = parseInt(answerPrice);
                rl.question('Ingresa imagen: ', (answerImage) => {
                    thumbnail = answerImage;
                    rl.question('Ingresa tu codigo*: ', (answerCode) => {
                        code = answerCode;
                        rl.question('Ingresa tu stock*: ', (answerStock) => {
                            stock = parseInt(answerStock);
                            if(title == "" || price == "" || code =="" || stock ==""){
                                console.log("No pueden haber campos con * sin datos ");
                            }
                            else{
                                const product = new Product (
                                    title,description, price, thumbnail, code, stock
                                )
                                if(!fs.existsSync(this.path)){
                                    fs.writeFileSync(this.path,JSON.stringify(product))
                                }
                                else
                                {
                                    if(this.verifyCode(products, product.code)){
                                        products.push(product);
                                        fs.writeFileSync(this.path,JSON.stringify(products));
                                    }
                                    else{
                                        console.log('\x1b[31mProducto ya existe\x1b[0m');
                                    }
                                }
                            }
                            this.myPanel();
                        });
                    });
                });
              });
            });
          });
    }

    //Verificar si existe el código
    verifyCode(arrayOfProducts, code){
        let result = true;
        if(arrayOfProducts.length >0){
            arrayOfProducts.forEach(item => {
                result = item.code == code? false:true;
            }); 
        }
        return result;
    }

    //Traer todos los productos
    readProducts(){
        const data = fs.readFileSync(this.path,'utf-8');
        return JSON.parse(data);
    }

    //Mostrar los productos (READ)
    getProducts(){
        console.log(this.readProducts());
        this.myPanel();
    }

    //Mostrar producto por id (READ)
    getProductById(){
        rl.question('Ingresa el id del producto a consultar: ', (answer) => {
            let id = answer;
            const products = this.readProducts();
            const result = products.find(product => product.id == id);
            !result? console.log('\x1b[31mNot Found\x1b[0m'):console.log(result);
            this.myPanel();
        })
    }
    
    //Actualizar Producto (UPDATE)
    updateProduct(){
        rl.question('Ingresa el id del producto a modificar: ', (answer) => {
            let id = answer;
            const products = this.readProducts();
            const productsUpdated = products.filter(product => product.id != id);
            const result = products.find(product => product.id == id);
            if(!result){
                console.log('\x1b[31mNot Found\x1b[0m');
                this.myPanel();
            }
            else{
                let title;
                let description;
                let price;
                let thumbnail;
                let stock;
                rl.question('Ingresa titulo: ', (answerTitle) => {
                    title = answerTitle;
                
                    rl.question('Ingresa descripcion: ', (answerDescription) => {
                        description = answerDescription; 
                
                    rl.question('Ingresa precio: ', (answerPrice) => {
                        price = parseInt(answerPrice);

                        rl.question('Ingresa imagen: ', (answerImage) => {
                            thumbnail = answerImage;

                                rl.question('Ingresa tu stock: ', (answerStock) => {
                                    stock = parseInt(answerStock);
                                    result.title = title;
                                    result.description = description;
                                    result.price = price;
                                    result.thumbnail = thumbnail;
                                    result.stock = stock;
                                    productsUpdated.push(result);
                                    fs.writeFileSync(this.path,JSON.stringify(productsUpdated));
                                    this.myPanel();
                                });
                            });
                        });
                    });
                });
            }
        })
    }

    //Borrar producto (DELETE)
    deleteProduct(){
        rl.question('Ingresa el id del producto a borrar: ', (answer) => {
        let id = answer;
        const products = this.readProducts();
        const result = products.filter(product => product.id != id);
        const verify = products.find(product => product.id == id);
            if(!verify ){
                console.log('\x1b[31mNot Found\x1b[0m');
                this.myPanel();
            }
            else{
            fs.writeFileSync(this.path,JSON.stringify(result));
            this.myPanel();
            }
        })
    }

    //Panel de opciones
    myPanel(){
        console.log("Menu")
        console.log("------------------------------")
        console.log("1-Agregar Producto")
        console.log("2-Consultar Producto")
        console.log("3-Consultar todos los Productos")
        console.log("4-Modificar Producto")
        console.log("5-Borrar Producto")
        console.log("0-Salir")
        this.myAction()
    }
    
    //Acciones para cada panel
    myAction(){
        rl.question('Ingresa el número de la opción: ', (option) => {
            switch(option){
                case '1': this.addProduct() ;break;
                case '2': this.getProductById();break;
                case '3': this.getProducts();break;
                case '4': this.updateProduct();break;
                case '5': this.deleteProduct();break;
                case '0': console.log("Cerrando programa");rl.close() ;break;
                default:
                    console.log('Opción inválida.');
                    this.myPanel();
                    break;
            }
        })
    }
}