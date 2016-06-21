$( document ).ready(function() {
	$('.checkbox').change(function() {
		var guest = {guest: $(this).parent().text(), fbeventid: $("#fbeventid").text(), ajax: true}
		$.get( '/save', guest, function(data) {
			console.log("Saved the following guest in database: " + data)
		})
		console.log('change triggered')
		if($(this).is(":checked"))   {
			console.log('check is true ')
			$(this).nextAll(".guestinfo").show();
		} else{
			console.log('check is false ')
			$(this).nextAll(".guestinfo").hide();
		}
	});
});



