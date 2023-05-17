const orderList = document.getElementById('btn-order')
const formulario = document.getElementById('form')
const inputName = document.getElementById('input-name')
const inputCreated = document.getElementById('input-created')
const inputGrape = document.getElementById('input-grape')
const lista = document.getElementById('lista-de-vinos')
const listaDeEliminados = document.getElementById('lista-de-eliminados')
const btnLimpiar = document.getElementById('delete-all')
const titulo = document.getElementById('title')
const alertContainer1 = document.getElementById('div-alerts1')
const alertContainer2 = document.getElementById('div-alerts2')

let listaDeVinos = []

let vinoAIngresar = {
    nombre: '',
    fecha: '',
    uva: ''
}

let vinoAccedido = null

let listaDeVinosEliminados = []

const h1 = document.createElement('h1')
h1.textContent = ''
lista.appendChild(h1)

const h1h = document.createElement('h1')
h1h.innerText = ''
listaDeEliminados.appendChild(h1h)

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    vinoAIngresar = {
        nombre: inputName.value,
        fecha: inputCreated.value,
        uva: inputGrape.value
    }

    if (inputName.value == '' || inputCreated.value == '' || inputGrape.value == '') {
        const agregarDatos = document.createElement('div')
        agregarDatos.className = 'agregarDatos'
        const pAgregarDatos = document.createTextNode('Completa todos los datos, por favor')
        alertContainer2.appendChild(agregarDatos)
        agregarDatos.appendChild(pAgregarDatos)

        setTimeout(() => {
            alertContainer2.removeChild(agregarDatos)
        }, 3000)
    } else {
        listaDeVinos.push(vinoAIngresar)
        renderizarVinos()
    }

    inputName.value = ''
    inputCreated.value = ''
    inputGrape.value = ''

    localStorage.setItem('vinosAgregados', JSON.stringify(listaDeVinos))
})

function renderizarVinos() {
    lista.innerHTML = '';

    lista.appendChild(h1);

    listaDeVinos.forEach((vino) => {
        const ul = document.createElement('ul');

        for (const dato of Object.values(vino)) {
            const li = document.createElement('li');

            li.innerText = `${dato}`;

            ul.appendChild(li);

            if (vino.fecha === vinoAccedido) {
                li.style.color = 'yellow';
        }
    }

        ul.innerHTML += `
        <button class="btn btn-warning" onclick="consumiendoVino('${vino.fecha}')">Abierto</button>
        <button class="btn btn-danger" onclick="eliminarVino('${vino.fecha}')">Eliminar</button>
        `;

        lista.appendChild(ul);
    });

    localStorage.setItem('vinosAgregados', JSON.stringify(listaDeVinos));
}

function consumiendoVino(fecha) {
    vinoAccedido = fecha

    const vinoConsumiendose = document.createElement('div');
    vinoConsumiendose.className = 'vinoConsumiendose'
    const pConsumiendoVino = document.createTextNode('Vino Consumiéndose');
    alertContainer1.appendChild(vinoConsumiendose);
    vinoConsumiendose.appendChild(pConsumiendoVino);

    setTimeout(() => {
        alertContainer1.removeChild(vinoConsumiendose)
    }, 3000)

    renderizarVinos()
}

function eliminarVino(fecha) {
    vinoAccedido = null

    const vinoEliminado = listaDeVinos.filter(vino => vino.fecha === fecha)[0];
    listaDeVinos = listaDeVinos.filter(vino => vino.fecha != fecha)
    listaDeVinosEliminados.push(vinoEliminado);

    const vinoAcabadoAlerta = document.createElement('div')
    vinoAcabadoAlerta.className = 'vinoAcabado'
    const pVinoAcabado = document.createTextNode('Vino Acabado')
    alertContainer1.appendChild(vinoAcabadoAlerta)
    vinoAcabadoAlerta.appendChild(pVinoAcabado)

    setTimeout(() => {
        alertContainer1.removeChild(vinoAcabadoAlerta)
    }, 3000)

    renderizarVinosEliminados()
    renderizarVinos()

    localStorage.setItem('vinosEliminados', JSON.stringify(listaDeVinosEliminados))
    localStorage.setItem('vinosAgregados', JSON.stringify(listaDeVinos))
}

function renderizarVinosEliminados() {
    listaDeEliminados.innerHTML = '';

    listaDeEliminados.appendChild(h1h);

    listaDeVinosEliminados.forEach((vino) => {
        const ul = document.createElement('ul');

        for (const dato of Object.values(vino)) {
            const li = document.createElement('li');

            li.innerText = `${dato}`;

            ul.appendChild(li);
        }

        if (listaDeVinosEliminados.length > 0) {
            btnLimpiar.style.display = 'block'
        }

        listaDeEliminados.appendChild(ul);
        ul.appendChild(btnLimpiar);
    });

    localStorage.setItem('vinosEliminados', JSON.stringify(listaDeVinosEliminados));
}

btnLimpiar.addEventListener('click', () => {
    for (let i = 0; i < listaDeVinosEliminados.length; i++) {
        listaDeVinosEliminados = []

        const bodegaLimpia = document.createElement('div')
        bodegaLimpia.className = 'bodegaLimpia'
        const pBodegaLimpia = document.createTextNode('Bodega Limpia')
        alertContainer1.appendChild(bodegaLimpia)
        bodegaLimpia.appendChild(pBodegaLimpia)

        setTimeout(() => {
            alertContainer1.removeChild(bodegaLimpia)
        }, 3000)
        renderizarVinosEliminados()

        listaDeEliminados = ''
    }
})

orderList.addEventListener('click', () => {
    listaDeVinos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    renderizarVinos()

    const listaOrdenada = document.createElement('div')
    listaOrdenada.className = 'listaOrdenada'
    const pListaOrdenada = document.createTextNode('Lista Ordenada')
    alertContainer1.appendChild(listaOrdenada)
    listaOrdenada.appendChild(pListaOrdenada)

    setTimeout(() => {
        alertContainer1.removeChild(listaOrdenada)
    }, 3000);
    
    renderizarVinos()
})

function verificarAlmacenamientoLocal() {
    const vinosDesdeAlmacenamiento = JSON.parse(localStorage.getItem('vinosAgregados'))
    const vinosEliminadosDesdeAlmacenamiento = JSON.parse(localStorage.getItem('vinosEliminados'))

    if (vinosDesdeAlmacenamiento !== null && vinosDesdeAlmacenamiento.length > 0) {
        listaDeVinos = vinosDesdeAlmacenamiento
        renderizarVinos()
    }

    if (vinosEliminadosDesdeAlmacenamiento !== null && vinosEliminadosDesdeAlmacenamiento.length > 0) {
        listaDeVinosEliminados = vinosEliminadosDesdeAlmacenamiento
        renderizarVinosEliminados()
        btnLimpiar.style.display = 'block'
    } else {
        btnLimpiar.style.display = 'none'
    }
}

verificarAlmacenamientoLocal()