var load =document.querySelector(".loading");
var meals =document.querySelector(".meals");
var details =document.getElementById("details");
var search =document.getElementById("search");
var categoryMeal =document.getElementById("categoryMeal");
var body =document.getElementById("body");
var allMeals=[];
var allMealsSearch=[];
async function getMailByname(mealName)
{
    const api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    allMeals =await api.json();
    load.classList.add("d-none");
    allMeals=allMeals.meals;
    console.log(allMeals);
     display(allMeals);

}


getMailByname("");
 function display(meals)
{
    var container =``;
    for(let i=0;i<meals.length;i++)
    {
        container +=`
         <div  class="col-md-3">
                    <div  class="s position-relative overflow-hidden" >
                        <img src="${meals[i].strMealThumb}" class="img-fluid rounded-2" alt="">
                        <div id="${meals[i].idMeal}"  class="img d-flex align-items-center rounded-2 hover" >
                            <p class="h1">${meals[i].strMeal}</p>
                        </div>
                    </div>

                </div>

        `
    }
  
    document.getElementById("body").innerHTML=container;
    $(".hover").click(function(eInfo)
{   

       

    detailss(this.id); 

    
   

})

}
async function detailss(id)
{
    load.classList.remove("d-none");
 
    console.log(id);
    const api =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    var Json = await api.json();
    Json =Json.meals[0];
    load.classList.add("d-none");

    console.log(Json);
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (Json[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${Json[`strMeasure${i}`]} ${Json[`strIngredient${i}`]}</li>`
        }
    }
    let tags = Json.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    var container=`
                <div class="row my-5 details text-white">  

    <div id=${Json.idMeal}  class="col-md-4">
                    <img src="${Json.strMealThumb}" class="w-75  rounded-3" alt="">
                    <h2> ${Json.strMeal}</h2>

                </div>
                <div class="col-md-8">
                    <h2>Instructions
                    </h2>
                    <p>
                    ${Json.strInstructions}

                    </p>
                    <p class="h2">Area : <span>${Json.strArea}</span></p>
                    <p class="h2">Category :<span>${Json.strCategory}</span></p>
                    <p class="h2">Recipes :</p>
                    <ul class="list-unstyled d-flex g-3 flex-wrap"> 
                                            ${ingredients}


                    </ul>
                    <p class="h2">Tags  :</p>
                    <ul class="list-unstyled d-flex g-3 flex-wrap"> 
                                            ${tagsStr}


                    </ul>
                    <div class="my-2">
                        <a href="${Json.strSource}" target="_blank">
                            <button class="btn btn-success">
                                Source
                            </button> </a>
                            <a href="${Json.strYoutube}" target="_blank">
                                <button class="btn btn-danger">
                                    Youtube
                                </button> </a>
                    </div>


                </div>
                                </div>


    `;
    document.getElementById("body").innerHTML=container;
}
$("#show").click(open);
function open() {
    $("nav").animate({"left":"0%"},1000);
    $(".fa-align-justify").addClass("d-none");
    $(".fa-x").removeClass("d-none");
    for (let i = 0; i < 5; i++) {
        $(" li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
   
    
}
function closeSideNav() {
    $("nav").animate({
        left: "-16%"
    }, 500)

    $(".fa-align-justify").removeClass("d-none");
    $(".fa-x").addClass("d-none");


    $(".links li").animate({
        top: 300
    }, 500)
}

$(".fa-x").click(closeSideNav);
   
   
$("#searchMeal").click(function()
{
   closeSideNav();
    body.innerHTML=``;
    $("#search").removeClass("d-none");
})

/*async function searchBymale(mealName)
{
    const api =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    var Json = await api.json();
}*/

async function getSearchMailByname(s)
{
    load.classList.remove("d-none");

    const api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`);
    var x =await api.json();
    load.classList.add("d-none");

    displaySearch(x.meals)

    
    console.log(x.meals);

}
document.getElementById("searchName").addEventListener("keyup",function(eInfo)
{
    console.log();
    getSearchMailByname(eInfo.target.value);

}
)
async function getSearchMailByFirst(s)
{
    load.classList.remove("d-none");

    const api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${s}`);
    allMealsSearch =await api.json();
    load.classList.add("d-none");

    displaySearch(allMealsSearch.meals)
    console.log(allMealsSearch.meals);

}
document.getElementById("searchFirst").addEventListener("keypress",function(eInfo)
{
    console.log(eInfo.key);
    getSearchMailByFirst(eInfo.key);
}
)
function displaySearch(arr) {
    $("#searchShow").removeClass("d-none");

    var container =``;
    for(let i=0;i<arr.length;i++)
    {
        container +=`
         <div  class="col-md-3">
                    <div  class="s position-relative overflow-hidden" >
                        <img src="${arr[i].strMealThumb}" class="img-fluid rounded-2" alt="">
                        <div id="${arr[i].idMeal}"  class="img d-flex align-items-center rounded-2 hover" >
                            <p class="h1 title">${arr[i].strMeal}</p>
                        </div>
                    </div>

                </div>

        `
    }
    document.getElementById("searchShow").innerHTML=container;
    $(".hover").click(function(eInfo)
{   
    console.log(this);

    console.log(eInfo.target);
   detailss(this.id); 

    
   

})
}
$("#category").click(function()
{
    $("#search").addClass("d-none");

    closeSideNav()
    $("#categoryMeal").removeClass("d-none");
    $(".meals").addClass("d-none");
   getCatageory();
    
})
async function getCatageory()
{   
    load.classList.remove("d-none");

    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const Json =await api.json();
    var arr=Json.categories;
    load.classList.add("d-none");

    console.log(arr);
    var container =``;
    for(let i=0;i<arr.length;i++)
    {
        container +=`
         <div  class="col-md-3">
                    <div id="${arr[i].strCategory}" class="s position-relative overflow-hidden" >
                        <img src="${arr[i].strCategoryThumb}" class="w-100 rounded-2" alt="">
                        <div   class="img rounded-2 text-center d-flex align-items-center" >
                            <div>
                                <p class="h1">${arr[i].strCategory}</p>
                            <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                            </div>
                        </div>
                    </div>
            </div>
        

        `
    }
    document.getElementById("body").innerHTML=container;
    $(".s").click(function(eInfo)
{   

    console.log(this);
   getCategoryMeals(this.id); 

    
   

})

};
async function getCategoryMeals(category) {
    
    load.classList.remove("d-none");

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json();
    response=response.meals;
    load.classList.add("d-none");

console.log(response);

    var container =``;
    for(let i=0;i<response.length;i++)
    {
        console.log(456645);
        container +=`
         <div  class="col-md-3">
                    <div  class="s position-relative overflow-hidden" >
                        <img src="${response[i].strMealThumb}" class="img-fluid rounded-2" alt="">
                        <div id="${response[i].idMeal}"  class="img d-flex align-items-center rounded-2 hover" >
                            <p class="h1">${response[i].strMeal}</p>
                        </div>
                    </div>

                </div>

        `;
    }
    document.getElementById("body").innerHTML=container;
    $(".hover").click(function(eInfo)
{   

   
    detailss(this.id); 

    
   

})

}
$("#area").click(function()
{       $("#search").addClass("d-none");

      
   closeSideNav();
   getArea();
});
async function getArea()
{
    load.classList.remove("d-none");

    const api =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
   var Json=await api.json();
   Json=Json.meals;
   load.classList.add("d-none");
    console.log(Json);
   var  container =``;
   for(let i=0;i<Json.length;i++)
    {
     container+=`
      <div id="${Json[i].strArea}" class="col-md-3  area">
                         <i class="fa-solid fa-house-laptop fa-5x text-white"></i>
                         <h2 class="text-white h1">${Json[i].strArea}</h2>
                     </div>
     `
    }
    document.getElementById("body").innerHTML=container;
    $(".area").click(function()
{
    getFilterArea(this.id);
})
  
}
async function getFilterArea(country)
{
    load.classList.remove("d-none");
    

    const api =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    var Json =await api.json();
    Json=Json.meals;
    console.log(Json);
    load.classList.add("d-none");

    var container =``;
    for(let i=0;i<Json.length;i++)
    {
        container +=`
         <div  class="col-md-3">
                    <div  class="s position-relative overflow-hidden" >
                        <img src="${Json[i].strMealThumb}" class="img-fluid rounded-2" alt="">
                        <div id="${Json[i].idMeal}"  class="img d-flex align-items-center rounded-2 hover" >
                            <p class="h1">${Json[i].strMeal}</p>
                        </div>
                    </div>

                </div>

        `
    }
    document.getElementById("body").innerHTML=container;
    $(".hover").click(function(eInfo)
{   

        

    detailss(this.id); 

    
   

})
}
$("#Ingredient").click(function()
{
    $("#search").addClass("d-none");


    closeSideNav();
    
    getIngredients();

});
async function getIngredients()
{
    load.classList.remove("d-none");

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    load.classList.add("d-none");

    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
}
async function displayIngredients(arr)
{
    var  cartoona=``;
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div id="${arr[i].strIngredient}"  class="col-md-3 cursor-pointer inger">
                <div class="rounded-2 text-center  text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }
    document.getElementById("body").innerHTML=cartoona;
    $(".inger").click(function(){
        
        getSelectedIngredients(this.id);

    })

}
async function getSelectedIngredients(meals)
{

    load.classList.remove("d-none");

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meals}`)
    respone = await respone.json();
    respone=respone.meals;
    load.classList.add("d-none");

    console.log(respone.meals);

    var container =``;
    for(let i=0;i<respone.length;i++)
    {
        container +=`
         <div  class="col-md-3">
                    <div  class="s position-relative overflow-hidden" >
                        <img src="${respone[i].strMealThumb}" class="img-fluid rounded-2" alt="">
                        <div id="${respone[i].idMeal}"  class="img d-flex align-items-center rounded-2 hover" >
                            <p class="h1">${respone[i].strMeal}</p>
                        </div>
                    </div>

                </div>

        `
    }
    document.getElementById("body").innerHTML=container;
    $(".hover").click(function(eInfo)
{   

        

    detailss(this.id); 

    
   

})
}
$("#contact").click(function()
{
    $("#search").addClass("d-none");
    closeSideNav();
   getContact();

});
function getContact()
{
    body.innerHTML=`
            <div id="ContactUs"  >

              <form >
            <div class="row g-3">
              
                <div  class="col-md-6">
                    <input id="nameInput" type="text" onkeyup="inputsValidation()" class="form-control " placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div  class="col-md-6">
                    <input id="emailInput" type="email" onkeyup="inputsValidation()" class="form-control " placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
               <div  class="col-md-6">
                <input id="phoneInput" type="text" onkeyup="inputsValidation()" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
               </div>
               <div  class="col-md-6">
                <input id="ageInput" type="number" onkeyup="inputsValidation()" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
               </div>
               <div  class="col-md-6">
                <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
               </div>
               <div  class="col-md-6">
                <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
               </div>
             

            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger d-block mx-auto my-5">
                Submit
            </button>
        </form>
         </div>`;
         submitBtn = document.getElementById("submitBtn")

document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})

document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})

}
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;


function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}



