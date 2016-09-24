/**
 * Created by yubing on 2016/9/22.
 */
angular.module('ui-menuBarItem',['ngSanitize','ui.bootstrap'])
    .directive('uiMenuBarItem',['$compile','actionManager',function($compile,actionManager){
        return {
            restrict:'E',
            replace :true,
            require:['uiMenuBarItem','?uiMenuBar','?^uiMenuBar'],
            scope:{
            },
            controller:function($scope,$rootScope){
                this.select = function(){
                    $scope.select = true;
                    if (!$rootScope.$$phase) {
                        $scope.$apply();
                    }
                };
                this.unSelect = function(){
                    $scope.select = false;
                    if (!$rootScope.$$phase) {
                        $scope.$apply();
                    }
                };
            },
            templateUrl:'ui/menuBar/menuBarItem.html',
            link:function($scope,e,attrs,ctrls){
                var itemCtrl = ctrls[0];
                var ctrl = ctrls[1];
                if(!ctrl){
                    ctrl = ctrls[2];
                    if(!ctrl){
                        return;
                    }
                }
                $scope.action = {};


                attrs.$observe("action",function(newValue){
                    var action = actionManager.getAction(newValue);
                    if(action == null){
                        $scope.action = {};
                        return;
                    }
                    $scope.action.text = action.text;
                    $scope.action.id = action.id;
                    ctrl.addMenuBarItem($scope.action.id,itemCtrl);
                });

                $scope.$watch("select",function(){
                    if($scope.select){
                        e.addClass("ui-menu-bar-item-active");
                        $(e).focus();
                    }
                    else{
                        e.removeClass("ui-menu-bar-item-active");
                    }
                });

                $scope.enter = function () {
                    if(ctrl.getActive() != undefined){
                        ctrl.select($scope.action.id);
                    }
                };

                $scope.click = function(){
                    if(!$scope.select){
                        ctrl.select($scope.action.id);
                    }
                    else{
                        if(ctrl.getActive() === $scope.action.id){
                            ctrl.select(undefined);
                        }
                        var action = actionManager.getAction($scope.action.id);
                        action.trigger();
                    }
                };


                e.on("keydown",function(e){
                    if(e.ctrlKey || e.shiftKey || e.altKey){
                        return;
                    }
                    else{
                        if(e.keyCode == 37){
                            ctrl.prevMenu($scope.action.id);
                        }
                        else if(e.keyCode == 39){
                            ctrl.nextMenu($scope.action.id);
                        }
                    }
                });
                $scope.$on("window-click",function(e,t,s){
                    var sc = s;
                    while(sc){
                        if(sc.$id == $scope.$id){
                            break;
                        }
                        sc = sc.$parent;
                    }
                    if(sc){
                        return;
                    }
                    if(ctrl.getActive() === $scope.action.id){
                        ctrl.select(undefined);
                        var action = actionManager.getAction($scope.action.id);
                        action.trigger();
                    }
                });
            }
        }
    }]);