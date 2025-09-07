/////// CATEGORIES SECTION
const getCategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await response.json();

    const container = document.getElementById("categories-list");
    container.innerHTML = "";

    data.categories.forEach(element => {
        const button = document.createElement("a");
        button.textContent = element.category_name;
        button.classList.add("category_button");

        button.addEventListener("click", async () => {
            const categoryResponse = await fetch(`https://openapi.programming-hero.com/api/category/${element.id}`);
            const categoryData = await categoryResponse.json();
            displayPlants(categoryData.plants);
        });

        container.appendChild(button);
    });
};
getCategories();


//plants section

const allPlants = async () => {
    const url = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await url.json();
    displayPlants(data.plants);
};
allPlants();


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

    //btn functionality

    const buybtn = document.getElementsByClassName("buy-button");

    for (const btn of buybtn) {
        btn.addEventListener('click', function() {
            const plantCard = btn.closest(".card-body");
            const plantName = plantCard.querySelector(".card-title").innerText;
            const plantPrice = parseFloat(plantCard.querySelector(".ajaira p").innerText);

            const cartContainer = document.getElementById("cart");

            let existingPlant = Array.from(cartContainer.querySelectorAll(".cart-item")).find(item =>
                item.querySelector(".cart-item-name").innerText === plantName
            );

            if(existingPlant){
                const qtyEl = existingPlant.querySelector(".cart-item-qty");
                qtyEl.innerText = parseInt(qtyEl.innerText) + 1;
            } else {
                const newCartItem = document.createElement("div");
                newCartItem.classList.add("cart-item");

                newCartItem.innerHTML = `
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

                cartContainer.append(newCartItem);

                const crossBtn = newCartItem.querySelector(".cross");
                crossBtn.addEventListener("click", function() {
                    const qtyEl = newCartItem.querySelector(".cart-item-qty");
                    let qty = parseInt(qtyEl.innerText);

                    if(qty > 1){
                        qtyEl.innerText = qty - 1;
                    } else {
                        newCartItem.remove();
                    }

                    updateCartTotal();
                });
            }

            let totalDiv = document.getElementById("cart-total");
            cartContainer.appendChild(totalDiv);
            updateCartTotal();
        });
    }
};


//cart functionality
function updateCartTotal(){
    const cartContainer = document.getElementById("cart");
    const totalDiv = document.getElementById("cart-total");

    let total = 0;
    const items = cartContainer.querySelectorAll(".cart-item");
    items.forEach(item => {
        const price = parseInt(item.querySelector(".cart-item-price").innerText) || 0;
        const qty = parseInt(item.querySelector(".cart-item-qty").innerText) || 0;
        total += price * qty;
    });

    totalDiv.innerText = `Total: ${total}`;
}
