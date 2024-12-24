const formSearch = document.getElementById('form-search');
const citySearch = document.getElementById('city-search'); 
const anounceList = document.getElementById('anounce-list');
const URL = 'http://localhost:3000/anounces';

// Event listener for the search form
formSearch.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const city = citySearch.value.trim();
    if (city === "") {
        alert("Veuillez entrer une ville pour rechercher.");
        return;
    }

    try {
        const response = await fetch(URL);
        const data = await response.json();

        console.log(data);

        // Clear previous results
        anounceList.innerHTML = "";

        const filteredData = data.filter(anounce => anounce.place.split(",")[0] === city);

        if (filteredData.length === 0) {
            anounceList.innerHTML = `<p>Aucune annonce trouvée pour "${city}".</p>`;
            return;
        }

        // Add filter reset button
        const filterDiv = document.createElement("div");
        filterDiv.className = "filter";
        filterDiv.innerHTML = `<input type="button" value="X ${city}" id="filter-destination">`;
        anounceList.appendChild(filterDiv);

        // Display filtered announcements
        filteredData.forEach(anounce => {
            const list = document.createElement('div');
            list.className = 'list';

            list.innerHTML = `
                <div class="photoDiv">
                    <img src="./pictures/${anounce.photo}" alt="photo">
                </div>
                <div class="infos">
                    <h3>${anounce.title}</h3>
                    <p class="para">${anounce.place}</p>
                    <p class="para">Hébergement: ${anounce.accommodates} personnes</p>
                    <p class="para-prix">${anounce.price_per_night} <i class="fa-solid fa-euro-sign"></i>/nuit</p>
                </div>`;
            anounceList.appendChild(list);

            // Navigate to details page
            list.addEventListener('click', () => {
                window.location.href = `./detail.html?id=${anounce.id}`;
            });
        });

        // Reset filter when "X [city]" button is clicked
        const filterDestination = document.getElementById('filter-destination');
        filterDestination.addEventListener('click', () => {
            anounceList.innerHTML = "";
            citySearch.value = ""; // Clear search input
            loadAllAnounces(); // Reload all announcements
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des annonces :", error);
        anounceList.innerHTML = `<p>Une erreur s'est produite. Veuillez réessayer plus tard.</p>`;
    }
});

// Load all announcements on page load
function loadAllAnounces() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(anounce => {
                const list = document.createElement('div');
                list.className = 'list';

                list.innerHTML = `
                    <div class="photoDiv">
                        <img src="./pictures/${anounce.photo}" alt="photo">
                    </div>
                    <div class="infos">
                        <h3>${anounce.title}</h3>
                        <p class="para">${anounce.place}</p>
                        <p class="para">Hébergement: ${anounce.accommodates} personnes</p>
                        <p class="para-prix">${anounce.price_per_night} <i class="fa-solid fa-euro-sign"></i>/nuit</p>
                    </div>`;
                anounceList.appendChild(list);

                // Navigate to details page
                list.addEventListener('click', () => {
                    window.location.href = `./detail.html?id=${anounce.id}`;
                });
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des annonces :", error);
            anounceList.innerHTML = `<p>Une erreur s'est produite. Veuillez réessayer plus tard.</p>`;
        });
}

// Initialize with all announcements
loadAllAnounces();
