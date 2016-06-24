//AJAX home page
$(document).ready(function(){
	$(".text-center.new-account").click(function(){
		$.get('/createevent', function(result){
		});
	});
});

// AJAX dashboard
$( document ).ready(function() {
	var fbeventid = {
		fbeventid: $("#fbeventid").text()
	}
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
		var guest = {
			guest: $(this).next().text(), 
			fbeventid: $("#fbeventid").text(), 
			clicked: true, 
			ajax: true
		}
		if ($(this).is(":checked"))   {
			$.get( '/saveguest', guest, function(data) {
			})
			$(this).nextAll(".guestinfo").show();
			$(".updateguest").click(function(event) {
				event.preventDefault()
				var guestinfo = {
					name: $(this).parent().parent().prevAll('.speciallabel').text(), 
					guestcount: $(this).prevAll(".guestcount").val(), 
					guestclass: $(this).prevAll(".guestclass").val(), 
					phonenumber: $(this).prevAll(".phonenumber").val(), 
					email: $(this).prevAll(".email").val(), 
					ajax: true
				}
				$.get( '/saveguestinfo', guestinfo, function(data) {
				})
				$(".guestinfo").hide();
			})
		} else{
 			$.get('/deleteguest', guest, function (data){
			})
			$(this).nextAll(".guestinfo").hide();
		}
	});
});
