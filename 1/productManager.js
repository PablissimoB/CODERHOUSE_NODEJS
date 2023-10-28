const pr = require('./product');

const readline = require('readline');

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

class ProductManager {
    constructor(){
        this.products = [];
    }
    addProduct(){
        let title;
        let description;
        let price;
        let thumbnail;
        let code;
        let stock;
        rl.question('Ingresa titulo: ', (answerTitle) => {
            title = answerTitle;
          
            rl.question('Ingresa descripcion: ', (answerDescription) => {
                description = answerDescription; 
          
              rl.question('Ingresa precio: ', (answerPrice) => {
                price = parseInt(answerPrice);

                rl.question('Ingresa imagen: ', (answerImage) => {
                    thumbnail = answerImage;

                    rl.question('Ingresa tu codigo: ', (answerCode) => {
                        code = answerCode;

                        rl.question('Ingresa tu stock: ', (answerStock) => {
                            stock = parseInt(answerStock);
                            const product = new pr (
                                title,
                                description,
                                price,
                                thumbnail,
                                code,
                                stock
                            )
                            if(this.verifyCode(this.products, product.code)){
                                // this.verifyCode(this.products, product.code);
                                this.products.push(product);
                            }
                            
                            else{
                                console.log("Producto ya existe");
                            }
                            this.myPanel();
                        });
                    });
                });
              });
            });
          });
    }

    verifyCode(arrayOfProducts, code){
        let result = true;
        if(arrayOfProducts.length >0){
            arrayOfProducts.forEach(item => {
                result = item.code == code? false:true;
            }); 
        }
        return result;
    }

    getProducts(){
        console.log(this.products);
        this.myPanel();
    }
    getProductById(){
        rl.question('Ingresa el id del producto a consultar: ', (answer) => {
            let id = answer;
            const result = this.products.find(product => product.id == id);
            if(!result){
                console.log("Not found");
            }
            else{
                console.log(result);
            }
            this.myPanel();
        })
    }

    myPanel(){
        console.log("Menu")
        console.log("------------------------------")
        console.log("1-Agregar Producto")
        console.log("2-Consultar Producto")
        console.log("3-Consultar todos los Productos")
        console.log("0-Salir")
        this.myAction()
    }

    myAction(){
        rl.question('Ingresa el número de la opción: ', (option) => {
            switch(option){
                case '1': this.addProduct() ;break;
                case '2': this.getProductById();break;
                case '3': this.getProducts();break;
                case '0': console.log("Cerrando programa");rl.close() ;break;
                default:
                    console.log('Opción inválida.');
                    this.myPanel();
                    break;
            }
        })
    }
}
module.exports = ProductManager;