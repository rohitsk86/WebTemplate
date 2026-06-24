// Execute code once DOM is safely accessible
document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('data-container');

    // Asynchronously fetch the local JSON file
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Clear out the temporary loading state text
            dataContainer.innerHTML = '';

            // Map and inject data structure into UI
            data.users.forEach(user => {
                const card = document.createElement('div');
                card.className = 'user-card';
                card.innerHTML = `
                    <h3>${user.name}</h3>
                    <p><strong>Role:</strong> ${user.role}</p>
                `;
                dataContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error parsing JSON data:', error);
            dataContainer.innerHTML = `<p style="color: red;">Failed to load data.</p>`;
        });
});

