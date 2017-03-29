$(document).ready();

$("#searchButton").click(function() {
  var searchTerm = $("#searchTerm").val();
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&callback=?",
    type: "GET",
    async: false,
    dataType: "json",
    success: function(data) {
      // Clear the searchResults
      $('#searchResults').html("");
      // Create header for Search Results
      $('#searchResults').append('<h2 class="text-center">Search Results</h2><div class="list-group">');
      // Loop through the JSON results.
      // Index 1 is the topic of the page
      // Index 2 is the first sentence about the topic
      // Index 3 is the URL
      for (var i = 0; i <= 10; i++) {
        // Build the HTML to be created.
        $('#searchResults').append('<a href=' + data[3][i] + ' target="blank" class="list-group-item">' + data[1][i] + ' - ' + data[2][i] + '</a>')
      }
      $('searchResults').append('</div>');
    },
    error: function(errorCode) {
      alert("Search failed.")
    },
  })
});

// Allows the user to press the enter key instead of clicking the search button
$('#searchTerm').bind('keypress', function(enterKey) {
  if (enterKey.keyCode == 13) {
    $('#searchButton').click();
  }
})
