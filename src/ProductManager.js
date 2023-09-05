import fs from "fs"

export default class ProductManager{
    constructor(){
      this.path ="../files/products.json",
      this.products=[]
    }

    //Agregar//
    addProduct=async(title,description,price,thumbnail,code,stock)=>{
      if(!title || !description || !price || !thumbnail|| !code||!stock){
        console.error("Campos obligatorios")
        return 
      }
      else{
        const codigorepetido=this.products.find(elemento=>elemento.code===code)
        if(codigorepetido){
             console.error(`Código ${code} repetido`)
             return
        }
        else{
            const id=await this.generateId()
            const newProduct={
                id,title,description,price,thumbnail,code,stock
            }
            this.products.push(newProduct)
            await fs.promises.writeFile(this.path,JSON.stringify(this.products))
        }
      }
    }
    //Read//
    getProducts=async()=>{
      const productList= await fs.promises.readFile(this.path,"utf-8")
      const productListParse=JSON.parse(productList)
      return productListParse
      }
      
      generateId=async()=>{
          const counter=this.products.length
          if(counter==0){
              return 1
          }
          else{
              return (this.products[counter-1].id)+1
          }
      }

     //Update//
     updateProduct=async(id,title,description,price,thumbnail,code,stock)=>{
        if(!id|| !title || !description || !price || !thumbnail|| !code||!stock){
          console.error("Campos obligatorios para actualizar")
          return 
        }
        else{
            const allproducts=await this.getProducts()
            const codigorepetido=allproducts.find(elemento=>elemento.code===code)
            if(codigorepetido){
                 console.error(`Código para actualizar ${code} repetido`)
                 return
            }
            else{
                const currentProductsList=await this.getProducts()
                const newProductsList=currentProductsList.map(elemento=>{
                    if(elemento.id===id){
                      const updatedProduct={...elemento,title,description,price,thumbnail,code,stock
                      }
                      return updatedProduct
                    }
                    else{
                        return elemento
                    }
                })
                await fs.promises.writeFile(this.path,JSON.stringify(newProductsList))
            }
            
        }
      }


      //Delete//
      deleteProduct=async(id)=>{
        const allProducts=await this.getProducts()
        const productFilter=allProducts.filter(elemento=>elemento.id!==id)
       await fs.promises.writeFile(this.path,JSON.stringify(productFilter))
      }

      getProductbyId=async(id)=>{
        const allproducts= await this.getProducts()
        const product= allproducts.find(element=>element.id===id)
       if (!product) {
        console.log("Not found");
      } else {
        console.log(product);
      }
    }
}


async function productsAsync(){
const productos =new ProductManager();

/*
//Agregamos productos//

await productos.addProduct('Reloj de pared','reloj vintage madera', 150,"photo1.png","001","100");
await productos.addProduct('Lámpara','lámpara de mesa Beige 35x20cm', 180,"photo2.png","002","100");
await productos.addProduct('Florero','florero de Vidrio de Cuadritos', 150,"photo3.png","003","100");

//Actualizamos//

await productos.updateProduct('Florero-2','florero de Vidrio de Cuadritos', 90,"photo4.png","003","100")

//Borramos//

await productos.deleteProduct(1)

//verificamos el id//

await productos.getProductbyId(3)

//llamamos a todos los productos //
console.log (await productos.getProducts())

*/
}
productsAsync()









