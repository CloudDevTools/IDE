/**
 * Created by yubing on 2016/9/21.
 */
angular.module('ui-menuBar',[])
    .directive('menuBar',['actionManager',function(actionManager){
        function template(){
            return "<div class='menuBar'><div class='menuBarContent'><ul style='margin: 0;float: left;padding: 0;height: 100%'><menu-bar-item ng-repeat='item in items' action='{{item}}'></menu-bar-item></ul></div><line></line></div>"
        }
        return {
            restrict:'E',
            replace :false,
            scope:{
            },
            controller:['$scope',function($scope){
                $scope.ctrl = {};
                $scope.active = undefined;
                this.select = function(id){
                    if($scope.active == id){
                        return;
                    }
                    if($scope.ctrl.hasOwnProperty($scope.active)){
                        $scope.ctrl[$scope.active].close();
                    }
                    $scope.active = id;
                    if($scope.ctrl.hasOwnProperty($scope.active)){
                        $scope.ctrl[$scope.active].open();
                    }
                };

                this.addMenuBarItem = function(id,ctrl){
                    $scope.ctrl[id] = ctrl;
                };

                this.getActive = function(){
                    return $scope.active;
                }
            }],
            template:template(),
            link:function($scope, elm, attrs){
                $scope.item = [];
                $scope.active = "";

                function updateItem(newValue){
                    var action = actionManager.getAction(newValue);
                    if(!action){
                        $scope.item = [];
                        return;
                    }
                    var items = [];
                    angular.forEach(action.children,function(ac){
                        items.push(ac.id);
                    });
                    $scope.ctrl = {};
                    $scope.active = undefined;
                    $scope.items = items;
                }

                attrs.$observe("action",updateItem);
            }
        }
    }]);