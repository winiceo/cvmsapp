'use strict';

import Constant from './constant';
 
import $ from "jquery";

export default   {
    getCounit(params) {
        params.path = '/api/v1/counit?next_id=' + params.next_id + '&limit=10';
        request(params);
    },
    getActivty(params) {
        params.path = '/api/v1/activty?next_id=' + params.next_id + '&tab=' + params.tab + '&limit=10';
        request(params);
    },
    getActivtyById(params) {
        params.path = '/api/v1/activty/detail/'+params.id;
        request(params);
    },
    getMyActivty(params) {
        params.path = '/api/v1/myactivty?next_id=' + params.next_id + '&tab=' + params.tab + '&limit=10';
        request(params);
    },
    getMyActivtyById(params) {
        params.path = '/api/v1/myactivty/detail/'+params.id;
        request(params);
    },
    getActivtyApply(params) {
        params.path = '/api/v1/activty/apply/'+params.id;
        request(params);
    },
    getVote(params) {
        params.path = '/api/v1/vote?page=' + params.page + '&tab=' + params.tab + '&limit=10';
        request(params);
    },
    getVoteById(params) {
        params.path = '/api/v1/vote/detail/'+params.id;
        request(params);
    },
    postVoteSubmit(params) {
        params.path = '/api/v1/vote/save/'+params.id;
        request(params);
    },
    getSurvey(params) {
        params.path = '/api/v1/survey?page=' + params.page + '&tab=' + params.tab + '&limit=10';
        request(params);
    },
    getSurveyById(params) {
        params.path = '/api/v1/survey/detail/'+params.id;
        request(params);
    },
    postSurveySubmit(params) {
        params.path = '/api/v1/survey/save/'+params.id;
        request(params);
    },
    getShop(params) {
        params.path = '/api/v1/shop?page=' + params.page + '&tab=' + params.tab + '&limit=10';
        request(params);
    },
    postOrderSubmit(params) {
        params.path = '/api/v1/order/save/'+params.id;
        request(params);
    },
    getAwardById(params) {
        params.path = '/api/v1/award/detail/'+params.id;
        request(params);
    },
    getUserOrder(params) {
        params.path = '/api/v1/user/order?page=' + params.page + '&tab=' + params.tab + '&limit=10';
        request(params);
    },
    getUserOrderDetail(params) {
        params.path = '/api/v1/user/order/detail/'+params.id;
        request(params);
    },
};

function request(params) {
    var defaults = {
        url: Constant.SERVER_URL + params.path,
        type: 'GET',
        // contentType: 'application/json',
        dataType: 'json',
        complete: function(request, status) {}
    }
    $.each(defaults, function(key, val){
        if (!params[key]) {
            params[key] = val;
        }
    });
    
    var _successFn = params.success;
    params.success = function(result, status, xhr){
        if (false) {
            //拦截
            return;
        }
        _successFn(result, status, xhr);
    };
    
    if (params.type.toUpperCase() === 'POST' && params.contentType && params.contentType.indexOf('json') != -1) {
        params.data = JSON.stringify(params.data);
    }
    console.log('调用接口:\n%s,\n参数列表:', params.url, params.data);
    $.ajax(params);
};

 