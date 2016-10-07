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
                attr.$observe("action",function(newValue){
                   var items = [];
                    var action = actionManager.getAction(newValue);
                    if(action == null){
                        $scope.items = items;
                        return;
                    }
                    angular.forEach(action.children,function(ac){
                       var item = {
                           'id':ac.id,
                           'text':ac.text,
                           'icon':ac.icon,
                           'separate':ac.separate
                       } ;
                       items.push(item);
                    });
                    $scope.items = items;
                });
            }
        }
    }])
    .directive("uiToolbarItem",['actionManager',function (actionManager) {
        return{
            restrict:'E',
            replace :true,
            scope:{
            },
            templateUrl:'ui/toolbar/toolbarItem.html',
            link:function($scope,e,attr){
                attr.$observe("key",function(key){
                    $scope.action = actionManager.getAction(key);
                });

            }
        }
    }]);