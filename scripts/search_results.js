//gets the input from the search bar and redirects to the search_results.html page
function gotoSearch(){
    testSearch = document.getElementById("mySearch").value;
    window.location.href="search_results.html?search="+testSearch;
}


//searchs for results that are given from the user input in the search bar.
function displayResults() {
    let params = new URL(window.location.href);
    let testSearch = params.searchParams.get("search");               //parse "id"
    document.getElementById("search-goes-here").innerHTML = testSearch;

    if (testSearch != null && testSearch != "") {
        db.collection("restaurant").where("name", "==", testSearch)
            .get()
            .then(searchResult => {
                size = searchResult.size;
                console.log("search");
                populate_restaurants_search(searchResult);
            })
    } else {
        db.collection("restaurant").get()
            .then(allHikes => {
                populate_restaurants_search(allHikes);
            })
    }
}

displayResults();

//Populates the carsds dynamically onto the page using the search results input.
function populate_restaurants_search(Docs) {
    let RestaurantCardSearch = document.getElementById("RestaurantCardSearch");
    let Restaurant_Seach_CardGroup = document.getElementById("Restaurant_Seach_CardGroup");

    //console.log(Docs.size);
    while (Restaurant_Seach_CardGroup.firstChild) {
        Restaurant_Seach_CardGroup.removeChild(Restaurant_Seach_CardGroup.firstChild)
    }

    Docs.forEach(doc => { //iterate through all documents in the Hikes collection
        var RestaurantName = doc.data().name;
        var RestaurantID = doc.data().id;
        var RestaurantPrice = doc.data().price;
        var RestaurantDescription = doc.data().description;

        let newRestaurantCard = RestaurantCardSearch.content.cloneNode(true);
        newRestaurantCard.querySelector(".card-title").innerHTML = RestaurantName;
        newRestaurantCard.querySelector(".price").innerHTML = RestaurantPrice;
        newRestaurantCard.querySelector(".card-text").innerHTML = RestaurantDescription;
        newRestaurantCard.querySelector("a").onclick = () => setRestuarantData(RestaurantID);

        newRestaurantCard.querySelector("img").src = `./images/${RestaurantID}.jpg`;
        Restaurant_Seach_CardGroup.appendChild(newRestaurantCard);

    })
}




populate_restaurants_search();
