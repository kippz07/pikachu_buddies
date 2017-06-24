$(function () {

	$main = $('main');
	$pokemon = $('.pokemon');
	$score = $('#scoreNumber');

	var playerScore = 0;

	$pokemon.click(function (event) {
		if ($(this).is('#fire')) {
			playerScore += 10;
			$score.html(playerScore);
		}
		$(this).fadeToggle();
		$(this).remove();
		$main.append(generatePokemon(3, $(this).attr('class')));
	});


	pokemonMovement($pokemon);


	function generatePokemon (num, pokeClass) {
		var $newPokemon = $pokemon.eq(randomNumber(num));
		return '<img id="' + $newPokemon.attr('id') + '" class="' + pokeClass + '" src="' + $newPokemon.attr('src') + '">';
	}


	function pokemonMovement ($pokemon) {
		setInterval(function () {
			var $this = $pokemon.eq(randomNumber(3));
			$this.animate({bottom:'150px'}, function () {
	    		setTimeout(function () {
            		$this.animate({bottom:'5px'});
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