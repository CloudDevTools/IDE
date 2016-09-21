/**
 * Created by yubing on 2016/9/21.
 */
angular.module('ui-line',[])
    .directive('line',function(){

        return {
            restrict:'E',
            replace :true,
            scope:{
            },
            template:'<div class="line-{{type}}"><div class="line-{{type}}-part1"></div><div class="line-{{type}}-part2"></div></div>',
            controller:function ($scope) {
                this.setLineType = function(type){
                    if(type === 'vertical' || type === 'horizontal'){
                        $scope.type = type;
                    }
                };
                $scope.type = 'horizontal';
            }
        }
    })
    .directive('line-type',function(){
        return {
            restrict:'A',
            require:'line',
            compile:function(){
                return function (scope, elm, attrs,ctrl){
                    if(!ctrl[0]){
                        return;
                    }
                    function setType(type){
                        if(type !== 'vertical'){
                            type = 'horizontal';
                        }
                        ctrl[0].setLineType(type)
                    }

                    var t = attrs['lineType'] || 'horizontal';
                    setType(t);

                    attrs.$observe('line-type',function(){
                        var t = attrs['lineType'] || 'horizontal';
                        setType(t);
                    });
                }
            }
        }
    });