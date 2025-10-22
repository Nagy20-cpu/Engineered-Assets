$(document).ready(function () {
    $('#addEquipmentForm').on('submit', function (e) {
        e.preventDefault(); 
  
        if(!equipmentName  || !equipmentImg || !rating || !modelNumber || !quantity || !location|| !categoryID|| !supplierID|| !price){
          alert("missing info");
          return;
        }

        const equipmentData = {
            equipmentName: $('#equipmentName').val(),
            equipmentImg: $('#equipmentImg').val(),
            rating: $('#rating').val(),
            modelNumber: $('#modelNumber').val(),
            quantity: $('#quantity').val(),
            status: $('#status').val(),
            location: $('#location').val(),
            categoryID: $('#categoryID').val(),
            supplierID: $('#supplierID').val(),
            price: $('#price').val(),
        };
        console.log("Equipment Data: ",equipmentData);

        $.ajax({
            type: "POST",
            url: '/api/v1/equipment/new', 
            data: JSON.stringify(equipmentData),
            contentType: "application/json",
            success: function (data) {
            $('#equipmentName').val('');
            $('#equipmentImg').val('');
            $('#rating').val('');
            $('#modelNumber').val('');
            $('#quantity').val('');
            $('#status').val('');
            $('#location').val('');
            $('#categoryID').val('');
            $('#supplierID').val('');
            $('#price').val('');
                alert("Equipment added successfully!");
                $('#addEquipmentForm').trigger("reset");
                window.location.href = '/Equipments';
            },
            error: function (err) {
                console.log(err),
                alert("Error adding equipment.");
            }
        });
    });
});
