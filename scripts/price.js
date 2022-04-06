// CHECK IF USER IS LOGGED IN THEN FUN FUNCTIONS

var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});


function sort_by_price_low_to_high_restaurant() {

    $("#RestaurantCardGroup").empty();

    let RestaurantCard = document.getElementById("RestaurantCard");
    let RestaurantCardGroup = document.getElementById("RestaurantCardGroup");

    db.collection("restaurant")
    .orderBy("price")
    .limit(10)
    .get()
        .then(AllRestaurants => {
            AllRestaurants.forEach(doc => {
                var RestaurantName = doc.data().name
                var RestaurantID = doc.data().id
                var RestaurantPrice = doc.data().price
                var RestaurantDescription = doc.data().description

                let newRestaurantCard = RestaurantCard.content.cloneNode(true)
                newRestaurantCard.querySelector('.card-title').innerHTML = RestaurantName
                newRestaurantCard.querySelector('.price').innerHTML = RestaurantPrice
                newRestaurantCard.querySelector('.card-text').innerHTML = RestaurantDescription

                // hides description first and sets ID of the description box to restaurantID
                newRestaurantCard.querySelector(".card-text").style.display = "none";
                newRestaurantCard.querySelector(".card-text").setAttribute("id", `${RestaurantID}`);
                            
                // shows/hides the description
                newRestaurantCard.querySelector(".show").onclick = () => showDescription(RestaurantID);


                newRestaurantCard.querySelector("img").src = `./images/${RestaurantID}.jpg`
                RestaurantCardGroup.appendChild(newRestaurantCard)

            })
        })
}


function sort_by_price_high_to_low_restaurant() {

    $("#RestaurantCardGroup").empty();

    let RestaurantCard = document.getElementById("RestaurantCard");
    let RestaurantCardGroup = document.getElementById("RestaurantCardGroup");

    db.collection("restaurant")
    .orderBy("price", "desc")
    .limit(10)
    .get()
        .then(AllRestaurants => {
            AllRestaurants.forEach(doc => {
                var RestaurantName = doc.data().name;
                var RestaurantID = doc.data().id;
                var RestaurantPrice = doc.data().price;
                var RestaurantDescription = doc.data().description;

                let newRestaurantCard = RestaurantCard.content.cloneNode(true);
                newRestaurantCard.querySelector('.card-title').innerHTML = RestaurantName;
                newRestaurantCard.querySelector('.price').innerHTML = RestaurantPrice;
                newRestaurantCard.querySelector('.card-text').innerHTML = RestaurantDescription;
                // hides description first and sets ID of the description box to restaurantID
                newRestaurantCard.querySelector(".card-text").style.display = "none";
                newRestaurantCard.querySelector(".card-text").setAttribute("id", `${RestaurantID}`);
            
                // shows/hides the description
                newRestaurantCard.querySelector(".show").onclick = () => showDescription(RestaurantID);

                newRestaurantCard.querySelector("img").src = `./images/${RestaurantID}.jpg`;
                RestaurantCardGroup.appendChild(newRestaurantCard);

            })
        })
}

function showDescription(id){
    var x = document.getElementById(`${id}`);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
