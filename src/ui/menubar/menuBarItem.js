/**
 * Created by yubing on 2016/9/22.
 */
angular.module('ui-menuBarItem',['ngSanitize','ui.bootstrap'])
    .directive('menuBarItem',['$compile','actionManager',function($compile,actionManager){
        function template(){
            return "<li class='menuBarItem' ng-class='{\"menu-bar-item-active\":isOpen}' is-open='isOpen' uib-dropdown  on-toggle='onToggle()' ng-mouseenter='enter()'>" +
                "<span uib-dropdown-toggle ><under-line-text text='{{action.text}}'></under-line-text></span>" +
                "<menu action='{{action.id}}'></menu>" +
                "</li>"
        }
        return {
            restrict:'E',
            replace :true,
            require:['menuBarItem','?menuBar','?^menuBar'],
            scope:{
            },
            controller:function($scope){
                this.open = function(){
                   $scope.isOpen = true;
                };
                this.close = function(){
                    $scope.isOpen = false;
                };
            },
            template:template(),
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

                $scope.onToggle = function(){
                    if($scope.isOpen){
                        ctrl.select($scope.action.id);
                    }
                    else{
                        if(ctrl.getActive() === $scope.action.id){
                            ctrl.select(undefined);
                        }
                    }

                    var action = actionManager.getAction($scope.action.id);
                    action.trigger();
                };

                $scope.enter = function () {
                    if(ctrl.getActive() != undefined){
                        ctrl.select($scope.action.id);
                    }
                };
            }
        }
    }]);