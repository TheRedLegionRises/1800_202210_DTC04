function write_filters() {
    var filtersRef = db.collection("Filters");

    filtersRef.add({
        code: "KOREN",
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
                //displaySearchFilter(searchResult);
            })
    } else {
        displayFilters();
        displayAllRestaurants();
    }

}

function displaySearchFilter(filterName, filterCode){
    $("#filtersShown").empty();
    let filterOptionsTemplate = document.getElementById("filterOptionsTemplate");
    let filterOptionsTab = document.getElementById("filtersShown");

    let testFilterButton = filterOptionsTemplate.content.cloneNode(true);
    testFilterButton.querySelector(".filter_button").innerHTML = filterName;
    testFilterButton.querySelector('.filter_button').onclick = () => button_pressed(filterCode, filterName);
    filterOptionsTab.appendChild(testFilterButton);



}

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

function displaySelected(filterName) {
    $(".selected_filter_button").remove();

    let filterSelectedTemplate = document.getElementById("selectedOptionsTemplate");
    let filterSelectedTab = document.getElementById("selected_filters");

    let selectFilterButton = filterSelectedTemplate.content.cloneNode(true);
    selectFilterButton.querySelector(".selected_filter_button").innerHTML = filterName;
    filterSelectedTab.appendChild(selectFilterButton)

}

// Not really sure what this is used for yet, prob gonna add some stuff later
function button_pressed(filterCode, filterName) {
    console.log("inside");

    // Asks database hey, is there any in the "Filters" document that as a field "code" that matches the value filterCode
    // Gets it, and then put all the results into queryFilter
    // Filters = queryFilter.docs makes list(?) of docs
    // Filters[0] returns first doc that matches the requirement, Filters[1] for second, etc etc.
    // db.collection("Filters").where("code", "==", filterCode)
    //     .get()
    //     .then(queryFilter => {
    //         //see how many results you have got from the query
    //         size = queryFilter.size;
    //         // get the documents of query
    //         Filters = queryFilter.docs;

    //         // test
    //         if (size == 1) {
    //             id = Filters[0].id;
    //             var select = Filters[0].data().selected;

    //             db.collection("Filters").doc(id).update({
    //                 //Firebase documentation has this method for incrementation.
    //                 // scores: firebase.firestore.FieldValue.increment(1)
    //                 //timesUsed: firebase.firestore.FieldValue.increment(1)
    //                 selected: select

    //             })

    //         } else {
    //             console.log("Query has more than one data")
    //         }
    //     })
    //     .catch((error) => {
    //         console.log("Error getting documents: ", error);
    //     });

    // Functions to display the chosen filter button and display the restaurants that got filtered
    displaySelected(filterName);

    displayRestaurants(filterCode);
}

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