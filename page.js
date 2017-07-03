 function pageUp(pageNum,pageCount){
        switch(pageNum){
        case 1:
        break;
        case 2:
        page_icon(1,5,0);
        break;
        case pageCount-1:
        page_icon(pageCount-4,pageCount,2);
        break;
        case Number(pageCount):
        page_icon(pageCount-4,pageCount,3);
        break;
        default:
        page_icon(pageNum-2,pageNum+2,1);
        break;
    }
}

//下一页
function pageDown(pageNum,pageCount){
    switch(pageNum){
        case 1:
        page_icon(1,5,1);
        break;
        case 2:
        page_icon(1,5,2);
        break;
        case pageCount-1:
        page_icon(pageCount-4,pageCount,4);
        break;
        case pageCount:
        break;
        default:
        page_icon(pageNum-2,pageNum+2,3);
        break;
    }
}

function spageUp(){
    var spage = $("#spage").val();
    if(spage==1){
        return;
    }else{
        var spageu=Number(parseInt(spage)-1);
        $("#spage").val(spageu);
        searchByPage(spageu);
    }
}
function spageDown(){
    var spage = $("#spage").val();
    if(spage==pageCount){
        return;
    }else{
        var spaged=Number(parseInt(spage)+1);
        $("#spage").val(spaged);
        searchByPage(spaged);
    }
}

 var pageCount =0;//模拟后台总页数
function printPage(){
    //根据总页数判断，如果小于5页，则显示所有页数，如果大于5页，则显示5页。根据当前点击的页数生成
    if(pageCount<1){
        $("#pageinfo").children().remove();
        return ;
    }
    //生成分页按钮
   if(pageCount>4){
        page_icon(1,4,0);
   }else{
        page_icon(1,pageCount,0);
   }
} 

function page_icon(pages,count,eq){
  var ul_html = "";
    ul_html +="<li title='首页'><a id='first' class='classStr' href='javascript:void(0);' aria-label='Previous'><span aria-hidden='true' class='page-prev'></span>";
    ul_html +="</a></li>";
    ul_html +="<li><a id='Previous' class='classStr' href='javascript:void(0);'  aria-label='Previous'><span aria-hidden='true' class='glyphicon glyphicon-menu-left'></span>";
    ul_html +="</a></li>";
    for(var i=pages; i<=count; i++){
        ul_html += "<li><a id='li"+i+"' href='javascript:void(0);'  class='classStr'>"+i+"</a></li>";
    }
    ul_html +="<li ><a id='Next' class='classStr' href='javascript:void(0);'  aria-label='Next'><span aria-hidden='true' class='glyphicon glyphicon-menu-right'></span>";
    ul_html +="</a></li>";
    ul_html +="<li title='尾页'><a id='last' class='classStr' href='javascript:void(0);'  aria-label='Next'><span aria-hidden='true' class='page-next'></span>";
    ul_html +="</a></li>";
    $("#pageGro ul").html(ul_html);
    $("#pageGro ul a").eq(eq+2).addClass("active");
}     	
function pageClick(v){
    //判断是否上一页
    if($(v).attr('id')=="Previous"){
        if(pageCount > 5){
            var pageNum = parseInt($("#pageinfo li a.active").text());//获取当前页
            var pageIndex =Number(pageNum-1);
            if(pageIndex<1){
                return;
            }
            searchByPage(pageIndex);
            pageUp(pageNum,pageCount);
        }else{
            var index = parseInt($("#pageinfo li a.active").text());//获取当前页
            var pageIndex = Number(index-1);
            if(pageIndex<1){
                return;
            }
            searchByPage(pageIndex);
            if(pageIndex > 0){
                $("#pageinfo li a.active").removeClass("active");
                $("#pageinfo li a").eq(pageIndex+1).addClass("active");//选中上一页
            }
        }
    }else if($(v).attr('id')=="Next"){
        if(pageCount > 5){
                var pageNum = parseInt($("#pageinfo li a.active").text());//获取当前页
                var pageIndex = Number(pageNum+1);
                if(pageIndex>pageCount){
                    return;
                }
                searchByPage(pageIndex);
                pageDown(pageNum,pageCount);
            }else{
                var index = parseInt($("#pageinfo li a.active").text());//获取当前页
                var pageIndex = Number(index+1);
                if(pageIndex>pageCount){
                    return;
                }
                searchByPage(pageIndex);
                if(index < pageCount){
                    $("#pageinfo li a.active").removeClass("active");
                    $("#pageinfo li a").eq(index+2).addClass("active");//选中上一页
                }
            }
        } else if($(v).attr('id')=="first"){
            if(pageCount > 5){
                var pageNum =parseInt($("#pageinfo li a.active").text());
                if(pageNum==1){
                    return;
                }
                searchByPage(1);
                pageGroup(1,pageCount);
            }else{
                searchByPage(1);
                $("#pageinfo li a.active").removeClass("active");
                $("#li1").addClass("active");
            }
        }else if($(v).attr('id')=="last"){
            if(pageCount > 5){
                var pageNum =parseInt($("#pageinfo li a.active").text());
                if(pageNum==pageCount){
                    return;
                }
                searchByPage(pageCount);
                pageGroup(Number(pageCount),pageCount);
            }else{
                searchByPage(pageCount);
                $("#pageinfo li a.active").removeClass("active");
                $("#li"+pageCount).addClass("active");
            }
        }else{
            if(pageCount > 5){
            var pageNum = parseInt($(v).text());//获取当前页数
            searchByPage(pageNum);
            pageGroup(pageNum,pageCount);
        }else{
            var pageNum = parseInt($(v).text());//获取当前页数
            searchByPage(pageNum);
            $("#pageinfo li a.active").removeClass("active");
            $(v).addClass("active");
        }
    }
}
function isInteger(obj) {
 return obj%1 === 0
}
function pageGroup(pageNum,pageCounts){
    switch(pageNum){
        case 1:
        page_icon(1,5,0);
        break;
        case 2:
        page_icon(1,5,1);
        break;
        case pageCounts-1:
        page_icon(pageCounts-4,pageCounts,3);
        break;
        case Number(pageCounts):
        page_icon(pageCounts-4,pageCounts,4);
        break;
        default:
        page_icon(pageNum-2,pageNum+2,2);
        break;
    }
}


	//================================股份减持计划与减持进展=================================
