$(function () {

	$charmander = $('#charmander');
	$squirtle = $('squirtle');
	$bulbasaur = $('#bulbasaur');

	$pokemon = $('.pokemon');

	$pokemon.click(function (event) {
		console.log('clicked');
		$(this).fadeToggle();
	});



	$charmander.animate({bottom:'150px'}, function () {
	    setTimeout(function () {
            $charmander.animate({bottom:'5px'});
        	},500);
		});
	},2000);







	function randomNumber (number) {
		var min = Math.ceil(1);
		var max = Math.floor(number+1);
		var num = Math.floor(Math.random() * (max - min)) + min;
		return num;
	} 


})