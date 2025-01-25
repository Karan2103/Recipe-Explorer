// Script for Recipe Website

// Sample Data for Recipes (Replace with API if available)
const recipes = [
  { id: 1, name: "Spaghetti Carbonara", cuisine: "italian", diet: "", time: 30, image: "Spaghetti Carbonara.jpeg" },
  { id: 2, name: "Vegetarian Tacos", cuisine: "mexican", diet: "vegetarian", time: 15, image: "Vegetarian Tacos.jpeg" },
  { id: 3, name: "Chana Masala", cuisine: "indian", diet: "vegan", time: 40, image: "Chana Masala.jpeg" },
];

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// DOM Elements
const recipeList = document.getElementById("recipes");
const searchBar = document.getElementById("search-bar");
const cuisineFilter = document.getElementById("cuisine");
const dietFilter = document.getElementById("diet");
const timeFilter = document.getElementById("time");
const favoritesModal = document.getElementById("favorites-modal");
const favoritesList = document.getElementById("favorites-list");
const closeBtn = document.querySelector(".close-btn");

// Render Recipes
function renderRecipes(recipeArray) {
  recipeList.innerHTML = "";
  recipeArray.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    recipeCard.innerHTML = `
      <img src="images/${recipe.image}" alt="${recipe.name}">
      <h3>${recipe.name}</h3>
      <button onclick="addToFavorites(${recipe.id})">Add to Favorites</button>
    `;
    recipeList.appendChild(recipeCard);
  });
}

// Filter Recipes
function filterRecipes() {
  const searchQuery = searchBar.value.toLowerCase();
  const cuisine = cuisineFilter.value;
  const diet = dietFilter.value;
  const time = parseInt(timeFilter.value);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery);
    const matchesCuisine = !cuisine || recipe.cuisine === cuisine;
    const matchesDiet = !diet || recipe.diet === diet;
    const matchesTime = !time || recipe.time <= time;
    return matchesSearch && matchesCuisine && matchesDiet && matchesTime;
  });

  renderRecipes(filteredRecipes);
}

// Add to Favorites
function addToFavorites(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!favorites.some(f => f.id === recipeId)) {
    favorites.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${recipe.name} added to favorites!`);
  } else {
    alert("This recipe is already in your favorites.");
  }
}

// Show Favorites
function showFavorites() {
  favoritesList.innerHTML = "";
  favorites.forEach(recipe => {
    const favoriteCard = document.createElement("div");
    favoriteCard.className = "recipe-card";
    favoriteCard.innerHTML = `
      <img src="images/${recipe.image}" alt="${recipe.name}">
      <h3>${recipe.name}</h3>
    `;
    favoritesList.appendChild(favoriteCard);
  });
  favoritesModal.classList.add("show");
}

// Close Favorites Modal
closeBtn.addEventListener("click", () => {
  favoritesModal.classList.remove("show");
});

// Event Listeners
searchBar.addEventListener("input", filterRecipes);
cuisineFilter.addEventListener("change", filterRecipes);
dietFilter.addEventListener("change", filterRecipes);
timeFilter.addEventListener("change", filterRecipes);
document.getElementById("search-btn").addEventListener("click", filterRecipes);

// Initial Render
renderRecipes(recipes);
