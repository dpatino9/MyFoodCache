# MyFoodCache
My Food Cache is a web application that helps users decide on a dinner recipe based on the available food in their kitchen. The application allows the user to 
input up to three ingredients per four major food groups, and when the user hits Enter, the app returns three recipes that the user can choose from for that 
night's dinner.

Main features of My Food Cache are:

1. Three primary pages
a. A User-Login page, with Facebook and Google login
b. A Main Page in which the user enters their available food ingredients
c. A "return" recipe page that lists recipes for the user to choose from 

The primary software languages and tools are:

1. Front-end
a. HTML, CSS and Handlebars

2. Back-end
a. Javascript
b. Mongodb

Following is the file hierarchy in this Github directory:

MyFoodCache/

- Controllers
	|
	foodCache_controller.js

- Public/Assets
	|
	css
	images
	js

- Schemas
	|
	userSchema.js

- Views
	|
	layouts
		|
		main.handlebers
		|
		pantryMain.handlebars
	home.handlebars
	pantry.handlebars
	search.handlebars

- gitignore
- README.md
- landingPage.html
- package.json
