var currentUser

// POPULATE USER INFO FUNCTION
function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userCity = userDoc.data().city;
                    var userAboutMe = userDoc.data().aboutme;
                    var userBirthday = userDoc.data().birthday;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userAboutMe != null) {
                        document.getElementById("aboutMeInput").value = userAboutMe;
                    }
                    if (userBirthday != null) {
                        document.getElementById("birthdayInput").value = userBirthday;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}


// EDIT USER INFO FUNCTION
function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}


// SAVE USER INFO FUNCTION
function saveUserInfo() {
    userName = document.getElementById('nameInput').value;
    userCity = document.getElementById('cityInput').value;
    userAboutMe = document.getElementById('aboutMeInput').value;
    userBirthday = document.getElementById('birthdayInput').value;

    currentUser.update({
            name: userName,
            city: userCity,
            aboutme: userAboutMe,
            birthday: userBirthday
        })
        .then(() => {
            console.log("Document successfully updated!");
        })

    document.getElementById('personalInfoFields').disabled = true;
}

//CALL POPULATEINFO FUNCTION
populateInfo();