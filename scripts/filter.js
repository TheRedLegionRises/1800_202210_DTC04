function write_filters(){
    var filtersRef = db.collection("Filters");

    filtersRef.add({
        code: "SUSHI",
        filterName: "Sushi",
        cuisineType: "Asian",

    });

    filtersRef.add({
        code: "HMBRGR",
        filterName: "Hamburgers",
        cuisineType:"Western",
    });

    filtersRef.add({
        code: "BBT",
        filterName: "Bubble Tea",
        cuisineType: "Asian",
    });

    
}

function displayFilters() {
    let filterOptionsTemplate = document.getElementById("filterOptionsTemplate");
    let filterOptionsTab = document.getElementById("filter_options_tab");
    
    db.collection("Filters").get()
        .then(allFilters => {
            allFilters.forEach(doc => {
                var filterName = doc.data().filterName; //gets the name field
                var filterCode = doc.data().code; //gets the unique ID field
                // var test = doc.data().selected; //gets the unique ID field
                // var test1 = !test;

                
                //console.log(filterCode)
                // var hikeLength = doc.data().length;


                let testFilterButton = filterOptionsTemplate.content.cloneNode(true);
                testFilterButton.querySelector(".filter_button").innerHTML = filterName;
                //testFilterButton.querySelector('a').onclick = () => setFilterData(filterCode);
                //this is the line added so that it makes the icon clickable and call another function
                testFilterButton.querySelector('.filter_button').onclick = () => addTimesUsed(filterCode);
                filterOptionsTab.appendChild(testFilterButton);

                
            })

        })
}
displayFilters();

// function display_frequent(){

//     var firstID = Null;
//     var secondID = Null;
//     var thirdID = Null;
//     var firstScore = Null;
//     var secondScore = Null;
//     var thirdScore = Null;

//     db.collection("Filters").get()
//     .then(mostScores =>{
//         mostScores.forEach(doc =>{
//             var filterID = doc.data().code;
//             var scoreAmount = doc.data().scores;

//             if (scoreAmount > firstScore){
//                 thirdID = secondID;
//                 secondID = firstID;
//                 firstID = filterID;

//                 thirdScore = secondScore;
//                 secondScore = firstScore;
//                 firstScore = scoreAmount;
//             }

//             else if (scoreAmount > secondScore){
//                 thirdID = secondID;
//                 secondID = filterID;

//                 thirdScore = secondScore;
//                 secondScore = scoreAmount;
//             }

//             else if (scoreAmount > thirdScore){
//                 thirdID = filterID;

//                 thirdScore = filterScore;
//             }            
//         })

//         let testFilterButton = filterOptionsTemplate.content.cloneNode(true);

//         testFilterButton.querySelector(".filter_button").innerHTML = filterName;
//         //testFilterButton.querySelector('a').onclick = () => setFilterData(filterCode);
//         //this is the line added so that it makes the icon clickable and call another function
//         testFilterButton.querySelector('.filter_button').onclick = () => addTimesUsed(filterCode);
//         filterOptionsTab.appendChild(testFilterButton);


//     })

//     collections.sort(mostFiltered.keyset());

// }

// display_frequent();

function addTimesUsed(filterCode, select) {  
    console.log("inside");
    console.log(select);

    db.collection("Filters").where("code", "==", filterCode)
    .get()
    .then(queryFilter => {
        //see how many results you have got from the query
        size = queryFilter.size;
        // get the documents of query
        Filters = queryFilter.docs;
        // test
        if (size = 1) {
            id = Filters[0].id;
            console.log(id);

            //update method will add to the specified field in database, if that field does not exist, it will create that.
            db.collection("Filters").doc(id).update({
                //Firebase documentation has this method for incrementation.
                // scores: firebase.firestore.FieldValue.increment(1)
                timesUsed: firebase.firestore.FieldValue.increment(1)

            })

        } else {
            console.log("Query has more than one data")
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

function setup(){
    console.log("Start Setup");
    //$(".filter_button").click(selectFilter);
    // $(".filter_button").click(add_filter);

}

jQuery(document).ready(setup);