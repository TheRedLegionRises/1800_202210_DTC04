// Write filter options into database
function write_filters() {
    var filtersRef = db.collection("Filters");

    filtersRef.add({
        code: "KOREAN",
        filterName: "Korean",
        cuisineType: "Asian",
        searchName: "korean",

    });

    filtersRef.add({
        code: "ITALIAN",
        filterName: "Italian",
        cuisineType: "Italian",
        searchName: "Italian",

    });

    filtersRef.add({
        code: "VEGAN",
        filterName: "Vegan",
        cuisineType: "All",
        searchName: "vegan",

    });

    filtersRef.add({
        code: "INDIAN",
        filterName: "Indian",
        cuisineType: "Asian",
        searchName: "indian",
    })

}

// Function for the search bar used to search specific filter buttons
function searchFilters(){
    searchName = document.getElementById("filterSearch").value;
    serchName = searchName.toLowerCase();
    console.log(searchName);
    if (searchName != null && searchName != "") {
        db.collection("Filters").where("searchName", "==", searchName)
        .get() 
            .then(searchResult => { 
                size = searchResult.size;
                filters = searchResult.docs;
                console.log("search");

                for(i=0; i < size; i++){
                    filterName = filters[i].data().filterName;
                    code = filters[i].data().code;
                    console.log(filterName);
                    displaySearchFilter(filterName, code);
                }
            })
    } else {
        displayFilters();
        displayAllRestaurants();
    }

}

// If the search function is used, this will show the filter buttons that correspond to the searched filter
// e.g. if Burger is searched, only the Burger filter button will be shown
function displaySearchFilter(filterName, filterCode){
    $("#filtersShown").empty();
    let filterOptionsTemplate = document.getElementById("filterOptionsTemplate");
    let filterOptionsTab = document.getElementById("filtersShown");

    let testFilterButton = filterOptionsTemplate.content.cloneNode(true);
    testFilterButton.querySelector(".filter_button").innerHTML = filterName;
    testFilterButton.querySelector('.filter_button').onclick = () => button_pressed(filterCode, filterName);
    filterOptionsTab.appendChild(testFilterButton);



}

// Displays all the filter buttons
function displayFilters() {
    $("#filtersShown").empty();
    let filterOptionsTemplate = document.getElementById("filterOptionsTemplate");
    let filterOptionsTab = document.getElementById("filtersShown");

    db.collection("Filters").get()
        .then(allFilters => {
            allFilters.forEach(doc => {
                console.log(doc.data().code);
                var filterName = doc.data().filterName; //gets the name field
                var filterCode = doc.data().code; //gets the unique ID field


                let testFilterButton = filterOptionsTemplate.content.cloneNode(true);
                testFilterButton.querySelector(".filter_button").innerHTML = filterName;
                testFilterButton.querySelector('.filter_button').onclick = () => button_pressed(filterCode, filterName);
                filterOptionsTab.appendChild(testFilterButton);


            })

        })
}

displayFilters();

// Function to display the current filter that is selected
function displaySelected(filterName) {
    $(".selected_filter_button").remove();

    let filterSelectedTemplate = document.getElementById("selectedOptionsTemplate");
    let filterSelectedTab = document.getElementById("selected_filters");

    let selectFilterButton = filterSelectedTemplate.content.cloneNode(true);
    selectFilterButton.querySelector(".selected_filter_button").innerHTML = filterName;
    filterSelectedTab.appendChild(selectFilterButton)

}

// Function that decides what to do if a button is pressed
function button_pressed(filterCode, filterName) {
    console.log("button is pressed");

    // Functions to display the chosen filter button and display the restaurants that got filtered
    displaySelected(filterName);
    displayRestaurants(filterCode);
}

// Displays all the restaurant cards
function displayAllRestaurants(){
    let RestaurantCard = document.getElementById("RestaurantCard");
    let RestaurantCardGroup = document.getElementById("restaurant_suggestions");
    $("#restaurant_suggestions").empty();

        db.collection("restaurant").get()
        .then(allRestaurants => {
            allRestaurants.forEach(doc => {
                var restaurantName = doc.data().name;
                console.log(restaurantName);

                var RestaurantID = doc.data().id;
                var RestaurantPrice = doc.data().price;
                var RestaurantDescription = doc.data().description;

                let newRestaurantCard = RestaurantCard.content.cloneNode(true);
                newRestaurantCard.querySelector(".card-title").innerHTML = restaurantName;
                newRestaurantCard.querySelector(".price").innerHTML = RestaurantPrice;
                newRestaurantCard.querySelector(".card-text").innerHTML = RestaurantDescription;

                newRestaurantCard.querySelector(
                    "img"
                ).src = `./images/${RestaurantID}.jpg`;

                RestaurantCardGroup.appendChild(newRestaurantCard);

})
        })
    }

    displayAllRestaurants();

// Displays the restaurants that match the current selected filter
function displayRestaurants(filterCode) {
    let RestaurantCard = document.getElementById("RestaurantCard");
    let RestaurantCardGroup = document.getElementById("restaurant_suggestions");
    $("#restaurant_suggestions").empty();

    db.collection("restaurant").where("filter", "==", filterCode)
        .get()
        .then(queryFilter => {
            //see how many results you have got from the query
            size = queryFilter.size;
            console.log(size);
            // get the documents of query
            restaurants = queryFilter.docs;

            for (i = 0; i < size; i++) {
                var restaurantName = restaurants[i].data().name;

                var RestaurantID = restaurants[i].data().id;
                var RestaurantPrice = restaurants[i].data().price;
                var RestaurantDescription = restaurants[i].data().description;

                let newRestaurantCard = RestaurantCard.content.cloneNode(true);
                newRestaurantCard.querySelector(".card-title").innerHTML = restaurantName;
                newRestaurantCard.querySelector(".price").innerHTML = RestaurantPrice;
                newRestaurantCard.querySelector(".card-text").innerHTML = RestaurantDescription;

                newRestaurantCard.querySelector(
                    "img"
                ).src = `./images/${RestaurantID}.jpg`;

                RestaurantCardGroup.appendChild(newRestaurantCard);
            }
        })
    
}

// What happens if the button in the selected filters box is pressed
// The button removes itself and populates the restaurant suggestions box with all restaurant cards
function selectedFilterButton() {
    $("#restaurant_suggestions").empty();
    $(this).remove();
    displayAllRestaurants();
}

function setup() {
    console.log("Start Setup");
    $("body").on("click", ".selected_filter_button", selectedFilterButton);

}

jQuery(document).ready(setup);