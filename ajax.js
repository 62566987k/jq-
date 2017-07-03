 
   /* loadAjax start introduction options*/

 $.loadAjax = loadAjax = function (options) { /* loadAjax start introduction options*/

   /* initialize array start*/
             	 var defaults = { 
                 url: "",
                 type: "POST",
                 timeout: 60000,
                 async: true,
                 data: {},
                 jsonp : "jsonCallBack",
                 dataType: "jsonp",
        		 jsonpCallback: "jsonpCallback" + Math.floor(Math.random() * (100000 + 1)),
        		 before: function () { },
        		 success: function () { },
        		 error: function () { },
        		 complete: function () { },
        		 timeouthandler: function () { }
    }
     /* initialize array end */

     /*jquery extend function  merge start*/
    var options = $.extend({}, defaults, options);
    /*merge end*/
            
              $.ajax({
               	url:  options.url,
        		type: options.type,
        		async: options.async,
        		data: options.data,
        		dataType: options.dataType,
        		jsonp : options.jsonp,
                success:function (callBackData) {

                 options.success && options.success(callBackData);
                },
                error:function(e){
                	//console.log(e)
                }
				
            });
          }
          var param ={
                    'isPagination' : true,
					'year' : 2016,
					'sqlId' : 'COMMON_SSE_JYFW_HGT_GGTCJXX_LSGYCJXX_L',
					'pageHelp.pageSize' : 12
                	}
			loadAjax({
			url:'http://10.10.10.28:9080/sseQuery/commonQuery.do',
			data:param,
			success : function (callBackData) {
				console.log(callBackData)
			}
		})