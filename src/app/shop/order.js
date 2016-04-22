/**
 * Created by leven on 16/4/16.
 */

 
import Xhr from '../utils/xhr';
import mainHtml from './order.tpl.html';
import Tool from '../utils/tool';
import Constant from '../utils/constant';
import $ from "jquery";

class OrderController {

    constructor() {
       
        this.init();
    }
    init(){
        var that = this;
        this.getUserOrder(1, function(res){
            res.data = that.transformData(res.data);
            var topicsTpl = Tool.renderTpl(mainHtml, res);
            $('.media-list ul').html('').append($(topicsTpl));
        });
        this.setAvatar(Constant.AVATAR);
        this.pushRefresh();
        this.loadMore();
    }
    getUserOrder(page, callback){
        var params = {
            page: page,
            tab: 'all',
            success: success,
            error: error
        }, that = this;
        function success(res){
            console.log(res);
            callback && callback(res);
        };
        function error(err){
            console.log(err);
        }
        Xhr.getUserOrder(params)
    }
    setAvatar(pic){
        var _avatarElm = $('.panel-avatar img');
        _avatarElm.attr('src', pic);
    }
    pushRefresh(){
        var ptrContent = $$('.pages').find('.pull-to-refresh-content'),

       // var ptrContent = $('.pull-to-refresh-content'),
            that = this;
        //alert(ptrContent.html())
        ptrContent.on('refresh', function (e) {
            
            that.getUserOrder(1, function(res){
                res.data = that.transformData(res.data);
                var topicsTpl = Tool.renderTpl(mainHtml, res);
                $('.media-list ul').html('').append($(topicsTpl));
                window.application.pullToRefreshDone();
            });
        });
    }
    loadMore(){
        var loading = false,
            that = this,
            page = 2;
        $('.infinite-scroll').on('infinite', function () {
            if (loading) return;
            loading = true;
            that.getUserOrder(page, function(res){
                if (res.length !== 0) {
                    ++page;
                    res.data = that.transformData(res.data);
                    var topicsTpl = Tool.renderTpl(mainHtml, res);
                    $('.media-list ul').append($(topicsTpl));
                    loading = false;
                } else {
                    window.application.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').remove();
                }
            });
        });
    }
    transformData(data){
        for (var i = 0, l = data.length; i < l; i++) {

                data[i].remark = '活动详情';

        };
        return data;
    }

}
export { OrderController }