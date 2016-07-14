var App = {

  /* @desc : Is all language that is mix by th project
  *  @var : language
  *  e.g : in a laravel file: you have doc about 'html, css, laravel, mysql, blade ...'
  */
	language : {
		name : 'laravel',
		dependancy : ['html', 'css', 'composer','blade', 'php']
	},

	
  /* @desc : Is a key of keywords and his descriptions. If any of thy key words are find, then they will be a info_bule about it.
  *  @var : set_db
  *  @type : Json
  */
	set_db : {
		'laravel/laravel' : 'Corespond à l\'emplacement du fichier source de laravel depuis github<br> <a href="https://github.com/laravel/laravel">laravel/laravel</a>',
		'--prefer-dist' : 'permet d\'accelerer l\'instalation de composer. En n\'incluant que les fichiers necessaire'
	},

	
  /* @desc : Get all keys and values from set_db
  *  @name : db
  */
	db : function(){
		return App['set_db'];
	},


  /* @desc : Contain the info bules information.
  *  @name : menu_info
  */
  	menu_info : {

				// title , description
		html : [
			{ title : '<h2></h2>' , description : 'ajoute une nouvelle section et un menu'},
			{ title : '<h3></h3>' , description : 'ajoute une sous section et un sous menu'},
			{ title : '<code></code>' , description : 'pour afficher du code'},
		],
		
				// title , description
		className : [
				{ title : 'text-left' , description : 'centre l\'element à gauche'},
				{ title : 'text-center' , description : 'centre l\'element au centre'},
				{ title : 'text-right' , description : 'centre l\'element à droite'},
				{ title : 'to_copy' , description : 'determine quel element doit etre copier'},
				{ title : 'no_copy' , description : 'le code contenu dans cette element ne sera pas copier. Même si son parent à la class <span calss="red">to_copy</span>.'}
		]
	}
};