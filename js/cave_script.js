$(document).ready(function() {
    // Retrieve the cave ID from the query parameter
    var caveId = getQueryParameter('caveId');
    // Retrieve the bearer token from local storage
    var token = localStorage.getItem('token');
    if (!token) {
      // If the token is not found, redirect the user to the login page or display an error message
      alert('You are not authenticated. Please log in.');
      return;
    }
  
    // Make the API request to retrieve the cave details
    //var apiUrl = 'http://localhost:8083/api/caveObservation?filter={"caveId":"' + caveId + '"}';
	var apiUrl = `https://speleograph.tools.eurecom.fr/api/caveObservation?filter={"caveId":"${caveId}"}`;

    $.ajax({
      url: apiUrl,
      type: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      },
      success: function(response) {
        if (response.success) {
          var cave = response.data;
  
          // Display the cave details on the page
          var caveDetailsContainer = $('#cave-details-container');
  
          if (cave.length > 0) {
            var table = $('<table>').addClass('table');
            var tbody = $('<tbody>').appendTo(table);
  
            var dataRow = $('<tr>').appendTo(tbody);
            dataRow.append('<td>ID:</td>');
            dataRow.append('<td>' + cave.id + '</td>');
  
            dataRow = $('<tr>').appendTo(tbody);
            dataRow.append('<td>Name:</td>');
            dataRow.append('<td>' + cave.name + '</td>');
  
            // Add more rows for other cave details as needed
  
            caveDetailsContainer.append(table);
          } 

          else {
            caveDetailsContainer.empty();
            var emptyStateContainer = $('<div>').addClass('empty-state-container');
            var emptyStateImage = $('<img>').attr('src', 'https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif').attr('alt', 'No observations').addClass('empty-state-image');
            var emptyStateText = $('<h5>').addClass('empty-state-text').text('NO OBSERVATIONS CONTRIBUTED');
            emptyStateContainer.append(emptyStateImage, emptyStateText);
            caveDetailsContainer.append(emptyStateContainer);
            
            // Center the empty state container
            emptyStateContainer.css({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            });
          }          
          
             
        } else {
          // Handle the case where the backend response indicates an error
          alert('An error occurred while retrieving the cave details.');
        }
      },
      error: function() {
        // Handle the case where the AJAX request encounters an error
        alert('An error occurred while making the request.');
      }
    });
  
    // Function to retrieve query parameters from the URL
    function getQueryParameter(name) {
      var urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }
  });
  