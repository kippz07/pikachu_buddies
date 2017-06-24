$(function () {

	$main = $('main');
	$pokemon = $('.pokemon');
	$score = $('#scoreNumber');
	$lives = $('#livesNumber');

	var playerScore = 0;
	var numberOfPokemon = 3;
	var totalLives = 3;
	var moveInterval = setInterval(function () {pokemonMovement(numberOfPokemon, $pokemon)},2000);

	$main.on('click', '.pokemon', function (event) {
		if ($(this).is('.fire')) {
			playerScore += 10;
			$score.html(playerScore);
		} else {
			totalLives--;
			$lives.html(totalLives);
			endGame();
		}
		$(this).fadeToggle();
		$(this).animate({bottom:'5px'});
		$(this).fadeToggle();
	});


	pokemonMovement(numberOfPokemon, $pokemon);



	function generatePokemon (num, pokeId) {
		var $newPokemon = $pokemon.eq(randomNumber(num));
		return '<img id="' + pokeId + '" class="' + $newPokemon.attr('class') + '" src="' + $newPokemon.attr('src') + '">';
	}


	function pokemonMovement (num, $pokemon) {
		var $this = $pokemon.eq(randomNumber(num));
		$this.animate({bottom:'150px'}, function () {
	 		setTimeout(function () {
	      		$this.animate({bottom:'5px'});
    		},500);
		   	setTimeout(function () {
		   		var randomNum = randomNumber(numberOfPokemon);
	  			$this.attr('class', 'pokemon ' + randomClass(randomNum));
	 			$this.attr('src', randomImage(randomNum));
	  		},800);
		});	
	}

	function endGame() {
		if (totalLives === 0) {
			clearInterval(moveInterval);
		}
	}

	function randomClass (number) {
		switch (number) {
			case 0: return 'fire';
				break;
			case 1: return 'water';
				break;
			case 2: return 'grass';
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