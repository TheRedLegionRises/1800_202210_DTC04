
function displaySearchResults() {
    testSearch = document.getElementById("mySearch").value;
    if (testSearch != null && testSearch != "") {
        db.collection("restaurant").where("search", "==", testSearch)
        .get() 
            .then(searchResult => { 
                size = searchResult.size;
                console.log("search");
                populate_restaurants(searchResult);
            })
    } else {
        db.collection("restaurant").get() 
            .then(allrestaurant => {
                populate_restaurants(allrestaurant);
            })
    }
}

displaySearchResults()

function populate_restaurants(Docs) {
    let RestaurantCard = document.getElementById("RestaurantCard");
    let RestaurantCardGroup = document.getElementById("RestaurantCardGroup");

    //console.log(Docs.size);
    while (RestaurantCardGroup.firstChild) {
        RestaurantCardGroup.removeChild(RestaurantCardGroup.firstChild)
    }

    Docs.forEach(doc => { //iterate through all documents in the Hikes collection
        var RestaurantName = doc.data().name;
        var RestaurantID = doc.data().id;
        var RestaurantPrice = doc.data().price;
        var RestaurantDescription = doc.data().description;

        let newRestaurantCard = RestaurantCard.content.cloneNode(true);
        newRestaurantCard.querySelector(".card-title").innerHTML = RestaurantName;
        newRestaurantCard.querySelector(".price").innerHTML = RestaurantPrice;
        newRestaurantCard.querySelector(".card-text").innerHTML = RestaurantDescription;
        newRestaurantCard.querySelector("a").onclick = () => setRestuarantData(RestaurantID);

        newRestaurantCard.querySelector("img").src = `./images/${RestaurantID}.jpg`;
        RestaurantCardGroup.appendChild(newRestaurantCard);

    })
}

function move_user_main(){
    window.location.href = "main.html"
    displaySearchResults()
}



populate_restaurants();
