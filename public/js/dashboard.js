$( document ).ready( function ( ) {
	$(function () {
		$( "li", "#checked-list" ).sort(function( a, b ) {
			return $( a ).text() > $( b ).text(); 
		}).appendTo( "#checked-list" );
	})	
})
$(function () {
	$("li", "#checked-list").click(function () {
		$(this).css("text-decoration", "line-through");
	})

})
