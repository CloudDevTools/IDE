/**
 * Created by yubing on 2016/9/24.
 */

angular.module("ui-menu",[])
    .directive("uiMenu",['actionManager',function(actionManager){
        return {
            restrict:'E',
            replace :true,
            scope:{
            },
            require:['uiMenu'],
            templateUrl:"ui/menu/menu.html",
            controller:function($scope){
                $scope.menuItems = {};
                $scope.list = [];

                this.addMenu = function(id,ctrl){
                    $scope.menuItems[id] = ctrl;
                    $scope.list.push(id);
                };
                $scope.selectID = undefined;
                this.select = function(id){
                    if($scope.selectID == id){
                        return;
                    }
                    if($scope.menuItems.hasOwnProperty($scope.selectID)){
                        $scope.menuItems[$scope.selectID].unSelect();
                    }
                    $scope.selectID = id;
                    if($scope.menuItems.hasOwnProperty($scope.selectID)){
                        $scope.menuItems[$scope.selectID].select();
                    }
                };
            },
            link:function($scope,e,attrs,ctrls){
                $scope.items = [];
                $scope.selectID = undefined;
                $scope.opened = false;
                attrs.$observe("action",function(newValue){
                   var ac = actionManager.getAction(newValue);
                    if(ac == null){
                        $scope.items = [];
                        return;
                    }
                    ac.addListener(function(){
                        ctrls[0].select(undefined);
                    });
                    var its = [];
                    angular.forEach(ac.children,function(act){
                       its.push(act.id);
                    });
                    $scope.items = its;
                });
            }
        }
    }])
    .directive("uiMenuItem",['actionManager',function (actionManager) {
        return {
            restrict:'E',
            replace :true,
            scope:{
            },
            require:['uiMenuItem','?uiMenu','?^uiMenu'],
            templateUrl:"ui/menu/menuItem.html",
            controller:function($scope,$rootScope){
                this.select = function(){
                    $scope.select = true;
                    if (!$rootScope.$$phase) {
                        $scope.$apply();
                    }
                };
                this.unSelect = function(){
                    $scope.select = false;
                    var action = actionManager.getAction($scope.action.id);
                    if(action.children.length > 0){
                        action.trigger();
                    }
                    if (!$rootScope.$$phase) {
                        $scope.$apply();
                    }
                }
            },
            link:function($scope,e,attrs,ctrls){
                $scope.select = false;
                var itemCtrl = ctrls[0];
                var menuCtrl = ctrls[1];
                if(!menuCtrl){
                    menuCtrl = ctrls[2];
                    if(!menuCtrl){
                        return;
                    }
                }
                $scope.action = {};
                attrs.$observe("id",function(newValue){
                    var action = actionManager.getAction(newValue);
                    if(action == null){
                        $scope.action = {};
                        return;
                    }
                    $scope.action=action;
                    menuCtrl.addMenu($scope.action.id,itemCtrl);
                });

                $scope.enter = function () {
                    if($scope.action.separate){
                        menuCtrl.select(undefined);
                    }
                    else{
                        menuCtrl.select($scope.action.id);
                    }
                };
                $scope.leave = function(){
                    if($scope.action.children.length == 0){
                        menuCtrl.select(undefined);
                    }
                }
            }
        }
    }]);