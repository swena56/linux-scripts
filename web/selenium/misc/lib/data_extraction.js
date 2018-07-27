var data_extraction = {

	getLinks: function(){
		var arr = [], l = document.links;
		for(var i=0; i<l.length; i++) {
		  arr.push(l[i].href);
		}
		return arr;
	},

	//document.getElementsByTagName('input');
	//var checkboxes = document.querySelectorAll("input[type=checkbox]");

};