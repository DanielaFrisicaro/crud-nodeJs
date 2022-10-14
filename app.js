const mongoose = require('mongoose')

const url = 'mongodb://localhost/mongodb'

mongoose.connect(url, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
   // useFindAndModify: false
})

.then(()=>console.log('CONECTADO A MONGO'))
.catch((e)=>console.log('El error de conexión es ' + e))

//Creo el Esquema. Por convención empieza con Minúscula.

const personajeSchema =mongoose.Schema({
    nombre:String,
    apellido: String,
    serie: String,
},
{versionKey: false}
)


//Creo el Modelo. Por convención empieza con Mayúscula.

const PersonajeModel = mongoose.model('personajes', personajeSchema)

//.....................................................CRUD..........................................................//

//ASINCRÓNICO, USA EL ASYNC Y EL AWAIT

//LIST.MOSTRAR

const mostrar = async ()=>{
    const personajes = await PersonajeModel.find()
    console.log(personajes)
}

//llamamos a los procedimientos
mostrar()

//CREAR

const crear = async ()=>{
    const personaje = new PersonajeModel({
        nombre: "Michael",
        apellido: "Scofield",
        serie: "Prison Break"
    })
    const resultado = await personaje.save()
    console.log(resultado)
}
//llamamos a los procedimientos
//crear()

//EDITAR. ACTUALIZAR

const actualizar = async(id)=>{
    const personaje = await PersonajeModel.updateOne({_id:id},//en MongoDb el id es _id
    {
        $set:{
            nombre:'Larry Modificado'
        }
    })
}

//llamamos a los procedimientos
//actualizar('6349b2f49c1f5c78f2fa3097')

//ELIMINAR.

const eliminar = async(id)=>{
    const personaje = await PersonajeModel.deleteOne({_id:id})
    console.log(personaje)
}

//llamamos a los procedimientos
//eliminar('6349b2f49c1f5c78f2fa3097')