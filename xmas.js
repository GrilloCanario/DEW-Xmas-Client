const URL = "http://localhost:3000";
const reindeerList = document.getElementById('reindeerList');
const reindeerForm = document.getElementById('reindeerForm');
const reindeerName = document.getElementById('reindeerName');

async function loadReinders() {
    try {
        reindeerList.textContent = "";
        let response = await fetch(`${URL}/reindeers`);
        if (response.ok) {
            let reindeers = await response.json();
            reindeers.forEach(reindeer => insertReindeer(reindeer));
        } else {
            throw new Error('Fallo al cargar los datos');
        }
    } catch (error) {
        console.log("ERROR: ", error)
    }
}

function insertReindeer(reindeer) {
    const li = document.createElement('li');
    li.textContent = reindeer.name;
    const button = document.createElement('button');
    button.textContent = "eliminar";
    button.classList.add('delete');
    button.dataset.id = reindeer.id;
    li.append(button);
    //- Boton Editar
    const button2 = document.createElement('button');
    button2.textContent = "editar";
    button2.classList.add('edit');
    button2.dataset.id = reindeer.id;
    li.append(button2);
    //- Boton Ver
    const button3 = document.createElement('button');
    button3.textContent = "mostrar";
    button3.classList.add('show');
    button3.dataset.id = reindeer.id;
    li.append(button3);

    reindeerList.append(li);
}

reindeerList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        deleteReindeer(event.target.dataset.id);
    };
    if (event.target.classList.contains('edit')) {
        editReindeer(event.target.dataset.id);
    };
    if (event.target.classList.contains('show')) {
        showReindeer(event.target.dataset.id);
    };
})




async function deleteReindeer(id) {
    console.log('Eliminando...', id)
    try {
        let response = await fetch(`${URL}/reindeers/${id}`, {
            method: "delete"
        });
        if (response.ok) {
            console.log('Elemento eliminiado');
            loadReinders();
        } else {
            throw new Error('Fallo al eliminar');
        }
    } catch (error) {
        console.log("ERROR: ", error)
    }
}

reindeerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let data = {
        name: reindeerName.value
    }

    console.log('creando...', data);
    try {
        let response = await fetch(`${URL}/reindeers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            console.log('Elemento creado');
            loadReinders();
        } else {
            if (response.status=="400") {
                let data = await response.json();
                throw new Error('400- Fallo en los datos: ' + data.error)
            }
            throw new Error('Fallo al crear');
        }
    } catch (error) {
        console.log("ERROR: ", error)
    }
});

async function editReindeer(id) {
    let newName = prompt('Introduce el nuevo nombre');
    console.log(newName);
    let data = {
        name: newName
    }
    try {
        let response = await fetch(`${URL}/reindeers/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            console.log('Elemento actualizado');
            loadReinders();
        } else {
            throw new Error('Fallo al actualizar');
        }
    } catch (error) {
        console.log("ERROR: ", error)
    }
}

async function showReindeer(id) {
    try {
        let response = await fetch(`${URL}/reindeers/${id}`);
        if (response.ok) {
            let reindeer = await response.json();
            alert(reindeer.name);
        } else {
            if (response.status == "404") {
                let data = await response.json();
                alert(data.error);
                loadReinders();
                throw new Error(data.error);
            }
            throw new Error('Fallo al mostrar');
        }
    } catch (error) {
        console.log("ERROR: ", error)
    }  
}
loadReinders();
