/**
 * Created by yubing on 2016/9/28.
 */
angular.module("ui-toolbar",[])
    .directive("uiToolbar",['actionManager',function (actionManager) {
        return{
            restrict:'E',
            replace :true,
            scope:{

            },
            templateUrl:'ui/toolbar/toolbar.html',
            link:function($scope,e,attr){
            }
        }
    }]);