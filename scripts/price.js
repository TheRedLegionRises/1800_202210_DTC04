// CHECK IF USER IS LOGGED IN THEN FUN FUNCTIONS

var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        read_display_Quote();
        insertName();
        populateCardsDynamically();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});


function sort_by_price_restaurant() {

    let RestaurantCard = document.getElementById("RestaurantCard");
    let RestaurantCardGroup = document.getElementById("RestaurantCardGroup");

    db.collection("restaurant")
    .orderBy("price")
    .limit(10)
    .get()
        .then(AllRestaurants => {
            AllRestaurants.forEach(doc => {
                var RestaurantName = doc.data().name;
                var RestaurantID = doc.data().id;
                var RestaurantPrice = doc.data().price;

                let newRestaurantCard = RestaurantCard.content.cloneNode(true);
                newRestaurantCard.querySelector('.card-title').innerHTML = RestaurantName;
                newRestaurantCard.querySelector('.price').innerHTML = RestaurantPrice;
                
                newRestaurantCard.querySelector('.restaurant-id').innerHTML = RestaurantID;
                


                RestaurantCardGroup.appendChild(newRestaurantCard);

            })
        })
}

sort_by_price_restaurant();

