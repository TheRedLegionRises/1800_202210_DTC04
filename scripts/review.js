let RestaurantID = localStorage.getItem("RestaurantID");

db.collection("restaurant")
  .where("id", "==", RestaurantID)
  .get()
  .then((queryRestaurant) => {
    //see how many results you have got from the query
    size = queryRestaurant.size;
    // get the documents of query
    restaurant = queryRestaurant.docs;

    // We want to have one document per , so if the the result of
    //the query is more than one, we can check it right now and clean the DB if needed.
    if ((size = 1)) {
      var thisRestaurant = restaurant[0].data();
      restaurantName = thisRestaurant.name;
      console.log(restaurantName);
      document.getElementById("RestaurantName").innerHTML = restaurantName;
    } else {
      console.log("Query has more than one data");
    }
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

function writeReview() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      currentUser.get().then((userDoc) => {
        var userEmail = userDoc.data().email;
        var currentRestaurant = db.collection("reviews");
        currentRestaurant
          .add({
            Code: RestaurantID,
            UserID: userID,
            UserEmail: userEmail,
            Title: document.getElementById("title").value,
            Level: document.getElementById("level").value,
            Price: document.getElementById("price").value,
            Description: document.getElementById("description").value,
          })
          .then(() => {
            window.location.href = "thanks.html";
          });
      });
    }
  });
}
