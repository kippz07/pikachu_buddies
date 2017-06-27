$(function () {

	var $main = $('main');
	var $pokemon = $('.pokemon');
	var $score = $('#scoreNumber');
	var $lives = $('#livesNumber');
	var $pikachu = $('#pikachu');
	var happyAudio = 'raw/Pikaaaa.mp3';
	var sadAudio = 'raw/Attack.mp3';
	var levelUpAudio = 'raw/congrats.mp3';
	var $popup = $('#popup');
	$popup.hide();
	var $enterName = $('#nameEnter');
	$enterName.hide();
	var $endscreen = $('section');
	$endscreen.hide();
	var $objective = $('#object');
	var $span = $('span');
	var $submitText = $('#user-input');
	$submitText.hide();
	var $submitButton = $('#submit');
	$submitButton.hide();
	var $gameOver = $('#gameOver');
	$gameOver.hide();
	var $playAgain = $('#playAgain');
	$playAgain.hide();
	var $endScore = $('#endScore');
	$endScore.hide();

	var $leaderboard = $('list');


	var newObject = '';
	var playerScore = 0;
	var numberOfPokemon = 3;
	var totalLives = 3;

	var leaderboardArray = [];
	var objNumber = localStorage.length;

	var moveInterval = setInterval(function () {
		pokemonMovement(numberOfPokemon, $pokemon)
	},2000);
	//debugger
	var initialNum = randomNumber(3);
	levels(initialNum);
	newObject = levels(initialNum);

	$main.on('click', '.pokemon', function (event) {
		//debugger
		newNum = randomNumber(3);
		
		var str = '.' + newObject;
		
		if ($(this).is(str)) {
			playerScore += 10;
			$score.html(playerScore);
			playSound(happyAudio);
			$pikachu.attr('src', 'images/pikachuHappy.png');
			setTimeout(function () {
				$pikachu.attr('src', 'images/pikachuHi.png');
			},1000);
			newObject = levels(newNum);
			
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

	$submitButton.click(function () {
		var data = {'name': $submitText.val(), 'score': playerScore};
		leaderboardArray.push(data);
		storeScores(leaderboardArray);
		//console.log(leaderboardArray[0]);
		$endScore.hide();
		$submitButton.hide();
		$submitText.hide();
	 	$enterName.hide();
		$popup.animate({
			width:'0px',
			height:'0px'
		}, function () {
		 	$popup.hide();
		});
	})

	pokemonMovement(numberOfPokemon, $pokemon);

	function playSound(path) {
        var audioElement = document.createElement('audio');
  		audioElement.setAttribute('src', path);
  		audioElement.play();
    }

	// function generatePokemon (num, pokeId) {
	// 	var $newPokemon = $pokemon.eq(randomNumber(num));
	// 	return '<img id="' + pokeId + '" class="' + $newPokemon.attr('class') + '" src="' + $newPokemon.attr('src') + '">';
	// }


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

	function newObjective (number) {
		$span.removeClass();
		//debugger
		switch (number) {
			case 0: 
				$objective.html('Pikachu wants you to catch a <span>fire type</span> Pokemon');
				$objective.find('span').toggleClass('red');
				return 'fire';
				break;
			case 1: 
				$objective.html('Pikachu wants you to catch a <span>water type</span> Pokemon');
				$objective.find('span').toggleClass('blue');
				return 'water';
				break;
			case 2: 
				$objective.html('Pikachu wants you to catch a <span>grass type</span> Pokemon');
				$objective.find('span').toggleClass('green');
				return 'grass';
				break;
		}
	}

	function levels (num) {
		var newObj = '';
		//debugger
		switch (playerScore) {
			case 0:
			case 50: 
			case 100:
			case 200: newObj = newObjective(num);
				playSound(levelUpAudio);
				break;

			default: newObj = newObject;
		}
		return newObj;
	}

	function endGame () {
		if (totalLives === 0) {
			$endScore.text('You got a score of: ' + playerScore);
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
			 	$popup.animate({
			 		width:'370px',
			 		height:'191px'
			 	}, function () {
			 		$endScore.fadeIn();
			 		$submitButton.fadeIn();
			 		$submitText.fadeIn();
			 		$enterName.fadeIn();
			 	});
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
		$pikachu.attr('src', 'images/pikachuHi.png');
		$submitText.text('');
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

	function storeScores (array) {
		//debugger
		var objects = {};
		var strings= '';
		
		for (var i = 0; i < array.length; i++) {
			objects.name = array[i].name;
			objects.score = array[i].score;
			strings += JSON.stringify(objects);
			if (i != array.length-1) {
				strings += ', ';
			}
			localStorage.setItem(objNumber.toString(), strings);
			objNumber = localStorage.length;
		}
		retrieveScores();
	}
	
	function retrieveScores () {
		//debugger
		var scores = [];

		for (var i = 0; i < objNumber; i++) {
			var item = JSON.parse(localStorage.getItem(i));
			scores.push(item);
		}

		$('ol').empty();
	
		if (scores.length > 1) {
			scores.sort(function(a, b) {
    			return parseInt(b.score) - parseInt(a.score);
			});
		}
		if (scores.length < 5) {
			for (var i = 0; i < scores.length; i++) {
				$('ol').append('<li><p class="leadname">' + scores[i].name + '</p><p class="leadscore">score: ' + scores[i].score + '</p></li>');
			}
		} else {
			for (var i = 0; i < 5; i++) {
				$('ol').append('<li><p class="leadname">' + scores[i].name + '</p><p class="leadscore">score: ' + scores[i].score + '</p></li>');
			}
		}
	}

})