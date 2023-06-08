const fs = require('fs')

class ProductManager {
    #path
    constructor(path) {
        this.#path = path
    }

    read = () => {
        if (fs.existsSync(this.#path)) {
            return fs.promises.readFile(this.#path, 'utf-8').then(r => JSON.parse(r))
        } else return []
    }


    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: await this.getNextID() // Asignar el ID obtenido mediante getNextID()
        };
    
        const list = await this.getProducts();
        list.push(product);
    
        // Escribir el archivo (o sobreescribirlo si ya existe)
        await fs.promises.writeFile(this.#path, JSON.stringify(list));
    }

    getNextID = async () => {
        const list = await this.getProducts();
        const count = list.length;

        if (count > 0) {
            return list[count - 1].id + 1;
        } else {
            return 1;
        }
    }

    getProductById = async (id) => {
        
        const list = await this.getProducts()
        const resultado = list.find(product => product.id === id)
        if (resultado === undefined) {
            return "Producto no encontrado"
        } else {
            return resultado
        }
    }
    
    deleteProduct = async (id) => {
        const list = await this.getProducts()
        const index = list.findIndex(product => product.id === id)
    
        if (index !== -1) {
            list.splice(index, 1) 
    
            await fs.promises.writeFile(this.#path, JSON.stringify(list))
    
            console.log(' producto eliminado')
        } else {
            console.log('No se encontró un producto')
        }
    }


    getProducts = async () => {
        try {
            // Leer contenido del archivo
            const data = await fs.promises.readFile(this.#path, 'utf-8')
            const dataObj = JSON.parse(data) // Convertimos de string a objeto

            return dataObj
        } catch (error) {
            // Si no existe el archivo, retornamos una lista vacia
            console.log('No se encontro el archivo, se devuelve vacio')
            return []
        }
    }

}

async function run() {
    const manager = new ProductManager('users.json')
    await manager.addProduct('zapatilla', 'calzado', 23, 'sin imagen', 01, 20)
    await manager.addProduct('mochila', 'indumentaria', 34, 'sin imagen',02, 40)
    console.log(await manager.getProducts())
    console.log(await manager.deleteProduct(1))

}


run()
