/**
 * Created by yubing on 2016/10/8.
 */
angular.module("ui-treeList",[])
    .directive("uiTreeList",function () {
        return {
            restrict:'E',
            replace :true,
            scope:{
                items:'=',
                firstItemExpend:'='
            },
            templateUrl:'ui/treelist/treelist.html',
            controller:function($scope){
                $scope.select = undefined;
                this.select = function(scope){
                    if($scope.select != undefined){
                        $scope.select.select = false;
                    }
                    $scope.select = scope;
                    if($scope.select != undefined){
                        $scope.select.select = true;
                    }
                }
            },
            link:function($scope,e,attr){
            }
        }
    })
    .directive("uiTreeItem",function (iconManager) {
        return {
            restrict:'E',
            replace :true,
            scope:{
                item:'=',
                marginLeft:'=',
                expend:'='
            },
            require:['?^uiTreeList'],
            templateUrl:'ui/treelist/treelistitem.html',
            controller:function($scope){
                $scope.makeExpend = function(){
                    $scope.expend = !$scope.expend;
                }
            },
            link:function($scope,e,attr,ctrls){
                var li = $(e.find('li')[0]);
                var treeCtrl = ctrls[0];

                li.on("mousedown",function(){
                   treeCtrl.select($scope);
                });

                $scope.$watch("item",function(newValue){
                    var icon = newValue.icon || '';
                    $scope.fileIcon = iconManager(icon);
                });
                $scope.$watch("select",function(v){
                    if($scope.select){
                        li.addClass("ui-tree-list-item-select");
                    }
                    else{
                        li.removeClass("ui-tree-list-item-select");
                    }
                })
            }
        }
    });