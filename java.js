//crear consuktas atravez de un elemento
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
    if (respuesta.status) {
      const data = await respuesta.json();
      const person = data[0];
      console.log(person.name);
      console.log(person.status);
      console.log(person.species);
      console.log(person.image);

      document.getElementById('nombrePais').innerText = person.name.common;
      document.getElementById('poblacionPais').innerText = person.status;
      document.getElementById('capitalPais').innerText = person.species[0];
      document.getElementById('banderaPais').src = person.image.png;
      document.getElementById('resultado').innerText = 'Fue Encontrado';
      tabla.style.display = '';
    } else {
      document.getElementById('resultado').innerText = 'No se encontró';
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