/**
 * Created by leven on 16/4/16.
 */


import $ from "jquery";

import Xhr from '../utils/xhr';
import Tool from '../utils/tool';


import detailTpl from './detail.tpl.html';

import Loading from '../components/loading';


class ActivtyDetailController {

    constructor($stateParams) {
        var id = $stateParams.id;
        this.init(id);
    }

    init(id) {

        var _ID = id;
        this.getActivtyById(_ID);

    }

    getActivtyById(id) {
        Loading.show();
        var that = this;
        var params = {
            id: id,
            success: (res) => {
                console.log(res.data);
                Loading.hide();
                //res.data.create_at = Tool.publishTime(res.data.create_at);
                var detailTPl = Tool.renderTpl(detailTpl, res.data);
                //console.log(res.data.data)
                $('.detail-page').append($(detailTPl));
                that.bindEvent(id);
            },
            error: (err) => {
                console.log(err);
            }
        };
        Xhr.getActivtyById(params);
    }

    // showActionSheet(){
    //     var btns = [{
    //             text:'回复',
    //             onClick(){
    //                 Modal.alert('你点击了回复');
    //             }
    //         }];
    //     showActionSheet(btns);
    // }
    // showPhotoBrowser(){
    //     var _img = $(this); //注意这个this
    //     showPhotoBrowser(new Array(1).fill(_img.attr('src')));

    // }
    bindEvent(id) {

        var params = {
            id: id,
            success: (res) => {
                console.log(res.data);
                Loading.hide();

                // var popupHTML = '<div class="popup">'+
                //     '<div class="content-block">'+
                //     '<p>Popup created dynamically.</p>'+
                //     '<p><a href="#" class="close-popup">Close me</a></p>'+
                //     '</div>'+
                //     '</div>'
                // window.application.popup(popupHTML);
                window.application.alert(res.err_msg);

            },
            error: (err) => {
                console.log(err);
            }
        };
        $$('.apply').on('click', function () {
            Loading.show();
            Xhr.getActivtyApply(params);
        })

    }

}

export {ActivtyDetailController}