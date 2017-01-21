
$( document ).ready(function() {

//fadein q
	$('#1, #2, #3, #4').hide();
		$('#1').fadeIn(1500, function(){ 
		$('#2').fadeIn(1500, function(){
		$('#3').fadeIn(1500, function(){
		$('#4').fadeIn(1500)
		})})


	});

//mainSubmit

$( "#mainSubmit" ).click(function() {
	$('.modal').modal();
	$('#main-content').empty();
});

//instrucions 
$( "#modalIntructions" ).click(function() {
	$('.modal').modal();
});

// favorite recipes
$(".button-collapse").sideNav();


$( ".button-collapse" ).click(function() {

});

// $(function() {
//     $(document).on('click', function(e) {
//         if (e.target.id == '.button-collapse') {
//             // alert('Div Clicked !!');
//             $( ".button-collapse" ).click(function() {
// 				$('.brand-logo').hide();
// 			});
//         } else {
//             $('.brand-logo').show();
//         }

//     })
// });

});

