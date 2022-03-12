const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-button");
searchField.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    searchBtn.click();
  }
});

const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;
  // clear data
  searchField.value = "";
  if (searchValue == "") {
    document.querySelector(".errMsg").innerHTML = "please write a meal name.";
  } else {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearch(data));
  }
  // load data    [displaySearch(data.meals)]
};
const displaySearch = (data) => {
  const meals = data.meals;
  if (meals != null) {
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";

    meals.forEach((meal) => {
      // console.log(meal);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
              <div onclick="loadMealDetails(${meal.idMeal})" class="card" >
              <img src="${meal.strMealThumb}" class="card-img-top" alt="img" />
              <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">${
                    meal.strInstructions.slice(0, 150) + "..."
                  }</p>
              </div>
              </div>
              `;
      searchResult.appendChild(div);
    });
    const displayDiv = document.getElementById("display-meal");
    displayDiv.innerHTML = "";
  } else {
    const displayDiv = document.getElementById("display-meal");
    displayDiv.innerHTML = "";
    // not found msg
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="row justify-content-center mt-5">
        <div class="col-md-5 text-center">
          <img class="notfoundImg" src="img/notFound.png" alt="img" />
          <p class="lead text-danger">Oops! No data found. Try with different name.</p>
        </div>
      </div>
    `;
    displayDiv.appendChild(div);

    const searchResult = document.getElementById("search-result");
    searchResult.innerHTML = "";
  }
  document.querySelector(".errMsg").innerHTML = "";
};

const loadMealDetails = (mealId) => {
  //   console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0]));
};
const displayMealDetail = (meal) => {
  const mealDiv = document.getElementById("display-meal");
  mealDiv.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("card", "popUpCard");
  div.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions}</p>
    <a href="${meal.strYoutube}" class="card-link">Watch Tutorial</a>
  </div>
  `;
  mealDiv.appendChild(div);
};
