document.getElementById('nameForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    const response = await fetch('http://backend:5000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
    });

    const data = await response.json();
    alert(data.message);
    
    // Limpiar el formulario
    document.getElementById('nameForm').reset();

    // Actualizar la lista de nombres
    updateNamesList(data.names);
});

// Función para mostrar los nombres en la lista
function updateNamesList(names) {
    const namesList = document.getElementById('namesList');
    namesList.innerHTML = ''; // Limpiar la lista actual

    names.forEach(name => {
        const listItem = document.createElement('li');
        listItem.textContent = `${name.firstName} ${name.lastName}`; // Formato del nombre
        namesList.appendChild(listItem);
    });
}
