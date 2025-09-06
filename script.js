const getId = (x) => document.getElementById(x);

// all the parent Id
const categoryContainerId = getId("categories");
const plantContainerId = getId("all-plants");

// get all category
const categoryContainer = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => allCategory(data.categories));
};

const allCategory = (categories) => {
  categories.forEach((category) => {
    const createCategory = document.createElement("div");
    createCategory.innerHTML = `
        <p class="p-2 hover:bg-green-700 hover:text-white hover:rounded-lg" id ="cat-${category.id}">
              ${category.category_name}
        </p>
    `;
    categoryContainerId.appendChild(createCategory);
    // console.log(category);
  });
};

// get all the plant
const plantContainer = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((plants) => allPlants(plants.plants));
};

const allPlants = (plants) => {
  plants.forEach((plant) => {
    const createPlants = document.createElement("div");
    createPlants.innerHTML = `
    <div class="card bg-base-100 shadow-sm ">
            <figure class="">
              <img
                src="${plant.image}"
                alt="Shoes"
                class = "h-[250px] w-full"
              />
            </figure>
            <div class="card-body p-3">
              <h2 class="card-title">${plant.name}</h2>
              <p class = "text-[18px]">
                ${plant.description.slice(0, 50)}...
              </p>
              <div class="flex justify-between items-center py-3">
                <div class="badge bg-[#f0fdf4] p-4 text-green-700 font-medium">
                  ${plant.category}
                </div>
                <div class="font-bold">
                  <p class="font-bold">৳ ${plant.price}</p>
                </div>
              </div>
              <div class="card-actions">
                <button
                  class="btn btn-lg w-full bg-green-700 text-white rounded-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
    
    `;

    plantContainerId.appendChild(createPlants);
    // console.log(plant);
  });
};

// we called CategoryContainer() function for showing category by default
categoryContainer();
// we called plantContainer() function for showing Plants by default
plantContainer();
