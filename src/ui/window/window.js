/**
 * Created by yubing on 2016/9/25.
 */
angular.module("ui-window",[])
    .directive("window",function(){
        return{
            restrict:'A',
            replace :false,
            link:function($scope,e,attr){
                e.addClass("ui-window");
            }
        }
    });