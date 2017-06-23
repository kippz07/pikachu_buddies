$(function () {

	$charmander = $('#charmander');
	$squirtle = $('squirtle');
	$bulbasaur = $('#bulbasaur');

	$pokemon = $('.pokemon');

	$pokemon.click(function (event) {
		console.log('clicked');
		$(this).fadeToggle();
	});


	$pokemon.eq(randomNumber(3)).







	function randomNumber (number) {
		var min = Math.ceil(1);
		var max = Math.floor(number+1);
		var num = Math.floor(Math.random() * (max - min)) + min;
		return num;
	} 


})