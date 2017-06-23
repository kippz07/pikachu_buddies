$(function () {

	$charmander = $('#charmander');
	$squirtle = $('squirtle');
	$bulbasaur = $('#bulbasaur');

	$pokemon = $('.pokemon');

	$pokemon.click(function (event) {
		console.log('clicked');
		$(this).fadeToggle();
	});


	pokemonMovement($pokemon);





	function pokemonMovement ($pokemon) {
		setInterval(function () {
			$pokemon.eq(randomNumber(3)).animate({bottom:'150px'}, function () {
	    		setTimeout(function () {
            		$pokemon.animate({bottom:'5px'});
        		},500);
			});
		},2000);
	}

	
	function randomNumber (number) {
		var min = Math.ceil(0);
		var max = Math.floor(number);
		var num = Math.floor(Math.random() * (max - min)) + min;
		return num;
	} 


})