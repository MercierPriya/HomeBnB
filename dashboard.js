//pour logout
const logout=document.getElementById("logout");

logout.addEventListener('click',()=>{
    window.location.href = "indexlogin.html";
})
//pour gerer anounces
const gerer=document.getElementById('gerer');
gerer.addEventListener('click',()=>{
    const anounceList=document.getElementById('anounce-list');
    if (anounceList.style.display === "flex") {
        anounceList.style.display = "none";
    } else {
        anounceList.style.display = "flex";

    }

})

// ajouter les nouvelle annonces

const ajouter=document.getElementById('ajouter');

ajouter.addEventListener('click',()=>{
    const section=document.querySelector('section');
      if(section.style.display==='flex'){
        section.style.display='none';
      }else{
        section.style.display='flex';
      }
    document.getElementById("homebnbForm").addEventListener("submit", async (event) => {
        event.preventDefault(); // Empêcher le rechargement de la page
    
        // recuperer user id
        
const userId=localStorage.getItem("userId")
console.log(userId);
        // Récupérer les données du formulaire
        const title = document.getElementById("title").value;
        const place = document.getElementById("place").value;
        const rooms = parseInt(document.getElementById("rooms").value);
        const available = document.getElementById("available").value === "true";
        const accommodates = parseInt(document.getElementById("accommodates").value);
        const parking = document.getElementById("parking").value;
        const amenities = document.getElementById("amenities").value.split(",").map(item => item.trim());
        const photo = document.getElementById("photo").value;
        const price_per_night = parseFloat(document.getElementById("price_per_night").value);
        const month = document.getElementById("month").value;
        const days = document.getElementById("days").value.split(",").map(day => parseInt(day.trim()));
    
    
        const formData = {
            userId,
            id: Math.random().toString(36).substr(2, 9), // Generate a random ID
            title,
            place,
            rooms,
            available,
            accommodates,
            parking,
            amenities,
            photo,
            price_per_night,
            availability_range: {
              month,
              days
            }
        }
        console.log("Form Data:", formData);
              
    
    
        // Envoyer une requête POST vers l'API (URL fictive pour cet exemple)
        try {
            const response = await fetch("http://localhost:3000/anounces", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                const result = await response.json();
                document.getElementById("message").innerText = "Annonce ajoutée avec succès!";
                console.log("API Response:", result);
    
            } else {
                throw new Error("Erreur lors de l'envoi des données");
            }
        } catch (error) {
            console.error("Erreur:", error);
            document.getElementById("message").innerText = "Une erreur s'est produite. Veuillez réessayer.";
        }


    
})

})


// ajouter les lists de utilisateur

const anounceList=document.getElementById('anounce-list');

console.log(anounceList)
const url=('http://localhost:3000/anounces')
fetch(url)
.then(res=>res.json())
.then((data)=>{
    const dataUser=data;
dataUser.forEach((data) => {

   
    if(localStorage.getItem("userId")===data.userId){
        console.log(data);

    const list=document.createElement('div');
    list.className='list'

    list.innerHTML+=`<div class="photoDiv">
    <img src="./pictures/${data.photo}" alt="photo">
    </div>
<div class="infos" >
<h3>${data.title}</h3>
<p class="para">${data.place}</p>
<p class="para">Hébergement: ${data.accommodates} personnes</p>
<p class="para-prix">${data.price_per_night} <i class="fa-solid fa-euro-sign"></i>/nuit</p>
<button class="delete" data-id="${data.id}">Delete</button>
</div>`
anounceList.appendChild(list);

    }


});

// Add event listeners for the delete buttons
const deleteButtons = document.querySelectorAll(".delete");
deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const annonceId = event.target.dataset.id; // Get the ID of the announcement
        const listElement = event.target.closest(".list"); // Get the parent list element
        deleteAnnonce(annonceId, listElement); // Pass the ID and element to the function
    });
});
})
.catch((error) => {
console.error("Error fetching data:", error);
});

// Function to delete announcement
function deleteAnnonce(annonceId, listElement) {
const deleteUrl = `http://localhost:3000/anounces/${annonceId}`;

fetch(deleteUrl, {
method: "DELETE",
})
.then((res) => {
    if (!res.ok) {
        throw new Error("Failed to delete announcement");
    }
    return res.json();
})
.then(() => {
    console.log(`Announcement with ID ${annonceId} deleted successfully`);
    listElement.remove(); // Remove the element from the DOM
})
.catch((error) => {
    console.error("Error deleting announcement:", error);
});
}
   

