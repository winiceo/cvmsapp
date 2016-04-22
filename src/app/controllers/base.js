/**
 * Created by leven on 16/4/16.
 */

import { HomeController } from '../home/controller';
import {ActivtyDetailController} from '../home/detail';
import {CardController} from '../card/controller';
import {CounitController} from '../counit/controller';
import {SettingsContontroller} from '../settings/controller';
import {ProfileContontroller} from '../profile/controller';
import {VoteController}  from '../vote/controller';
import {VoteDetailController}  from '../vote/detail';
import {SurveyController}  from '../survey/controller';
import {SurveyDetailController}  from '../survey/detail';
import {ShopController}  from '../shop/controller';
import {AwardDetailController}  from '../shop/detail';
import {OrderController}  from '../shop/order';

import {MyactivtyController}  from '../myactivty/controller';


var module =angular.module("f7.app.controllers", [])
    .controller('home', HomeController)
    .controller('card', CardController)
    .controller('counit', CounitController)
    .controller('settings', SettingsContontroller)
    .controller('profile', ProfileContontroller)
    .controller('vote', VoteController)
    .controller('vote_detail', VoteDetailController)
    .controller('survey', SurveyController)
    .controller('survey_detail', SurveyDetailController)
    .controller('activty_detail', ActivtyDetailController) 
    .controller('shop', ShopController)
    .controller('order', OrderController)
    .controller('award_detail', AwardDetailController)
    .controller('myactivty', MyactivtyController)
    ;
 
export default module;