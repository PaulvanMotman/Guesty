$( document ).ready(function() {
	$('.checkbox').change(function() {
  		var guest = {guest: $(this).parent().text(), fbeventid: $("#fbeventid").text(), ajax: true}
  		console.log(guest)
  		$.get( '/save', guest, function(data) {
  			console.log("Saved the following guest in database: " + data)
  		})
	});
});