var $search_ht_JCJZ = $(".search_ht_JCJZ");
       if($search_ht_JCJZ.length > 0 ){ 	   
            var searchWord= GetQueryString("webswd") || "";
			var orderby="-CRELEASETIME";
			var searchWordL="T_L CTITLE T_D E_KEYWORDS T_JT_E likeT_L";
			var searchWordR="T_R  and cchannelcode T_E T_L8349 T_D8348 T_RT_R";
	function searchByPage(page){
		var tableByPage = {
		    url:sseQueryURL + "search/getSearchResult.do?search=qwjs",
   	   		searchWord:searchWord,
   	   		page:page,
   	   		allpage:"20",
   	   		noinitpage:true
	};
	init(tableByPage);	
}
      function init(obj){
      	showloading()
	 		$.ajax({
					type : 'POST',
					dataType : "jsonp",
					url : sseQueryURL + "search/getSearchResult.do?search=qwjs",
					jsonp : "jsonCallBack",
					data : {
						"page":obj.page,
						"searchword":searchWordL+obj.searchWord+searchWordR,
						"orderby":orderby,
						"perpage":obj.allpage					
					},
					async : false,
					cache : false,
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					success : function (resultsData) {
						$('#sse_list_1 dl').remove(); 
						if (resultsData=='undefine' || resultsData.data=='undefine' || resultsData.data.length==0){
							$('#sse_list_1').append("<dl><dd>暂无数据</dd></dl>");
							 return 
						}else{
							var htmlStr="<dl>";
						for(var i=0;i<resultsData.data.length;i++){							
							htmlStr+='<dd><span>'+resultsData.data[i].CRELEASETIME+'</span>';
							htmlStr+='<a   href="'+resultsData.data[i].CURL+'"  title="'+resultsData.data[i].CTITLE_TXT+'" target="_blank">'+resultsData.data[i].CTITLE_TXT+'</a>';
							htmlStr+='</dd>';	
						}	
						htmlStr+='</dl>';
						if(isInteger(Number(resultsData.count/20))){
                    		pageCount = Number(resultsData.count/20) +""
                		}else{
                   			pageCount =Number( parseInt(resultsData.count/20)+1) +""
                		}
                      $("#spage").val(resultsData.page)
					  $('#sse_list_1').append(htmlStr);
					  if(!obj.noinitpage){// init is reset page or no reset
					  	printPage()
					  }					
					  $("#pageinfo li a").bind("click",function(){
   	   					pageClick($(this))
   	   					}) 
   	   				  $("#mobeilpage button").eq(0).unbind().bind("click",function(e){	
   	   				  	//e.stopPropagation();
   	   					spageUp()
   	   					})
   	   				  $("#mobeilpage button").eq(1).unbind().bind("click",function(e){
   	   				  		//e.stopPropagation();
   	   					spageDown()
   	   					}) 			
					}
		  	},complete:function(){
                   hideloading()
              }
		  });
		}
   	   init({
   	   		searchWord:searchWord,
   	   		page:"1",
   	   		allpage:"20"
   	   })

   	  }