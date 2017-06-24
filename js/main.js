$(function () {

	$main = $('main');
	$pokemon = $('.pokemon');
	$score = $('#scoreNumber');

	var playerScore = 0;

	$main.on('click', '.pokemon', function (event) {
		if ($(this).is('.fire')) {
			playerScore += 10;
			$score.html(playerScore);
		}
		$(this).fadeToggle();
		$(this).animate({bottom:'5px'});
		var randomNum = randomNumber(3);

		$(this).fadeToggle();
		//$main.append(generatePokemon(3, $(this).attr('id')));

	});


	pokemonMovement(3, $pokemon);


	function generatePokemon (num, pokeId) {
		var $newPokemon = $pokemon.eq(randomNumber(num));
		return '<img id="' + pokeId + '" class="' + $newPokemon.attr('class') + '" src="' + $newPokemon.attr('src') + '">';
	}


	function pokemonMovement (num, $pokemon) {

		var $this = 0;

		setInterval(function () {
			 $this = $pokemon.eq(randomNumber(num));
			$this.animate({bottom:'150px'}, function () {
		   		setTimeout(function () {
	           		$this.animate({bottom:'5px'});
	       		},500);
		   		setTimeout(function () {
		   			var randomNum = randomNumber(3);
		   			$this.attr('class', randomClass(randomNum));
		   			$this.attr('src', randomImage(randomNum));
		   		},800);
			});	
		},2000);
	}


	function randomClass (number) {
		switch (number) {
			case 0: return 'pokemon fire';
				break;
			case 1: return 'pokemon water';
				break;
			case 2: return 'pokemon grass';
				break;
		}
	}

	function randomImage (number) {
		switch (number) {
			case 0: return 'images/charmander.png';
				break;
			case 1: return 'images/squirtle.png';
				break;
			case 2: return 'images/bulbasaur.png';
				break;
		}
	}
	
	function randomNumber (number) {
		var min = Math.ceil(0);
		var max = Math.floor(number);
		var num = Math.floor(Math.random() * (max - min)) + min;
		return num;
	} 


})