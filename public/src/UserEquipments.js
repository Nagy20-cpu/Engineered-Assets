$(document).ready(function () {
  $('#searchBtn').click(function () {
    const searchTerm = $('#searchInput').val().toLowerCase();
    $('#equipmentTable .col-md-4').filter(function () {
        const cardText = $(this).text().toLowerCase();
        $(this).toggle(cardText.indexOf(searchTerm) > -1);
    });
});    
$(document).on('click', '.addToCart', function () {
  var equipmentID = $(this).data('id'); 

  var quantity = prompt("Enter the quantity you want to add:", "1");
  console.log("equipmentID:",equipmentID,"/","quantity",quantity);

  if (quantity !== null && quantity > 0) {
      $.ajax({
          type: "POST",
          url: '/api/v1/cart/new',
          contentType: 'application/json',
          data: JSON.stringify({ equipmentID, quantity }), 
          success: function (data) {
              $('#cartCount').text(data.cartCount); 
              alert("Equipment added to cart!");
          },
          error: function (error) {
              console.error("Error adding to cart:", error.responseText);
              alert("Error adding equipment to cart.");
          }
      });
  } else {
      alert("Invalid quantity. Please try again.");
  }
});
$('#equipmentTable').on('click', '.rateEquipment', function () {
      var equipmentID = $(this).data("id");
      $('#equipmentID').val(equipmentID); 
      $('#ratingModal').modal('show');
});
$('#ratingForm').submit(function (e) {
      e.preventDefault();  // Prevent form from submitting the traditional way
      
      var equipmentID = $('#equipmentID').val();
      var comment = $('#comment').val();
      var score = $('#score').val();
      var userID = 2;

      $('button[type="submit"]').prop('disabled', true);

      $.ajax({
          type: "POST",
          url: '/api/v1/rating/new', 
          data: JSON.stringify({ equipmentID, comment, score, userID }),
          contentType: 'application/json',
          success: function (data) {
              alert('Rating added successfully!');
              $('#ratingModal').modal('hide'); 
              $('button[type="submit"]').prop('disabled', false); 
          },
          error: function (error) {
              alert('Error adding rating.');
              $('button[type="submit"]').prop('disabled', false); 
          }
      });
});
$('.viewRatings').on('click', function () {
    const equipmentID = $(this).data('id');
    $('#ratingsContent').html('<p>Loading ratings...</p>');

    $.ajax({
        url: '/api/v1/rating/' + equipmentID, 
        type: 'GET',
        success: function (response) {
            console.log(response); 
            $('#ratingsModalBody').html(response.map(rating => 
                `<div>
                    <p>User ID: ${rating.userID}</p>
                    <p>Comment: ${rating.comment}</p>
                    <p>Score: ${rating.score}</p>
                </div>`
            ).join(''));
        },
        error: function (error) {
            console.error('Error fetching ratings:', error);
            $('#ratingsModalBody').html('<p>Failed to load ratings. Please try again.</p>');
        }
    });
});
$.ajax({
        url: '/Categories',  // Backend endpoint for fetching categories
        method: 'GET',
        success: function (data) {
            data.forEach(category => {
                $('#categoryFilter').append(`<option value="${category.categoryID}">${category.categoryName}</option>`);
            });
        }
});
$.ajax({
        url: '/Suppliers',  // Backend endpoint for fetching suppliers
        method: 'GET',
        success: function (data) {
            data.forEach(Suppliers => {
                $('#SuppliersFilter').append(`<option value="${Suppliers.supplierID}">${Suppliers.supplierName}</option>`);
            });
        }
});
$('#categoryFilter, #SuppliersFilter').change(function () {
        let supplierID = $('#SuppliersFilter').val();
        let categoryID = $('#categoryFilter').val();

        $.ajax({
            url: '/filterEquipments',
            method: 'GET',
            data: {
                supplierID,
                categoryID
            },
            success: function (data) {
                $('#equipmentTable').html('');

                data.forEach(equipment => {
                    $('#equipmentTable').append(`
                        <div class="col-md-4 mb-4">
                            <div class="card h-100">
                                <img src="${equipment.equipmentImg}" class="card-img-top" alt="Image" style="height: 200px; object-fit: cover;">
                                <div class="card-body">
                                    <h5 class="card-title">${equipment.equipmentName}</h5>
                                    <p><strong>Model:</strong> ${equipment.modelNumber}</p>
                                    <p><strong>Rating:</strong> ${equipment.rating} / 5</p>
                                    <p><strong>Quantity:</strong> ${equipment.quantity}</p>
                                    <p><strong>Price:</strong> $${equipment.price}</p>
                                    <p><strong>Location:</strong> ${equipment.location}</p>
                                    <p><strong>Status:</strong> ${equipment.status}</p>
                                    <p><strong>Category:</strong> ${equipment.categoryID}</p>
                                    <p><strong>Supplier:</strong> ${equipment.supplierID}</p>
                                </div>
                                <div class="card-footer text-center">
                                    <button data-id="${equipment.equipmentID}" class="btn btn-info viewRatings" data-toggle="modal" data-target="#ratingsModal">View Ratings</button>
                                    <button data-id="${equipment.equipmentID}" class="btn btn-success addToCart" type="button">Add to Cart</button>
                                    <button data-id="${equipment.equipmentID}" class="btn btn-warning rateEquipment" data-toggle="modal" data-target="#rateModal" type="button">Rate</button>
                                </div>
                            </div>
                        </div>
                    `);
                });
            }
        });
});
$(document).on('click', '.viewDetails', function () {
    var equipmentID = $(this).data('id');
    
    $.ajax({
        url: '/api/v1/equipment/view', 
        type: 'GET',
        data: { equipmentID: equipmentID },  
        success: function(response) {
            $('#detailsImgTag').attr('src', response.equipmentImg);
            $('#detailsName').text(response.equipmentName);
            $('#detailsModel').text(response.modelNumber);
            $('#detailsRating').text(response.rating);
            $('#detailsQuantity').text(response.quantity);
            $('#detailsPrice').text(response.price);
            $('#detailsLocation').text(response.location);
            $('#detailsStatus').text(response.status);
            $('#detailsCategory').text(response.categoryID);
            $('#detailsSupplier').text(response.supplierID);
        },
        error: function(error) {
            console.log('Error fetching equipment details:', error);
        }
    });
});


});
            