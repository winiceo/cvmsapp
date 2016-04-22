/**
 * Created by leven on 16/4/16.
 */


import $ from "jquery";

import Xhr from '../utils/xhr';
 import Tool from '../utils/tool';


 
import detailTpl from './detail.tpl.html';
  
import Loading from '../components/loading';
 
 

class AwardDetailController {

    constructor($stateParams) {
        this.id=$stateParams.id;
        this.init();
    }

    init(){
        
        this.getAwardById();
        this.bindEvent();
    }
    getAwardById(){
        Loading.show();
        var that=this;
        var params = {
            id: this.id,
            success: (res) => {
                console.log(res.data);
                Loading.hide();
                //res.data.create_at = Tool.publishTime(res.data.create_at);
                var detailTPl = Tool.renderTpl(detailTpl, res.data);
                //console.log(res.data.data)
                $('.detail-page').append($(detailTPl));
                that.bindEvent();

            },
            error: (err) => {
                console.log(err);
            }
        };
        Xhr.getAwardById(params);
    }
    
    bindEvent(){
        var params = {
            id:this.id,
            type:"GET",
            success: (res) => {
                console.log(res.data);
                Loading.hide();
                window.application.alert(res.err_msg);

            },
            error: (err) => {
                window.application.alert("未知错误,请稍后再试");
                console.log(err);
            }
        };

        $$('.save_order').on('click', function (e) {
            //params.id=$$(this).data("id")
            Xhr.postOrderSubmit(params);
            // do something with response data
        });
    }

}
 
export { AwardDetailController }