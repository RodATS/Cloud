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
    document.getElementById('nameForm').reset();
});
