class ProductManager{
    
    constructor(){
        this.products = []
    }

    addProduct= (title,description, price, thumbnail, code, stock)=>{
        
        
        
        let resultado = this.validarProducto(title,description, price, thumbnail, code, stock)
        if (resultado != ""){
            return resultado
        }
        
        const product={
            title,
            description,
            thumbnail,
            price,
            code,
            stock,
            id : this.getNextID() 
        }       
    
        this.products.push(product)

        return "producto agregado : " + title
    }

    validarProducto =(title,description, price, thumbnail, code, stock)=>{ 
        if (this.esNuloOVacioOUndefined(title) 
        ||this.esNuloOVacioOUndefined(description)
        ||this.esNuloOVacioOUndefined(price)
        ||this.esNuloOVacioOUndefined(thumbnail)
        ||this.esNuloOVacioOUndefined(code)
        ||this.esNuloOVacioOUndefined(stock)
        ){  
            return "Falta agregar parametro"
        }

        if (this.codeEstaRepetido(code)){
            return "codigo repetido"
            }

        return ""

    }

    getNextID = () => {
        const count = this.products.length
        if (count > 0) {
        return this.products[count - 1].id + 1
        } else {
            return 1
        }
    }
    
    getProducts = ()=>{
        return this.products
    }

    codeEstaRepetido=(code)=>{
        let resultado = this.products.find(product => product.code === code)
        if (resultado == undefined){
            return false
         }else{
            return true
         }
    }

    esNuloOVacioOUndefined=(campo)=>{
       return (campo == undefined || campo ==null || campo == "")
               
    }

    getProductById = (id) => {
         let resultado = this.products.find(product => product.id === id)
         if (resultado == undefined){
            return "Producto no encontrado"
         }else{
            return resultado
         }
    }
}
 
const catalogo= new ProductManager()
console.log(catalogo.getProducts()) //array vacio
console.log(catalogo.addProduct("zapatilla", "calzado", 100, "imagen",01, 100)) //agregar producto
console.log(catalogo.addProduct("mochila", "bolso", 120, "foto1",02, 40))
console.log(catalogo.addProduct("zapato", "calzado", 100, "foto2",01, 100)) //codigo repetido

console.log(catalogo.getProducts())
console.log(catalogo.getProductById(1))//consultar por id