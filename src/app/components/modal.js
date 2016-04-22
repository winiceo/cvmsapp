'use strict';

export default {
    alert(text, callback){
        window.application.modal({
            title: '提示',
            text,
            buttons: [{
                text: '确定',
                onClick(){
                    callback && callback();
                }
            }]
        });
    },
    confrim(text, callback){
        window.application.modal({
            title: '提示',
            text,
            buttons: [{
                text: '取消'
            },{
                text: '确定',
                onClick(){
                    callback && callback();
                }
            }]
        });
    }
};