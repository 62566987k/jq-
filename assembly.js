
/*String split joint function 
annotation:{number} start 0 */
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
            function (m, i) {
                return args[i];
            });
}  
/*String split joint function end*/

/*
    start plug-in header object function
	Array annotation:[one,two] === Object
	Label annotation: div, td === String
	tr annotation: classname === String 
*/
Array.prototype.htmlheader = function(Label,tr){
                var header = "";
                for(var i=0; i<this.length;i++){
                  header += "<"+Label+">" +this[i]+ "<"+"/"+Label+">";
                }
                var all= tr ? "<tr class='"+tr+"'>"+ header +"</tr>": header
                return all
  }
/*plug-in header object function end*/


/*
  array split joint <td> function start
	Array init data === ajaxdata annotation:jsonStr
*/
Array.prototype.jsonpin= function(data){
			var json = data
			var jsonlength = data.length
			var thislength = this.length
			var allhtmlone=""
			for(var i=0;i<jsonlength;i++){
					allhtmlone+="<tr>";
					 	for(var j=0; j<thislength; j++){
					 		var jsoni = json[i]
					 		var thisj = this[j]
					 		var allstring = json[i][thisj]
					 		allhtmlone +="<td>{0}</td>".format(html(allstring,thisj,jsoni))
						}
						allhtmlone+="</tr>";
			}
			return allhtmlone
		}
/*array split joint <td> function end*/

/*judge split joint <td> within html function start*/
var html= function (allstring,thisj,jsoni){
		var allhtml=""
		if(typeof thisj === "object" ){
			if(thisj.div && thisj.a){
					allhtml="<div class='{0}'><a class='{1}' target='{2}'>{3}</a></div>".format(thisj.divclass||"",thisj.aclass||"",thisj.target||"",jsoni[thisj.this]||"");
			}else{
				if(thisj.div){
					allhtml ="<div class='{0}'>{1}</div>".format(thisj.divclass||"",ccc[thisj.this]||"");
				}else if(thisj.a){
					allhtml ="<a class='{0}' href='{1}' target='{2}'>{3}</a></div>".format(thisj.aclass||"",thisj.href||"",thisj.target||"",jsoni[thisj.this]||"");
				}
			}
		}else{	
			allhtml= allstring

		}
	return 	allhtml 
}
/*judge split joint <td> within html function end*/


/*start json object*/
 var jsonStr = [
	    		{   
			        "type":"A",
			        "name":"农、林、牧、渔业",
			        "A_gpksh_pre_data": 15,
			        "A_gpksh_suf_data": "(4)",
			        "A_jtsyl_data":59.92,
			        "180_gpksspre_data": 1,
			        "180_gpksssuf_data": "",
			        "180_jtsyl_datadata": "-",
			        "380_gpkss_pre_data": "2",
			        "380_gpkss_suf_data": "",
			        "380_jtsyl_data": "-",
			        "Other_gpksspre_data": "12",
			        "Other_gpksssuf_data": "(4)",
			        "Other_jtsyl_data": "50.51"
	    		},
	    		{
	       			 "type":"B",
	        		"name": "采矿业",
	        		"A_gpksh_pre_data": 48,
	        		"A_gpksh_suf_data": "(10)",
	        		"A_jtsyl_data": 36.54,
	        		"180_gpksspre_data": 10,
	        		"180_gpksssuf_data": "(1)",
	        		"180_jtsyl_datadata": "36.18",
	        		"380_gpkss_pre_data": "17",
	        		"380_gpkss_suf_data": "(1)",
	        		"380_jtsyl_data": "42.29",
	        		"Other_gpksspre_data": "21",
	        		"Other_gpksssuf_data": "(8)",
	        		"Other_jtsyl_data": "35.22"
	    		}
	    		]
/*start json object end*/
/*start plug-in object */
var plugObject = [
    "type",
     "name",
    {
 	"this":"A_gpksh_pre_data", // required parameter
 	"div":true,				// set up label DIV
 	"divclass":"fycj",		// set up label DIV className
    "a":true,				// set up label a
    "href":"www.baidu.com",//set up a href
    "target":"_black",		//set up a open mode 
    "aclass":"blue"			//set up a open className 	
	},
	"A_gpksh_suf_data",
	"A_jtsyl_data",
	"180_gpksspre_data",
	"180_gpksssuf_data",
	"180_jtsyl_datadata",
	"380_gpkss_pre_data",
	"380_gpkss_suf_data",
	"380_jtsyl_data",
	"Other_gpksspre_data",
	"Other_gpksssuf_data",
	"Other_jtsyl_data"
	]
	/* plug-in object end*/

/*start plug-in object  */	




/*invoking start*/
console.log(plugObject.jsonpin(jsonStr))
/*invoking end*/


