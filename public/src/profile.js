$(document).ready(function() {

  $.ajax({
    type: "GET",
    url: "/api/v1/users/view",
    success: function(data) {
      data.forEach(user => {
        const { userID, username, email, role, createdAt } = user;
        const row = `
          <tr id="user-${userID}">
            <td>${userID}</td>
            <td>${username}</td>
            <td>${email}</td>
            <td>${role}</td>
            <td>${new Date(createdAt).toLocaleDateString()}</td>
            <td>
              <button class="btn btn-warning" onclick="editUser(${userID})">Edit</button>
              <button class="btn btn-danger" onclick="deleteUser(${userID})">Delete</button>
            </td>
          </tr>
        `;
        $('#userTableBody').append(row);  // Add the user row to the table
      });
    },
    error: function() {
      alert('An error occurred while fetching users.');
    }
  });

  // Edit user details function
  window.editUser = function(userID) {
    // Here you would typically show a form to edit the user
    const username = prompt("Enter new username:");
    const role = prompt("Enter new role:");
  
    if (!username || !role) {
      alert('Username and role are required.');
      return;
    }
  
    const userObj = { username, role };
  
    $.ajax({
      type: "PUT",
      url: `/api/v1/users/${userID}`,  // API endpoint to update user details
      data: JSON.stringify(userObj),
      contentType: "application/json",
      success: function(data) {
        alert('User updated successfully!');
        // Update the table with the new data (optional)
        $(`#user-${userID} td:nth-child(2)`).text(username);  // Update username in table
        $(`#user-${userID} td:nth-child(4)`).text(role);  // Update role in table
      },
      error: function(data) {
        alert('Error updating user: ' + data.responseText);
      }
    });
  };
  

  // Delete user function
  window.deleteUser = function(userID) {
    if (confirm("Are you sure you want to delete this user?")) {
      $.ajax({
        type: "DELETE",
        url: `/api/v1/users/${userID}`,  // API endpoint to delete user
        success: function() {
          alert('User deleted successfully!');
          $(`#user-${userID}`).remove();  // Remove the user row from the table
        },
        error: function(data) {
          alert('Error deleting user: ' + data.responseText);
        }
      });
    }
  };  
});
