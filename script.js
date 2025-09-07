const getId = (x) => document.getElementById(x);
const getNodeList = (y) => document.querySelectorAll(y);

// all the parent Id
const categoryContainerId = getId("categories");
const plantContainerId = getId("all-plants");
const modalId = getId("tree_detail");
const aboutTreeDetailId = getId("aboutTree");
const spinId = getId("spin");

// spinning functionality(if z === true , spin will show)
const runSpin = (z) => {
  if (z == true) {
    spinId.classList.remove("hidden");
    plantContainerId.classList.add("hidden");
  } else {
    spinId.classList.add("hidden");
    plantContainerId.classList.remove("hidden");
  }
};

// get all category
const categoryContainer = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => allCategory(data.categories));
};

// here is one by one category
const allCategory = (categories) => {
  categories.forEach((category) => {
    const createCategory = document.createElement("div");
    createCategory.innerHTML = `
        <p class="category-single p-2 hover:bg-green-700 hover:text-white hover:rounded-lg" id ="${category.id}">
              ${category.category_name}
        </p>
    `;
    categoryContainerId.appendChild(createCategory);
    // console.log(category);
  });
};

// get all the plant
const plantContainer = () => {
  runSpin(true);

  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((plants) => allPlants(plants.plants));
};

// here is one by one plant
const allPlants = (plants) => {
  plantContainerId.innerHTML = "";
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
              <h2 class="card-title text-2xl" onClick = "openModal(${
                plant.id
              })">${plant.name}</h2>
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
    runSpin(false);
    // console.log(plant);
  });
};

// Modal(tree Details)
const openModal = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((wood) => detailsModal(wood.plants));
};

const detailsModal = (tree) => {
  aboutTreeDetailId.innerHTML = "";
  const createTreeDetail = document.createElement("div");
  createTreeDetail.innerHTML = `
  
        <p class="text-2xl pb-3 font-bold">${tree.name}</p>
            <img
              class=" rounded-lg pb-3 h-80 w-full"
              src="${tree.image}"
              alt=""
            />
            <p class= "pb-3"><span class="font-bold">Category</span> : ${tree.category}</p>
            <p class= "pb-3"><span class="font-bold">Price</span> : ${tree.price}</p>
            <p>
              <span class="font-bold">Description</span> : ${tree.description}
        </p>
  `;
  aboutTreeDetailId.appendChild(createTreeDetail);
  modalId.showModal(); //here we call the modal dialogue
  //   console.log(tree);
};

// user click category container and we get the id of that category
categoryContainerId.addEventListener("click", (e) => {
  //   console.log(e.target.classList);
  if (e.target.classList.contains("category-single")) {
    showPerCatPlant(e.target.id);
  }
});

// fetching the plants according to the category
const showPerCatPlant = (id) => {
  //  active button functionality
  const catSingleNodeList = getNodeList(".category-single");
  catSingleNodeList.forEach((a) => {
    a.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");

  //   data filtered by category
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((trees) => allPlants(trees.plants)); //here we called allPlants function for showing trees 1 by 1
  // console.log(trees.plants)
};

// we called CategoryContainer() function for showing category by default
categoryContainer();
// we called plantContainer() function for showing Plants by default
plantContainer();
