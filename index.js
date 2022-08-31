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
                    return contenidoExtraidodelArray
                }else{
                    console.log("el id no existe");
                }
            });
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
            const contenido = await fs.readFile(`./${this.name}`,'utf-8');
            const contenidoJson = JSON.parse(contenido)
            const nuevo = contenidoJson.filter((el)=>el.id!=id)

            await fs.writeFile(`./${this.name}`, JSON.stringify(nuevo))
        }
        catch(error){
            console.log(error.message);
        }
    }
    async deleteAll(){
        try{
            const nuevo = []
            await fs.writeFile(`./${this.name}`, nuevo)
        }
        catch(error){
            console.log(error.message);
        }
    }
    }


let contenedor1 = new Contenedor ("productos.json")

const newInfo = [{
    
        "id":1,
        "title":"It",
        "price":50
}]

contenedor1.save(newInfo).then( resolve=>{
    console.log(resolve);
})

/* contenedor1.getById(4).then(resolve=>{
    console.log(resolve);
}); */

/* contenedor1.getAll().then(resolve=>{
    console.log(resolve);
}); */

/* contenedor1.deleteById(3).then(resolve=>{
    console.log(resolve);
}); */
/* 
contenedor1.deleteAll() */