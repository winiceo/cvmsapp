/**
 * Created by leven on 16/4/16.
 */

import $ from "jquery";

import Xhr from '../utils/xhr';
import Tool from '../utils/tool';
 
import detailTpl from './detail.tpl.html';

import Loading from '../components/loading';


class SurveyDetailController {

    constructor($stateParams) {
        var id = $stateParams.id;
        this.init(id);
    }

    init(page) {
        console.log(page)
        var _ID = page;
        this.getSurveyById(_ID);

    }

    getSurveyById(id) {
        Loading.show();
        var that = this;
        var params = {
            id: id,
            success: (res) => {
                console.log(res.data);
                Loading.hide();
                var detailTPl = Tool.renderTpl(detailTpl, res.data);
                $('.detail-page').append($(detailTPl));
                that.bindEvent(id);
            },
            error: (err) => {
                console.log(err);
            }
        };
        Xhr.getSurveyById(params);
    }

    bindEvent(id) {

        var params = {
            id: id,
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
        //
        $$('.form-to-json').on('click', function (e) {
            var formData = window.application.formToJSON('.ajax-submit');
            params.data = formData;
            alert(JSON.stringify(formData));
            console.log(e)
            Xhr.postSurveySubmit(params);
            // do something with response data
        });
    }

}

export {SurveyDetailController}