/**
 * Created by leven on 16/4/16.
 */
 

import Xhr from '../utils/xhr';
import mainHtml from './main.tpl.html';
import Tool from '../utils/tool';
import Constant from '../utils/constant';
import $ from "jquery";
import Loading from '../components/loading';

//var moment = require('moment');
class HomeController {

    constructor() {
        this.tab="1";
        this.next_id=-1;
        this.init();

    }
    init(){

        this.setAvatar(Constant.AVATAR);
        this.pushRefresh();
        this.loadMore();
        this.tabInit();
        this.initData();
    }
    initData(){
        var that = this;

        this.getActivty( function(res){
            res.data = that.transformData(res.data);

            var topicsTpl = Tool.renderTpl(mainHtml, res);
            $('.media-list ul').html('').append($(topicsTpl));
        });
    }
    tabInit(){
        var that=this;
        $(".tab-link").each(function(){
            $$(this).on('click', function () {
                 $(".toolbar-inner a").each(function(){

                     $(this).removeClass("active")
                 })

                //$(".tab-link .active").removeClass("active")
                $(this).addClass("active")
                window.application.initPageMaterialTabbar(".homepage")
                that.tab=$(this).data("title")
                that.next_id=-1;
                that.initData()

            });
        })
       //
        // $$('.show-tab-1').on('click', function () {
        //
        //     window.application.showTab('#tab1');
        // });
        // $$('.show-tab-2').on('click', function () {
        //     window.application.showTab('#tab2');
        // });
        // $$('.show-tab-3').on('click', function () {
        //     window.application.showTab('#tab3');
        // });
    }

    getActivty( callback){
        var params = {
            next_id: this.next_id,
            tab: this.tab,
            success: success,
            error: error
        }, that = this;
        function success(res){
            console.log(res);
            Loading.hide();
            if(res.next_id){
                that.next_id=res.next_id;
            }else{
                that.next_id=0;
            }
            callback && callback(res);
        };
        function error(err){
            Loading.hide();
            console.log(err);
        }
        Loading.show();
        Xhr.getActivty(params)
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
            
            that.getActivty(function(res){
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
            that.getActivty( function(res){
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
                //data[i].start_at=moment(data[i].start_at).format("YYYY-MM-DD HH:mm")
                //data[i].end_at=moment(data[i].end_at).format("YYYY-MM-DD HH:mm")
                data[i].remark = '活动详情';

        };
        return data;
    }

}
export { HomeController }