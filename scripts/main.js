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
        newRestaurantCard.querySelector("a").onclick = () =>
          setRestuarantData(RestaurantID);
        
        // newRestaurantCard.querySelector(".show").onclick = () => showDescription(RestaurantDescription);

        // newRestaurantCard.querySelector(".show").onclick = () => myFunction();

        newRestaurantCard.querySelector(
          "img"
        ).src = `./images/${RestaurantID}.jpg`;

        RestaurantCardGroup.appendChild(newRestaurantCard);
      });
    });
  console.log("populate_restaurants() ran successfully");
}

function setRestuarantData(id) {
  localStorage.setItem("RestaurantID", id);
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
          newRestaurantCard.querySelector("a").onclick = () =>
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

function writeRestaurants() {
  //define a variable for the collection you want to create in Firestore to populate data
  var restaurantRef = db.collection("restaurant");

  restaurantRef.add({
    id: "r_05",
    name: "Kosoo Korean Restaurant Chicken & BBQ",
    city: "Vancouver",
    province: "BC",
    review: "4.2/5",
    price: "$$",
    eater_type: ["Omnivore"],
    cuisine_type: ["Korean"],
    filter: "KOREAN",
    search: "korean",
    coordinates: [49.285124251738765, -123.12587210175681],
    url: "https://kosoo.ca/",
    description:
      "Streamlined Korean establishment serving fried chicken, pork specialties & BBQ dishes, plus soups.",
  });
  restaurantRef.add({
    id: "r_06",
    name: "CinCin Ristorante + Bar",
    city: "Vancouver",
    province: "BC",
    review: "4.5/5",
    price: "$$$",
    eater_type: ["Omnivore"],
    cuisine_type: ["Italian"],
    filter: "ITALIAN",
    search: "italian",
    coordinates: [49.28537995112188, -123.12616055942722],
    url: "https://cincin.net/",
    description:
      "Longtime eatery offering upscale Italian dishes, handmade pastas & choice wines in a warm room.",
  });
  restaurantRef.add({
    id: "r_07",
    name: "Vegan Cave Cafe",
    city: "Vancouver",
    province: "BC",
    review: "4.7/5",
    price: "$$",
    eater_type: ["Omnivore", "Vegan", "Vegetarian", "Low Carb"],
    cuisine_type: ["Italian"],
    filter: "ITALIAN",
    search: "italian",
    coordinates: [49.28537995112188, -123.12616055942722],
    url: "https://vegancavevancouver.com/",
    description:
      "Funky cafe serving vegan pizza, salads, wraps & desserts from a counter for casual dining or to-go.",
  });
}

// writeRestaurants();
user_preference();
