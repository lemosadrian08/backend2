const fs = require ('fs/promises')

class Contenedor {
    constructor(name){
        this.name=name
    }

    async save(informacion){
        try{
            const contenido = await fs.readFile(`./${this.name}`, 'utf-8');
            const contenidoJson = JSON.parse(contenido)
            const ultimoIndice = contenidoJson.length - 1
            const ultimoId = contenidoJson[ultimoIndice].id
            informacion.id = ultimoId + 1
            const id = informacion.id
            contenidoJson.push(informacion)
            await fs.writeFile(`./${this.name}`, JSON.stringify(contenidoJson))


            return id
        }
        catch(error){
            console.log(error.message);
        }
    }
    async getById(id){
        try{
            const contenido = await fs.readFile(`./${this.name}`,'utf-8');
            const contenidoJson = JSON.parse(contenido)
            let contenidoExtraidodelArray
            contenidoJson.forEach(element => {
                if(element.id==id){
                    contenidoExtraidodelArray=element
                }
            });
            return contenidoExtraidodelArray
        }
        catch(error){
            console.log(error.message);
        }

    }
    async getAll(){
        try{
            const contenido = await fs.readFile(`./${this.name}`,'utf-8');
            const contenidoJson = JSON.parse(contenido)
            
            return contenidoJson
        }
        catch(error){
            console.log(error.message); 
        }
    }

    async deleteById(id){
        try{
            let contenido = await fs.readFile(`./${this.name}`,'utf-8');
            let contenidoJson = JSON.parse(contenido)
            console.log(id);
            let nuevo = contenidoJson.filter((el)=>el.id!=id)
            return nuevo
        }
        catch(error){
            console.log(error.message);
        }
    }
    async deleteAll(){
        try{
            
        }
        catch(error){
            console.log(error.message);
        }
    }
    }


let contenedor1 = new Contenedor ("productos.json")

const newInfo = {
        "id":1,
        "title":"It",
        "price":50
}

contenedor1.save(newInfo).then( resolve=>{
    console.log(resolve);
})

/* contenedor1.getById(1).then(resolve=>{
    console.log(resolve);
}); */

/* contenedor1.getAll().then(resolve=>{
    console.log(resolve);
}); */

/* contenedor1.deleteById(3).then(resolve=>{
    console.log(resolve);
}); */