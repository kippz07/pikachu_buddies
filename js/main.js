$(function () {

	$main = $('main');
	$pokemon = $('.pokemon');
	$score = $('#scoreNumber');
	$lives = $('#livesNumber');
	$pikachu = $('#pikachu');
	happyAudio = 'raw/Pikaaaa.mp3';
	sadAudio = 'raw/Attack.mp3';
	levelUpAudio = 'raw/congrats.mp3';
	$endscreen = $('section');
	$endscreen.hide();
	$gameOver = $('#gameOver');
	$gameOver.hide();
	$playAgain = $('#playAgain');
	$playAgain.hide();
	$endScore = $('#endScore');
	$endScore.hide();

	var playerScore = 0;
	var numberOfPokemon = 3;
	var totalLives = 3;
	var moveInterval = setInterval(function () {
		pokemonMovement(numberOfPokemon, $pokemon)
	},2000);

	$main.on('click', '.pokemon', function (event) {
		if ($(this).is('.fire')) {
			playerScore += 10;
			$score.html(playerScore);
			playSound(happyAudio);
			$pikachu.attr('src', 'images/pikachuHappy.png');
			setTimeout(function () {
				$pikachu.attr('src', 'images/pikachuHi.png');
			},1000);
		} else {
			totalLives--;
			$lives.html(totalLives);
			playSound(sadAudio);
			$pikachu.attr('src', 'images/pikachuSad.png');
			if (totalLives != 0) {
				setTimeout(function () {
					$pikachu.attr('src', 'images/pikachuHi.png');
				},2000);
			}
			endGame();
		}
		$(this).fadeToggle();
		$(this).animate({bottom:'-21px'});
		$(this).fadeToggle();
	});

	$playAgain.click(function (event) {
		resetGame();
	});

	pokemonMovement(numberOfPokemon, $pokemon);

	function playSound(path) {
        var audioElement = document.createElement('audio');
  		audioElement.setAttribute('src', path);
  		audioElement.play();
    }

	function generatePokemon (num, pokeId) {
		var $newPokemon = $pokemon.eq(randomNumber(num));
		return '<img id="' + pokeId + '" class="' + $newPokemon.attr('class') + '" src="' + $newPokemon.attr('src') + '">';
	}


	function pokemonMovement (num, $pokemon) {
		var $this = $pokemon.eq(randomNumber(num));
		$this.animate({bottom:'100px'}, function () {
	 		setTimeout(function () {
	      		$this.animate({bottom:'-28px'});
    		},800);
		   	setTimeout(function () {
		   		var randomNum = randomNumber(numberOfPokemon);
	  			$this.attr('class', 'pokemon ' + randomClass(randomNum));
	 			$this.attr('src', randomImage(randomNum));
	  		},1200);
		});	
	}

	function endGame() {
		if (totalLives === 0) {
			$pikachu.attr('src', 'images/pikachuSad.png');
			clearInterval(moveInterval);
			$main.fadeOut(900);
			setTimeout(function () {
				$endscreen.fadeIn('slow');
			},1000);
			setTimeout(function () {
				$gameOver.fadeIn('slow');
			},2000);
			setTimeout(function () {
				$endScore.text('You got a score of: ' + playerScore);
				$endScore.fadeIn('slow');
			},3000);
			setTimeout(function () {
				$playAgain.fadeIn('slow');
			},4000);
		}
	}

	function resetGame () {
		$endscreen.hide();
		$gameOver.hide();
		$playAgain.hide();
		$endScore.hide();
		$main.show();
		moveInterval = setInterval(function () {
			pokemonMovement(numberOfPokemon, $pokemon)
		},2000);
		playerScore = 0;
		$score.text(playerScore);
		totalLives = 3;
		$lives.text(totalLives);
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