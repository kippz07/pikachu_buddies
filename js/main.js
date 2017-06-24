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
		$(this).remove();
		$main.append(generatePokemon(3, $(this).attr('id')));
	});


	pokemonMovement(3, $pokemon);


	function generatePokemon (num, pokeId) {
		var $newPokemon = $pokemon.eq(randomNumber(num));
		return '<img id="' + pokeId + '" class="' + $newPokemon.attr('class') + '" src="' + $newPokemon.attr('src') + '">';
	}


	function pokemonMovement (num, $pokemon) {

		var $this = 0;
		//var $newPokemon = 0;

		setInterval(function () {
			 $this = $pokemon.eq(randomNumber(num));
			 //$newPokemon = $pokemon.eq(randomNumber(num));
			//console.log($newPokemon);
			$this.animate({bottom:'150px'}, function () {
		   		setTimeout(function () {
	           		$this.animate({bottom:'5px'});
	       		},500);
		   		setTimeout(function () {
		   			$this.removeClass($this.attr('class'));
		   			$this.addClass(randomClass(randomNumber(3)));
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
	
	function randomNumber (number) {
		var min = Math.ceil(0);
		var max = Math.floor(number);
		var num = Math.floor(Math.random() * (max - min)) + min;
		return num;
	} 


})