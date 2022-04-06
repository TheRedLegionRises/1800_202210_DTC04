function sayHello() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // Do something for the user here.
      console.log(user.uid);
      db.collection("users")
        .doc(user.uid)
        .get()
        .then(function (doc) {
          var n = doc.data().name;
          console.log(n);
          //$("#username").text(n);
          document.getElementById("username").innerText = n;
        });
    } else {
      // No user is signed in.
    }
  });
}

// SEARCH BAR
const basicAutocomplete = document.querySelector("#basic");
const data = ["Museum", "Party", "Restaurant", "Concert", "Architecture"];
const dataFilter = (value) => {
  return data.filter((item) => {
    return item.toLowerCase().startsWith(value.toLowerCase());
  });
};

const locationAutocomplete = document.querySelector("#location");
const dataL = ["Madrid", "Rome", "Lisbon", "Paris", "London"];
const dataFilterL = (value) => {
  return dataL.filter((item) => {
    return item.toLowerCase().startsWith(value.toLowerCase());
  });
};

//GRAB USER'S NAME
function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid); // get uid of user who is logged in
      currentUser = db.collection("users").doc(user.uid); // will go to firestore and go to the document of the user
      currentUser.get().then((userDoc) => {
        //get user name
        var user_name = userDoc.data().name;
        console.log(user_name);
        document.getElementById("display-user-name").innerHTML = user_name;
      });
    }
  });
}
insertName();

function writeRestaurants() {
  //define a variable for the collection you want to create in Firestore to populate data
  var restaurantRef = db.collection("restaurant");

  restaurantRef.add({
    id: "r_00",
    name: "McDonald's",
    city: "Vancouver",
    province: "BC",
    review: "4.5/5",
    price: "$",
    description:
      "McDonald's is an American multinational fast food corporation, founded in 1940",
  });
  restaurantRef.add({
    id: "r_01",
    name: "A&W",
    city: "Vancouver",
    province: "BC",
    review: "4.5/5",
    price: "$$",
    description:
      "A&W Restaurants is an American chain of fast-food restaurants distinguished by its burgers, draft root beer and root beer floats.",
  });
  restaurantRef.add({
    id: "r_02",
    name: "Burger King",
    city: "Vancouver",
    province: "BC",
    review: "3/5",
    price: "$",
    description:
      "Burger King is an American multinational chain of hamburger fast food restaurants founded in 1953.",
  });
}
// USE LATER

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
}

populate_restaurants();

function setRestuarantData(id) {
  localStorage.setItem("RestaurantID", id);
}

function showDescription(restaurantDescription){
  console.log("hi");
  console.log(restaurantDescription);

  document.getElementById("text").innerHTML = restaurantDescription

  // let RestaurantCard = document.getElementById("RestaurantCard");

  // let newRestaurantCard = RestaurantCard.content.cloneNode(true);


  // newRestaurantCard.querySelector(".card-text").innerHTML =
  // restaurantDescription;


  // restaurantText = document.getElementByID
}

function myFunction() {
  var x = document.getElementById("text");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function setup(){
  console.log("Setup")
  // $("body").on("click", ".show", showDescription);
  $(".card-text").hide();
}


$(document).ready(setup);