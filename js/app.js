$(document).ready(function() {
  // ***** link to random wiki article *****
  $('#random').on("click", function() {
    var redirectWindow = window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
    redirectWindow.location;
  });
  // ******  AUTO COMPLETE FUNCTION ******
  // autocomplete reference by Nawazish Ali
  // from http://w3lessons.info/2015/03/01/autocomplete-search-using-wikipedia-api-and-jquery-ui/
  $('#input').autocomplete({
    source: function search(request, response) {
      $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        // ******** alternative format of the search *******
        dataType: 'jsonp',
        data: {
          'origin': '*',
          'action': "opensearch",
          'format': "json",
          'search': request.term
        },
        success: function(json) {
          response(json[1]);
        }
      });
    }
  });
  // ***** searching the Wiki API
  $('#search').click(function(e) {
    e.preventDefault();
    var newData;
    var searchTerm = $('input').val();
    //var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+searchTerm+"&format=json";
    $('.article-list').html('');
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      // ******** alternative format of the search *******
      dataType: 'jsonp',
      data: {
        'origin': '*',
        'action': "opensearch",
        'format': "json",
        'search': searchTerm
      },
      success: function(data) {
        newData = data;
        console.log(newData[1]);
        // ***** inserting links *****
        for (var i = 0; i < newData[1].length; i++) {
          $(".article-list").append('<div class="article"><a id="link" href="' + newData[3][i] + '" target="_blank"><h3>' + newData[1][i] + '</h3><p id="text">' + newData[2][i] + '</p></a></div>');
        }
      },
      error: function(errorMessage) {
        alert('Error');
      }
    });
  });
});