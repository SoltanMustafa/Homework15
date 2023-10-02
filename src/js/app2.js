window.addEventListener("DOMContentLoaded", function(){
  let search_btn = document.querySelector("#search-button");
  let meal_input = document.querySelector("#meal-input");
  let content_area = document.querySelector(".content-area");
  let meals_menu = document.querySelector(".meals-menu");
  let abouthtml = "";

  async function fetchAllProducts(url){
    try{
      let alldata = await fetch(url);
      let takingdata = await alldata.json();

      abouthtml = takingdata.meals.map(meal =>`
                <div class="meal-photo-name">
                    <div class="meal-photo">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    </div>
                    <div class="meal-name">
                        <p class="meal-name-holder">${meal.strMeal}</p>
                    </div>
                </div>
      `).join('');

      meals_menu.innerHTML = abouthtml;

    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  fetchAllProducts('https://www.themealdb.com/api/json/v1/1/search.php?s');


  search_btn.addEventListener("click", function(){
    let searched_text = meal_input.value.trim();
    let html = '';
    async function fetchProducts(url){
      try {
        let data = await fetch(url);
        let response = await data.json();

        html = response.meals.map(meal => `
          <h1 class="greating-title">Your meals recipe...</h1>
          <div class="recepy-container">
            <h1 class="food-category">Food Category: ${meal.strCategory}</h1>
            <h2 class="food-area">Food Area: ${meal.strArea}</h2>
            <h2 class="food-name">Food Name: ${meal.strMeal}</h2>
            <div class="meal-itself">
              <div class="img-div">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="icon-holder">
                  <a href="${meal.strYoutube}" target="_blank">
                    <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="512px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="_x33_95-youtube"><g><path d="M476.387,144.888c-5.291-19.919-20.878-35.608-40.67-40.933C399.845,94.282,256,94.282,256,94.282    s-143.845,0-179.719,9.674c-19.791,5.325-35.378,21.013-40.668,40.933c-9.612,36.105-9.612,111.438-9.612,111.438    s0,75.334,9.612,111.438c5.29,19.92,20.877,34.955,40.668,40.281C112.155,417.719,256,417.719,256,417.719    s143.845,0,179.717-9.674c19.792-5.326,35.379-20.361,40.67-40.281c9.612-36.104,9.612-111.438,9.612-111.438    S485.999,180.994,476.387,144.888z" style="fill:#FF0000;"/><polygon points="208.954,324.723 208.954,187.93 329.18,256.328   " style="fill:#FFFFFF;"/></g></g><g id="Layer_1"/></svg>
                  </a>
                </div>
              </div>
              <div class="ingridients">
              <h2 class="ing-title">Ingridients</h2>
              <ul class="ingridients-list">${creatIngridientList(meal)}</ul>
              </div>
              <div class="measurements">
              <h2 class="msr-title">Measuremenst</h2>
              <ul class="measurements-list">${creatMeasurementList(meal)}</ul>
              </div>
            </div>
            <p class="instruction-p"><span>Instructions:</span><br><br>${meal.strInstructions}</p>
          </div>
        `).join('');

        content_area.innerHTML = html;

        function creatIngridientList(meal){
          const ingredientsList = [];
          for(let i = 1; i <= 20; i++) {
            const ingredient = meal['strIngredient' + i];
        
            if (ingredient && ingredient.trim() !=="") {
                ingredientsList.push(`<li>${ingredient}</li>`);
              }
             else {
              break;
            }
          }
          return ingredientsList.join('');
        }

        function creatMeasurementList(meal) {
          const measurementsList = [];
          for (let i = 1; i <= 20; i++) {
            const measurement = meal['strMeasure' + i];
        
            if (measurement && measurement.trim() !== "") {
              measurementsList.push(`<li>${measurement}</li>`);
            } else {
              break;
            }
          }
          return measurementsList.join('');
        }


      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchProducts('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searched_text);

    meal_input.value = "";
  })
})