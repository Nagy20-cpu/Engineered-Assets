$(document).ready(function () {
  // Fetch and display the current user's information
  function fetchUser() {
    $.ajax({
      type: "GET",
      url: "/users/view",
      success: function (user) {
        $("#userID").text(user.userID);
        $("#username").text(user.username);
        $("#email").text(user.email);
        $("#role").text(user.role);
      },
      error: function () {
        alert("Failed to fetch user information.");
      }
    });    
  }

  // Call fetchUser on page load
  fetchUser();

  // Handle role update
  $(document).on("click", ".updateRole", function () {
      const userID = $(this).data("userid");
      const newRole = $(this).closest("tr").find("select").val();

      $.ajax({
          type: "PUT",
          url: `/users/update/${userID}`,
          data: JSON.stringify({ role: newRole }),
          contentType: "application/json",
          success: function () {
              alert("Role updated successfully.");
              fetchUser(); // Reload table after update
          },
          error: function (err) {
              console.error("Error updating role:", err);
              alert("Failed to update role. Please try again.");
          }
      });
  });
});
