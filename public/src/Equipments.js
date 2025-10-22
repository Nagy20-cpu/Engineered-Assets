$(document).ready(function () {

$('#searchBtn').click(function () {
        const searchTerm = $('#searchInput').val().toLowerCase();
        $('#equipmentTable tr').filter(function () {
            const rowText = $(this).text().toLowerCase();
            $(this).toggle(rowText.indexOf(searchTerm) > -1);
        });
});
$(document).on('click', '.remove', function () {
        const id = $(this).attr('id').split('-')[1]; 
        const row = $(this).closest('tr'); 
  
        const confirmDelete = confirm("Are you sure you want to delete this equipment?");
        if (confirmDelete) {
            $.ajax({
                type: "DELETE",
                url: `/api/v1/equipment/${id}`, 
                success: function (response) {
                    if (response.message === "Equipment deleted successfully.") {
                        alert("Equipment deleted successfully!");
                        row.remove(); 
                    } else {
                        alert("Error: " + response.message);
                    }
                },
                error: function (xhr, status, error) {
                    alert("Error deleting equipment: " + (xhr.responseText || error));
                }
            });
        }
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
$(document).on('click', '.editButton', function() {
    const equipmentID = $(this).data('id');
    
    const quantity = prompt('Enter new quantity:');
    const location = prompt('Enter new location:');
    const price = prompt('Enter new price:');
    
    const equipmentObj = {
        quantity: quantity,
        location: location,
        price: price
    };

    $.ajax({
        type: "PUT",
        url: `/api/v1/equipment/${equipmentID}`,
        data: JSON.stringify(equipmentObj),
        contentType: "application/json",
        success: function(data) {
            alert('Equipment updated successfully!');

            // Update the table with the new data
            const row = $(`#equipment-${equipmentID}`);
            row.find('td:nth-child(5)').text(equipmentObj.quantity || data.quantity); 
            row.find('td:nth-child(7)').text(equipmentObj.location || data.location); 
            row.find('td:nth-child(8)').text(equipmentObj.price || data.price); 
        },
        error: function(data) {
            const errorMessage = data.responseJSON?.message || data.responseText || 'Unknown error';
            alert('Error updating equipment: ' + errorMessage);
        }
    });
});




$(document).ready(function() {
    $.ajax({
        url: '/Categories',
        method: 'GET',
        success: function (data) {
            if (Array.isArray(data)) {
                data.forEach(category => {
                    $('#categoryFilter').append(`<option value="${category.categoryID}">${category.categoryName}</option>`);
                });
            }
        }
    });

    $.ajax({
        url: '/Suppliers',
        method: 'GET',
        success: function (data) {
            if (Array.isArray(data)) {
                data.forEach(supplier => {
                    $('#SuppliersFilter').append(`<option value="${supplier.supplierID}">${supplier.supplierName}</option>`);
                });
            }
        }
    });
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
                    <tr id="equipment-${equipment.equipmentID}">
                        <td class="text-center">${equipment.equipmentName}</td>
                        <td class="text-center">
                            <img src="${equipment.equipmentImg}" alt="Image" style="width: 50px; height: 50px; cursor: pointer;" data-toggle="modal" data-target="#imageModal" onclick="previewImage('${equipment.equipmentImg}')">
                        </td>
                        <td class="text-center">${equipment.rating} / 5</td>
                        <td class="text-center">${equipment.modelNumber}</td>
                        <td class="text-center">${equipment.quantity}</td>
                        <td class="text-center">${equipment.status}</td>
                        <td class="text-center">${equipment.location}</td>
                        <td class="text-center">${equipment.price}</td>
                        <td class="text-center">${equipment.categoryID}</td>
                        <td class="text-center">${equipment.supplierID}</td>
                        <td class="text-center">
                            <button id="delete-${equipment.equipmentID}" class="btn btn-danger remove" type="button">Delete</button>
                            <button data-id="${equipment.equipmentID}" class="btn btn-success addToCart" type="button">Add to Cart</button>
                            <button class="btn btn-primary editButton" data-id="${equipment.equipmentID}">Edit</button>
                        </td>
                    </tr>
                `);
            });
        }
    });
});
});
