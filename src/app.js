/**
 * Created by yubing on 2016/9/21.
 */

/**
 * IDE的入口module
 */
angular.module('app',['core','ui'])
    .config(function(actionManagerProvider){

        initMainMenuAction();
        initFileMenuGroupAction();
        initNewMenuAction();

        function initMainMenuAction() {
            var main_menu_group=actionManagerProvider.addAction("main-menu-group",null);
            var  action= actionManagerProvider.addAction("file-menu-group",main_menu_group);
            action.text = "&File";
            action = actionManagerProvider.addAction("edit-menu-group",main_menu_group);
            action.text = "&Edit";
            action = actionManagerProvider.addAction("view-menu-group",main_menu_group);
            action.text = "&View";
            action = actionManagerProvider.addAction("navigate-menu-group",main_menu_group);
            action.text = "&Navigate";
            action = actionManagerProvider.addAction("code-menu-group",main_menu_group);
            action.text = "&Code";
            action = actionManagerProvider.addAction("refactor-menu-group",main_menu_group);
            action.text = "&Refactor";
            action = actionManagerProvider.addAction("run-menu-group",main_menu_group);
            action.text = "R&un";
            action = actionManagerProvider.addAction("tools-menu-group",main_menu_group);
            action.text = "&Tools";
            action = actionManagerProvider.addAction("vcs-menu-group",main_menu_group);
            action.text = "VC&S";
            action = actionManagerProvider.addAction("window-menu-group",main_menu_group);
            action.text = "&Window";
            action = actionManagerProvider.addAction("help-menu-group",main_menu_group);
            action.text = "&Help";
        }

        function initFileMenuGroupAction(){
            var file_menu_group = actionManagerProvider.getAction("file-menu-group");
            var action = actionManagerProvider.addAction("new-action",file_menu_group);
            action.text = "New";
            action = actionManagerProvider.addAction("open-action",file_menu_group);
            action.text = "&Open ...";
            action.icon = "./img/actions/menu-open.png";
            action = actionManagerProvider.addAction("new-project-separate-action",file_menu_group);
            action.separate = true;
        }

        function initNewMenuAction(){
            var new_menu = actionManagerProvider.getAction("new-action");
            var action = actionManagerProvider.addAction("new-project-action",new_menu);
            action.text = "Project ...";
            action = actionManagerProvider.addAction("new-project-separate-action",new_menu);
            action.separate = true;
        }
    });