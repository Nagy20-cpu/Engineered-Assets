$(document).ready(function () {
    $('.remove').on('click', function () {
        const orderId = $(this).data('orderid');
        const row = $(this).closest('tr');
        console.log("Order ID:", orderId); // Debugging order ID
        const confirmDelete = confirm("Are you sure you want to delete this item from your cart?");
        if (confirmDelete) {
            $.ajax({
                type: "DELETE",
                url: `/order/${orderId}`,
                success: function (response) {
                    console.log("Response:", response); // Debugging server response
                    if (response.message === "Successfully removed order and updated equipment quantity.") {
                        alert("Order deleted successfully!");
                        row.remove(); // Remove the table row
                    } else {
                        alert("Error: " + response.message);
                    }
                },
                error: function (xhr, status, error) {
                    console.log("XHR Status: " + xhr.status); // Debugging HTTP status
                    console.log("Error Message: " + error); // Debugging error message
                    console.log("Response Text: " + xhr.responseText); // Full server response
                    alert("Error deleting cart item: " + (xhr.responseText || error));
                }
            });
        }
    });
});
