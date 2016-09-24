/**
 * Created by yubing on 2016/9/24.
 */

angular.module("ui-menu",[])
    .directive("menu",['actionManager',function(actionManager){
        return {
            restrict:'E',
            replace :true,
            scope:{
            },
            require:['menu'],
            template:
            "<ul class='pop-menu' uib-dropdown-menu>" +
            "<menu-item ng-repeat='item in items' id='{{item}}'></menu-item>" +
            "</ul>",
            controller:function($scope){
                $scope.menuItems = {};

                this.addMenu = function(id,ctrl){
                    $scope.menuItems[id] = ctrl;
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
    .directive("menuItem",['actionManager',function (actionManager) {
        return {
            restrict:'E',
            replace :true,
            scope:{
            },
            require:['menuItem','?menu','?^menu'],
            template:
            "<li ng-class='{\"menu-bar-item-active\":select}' ng-mouseenter='enter()'>" +
            "<div style='width: 24px;height: 20px;float: left;'><img ng-if='action.icon' style='margin-left:4px;width: 16px;height: 16px;' ng-src='{{action.icon}}'></div><under-line-text text='{{action.text}}'></under-line-text>" +
            "</li>",
            controller:function($scope){
                this.select = function(){
                    $scope.select = true;
                };
                this.unSelect = function(){
                    $scope.select = false;
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
                    $scope.action.text = action.text;
                    $scope.action.id = action.id;
                    $scope.action.icon = action.icon;
                    menuCtrl.addMenu($scope.action.id,itemCtrl);
                });

                $scope.enter = function () {
                    menuCtrl.select($scope.action.id);
                };
            }
        }
    }]);