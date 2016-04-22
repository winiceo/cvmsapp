/**
 * Created by leven on 16/4/16.
 */

 
import $ from "jquery";

import Xhr from '../utils/xhr';
import Tool from '../utils/tool';
import Constant from '../utils/constant';  
import detailTpl from './detail.tpl.html'; 
import Loading from '../components/loading';


class VoteDetailController {

    constructor($stateParams) {
        var id = $stateParams.id;
        this.init(id);
    }

    init(page) {
        console.log(page)
        var _ID = page;
        this.getVoteById(_ID);
        this.bindEvent();
    }

    getVoteById(id) {
        Loading.show();
        var that = this;
        var params = {
            id: id,
            success: (res) => {
                console.log(res.data);
                Loading.hide();
                res.data["img_url"] = Constant.IMAGE_URL;
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
        Xhr.getVoteById(params);
    }

    bindEvent(id) {

        var params = {

            type: "POST",
            success: (res) => {
                console.log(res.data);
                Loading.hide();
                window.application.alert(res.err_msg);
            },
            error: (err) => {
                console.log(err);
            }
        };

        $$('.vote').on('click', function (e) {
            params.id = $$(this).data("id")
            Xhr.postVoteSubmit(params);
            // do something with response data
        });
    }

}

export {VoteDetailController}