$(document).ready(function() {
    const password = prompt('Please enter the password:');
  
    $('#leadForm').submit(function(event) {
      event.preventDefault();
  
      const emailAddress = $('#emailAddress').val();
      const firstName = $('#firstName').val();
      const lastName = $('#lastName').val();
      const company = $('#company').val();
      const jobTitle = $('#jobTitle').val();
  
      const data = {
        emailAddress,
        firstName,
        lastName,
        company,
        jobTitle,
      };
  
      // Show loading message
      $('#result').html('Loading...');
  
      $.ajax({
        url: '/api/lead',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        headers: {
          'X-Password': password,
        },
        success: function(response) {
          // Display the response in the result div
          $('#result').html(JSON.stringify(response, null, 2));
        },
        error: function(xhr, status, error) {
          if (xhr.status === 401) {
            // Display the unauthorized error message in the result div
            $('#result').html('Unauthorized: Invalid password');
          } else {
            // Display the error message in the result div
            $('#result').html('Error: ' + error);
          }
        },
      });
    });
  });
  