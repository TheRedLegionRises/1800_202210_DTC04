function write_filters() {
    var filtersRef = db.collection("Filters");

    filtersRef.add({
        code: "SUSHI",
        filterName: "Sushi",
        cuisineType: "Asian",
        selected: 0,

    });

    filtersRef.add({
        code: "HMBRGR",
        filterName: "Hamburgers",
        cuisineType: "Western",
        selected: 0,

    });

    filtersRef.add({
        code: "BBT",
        filterName: "Bubble Tea",
        cuisineType: "Asian",
        selected: 0,

    });


}

function displayFilters() {
    let filterOptionsTemplate = document.getElementById("filterOptionsTemplate");
    let filterOptionsTab = document.getElementById("filter_options_tab");

    db.collection("Filters").get()
        .then(allFilters => {
            allFilters.forEach(doc => {
                console.log(doc.data().code);
                var filterName = doc.data().filterName; //gets the name field
                var filterCode = doc.data().code; //gets the unique ID field
                // console.log(test)
                // var test1 = !test;


                //console.log(filterCode)
                // var hikeLength = doc.data().length;


                let testFilterButton = filterOptionsTemplate.content.cloneNode(true);
                testFilterButton.querySelector(".filter_button").innerHTML = filterName;
                //testFilterButton.querySelector('a').onclick = () => setFilterData(filterCode);
                //this is the line added so that it makes the icon clickable and call another function
                testFilterButton.querySelector('.filter_button').onclick = () => addTimesUsed(filterCode, filterName);
                //testFilterButton.querySelector(".filter_button").onclick = () => displaySelected(filterName);
                filterOptionsTab.appendChild(testFilterButton);


            })

        })
}

displayFilters();

function displaySelected(filterName) {
    $(".selected_filter_button").remove();

    let filterSelectedTemplate = document.getElementById("selectedOptionsTemplate");
    let filterSelectedTab = document.getElementById("selected_filters");

    // db.collection("Filters").get()
    // .then(allFilters => {
    //     allFilters.forEach(doc => {

    //         let selectFilterButton = filterSelectedTemplate.content.cloneNode(true);
    //         selectFilterButton.querySelector(".selected_filter_button").innerHTML = filterName;
    //         //selectFilterButton.querySelector(".filter_button").onclick = () =>
    //         filterSelectedTab.appendChild(selectFilterButton)

    //     })
    // })

    let selectFilterButton = filterSelectedTemplate.content.cloneNode(true);
    selectFilterButton.querySelector(".selected_filter_button").innerHTML = filterName;
    //selectFilterButton.querySelector(".filter_button").onclick = () =>
    filterSelectedTab.appendChild(selectFilterButton)

}

// Not really sure what this is used for yet, prob gonna add some stuff later
function addTimesUsed(filterCode, filterName) {
    console.log("inside");

    // Asks database hey, is there any in the "Filters" document that as a field "code" that matches the value filterCode
    // Gets it, and then put all the results into queryFilter
    // Filters = queryFilter.docs makes list(?) of docs
    // Filters[0] returns first doc that matches the requirement, Filters[1] for second, etc etc.
    db.collection("Filters").where("code", "==", filterCode)
        .get()
        .then(queryFilter => {
            //see how many results you have got from the query
            size = queryFilter.size;
            // get the documents of query
            Filters = queryFilter.docs;

            // test
            if (size == 1) {
                id = Filters[0].id;
                var select = Filters[0].data().selected;

                // Not too sure, had an idea but then went nowhere
                if (select == 0) {
                    select += 1;
                }


                else {
                    select -= 1;
                }

                db.collection("Filters").doc(id).update({
                    //Firebase documentation has this method for incrementation.
                    // scores: firebase.firestore.FieldValue.increment(1)
                    //timesUsed: firebase.firestore.FieldValue.increment(1)
                    selected: select

                })

            } else {
                console.log("Query has more than one data")
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    // Functions to display the chosen filter button and display the restaurants that got filtered
    displaySelected(filterName);
    displayRestaurants(filterCode);
}

function displayRestaurants(filterCode) {
    let RestaurantCard = document.getElementById("RestaurantCard");
    let RestaurantCardGroup = document.getElementById("restaurant_suggestions");
    //$(".restaurantNames").remove();
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
                //console.log(restaurantName);
                //$("#restaurant_suggestions").append("<p class='restaurantNames'>" + restaurantName + "</p>");

                var RestaurantID = restaurants[i].data().id;
                var RestaurantPrice = restaurants[i].data().price;
                var RestaurantDescription = restaurants[i].data().description;

                let newRestaurantCard = RestaurantCard.content.cloneNode(true);
                newRestaurantCard.querySelector(".card-title").innerHTML = restaurantName;
                newRestaurantCard.querySelector(".price").innerHTML = RestaurantPrice;
                newRestaurantCard.querySelector(".card-text").innerHTML = RestaurantDescription;
                //newRestaurantCard.querySelector("a").onclick = () => setRestuarantData(RestaurantID);

                newRestaurantCard.querySelector(
                    "img"
                ).src = `./images/${RestaurantID}.jpg`;

                RestaurantCardGroup.appendChild(newRestaurantCard);
            }
        })
}

function hide() {
    $(this).remove();
}

function setup() {
    console.log("Start Setup");
    $("body").on("click", ".selected_filter_button", hide);

}

jQuery(document).ready(setup);