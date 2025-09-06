



///////CATEGORIES SECTION
const getCategories = async () => {
    
        const response = await fetch("https://openapi.programming-hero.com/api/categories");
        const data = await response.json();

        const container = document.getElementById("categories-list");
        container.innerHTML = ""; // clear any existing content

        data.categories.forEach(element => {
            const button = document.createElement("a");
            button.textContent = element.category_name;
            button.classList.add("category_button"); // add class for optional styling
            container.appendChild(button);
        });
};
// Call the function to load categories
getCategories();



const allPlants=async()=>{
    const url=await fetch("https://openapi.programming-hero.com/api/plants")
    const data=await url.json();
    // console.log(data)  
    const plants=data.plants;
    const container=document.getElementById("card-container")
    container.innerHTML=""
    plants.forEach(element => {
        const card=document.createElement("div");
        card.classList.add("card","bg-base-100" ,"shadow-sm", "p-2")
        card.innerHTML=`
        <img src="${element.image}"
               alt="${element.name}"
               class="rounded-xl  w-full h-48 object-cove" />
           
              <div class="card-body  ">
              <h2 class="card-title">${element.name}</h2>
               <p>${element.description}</p>

               <div class="ajaira flex items-center justify-between w-full ">
                <button class="bg-[#15803d50] p-1 rounded-xl">${element.category}</button>
                <div class="flex" items-center>
                <i class="fa-solid fa-bangladeshi-taka-sign"></i><p>${element.price}</p>
                </div>
               </div>
               
              <div class="card-actions">
              <button class="bg-[#15803d] w-[100%] text-white p-2 rounded-xl mt-2" >Buy Now</button>
             </div>
           </div>
        
        `
        container.append(card)
        
    });

}

allPlants()