$(function () { 
    function tabs(tabTit,on,tabCon){
        $(tabTit).children().click(function(){
            $(this).addClass(on).siblings().removeClass(on);
            var index = $(tabTit).children().index(this);
            $(tabCon).children().eq(index).show().siblings().hide();
            if (index == 0) {
                type = 1
            }else if (index == 1) {
                type = 0
            }
    	});
	};
    tabs(".tab_hd","active",".tab_bd");
 })