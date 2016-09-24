/**
 * Created by yubing on 2016/9/24.
 */
angular.module("ui-core",[])
    .directive("underLineText",function(){
       return {
           restrict:'E',
           replace :true,
           scope:{
           },
           template:'<span></span>',
           link:function($scope,e,attrs){
               attrs.$observe("text",function (newValue) {
                   e.html(getUnderlineText(newValue,'&'));
               })
           }
       }
    });