/**
 * Created by leven on 16/4/16.
 */
 
class ProfileContontroller {

    constructor($stateParams) {


    	$$('.logout').on('click', function () {
		  var modal = window.application.modal({
		    title: '',
		    text: '你确定要退出吗',
		    afterText:  '<div class="swiper-container" style="width: auto; margin:5px -15px -15px">'+
		                  '<div class="swiper-pagination"></div>'+
		                  '<div class="swiper-wrapper">'+
		                    '<div class="swiper-slide"><img src="/assets/images/publicBanner.jpg" height="150" style="display:block"></div>' +
 		                  '</div>'+
		                '</div>',
		    buttons: [
		      {
		        text: '取消'
		      },
		      {
		        text: '确定',
		        bold: true,
		        onClick: function () {
		          window.application.alert('你已退出')
		        }
		      },
		    ]
		  })
		  //window.application.swiper($$(modal).find('.swiper-container'), {pagination: '.swiper-pagination'});
		});
          


        
    }


}
export { ProfileContontroller }