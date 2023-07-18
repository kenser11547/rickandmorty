//crear consuktas atravez de un elemento
const API_URL = "https://rickandmortyapi.com/";

// const HTMLResponse = document.querySelector('#app')
// const ul = document.createElement('ul')

fetch(`${API_URL}/api/character`)

const xhr = new XMLHttpRequest();

function onRequestHandler() {
    if (this.readyState === 4 && this.status === 200) {
        // console.log(this.response);  // ESTE COMANDO ES PARA QUE MANDE A LLAMAR TODA LA INFORMACION EN FORMATO TEXTO DE LOS OBJETOS
        const data = JSON.parse(this.response);
        console.log(data);   //ACA PODREMOS VER LA MISMA INFORMACION PERO MEJOR ESTRUCUTRADA POR NODOS PARA LLAMAR A LA INFORMACION DE UNA MANERA MAS SENCIALLA
        // const HTMLResponse = document.querySelector('#app');

        // const tpl = data.map((user) => `<li>${user.name} ${user.email}</li>`)
        // HTMLResponse.innerHTML = `<ul>${tpl}</ul>`
    }
}

xhr.addEventListener("load", onRequestHandler);
xhr.open("GET", `${API_URL}/api/character`);
xhr.send();

const formul = document.querySelector('form');
const tabla = document.querySelector('table');
const button = document.getElementById('botonConsultar');

const consultarPerson = async (evento) => {
  evento.preventDefault();
  let nombrePerson = formul.person.value;
  if (nombrePerson === '') {
    alert("Debe ingresar el nombre de un país");
    return;
  }
    // CONFIGURANDO LA PETICIÓN y el url de API DE PAISES ATRAVEZ DEL MMTODO GET
    const url = `https://rickandmortyapi.com/api/character/?name=${nombrePerson}`;
    const config = {
      method: 'GET'
    };

      // Consulta a la API SI SE ESTA BUSCANDO O NO
  document.getElementById('resultado').innerText = 'Buscando el archivo que se desea...';
  try {
    // CONSULTA A LA API
    const respuesta = await fetch(url, config);
    if (respuesta.ok) {
      const data = await respuesta.json();
      const personajes = data.results;

      if (personajes.length === 0) {
        document.getElementById('resultado').innerText = 'No se encontraron personajes';
      } else {
        const personaje = personajes[0];
        console.log(personaje.name);
        console.log(personaje.status);
        console.log(personaje.species);
        console.log(personaje.image);
  
        document.getElementById('nombrePersonaje').innerText = personaje.name;
        document.getElementById('estadoPersonaje').innerText = personaje.status;
        document.getElementById('especiePersonaje').innerText = personaje.species;
        document.getElementById('imagenPersonaje').src = personaje.image;
        document.getElementById('resultado').innerText = 'Personaje encontrado';
        tabla.style.display = '';
      }
    } else {
      document.getElementById('resultado').innerText = 'No se encontró el personaje';
    }
  } catch (error) {
    console.log(error);
  }
};
//aqui se crea la consulta para la busqueda de consulta en php 
const consultarAPI = async (e) => {
  const url = `./consultar.php`
  const config = {
      method : 'GET'
  }
  try {
      // CONSULTA A LA API
      const resulta = await fetch(url, config);   
      
      const data = await resulta.text()

      alert(data)

      console.log(data)
       
     
  } catch (error) {
      alert('ESTO NO ES METODO GET' + error)
      console.log(error)
  }
}

formul.addEventListener('submit', consultarPerson);
button.addEventListener('click', consultarAPI )