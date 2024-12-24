const demo=document.getElementById('demo');

const url=new URL(window.location.href)

const params=url.searchParams;
console.log(params)

const MyId=params.get("id");
console.log(MyId);

fetch('http://localhost:3000/anounces')

.then(res=>res.json())

.then((data)=>{
    
    const list=data;

    list.forEach((card) => {
          if(MyId==card.id)
            {
                const detail=document.createElement('div');
                detail.className='detail';

                detail.innerHTML=`
                <div class="div-img"><img src="./pictures/${card.photo}"></div>
                <div class="info">
                <h1>${card.title}</h1>
                <h3>${card.place}</h3>
                <h4>${card.price_per_night}<i class="fa-solid fa-euro-sign"></i>/nuit</h4>
                <p><i class="fa-solid fa-people-group"></i> Hébergement:<br> Jusqu'a ${card.accommodates} personnes</p>
                <p>Disponibilité: <br>du ${card.availability_range.days[0]} au ${card.availability_range.days[1]} ${card.availability_range.month} </p>
                <p><i class="fa-solid fa-bed"></i><br> ${card.rooms} chambres</p>
                <p><i class="fa-solid fa-square-parking"></i>  <br> ${card.parking}</p>
                <h4>Ce que propose ce logement</h4>
                <ul>
                <li><i class="fa-solid fa-star"></i>  ${card.amenities[0]}</li>
                 <li><i class="fa-solid fa-star"></i>  ${card.amenities[1]}</li>
                  <li><i class="fa-solid fa-star"></i>  ${card.amenities[2]}</li>
                   <li><i class="fa-solid fa-star"></i>  ${card.amenities[3]}</li></ul>
                   <button id="reserveBtn">Reservez maintenent</button></div>`

                demo.appendChild(detail);
                console.log(card)
            }
        
    });
    
   
})