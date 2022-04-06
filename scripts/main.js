// Store user preference as global variable

var eater_type;
var cuisine_type;

// Grab user preferences and populate main page
function user_preference() {
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          currentUser = db.collection("users").doc(user.uid)
          currentUser.get()
              .then((doc) => {
                  eater_type = doc.data().eater_type
                  cuisine_type = doc.data().cuisine_type
                  console.log("GET USER PREF " + cuisine_type + eater_type)
                  if (Array.isArray(eater_type) && eater_type.length) {
                    populate_preference_restaurants()
                  } else {
                    populate_restaurants()
                  }
              })
      }
  })
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
    price: "$$",
    description:
      "A&W Restaurants is an American chain of fast-food restaurants distinguished by its burgers, draft root beer and root beer floats.",
  });
  restaurantRef.add({
    id: "r_07",
    name: "Burger King",
    city: "Vancouver",
    province: "BC",
    review: "3/5",
    price: "$",
    description:
      "Burger King is an American multinational chain of hamburger fast food restaurants founded in 1953.",
  });
}

<<<<<<< HEAD
user_preference().then(
  console.log("OUTSIDE OF FUNCTIONS" + cuisine_type + eater_type)
);
=======
user_preference()
>>>>>>> b7a0eed784c1464b562377859e3d0b17946ef5e1
