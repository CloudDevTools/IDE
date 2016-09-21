/**
 * Created by yubing on 2016/9/21.
 */
angular.module('action.manager',[])
    .provider('actionManager',function(){

        this.actionMap = {};

        function Action(){

        }
        Action.prototype = {
            children:[],
            parent:null,
            id:'',
            text:'',
            icon:'',
            trigger:function(){
                angular.forEach(this.listener,function(l){
                    if(angular.isFunction(l.trigger)){
                        l.trigger();
                    }
                });
            },
            listener:[],
            addListener:function(l){
                if(this.listener.indexOf(l)){
                    return;
                }
                this.listener.push(l);
            },
            removeListener:function(l){
                this.listener.remove(l);
            }
        };

        this.$get=function(){
            return {
                addAction:function(parent){
                    var action = new Action();
                    action.parent = parent;
                    if(!!action.parent){
                        action.parent.children.push(action);
                    }
                    return action;
                },
                delAction:function del(action){
                    if(!!action.parent){
                        action.parent.children.remove(action);
                    }
                    if(actionMap.hasOwnProperty(action.id)){
                        delete actionMap[action.id];
                    }
                    angular.forEach(action.children,function(ac){
                        del(ac);
                    });
                },
                getAction:function(id){
                    if(!id){
                        return null;
                    }
                    if(actionMap.hasOwnProperty(id)){
                        return actionMap[id];
                    }
                    else{
                        return null;
                    }
                }
            };
       }
    });