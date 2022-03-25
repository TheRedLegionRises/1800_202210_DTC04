function sayHello() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here. 
            console.log(user.uid);
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    console.log(n);
                    //$("#username").text(n);
                    document.getElementById("username").innerText = n;
                })
        } else {
            // No user is signed in.
        }
    });
}


// SEARCH BAR
const basicAutocomplete = document.querySelector('#basic');
const data = ['Museum', 'Party', 'Restaurant', 'Concert', 'Architecture'];
const dataFilter = (value) => {
    return data.filter((item) => {
        return item.toLowerCase().startsWith(value.toLowerCase());
    });
};

// new mdb.Autocomplete(basicAutocomplete, {
//     filter: dataFilter
// });

const locationAutocomplete = document.querySelector('#location');
const dataL = ['Madrid', 'Rome', 'Lisbon', 'Paris', 'London'];
const dataFilterL = (value) => {
    return dataL.filter((item) => {
        return item.toLowerCase().startsWith(value.toLowerCase());
    });
};

// new mdb.Autocomplete(locationAutocomplete, {
//     filter: dataFilterL
// });
// SEARCH BAR

//GRAB USER'S NAME
function insertName(){
    // console.log("insertName() got called")
    // to check if user is logged in
    firebase.auth().onAuthStateChanged( user => {
        if (user){
            console.log(user.uid); // get uid of user who is logged in
            currentUser = db.collection("users").doc(user.uid); // will go to firestore and go to the document of the user
            currentUser.get().then(userDoc =>{
                //get user name
                var user_name = userDoc.data().name;
                console.log(user_name)
                document.getElementById("display-user-name").innerHTML = user_name;
            })
        }
    })
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
        description: "McDonald's is an American multinational fast food corporation, founded in 1940",
    });
    restaurantRef.add({
        id: "r_01",
        name: "A&W",
        city: "Vancouver",
        province: "BC",
        review: "4.5/5",
        price: "$$",
        description: "A&W Restaurants is an American chain of fast-food restaurants distinguished by its burgers, draft root beer and root beer floats.",
    });
    restaurantRef.add({
        id: "r_02",
        name: "Burger King",
        city: "Vancouver",
        province: "BC",
        review: "3/5",
        price: "$",
        description: "Burger King is an American multinational chain of hamburger fast food restaurants founded in 1953.",
    });
}


/* MAKE IT WORK LATER */
/* function populateCardsDynamically() {
    let restuarantCardTemplate = document.getElementById("restuarantCardTemplate");
    let restaurants_card_group = document.getElementById("restaurants_card_group");

    db.collection("restuarant")
    .orderBy("name") //NEW LINE;  what do you want to sort by?
    .limit(10) //NEW LINE:  how many do you want to get?
    .get()
    .then((allrestuarant) => {
      allrestuarant.forEach((doc) => {
        var restaurantName = doc.data().name; //gets the name field
        var restuarantID = doc.data().id;     //gets the unique ID field
        var restaurantPrice = doc.data().price //gets the unique Price field
        var restaurantRating = doc.data().review  //gets the unique Review field
        var restaurantDescription = doc.data().description  //gets the unique Description field
        let testrestuarantCard = restuarantCardTemplate.content.cloneNode(true);
        
        testrestuarantCard.querySelector(".card__title").innerHTML = restaurantName;
        testrestuarantCard.querySelector(".card__status").innerHTML = restaurantPrice;
        testrestuarantCard.querySelector(".card__star").innerHTML = restaurantRating;
        //testrestuarantCard.querySelector(".card__description").innerHTML = restaurantDescription;
        

        // testrestuarantCard.querySelector("card__title").innerHTML = hikeLength;
        testrestuarantCard.querySelector("img").src = `./images/${restuarantID}.jpg`;

        
        restaurants_card_group.appendChild(testrestuarantCard);
      });
    });
}
 */


// USE LATER

function populate_restaurants() {

    let RestaurantCard = document.getElementById("RestaurantCard");
    let RestaurantCardGroup = document.getElementById("RestaurantCardGroup");

    db.collection("restaurant")
    .get()
        .then(AllRestaurants => {
            AllRestaurants.forEach(doc => {
                var RestaurantName = doc.data().name;
                var RestaurantID = doc.data().id;
                var RestaurantPrice = doc.data().price;
                var RestaurantDescription = doc.data().description

                let newRestaurantCard = RestaurantCard.content.cloneNode(true);
                newRestaurantCard.querySelector('.card-title').innerHTML = RestaurantName;
                newRestaurantCard.querySelector('.price').innerHTML = RestaurantPrice;
                newRestaurantCard.querySelector('.card-text').innerHTML = RestaurantDescription;

                
                
                newRestaurantCard.querySelector("img").src = `./images/${RestaurantID}.jpg`;


                RestaurantCardGroup.appendChild(newRestaurantCard);

            })
        })
}



<<<<<<< Updated upstream
populate_restaurants()
=======
sort_by_restaurant()

function setRestuarantData(id) {
    localStorage.setItem("RestaurantID", id);
  }
  
>>>>>>> Stashed changes
