/**
 * Created by yubing on 2016/10/8.
 */
angular.module("ui-treeList",[])
    .directive("uiTreeList",function () {
        return {
            restrict:'E',
            replace :true,
            scope:{
                items:'='
            },
            templateUrl:'ui/treelist/treelist.html',
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
                marginLeft:'='
            },
            templateUrl:'ui/treelist/treelistitem.html',
            link:function($scope,e,attr){
                $scope.$watch("item",function(newValue){
                    var icon = newValue.icon || '';
                    $scope.fileIcon = iconManager(icon);
                });
            }
        }
    });