// Store user preference as global variable

var eater_type;
var cuisine_type;

// Grab user preferences and populate main page
function user_preference() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then((doc) => {
        eater_type = doc.data().eater_type;
        cuisine_type = doc.data().cuisine_type;
        console.log("GET USER PREF " + cuisine_type + eater_type);
        if (Array.isArray(eater_type) && eater_type.length) {
          populate_preference_restaurants();
        } else {
          populate_restaurants();
        }
      });
    }
  });
}

// populate main.html with all restaurants
function populate_restaurants() {
  let RestaurantCard = document.getElementById("RestaurantCard");
  let RestaurantCardGroup = document.getElementById("RestaurantCardGroup");

  db.collection("restaurant")
    .get()
    .then((AllRestaurants) => {
      AllRestaurants.forEach((doc) => {
        var RestaurantName = doc.data().name;
        var RestaurantID = doc.data().id;
        var RestaurantPrice = doc.data().price;
        var RestaurantDescription = doc.data().description;

        let newRestaurantCard = RestaurantCard.content.cloneNode(true);
        newRestaurantCard.querySelector(".card-title").innerHTML =
          RestaurantName;
        newRestaurantCard.querySelector(".price").innerHTML = RestaurantPrice;

        newRestaurantCard.querySelector(".card-text").innerHTML =
          RestaurantDescription;

        // hides description first and sets ID of the description box to restaurantID
        newRestaurantCard.querySelector(".card-text").style.display = "none";
        newRestaurantCard
          .querySelector(".card-text")
          .setAttribute("id", `${RestaurantID}`);

        newRestaurantCard.querySelector("#review").onclick = () =>
          setRestuarantData(RestaurantID);

        //show or hides the description
        newRestaurantCard.querySelector(".show").onclick = () =>
          showDescription(RestaurantID);

        newRestaurantCard.querySelector(
          "img"
        ).src = `./images/${RestaurantID}.jpg`;

        RestaurantCardGroup.appendChild(newRestaurantCard);
      });
    });
  console.log("populate_restaurants() ran successfully");
}

// populate restaurant cards with preference
function populate_preference_restaurants() {
  let RestaurantCard = document.getElementById("RestaurantCard");
  let RestaurantCardGroup = document.getElementById("RestaurantCardGroup");
  db.collection("restaurant")
    .get()
    .then((AllRestaurants) => {
      AllRestaurants.forEach((doc) => {
        restaurant_eater_type = doc.data().eater_type;
        restaurant_cuisine_type = doc.data().cuisine_type;
        if (
          eater_type.some((eater) => restaurant_eater_type.includes(eater)) &&
          cuisine_type.some((cuisine) =>
            restaurant_cuisine_type.includes(cuisine)
          )
        ) {
          var RestaurantName = doc.data().name;
          var RestaurantID = doc.data().id;
          var RestaurantPrice = doc.data().price;
          var RestaurantDescription = doc.data().description;
          let newRestaurantCard = RestaurantCard.content.cloneNode(true);
          newRestaurantCard.querySelector(".card-title").innerHTML =
            RestaurantName;
          newRestaurantCard.querySelector(".price").innerHTML = RestaurantPrice;
          newRestaurantCard.querySelector(".card-text").innerHTML =
            RestaurantDescription;

          // hides description first and sets ID of the description box to restaurantID
          newRestaurantCard.querySelector(".card-text").style.display = "none";
          newRestaurantCard
            .querySelector(".card-text")
            .setAttribute("id", `${RestaurantID}`);

          // shows/hides the description
          newRestaurantCard.querySelector(".show").onclick = () =>
            showDescription(RestaurantID);

          newRestaurantCard.querySelector("#review").onclick = () =>
            setRestuarantData(RestaurantID);
          newRestaurantCard.querySelector(
            "img"
          ).src = `./images/${RestaurantID}.jpg`;

          RestaurantCardGroup.appendChild(newRestaurantCard);
        }
      });
    });
  console.log("populate_preference_restaurants() ran successfully");
}

function showDescription(id) {
  var x = document.getElementById(`${id}`);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//adds data to the firebase in the restuarant collection
function writeRestaurants() {
  //define a variable for the collection you want to create in Firestore to populate data
  var restaurantRef = db.collection("restaurant");

  restaurantRef.add({
    id: "r_08",
    name: "Tasty Indian Bistro",
    city: "Vancouver",
    province: "BC",
    review: "4.3/5",
    price: "$$$",
    eater_type: ["Omnivore"],
    cuisine_type: ["Indian"],
    filter: "INDIAN",
    search: "indian",
    coordinates: [49.27480162744791, -123.12404513896051],
    url: "http://www.tastybistro.ca/",
    description:
      "Refined eatery offering Indian dishes & tandoori fare, plus patio seating & craft cocktails.",
  });
}

// writes restaurant's ID into local storage
function setRestuarantData(id) {
  localStorage.setItem("RestaurantID", id);
}

// writeRestaurants();
user_preference();
