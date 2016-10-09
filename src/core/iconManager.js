/**
 * Created by yubing on 2016/10/8.
 */
angular.module('icon.manager',[])
    .provider('iconManager',function(){
        this.$get=function(){
            var iconMap = {
                'dir':'img/files/tree-dir.png',
                'js':'img/files/javaScript.png',
                'css':'img/files/css.png',
                'text':'img/files/text.png'
            };
            return function(type){
                if(iconMap.hasOwnProperty(type)){
                    return iconMap[type];
                }
                else{
                    return "img/empty.png";
                }
            }
        }
    });