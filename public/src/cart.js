$(document).ready(function () {

   $(document).on('click', '.remove', function () {
    const cartId = $(this).data('cartid');
    const row = $(this).closest('tr');
    console.log("Cart ID:", cartId); 

    // Confirm deletion
    const confirmDelete = confirm("Are you sure you want to delete this item from your cart?");
    if (confirmDelete) {
        $.ajax({
            type: "DELETE",
            url: `/api/v1/cart/delete/${cartId}`,
            success: function (response) {
                if (response.message === "Successfully removed item from cart.") {
                    alert("Cart item deleted successfully!");
                    row.remove(); // Remove the row from the table
                } else {
                    alert("Error: " + response.message);
                }
            },
            error: function (xhr, status, error) {
                console.log("XHR Status: " + xhr.status); 
                console.log("Error Message: " + error);
                alert("Error deleting cart item: " + (xhr.responseText || error));
            }
        });
    }
    });

    $('#checkoutBtn').click(function () {
        $.ajax({
            type: "POST",
            url: '/api/v1/order/new',  
            success: function (data) {
                alert("Order placed successfully!");
            },
            error: function (data) {
                console.error("Error during checkout:", data.responseText);
                alert("Could not place order. Please try again later.");
            }
        });
    });
    
    $(document).ready(function() {
        // When the quantity is changed, send an AJAX request to update the cart
        $('.quantity-input').on('change', function() {
          var cartID = $(this).data('cartid');
          var newQuantity = $(this).val();
      
          // Validate the quantity is a positive number
          if (newQuantity <= 0 || isNaN(newQuantity)) {
            alert('Quantity must be a positive number!');
            return;
          }
      
          // Send the updated quantity to the server using AJAX
          $.ajax({
            url: '/update-cart', // The API endpoint to update the cart
            method: 'POST',
            data: {
              cartID: cartID,
              quantity: newQuantity
            },
            success: function(response) {
              if (response.success) {
                // Update the subtotal in the table
                $('#subtotal-' + cartID).text('$' + response.newSubtotal);
                
                // Update the total price
                $('#totalPrice').text(response.newTotal);
              } else {
                alert('Failed to update the cart. Please try again.');
              }
            },
            error: function() {
              alert('Error while updating the cart. Please try again.');
            }
          });
        });
      });
      
    
});

