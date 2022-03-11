let RestaurantID = localStorage.getItem("RestaurantID");

db.collection("restaurant")
  .where("id", "==", id)
  .get()
  .then((queryRestaurant) => {
    //see how many results you have got from the query
    size = queryRestaurant.size;
    // get the documents of query
    id = queryRestaurant.docs;

    // We want to have one document per hike, so if the the result of
    //the query is more than one, we can check it right now and clean the DB if needed.
    if (size == 1) {
      var thisRestaurant = id[0].data();
      name = thisRestaurant.name;
      document.getElementById("RestaurantName").innerHTML = name;
    } else {
      console.log("Query has more than one data");
    }
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

function writeReview() {
  console.log("in");
  let Title = document.getElementById("title").value;
  let Level = document.getElementById("level").value;
  let Price = document.getElementById("price").value;
  let Description = document.getElementById("description").value;
  console.log(Title, Level, Description);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        var userEmail = userDoc.data().email;
        db.collection("Reviews")
          .add({
            code: id,
            userID: userID,
            title: Title,
            level: Level,
            price: Price,
            description: Description,
          })
          .then(() => {
            window.location.href = "main.html";
          });
      });
    } else {
      // No user is signed in.
    }
  });
}
