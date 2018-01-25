$(function () {

	var $main = $('main');
	$main.hide();
	var $pokemon = $('.pokemon');
	var $pokemon2 = $('.pokemon2');
	var $score = $('#scoreNumber');
	var $pikachu = $('#pikachu');
	var happyAudio = 'raw/Pikaaaa.mp3';
	var sadAudio = 'raw/Attack.mp3';
	var levelUpAudio = 'raw/congrats.mp3';
	var bossAudio = 'raw/battle.mp3';
	var $blastoise = $('#blastoise');
	var $bossLevel = $('#boss');
	$bossLevel.hide(); 
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
	var $okbutton = $('#winlose button');
	var $beginbutton = $('#begin');

	var $leaderboard = $('list');
	var $board = $('#leaderboard');
	$board.hide();

	var bossHealth = 500;
	var remHealth = 100;
	var $bossHealthbar = $('.healthbar');

	var newObject = '';
	var playerScore = 0;
	var numberOfPokemon = 3;
	var totalLives = 3;

	var leaderboardArray = [];
	var objNumber = localStorage.length;

	var moveInterval;
	var moveInterval2;
	// var moreThan30 = false;

	var moveSpeed = 800;
	var changeClassSpeed = 1200;

	var initialNum = randomNumber(3);

	document.getElementById('openingMusic').play();

	$beginbutton.click(function (event) {
		setTimeout(function() {
			$('#instructionsPage').fadeOut(900);
		},900);
		setTimeout(function() {
			$main.fadeIn(900);
		},1900)
		pauseSound('openingMusic');
		runGame();
		document.getElementById('mainMusic').play();
	})
	

	$pokemon.click(function (event) {
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
			changeDifficulty();
			$(this).addClass('hit');
			
		} else {
			totalLives--;
			playSound(sadAudio);
			$pikachu.attr('src', 'images/pikachuSad.png');
			if (totalLives != 0) {
				setTimeout(function () {
					$pikachu.attr('src', 'images/pikachuHi.png');
				},2000);
			}
			numOfLives();
			endGame();
		}
		$(this).fadeToggle();
		$(this).animate({bottom:'-21px'});
		$(this).fadeToggle();
	});

	$pokemon2.click(function (event) {
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
			changeDifficulty();
			
		} else {
			totalLives--;
			playSound(sadAudio);
			$pikachu.attr('src', 'images/pikachuSad.png');
			if (totalLives != 0) {
				setTimeout(function () {
					$pikachu.attr('src', 'images/pikachuHi.png');
				},2000);
			}
			numOfLives();
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
		storeScores(data);
		$board.show();
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
		setTimeout(function () {
			$playAgain.fadeIn('slow');
		},1000);
	})

	$okbutton.click(function(event) {
		if ($('#winlose').hasClass('lose')) {
			totalLives = 0;
			endGame();
			$bossLevel.fadeOut(900);
			pauseSound('battleMusic');
		} else {
			if ((playerScore < 100) && (playerScore + 30 >= 100)) {
				moveInterval2 = setInterval(function () {
					pokemonMovement(2, $pokemon2)
				},2000);
			}
			playerScore += 30;
			$score.html(playerScore);
			$bossLevel.fadeOut(900);
			setTimeout(function () {
				$main.fadeIn('slow');
			},900)
			moveInterval = setInterval(function () {
				pokemonMovement(numberOfPokemon, $pokemon)
			},2000);
			pauseSound('battleMusic');
			document.getElementById('mainMusic').play();
		}
	})

	function numOfLives () {
		switch (totalLives) {
			case 3: $('#life1, #life2, #life3').show();
				break;
			case 2: $('#life3').fadeOut('fast');
				break;
			case 1: $('#life2').fadeOut('fast');
				break;
			case 0: $('#life1').fadeOut('fast');
		}
	}

	function playSound(path) {
        var audioElement = document.createElement('audio');
  		audioElement.setAttribute('src', path);
  		audioElement.play();
    }

    function pauseSound(id) {
    	var sound = document.getElementById(id);
    	sound.pause();
    	sound.currentTime = 0;
    }

	function runGame () {
		moveInterval = setInterval(function () {
			pokemonMovement(numberOfPokemon, $pokemon)
		},2000);

		numOfLives();
		newObject = levels(initialNum);
	}

	

	function pokemonMovement (num, $pokemon) {
		var $this = $pokemon.eq(randomNumber(num));
		var str = '.' + newObject;
		// if (playerScore >= 30) {
		// 	moreThan30 = true;
		// }
		$this.animate({bottom:'100px'}, function () {
	 		setTimeout(function () {
	      		$this.animate({bottom:'-28px'});
	      		
    		},moveSpeed);
	 			// if ((!$this.hasClass('hit')) && ($this.is(str)) && moreThan30) {
	   	// 		playerScore -= 10;
	    //  		$score.html(playerScore);
	      // }
		   	setTimeout(function () {
		   		var randomNum = randomNumber(numberOfPokemon);
	  			$this.attr('class', 'pokemon ' + randomClass(randomNum));
	 			$this.attr('src', randomImage(randomNum));
	  		},changeClassSpeed);
		});	
		// if (playerScore < 0) {
		// 	endGame();
		// }
	}

	function setDifficulty () {
		changeClassSpeed -= moveSpeed * 0.2;
		moveSpeed -= moveSpeed * 0.2;
	}

	function changeDifficulty() {
		if ((playerScore % 30 === 0) && (playerScore != 0)) {
			setDifficulty();
		}
	}

	function newObjective (number) {
		$span.removeClass();
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
		var bossrand = randomNumber(5);
		var typerand = randomNumber(7);

		if (playerScore === 100) {
			moveInterval2 = setInterval(function () {
				pokemonMovement(2, $pokemon2)
			},2000);
		}
		switch (playerScore) {
			case 0: newObj = newObjective(num); break;
			default: newObj = newObject;
		}
		if (playerScore != 0) {
			if ((bossrand === 3) && (typerand === 6)) {
				boss();
				newObj = newObjective(num);
			} else if (bossrand === 3) {
				boss();
				newObj = newObjective(num);
			} else if (typerand === 6) {
				newObj = newObjective(num);
				playSound(levelUpAudio);
			}
		}

		return newObj;
	}

	function boss () {
		chooseBoss();
		pauseSound('mainMusic');
		var sound = document.getElementById('battleMusic');
    	sound.play();
    	clearInterval(moveInterval);
		setTimeout(function() {
			$main.fadeOut(900);
		},900);
		setTimeout(function() {
			$bossLevel.fadeIn('slow');
		},1900)
	}

	function chooseBoss () {
		var number = randomNumber(3);
		$blastoise.removeClass();
		switch (number) {
			case 0:
				$blastoise.attr('src', 'images/blastoise.png');
				$blastoise.addClass('blastoise');
				break;
			case 1:
				$blastoise.attr('src', 'images/Charizard.png');
				$blastoise.addClass('charizard');
				break;
			case 2:
				$blastoise.attr('src', 'images/Venusaur.png');
				$blastoise.addClass('venusaur');
				break;
		} 
	}

	function endGame () {
		if (((totalLives === 0) || (playerScore <= 0)) && moreThan30 == true) {
			if (playerScore < 0) {
				playerScore = 0;
				$score.html(playerScore);
			}
			$endScore.text('You got a score of: ' + playerScore);
			$pikachu.attr('src', 'images/pikachuSad.png');
			clearInterval(moveInterval);
			pauseSound('mainMusic');
			$main.fadeOut(900);
			$bossLevel.hide();
			$board.hide();
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
		}
	}

	function resetGame () {
		$endscreen.hide();
		$gameOver.hide();
		$playAgain.hide();
		$endScore.hide();
		$main.show();
		$bossLevel.hide();
		moreThan30 = false;
		moveInterval = setInterval(function () {
			pokemonMovement(numberOfPokemon, $pokemon)
		},2000);
		playerScore = 0;
		$score.text(playerScore);
		totalLives = 3;
		$pikachu.attr('src', 'images/pikachuHi.png');
		$submitText.text('');
		$('#winlose').removeClass();
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
		var objects = {};
		var strings= '';
		var theObject = JSON.stringify(array);

		localStorage.setItem(objNumber.toString(), theObject);
		objNumber = localStorage.length;

		retrieveScores();
	}
	
	function retrieveScores () {
		var scores = [];

		for (var i = 0; i < objNumber; i++) {
			try {
				var item = JSON.parse(localStorage.getItem(i));
				scores.push(item);
			} catch(e) {
        	alert(e);
    		}	
		}

		$('ol').empty();
	
		if (scores.length > 1) {
			scores.sort(function(a, b) {
    			return parseInt(b.score) - parseInt(a.score);
			});
		}
		if (scores.length < 5) {
			for (var i = 0; i < scores.length; i++) {
				$('ol').append('<li><p class="leadname">' + scores[i].name + '</p><p class="leadscore">score: ' + scores[i].score.toString() + '</p></li>');
			}
		} else {
			for (var i = 0; i < 5; i++) {
				$('ol').append('<li><p class="leadname">' + scores[i].name + '</p><p class="leadscore">score: ' + scores[i].score.toString() + '</p></li>');
			}
		}
	}
});