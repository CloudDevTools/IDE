/**
 * Created by yubing on 2016/9/21.
 */
angular.module('action.manager',[])
    .provider('actionManager',function(){

        this.actionMap = {};

        function Action(){
            this.children = [];
            this.parent = null;
            this.id = '';
            this.text = '';
            this.icon ='';
            this.listener = [];
            this.separate = false;

        }
        Action.prototype = {
            trigger:function(){
                angular.forEach(this.listener,function(l){
                    if(angular.isFunction(l)){
                        l();
                    }
                });
            },
            addListener:function(l){
                if(this.listener.indexOf(l) != -1){
                    return;
                }
                this.listener.push(l);
            },
            removeListener:function(l){
                this.listener.remove(l);
            }
        };

        this.addAction = function(id,parent){
            if(!id){
                return null;
            }
            var action = new Action();
            action.id = id;
            action.parent = parent;
            if(!!action.parent){
                action.parent.children.push(action);
            }
            this.actionMap[id] = action;
            return action;
        };
        this.delAction = function del(action){
            if(!!action.parent){
                action.parent.children.remove(action);
            }
            if(this.actionMap.hasOwnProperty(action.id)){
                delete this.actionMap[action.id];
            }
            angular.forEach(action.children,function(ac){
                del(ac);
            });
        };
        this.getAction = function(id){
            if(!id){
                return null;
            }
            if(this.actionMap.hasOwnProperty(id)){
                return this.actionMap[id];
            }
            else{
                return null;
            }
        };

        this.$get=function(){
            return {
                actionMap:this.actionMap,
                addAction:this.addAction,
                delAction:this.delAction,
                getAction:this.getAction
            };
       }
    });