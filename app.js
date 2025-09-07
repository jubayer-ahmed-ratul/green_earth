/////// CATEGORIES SECTION
const getCategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await response.json();

    const container = document.getElementById("categories-list");
    container.innerHTML = ""; // clear any existing content

    data.categories.forEach(element => {
        const button = document.createElement("a");
        button.textContent = element.category_name;
        button.classList.add("category_button");

        // Add click event
        button.addEventListener("click", async () => {
            const categoryResponse = await fetch(`https://openapi.programming-hero.com/api/category/${element.id}`);
            const categoryData = await categoryResponse.json();

            // Now render plants of this category
            displayPlants(categoryData.plants);
        });

        container.appendChild(button);
    });
};
getCategories();

/////// RENDER ALL PLANTS (default)
const allPlants = async () => {
    const url = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await url.json();
    displayPlants(data.plants);
};
allPlants();

/////// RENDER FUNCTION (reusable)
const displayPlants = (plants) => {
    const container = document.getElementById("card-container");
    container.innerHTML = "";

    plants.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("card","bg-base-100","shadow-sm","p-2");

        card.innerHTML = `
        <img src="${element.image}"
               alt="${element.name}"
               class="rounded-xl w-full h-48 object-cover" />
           
        <div class="card-body">
            <h2 class="card-title">${element.name}</h2>
            <p>${element.description}</p>

            <div class="ajaira flex items-center justify-between w-full">
                <button class="bg-[#15803d50] p-1 rounded-xl">${element.category}</button>
                <div class="flex items-center">
                    <i class="fa-solid fa-bangladeshi-taka-sign"></i>
                    <p>${element.price}</p>
                </div>
            </div>
               
            <div class="card-actions">
                <button class="bg-[#15803d] w-[100%] text-white p-2 rounded-xl mt-2 buy-button">Buy Now</button>
            </div>
        </div>
        `;
        container.append(card);
    });

    const buybtn=document.getElementsByClassName("buy-button");

    for (const btn of buybtn) {
        btn.addEventListener('click',function(){
            const cardBody = btn.closest(".card-body");

            // grab the name and price from that card
            const plantName = cardBody.querySelector(".card-title").innerText;
            const plantPrice = parseFloat(cardBody.querySelector(".ajaira p").innerText);

            const cartBody=document.getElementById("cart");

            // Check if item already exists
            let existingItem = Array.from(cartBody.querySelectorAll(".cart-item")).find(item => 
                item.querySelector(".cart-item-name").innerText === plantName
            );

            if(existingItem){
                // increase quantity
                const qtyEl = existingItem.querySelector(".cart-item-qty");
                qtyEl.innerText = parseInt(qtyEl.innerText) + 1;
            } else {
                // create new cart item
                const addtocart = document.createElement("div");
                addtocart.classList.add("cart-item"); // mark cart item

                addtocart.innerHTML=`
                <div class="flex items-center justify-between bg-[#f0fdf4] shadow-l p-2 mt-2 rounded-xl">
                    <div class=" mt-3">
                        <h3 class="text-l font-semibold cart-item-name">${plantName}</h3>
                        <div class="flex items-center gap-2 mt-2">
                            <i class="fa-solid fa-bangladeshi-taka-sign"></i>
                            <p class="text-sm cart-item-price">${plantPrice}</p> 
                            <p class="text-sm cart-item-qty">1</p>
                        </div>
                    </div>
                    <i class="fa-solid fa-xmark cross cursor-pointer"></i>
                </div>
                `;

                cartBody.append(addtocart);

                const crossbtn = addtocart.querySelector(".cross");
                crossbtn.addEventListener("click", function(){
                    const qtyEl = addtocart.querySelector(".cart-item-qty");
                    let qty = parseInt(qtyEl.innerText);

                    if(qty > 1){
                        qtyEl.innerText = qty - 1;
                    } else {
                        addtocart.remove();
                    }

                    updateCartTotal();
                });
            }

            // <-- ADD THESE LINES HERE -->
            const totalEl = document.getElementById("cart-total");
            cartBody.appendChild(totalEl); // always last
            updateCartTotal(); // update total
        });
    }
};

// Total calculation function
function updateCartTotal(){
    const cartBody = document.getElementById("cart");
    const totalEl = document.getElementById("cart-total");

    let total = 0;
    const items = cartBody.querySelectorAll(".cart-item");
    items.forEach(item => {
        const price = parseFloat(item.querySelector(".cart-item-price").innerText) || 0;
        const qty = parseInt(item.querySelector(".cart-item-qty").innerText) || 0;
        total += price * qty;
    });

    totalEl.innerText = `Total: ${total.toFixed(2)}`;
}
