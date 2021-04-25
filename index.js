const express = require("express")
const app = express()

app.use(express.json())

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
         "number": "12-43-5323523"
     
    },
    { 
        "id": 4,
        "name": "Mary Popendick", 
        "number": "39-23-6423122"
    }
]


//Obtener todos los datos
app.get("/api/persons", (request, response) => {
    console.log(request.body)
	response.json(persons)
})

//Obtener la información de la Agenda
app.get("/info", (request, response) => {
	
    const fecha = new Date()
	
	response.send(`
    <div style="margin:50px; padding: 20px; background-color: #8ED6FB; font-family:monospace" >
        <h1 style="color:white">Phonebook has info for ${persons.length} people </h1> 
        <h2>${fecha}</h2>
    </div>
    `)
})

//Obtener solo una persona por id
app.get("/api/persons/:id", (request, response) => {
	
    const id_persona = parseInt(request.params.id)
	
	const persona = persons.find(persona => persona.id === id_persona)
	
	if (persona) {
		response.json(persona)
	} else {      
		response.status(404).end()
	}
})

// Borrar datos de la API por id
app.delete("/api/persons/:id", (request, response) => {
	
    const id_persona = parseInt(request.params.id)

	const eliminado = persons.filter(persona => persona.id === id_persona)
	
    if(!eliminado){
        response.status(404).json(persons)
    }
		const index = persons.indexOf(eliminado);
        //metodo Splice elimina un elemento del array object
        persons.splice(index-1,1);
        console.log(eliminado)
        response.send(eliminado);
})

//Metodo Post, crear un nuevo recurso
app.post("/api/persons", (request, response) => {
	const body = request.body
    console.log(body)
	
   
	//Envio de Objeto con los datos recepcionados
	const nueva_persona = {
        id: persons.length+1,
		name: body.name,
		number: body.number
	}
	//Concat metodo que agrega un objeto al array
	persons = persons.concat(nueva_persona)
	response.status(201).json(nueva_persona)
})

//Ejecucion del servidor
const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

