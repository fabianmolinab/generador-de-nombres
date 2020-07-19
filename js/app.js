
document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

function cargarNombres(e) {
  e.preventDefault();

  //Leer las variables del formulario

  const origen = document.getElementById('origen')
  const origenSeleccionado = origen.options[origen.selectedIndex].value;

  const genero = document.getElementById('genero')
  const generoSeleccionado = genero.options[genero.selectedIndex].value;

  const numero = document.getElementById('numero').value;

  let url = '';
  url += 'https://uinames.com/api/?';

  //Validamos el formulario
  if (origenSeleccionado !== '') {
    url += `region=${origenSeleccionado}&`;
  }

  if (generoSeleccionado !== '') {
    url += `gender=${generoSeleccionado}&`;
  }

  if (numero !== '') {
    url += `amount=${numero}&`;
  }

  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

  xhr.onload = function() {

    if (this.status === 200) {
      const nombres = JSON.parse(this.response); 
      
      //Generar HTML
      let htmlNombres = `<h2>Nombres Generados</h2>`;

      htmlNombres += '<ul class="lista"';

      //Imprimir cada nombre
      nombres.forEach(function(nombre) {
        htmlNombres += `
                        <li>${nombre.name}</li>
        `;

      })

      htmlNombres += '<ul/>';

      document.getElementById('resultado').innerHTML = htmlNombres
    }
  }

  xhr.send();

}