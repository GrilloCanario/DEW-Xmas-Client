const URL = "http://localhost.3000";
const reindeerList = document.getElementById('reindeerList');
const reindeerForm = document.getElementById('reindeerForm');
const reinderName = document.getElementById('reindeerName');

async function loadReinders(){

}

function insertReindeer(reindeer) {
    const li = document.createElement('li');
    li.textContent = reindeer.name;
    const button = document.createElement('button');
    button.textContent = "eliminar";
    button.classList.add('delete');
    button.dataset.id = reindeer.id;
    li.append(button);
    reindeerList.append(li);
}

reindeerList.addEventListener('click', (event) =>{
    if(event.target.classList.contains('delete')){
        deleteReindeer(event.target.dataset.id);
    };
})

async function deleteReindeer(id){
    console.log('Eliminando...', id)
    try{
        let response = await fetch(`${URL}/reindeers/${id}`, {
            method: "delete"
        });
        if(response.ok){
            console.log('Elemento eliminado');
            loadReinders();
        } else {
            throw new Error('Fallo al eliminar');
        }
    } catch (error){
        console.log("ERROR: ", error)
    }
}

reindeer.addEventListener('submit', async (event) => {
    event.preventDefault();
    let data = {
        name: reinderName.value
    }

    console.log(data);
    console.log('creando...', id)
    try{
        let response = await fetch(`${URL}/reindeers/${id}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(response.ok){
            console.log('Elemento creado');
            loadReinders();
        } else {
            throw new Error('Fallo al crear');
        }
    } catch (error){
        console.log("ERROR: ", error)
    }
})

loadReinders();

