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
                    s(scope);
                };

                $scope.prevItem = function(){
                    if($scope.items.length == 0){
                        return;
                    }
                    if($scope.select == undefined){
                        s($scope.items[0].scope);
                        return;
                    }
                    if($scope.select.parent == undefined){
                        return;
                    }
                    var index = $scope.select.parent.children.indexOf($scope.select.item);
                    if(index  > 0){
                        s(getLastItem($scope.select.parent.children[index - 1]).scope);
                    }
                    else{
                        s($scope.select.parent.scope);
                    }
                };

                $scope.nextItem = function(){
                    if($scope.items.length == 0){
                        return;
                    }
                    if($scope.select == undefined){
                        s($scope.items[0].scope);
                        return;
                    }
                    if($scope.select.item.hasOwnProperty("children") && $scope.select.item.children.length > 0 && $scope.select.expend){
                        s($scope.select.item.children[0].scope);
                        return;
                    }
                    if($scope.select.parent == undefined){
                        return;
                    }
                    var i = getNextItem($scope.select.item);
                    if(i){
                        s(i.scope);
                    }
                };

                $scope.toParent = function(){
                    if($scope.select == undefined){
                        s($scope.items[0].scope);
                        return;
                    }
                    if(!$scope.select.item.scope.parent){
                        return;
                    }
                    s($scope.select.item.scope.parent.scope);
                };

                function s(scope) {
                    if($scope.select != undefined){
                        $scope.select.select = false;
                        $scope.select.$apply();
                    }
                    $scope.select = scope;
                    if($scope.select != undefined){
                        $scope.select.select = true;
                        $scope.select.$apply();
                    }
                }

                function getLastItem(item){
                    if(!item.children || item.children.length == 0){
                        return item;
                    }
                    if(!item.scope.expend){
                        return item;
                    }
                    return getLastItem(item.children[item.children.length - 1]);
                }
                function getNextItem(item){
                    if(!item.scope.parent){
                        return undefined;
                    }
                    var index = item.scope.parent.children.indexOf(item);
                    if(index === item.scope.parent.children.length - 1){
                        return getNextItem(item.scope.parent);
                    }
                    else{
                        return item.scope.parent.children[index + 1];
                    }
                }
            },
            link:function($scope,e,attr){
                e.on('keydown',function(e){
                    if(e.altKey || e.shiftKey || e.ctrlKey || e.metaKey){
                        return;
                    }
                    if(e.keyCode === 40){
                        $scope.nextItem();
                    }
                    else if(e.keyCode ===38){
                        $scope.prevItem();
                    }
                    else if(e.keyCode == 39){
                        if(!$scope.select){
                            $scope.nextItem();
                            return;
                        }
                        if($scope.select.item.children && $scope.select.item.children.length > 0){
                            if(!$scope.select.expend){
                                $scope.select.makeExpend();
                            }
                            else{
                                $scope.nextItem();
                            }
                        }
                    }
                    else if(e.keyCode == 37){
                        if(!$scope.select){
                            $scope.nextItem();
                            return;
                        }
                        if($scope.select.item.children && $scope.select.item.children.length > 0 && $scope.select.expend){
                            $scope.select.makeExpend();
                        }
                        else{
                            $scope.toParent();
                        }
                    }
                    else if(e.keyCode == 13){
                        if(!$scope.select){
                            return;
                        }
                        if($scope.select.item.children && $scope.select.item.children.length > 0){
                            $scope.select.makeExpend();
                        }
                    }
                })
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
                expend:'=',
                parent:'='
            },
            require:['?^uiTreeList'],
            templateUrl:'ui/treelist/treelistitem.html',
            controller:function($scope){
                $scope.makeExpend = function(){
                    $scope.expend = !$scope.expend;
                    if(!$scope.expend){
                        angular.forEach($scope.item.children,function (item) {
                            item.scope.expend = false;
                        })
                    }
                    if(!$scope.$root.$$phase){
                        $scope.$apply();
                    }
                };
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
                    $scope.item.scope = $scope;
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