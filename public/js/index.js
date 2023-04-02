$("#add_user").submit(function (event) {
    alert("Data Inserted Successfully!");
})

$("#update_item").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })


    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Data Updated Successfully!");
    })

})

// if (window.location.pathname == "/foodAfter") {
//     $ondelete = $(".table tbody td a.delete");
//     $ondelete.click(function () {
//         var id = $(this).attr("data-id")

//         var request = {
//             "url": `http://localhost:3000/api/users/${id}`,
//             "method": "DELETE"
//         }

//         if (confirm("Have you have contact with the specific Donor?")) {
//             $.ajax(request).done(function (response) {
//                 alert("Request Accepted Successfully!");
//                 location.reload();
//             })
//         }

//     })
// }

// function edit(val) {
//     window.location.href = "/update_foodDonation?" + val;
// }

// $("table").on("input", "td:nth-child(4) input", function() {
//     $(this).closest("td").find(".icon").removeClass("fa-regular fa-square fa-lg").addClass("fa-light fa-square-check");
// });


function showFirstFiveRows() {
    var table = document.getElementById("myTable");
    var rows = table.getElementsByTagName("tr");
    for (var i = 5; i < rows.length; i++) {
        rows[i].style.display = "none";
    }
    updateTotalListedFood();
}

function toggleRows() {
    console.log("toggleRows called");
    var table = document.getElementById("myTable");
    var rows = table.getElementsByTagName("tr");
    var showButton = document.getElementById("showButton");

    if (showButton.innerText === "Show All") {
        // Show all rows
        for (var i = 0; i < rows.length; i++) {
            rows[i].style.display = "";
        }
        showButton.innerText = "Show Less";
    } else {
        // Show only first 5 rows
        for (var i = 0; i < rows.length; i++) {
            if (i < 5) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
        showButton.innerText = "Show All";
    }
}

// Attach click event listener to the button
document.getElementById("showButton").addEventListener("click", toggleRows);



var viewAllButton = document.getElementById("viewAllButton");
viewAllButton.addEventListener("click", showAllRows);

function updateTotalListedFood() {
    var table = document.getElementById("myTable");
    var rowCount = table.rows.length - 1; // subtract 1 to exclude the header row
    var totalListedFoodElement = document.getElementById("total-listed-food");
    totalListedFoodElement.innerHTML = rowCount;
}

