// show onClick the update login form on home
$( document ).ready(function() {
	$('#update-login-account').click(function( ) {
		$('#update-login-info').show(function () {
			$('#hide-account').click(function(){
				$('#update-login-info').hide()
			})
		})
	})	
});
