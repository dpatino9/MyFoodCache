
$( document ).ready(function() {

//fadein q
	$("#1, #2, #3, #4").hide();
		$("#1").fadeIn(1500, function(){ 
		$("#2").fadeIn(1500, function(){
		$("#3").fadeIn(1500, function(){
		$("#4").fadeIn(1500)
		})})


	});

// visibility
function hiddenDisplay() {
    document.getElementById("pantry-hide").style.display = "none";
    document.getElementById("recipe-show").style.display = "block";

}


	//mainSubmit

	$( "#mainSubmit" ).click(function() {
		$(".modal").modal();
		$("#main-content").empty();
	});

	//instrucions 
	$( "#modalIntructions" ).click(function() {
		$('.modal').modal();
	});

	// favorite recipes
	$(".button-collapse").sideNav();

	$( ".button-collapse" ).click(function() {
	});

	$("#pantry-submit").on("click", function(){
		
		
		var counter = 0;

		var apiUrl = "";

		$("input").each(function(){

			counter++;

			if( $(this).val() != ""){

				apiUrl = apiUrl + $(this).val() + ",";

				
				console.log(counter);

				console.log(apiUrl);

			}

			if(counter == 12){

				$.post("http://localhost:4000/api",
			    {
			        searchQuery: apiUrl
			    }, function(data, status){



			    	for(var i = 0; i < data.length; i++){

			    		$(".recipe-container").append('<div class="recipe-thumbail"><img src="'+ data[i].thumbnail+'"></div><div class="recipe-title">'+ data[i].title +'</div><div class="recipe-ingredients">'+ data[i].ingredients+ '<br><a href="'+data[i].href+'">Get this recipe</a><br><a href="#">Save<i class="fa fa-heart red-text" aria-hidden="true"></a><hr>');
			    		$(".text-1").css("color","black");
			    	}	

			    	
			    		// + data[i].thumbnail+
			    		// + data[i].title +
			    		// + data[i].ingredients +

			    	// </div>

			        console.log(data[i].ingredients);


			    });

			}

		});
hiddenDisplay();
	})


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

