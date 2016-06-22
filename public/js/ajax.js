$( document ).ready(function() {
	var fbeventid = {fbeventid: $("#fbeventid").text()}
	$.get('/api', fbeventid, function(result){
		var onpage = $('.speciallabel')
		for (var i = 0; i < onpage.length; i++) {
			for (var j = 0; j < result.length; j++) {
				if ($(onpage[i]).text() == result[j].name) {
					$(onpage[i]).prevAll('.checkbox').attr('checked', true)
				}
			}
		}
	})
	$('.checkbox').change(function() {
		var guest = {guest: $(this).next().text(), fbeventid: $("#fbeventid").text(), clicked: true, ajax: true}
		$.get( '/save', guest, function(data) {
			console.log("Saved the following guest in database: " + guest.guest)
		})
		if($(this).is(":checked"))   {
			console.log('check is true ')
			$(this).nextAll(".guestinfo").show();
			$(".updateguest").click(function(event) {
				event.preventDefault()
				var guestinfo = {guestcount: $(this).prevAll(".guestcount").val(), guestclass: $(this).prevAll(".guestclass").val(), phonenumber: $(this).prevAll(".phonenumber").val(), email: $(this).prevAll(".email").val(), ajax: true}
				console.log(guestinfo)
				// $.get( '/saveguestinfo', guestinfo, function(data) {
				// 	console.log("Saved the following guestinfo in database: " + guestinfo)
				// })
				$(".guestinfo").hide();
			})
		} else{
			$(this).nextAll(".guestinfo").hide();
		}
	});
});



