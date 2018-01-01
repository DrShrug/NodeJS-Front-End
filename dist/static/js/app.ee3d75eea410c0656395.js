webpackJsonp([1],{"+9UT":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"box",class:{"is-hidden":t.checkConditionsToHide}},[s("div",{staticClass:"columns"},[t._m(0),t._v(" "),s("div",{staticClass:"column is-6",on:{click:function(e){t.editMode=!0}}},[t.editMode?s("input",{directives:[{name:"model",rawName:"v-model",value:t.taskText,expression:"taskText"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.taskText},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.sendTaskChange(e)},blur:t.sendTaskChange,input:function(e){e.target.composing||(t.taskText=e.target.value)}}}):s("p",{class:{"has-text-danger":t.checkIfLate}},[t._v(t._s(t.taskText))])]),t._v(" "),s("div",{staticClass:"column is-2"},[s("div",{staticClass:"field has-addons"},[t._m(1),t._v(" "),s("div",{staticClass:"control"},[s("DatePicker",{on:{selected:t.sendDateLimitChange},model:{value:t.datePickerAcceptedData,callback:function(e){t.datePickerAcceptedData=e},expression:"datePickerAcceptedData"}})],1)])]),t._v(" "),s("div",{staticClass:"column is-2"},[s("label",{staticClass:"checkbox is-pulled-right"},[t._v("Completed\n        "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.todoObj.completed,expression:"todoObj.completed"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.todoObj.completed)?t._i(t.todoObj.completed,null)>-1:t.todoObj.completed},on:{change:[function(e){var s=t.todoObj.completed,a=e.target,o=!!a.checked;if(Array.isArray(s)){var n=t._i(s,null);a.checked?n<0&&(t.todoObj.completed=s.concat([null])):n>-1&&(t.todoObj.completed=s.slice(0,n).concat(s.slice(n+1)))}else t.$set(t.todoObj,"completed",o)},t.changeCompletionStatus]}})])])])])},o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"column is-2"},[s("span",{staticClass:"icon is-pulled-left"},[s("i",{staticClass:"fa fa-bars",attrs:{"aria-hidden":"true"}})])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"control"},[s("span",{staticClass:"icon is-pulled-left"},[s("i",{staticClass:"fa fa-lg fa-calendar icon-fix",attrs:{"aria-hidden":"true"}})])])}],n={render:a,staticRenderFns:o};e.a=n},"+orn":function(t,e,s){"use strict";var a=s("mtWM"),o=s.n(a),n=s("XILU"),i=s.n(n);e.a={components:{DatePicker:i.a},props:["todoObj","wantCompletedFiltered"],watch:{completeBeforeDate:function(t){this.sendDateLimitChange(new Date(t).getTime())}},data:function(){return{baseURL:"https://nodejs-vue-js-todo.herokuapp.com/todos/"+this.todoObj._id,completed:this.todoObj.completed,editMode:!1,taskText:this.todoObj.task,completeBeforeDate:this.todoObj.completedDateLimit}},computed:{checkIfLate:function(){return this.completeBeforeDate<(new Date).getTime()&&!1===this.completed},checkConditionsToHide:function(){return this.wantCompletedFiltered&&this.completed},ISOToReadable:function(){var t=new Date(this.completeBeforeDate);return t.getFullYear()+" - "+(t.getMonth()+1)+" - "+t.getDate()},EpochToUTC:function(){var t=new Date(this.completeBeforeDate);return new Date(t).getTime()},datePickerAcceptedData:function(){return new Date(this.completeBeforeDate)}},methods:{changeCompletionStatus:function(){var t=this;o()({method:"PATCH",url:this.baseURL,dataType:"json",contentType:"application/json; charset=utf-8",data:{completed:!this.completed}}).then(function(e){200===e.status?(t.completed=!t.completed,t.$parent.$parent.updateDBPopup("Task has been completed","is-success","Success")):t.$parent.$parent.updateDBPopup("Something went wrong","is-danger","Success")})},sendTaskChange:function(){var t=this;o()({method:"PATCH",url:this.baseURL,dataType:"json",contentType:"application/json; charset=utf-8",data:{task:this.taskText,completed:this.completed}}).then(function(e){t.editMode=!1,200===e.status?t.$parent.$parent.updateDBPopup("Task have been changed","is-success","Success"):t.$parent.$parent.updateDBPopup("Something went wrong","is-danger","Success")})},sendDateLimitChange:function(t){var e=this;o()({method:"PATCH",url:this.baseURL,dataType:"json",contentType:"application/json; charset=utf-8",data:{task:this.taskText,completed:this.completed,completedDateLimit:new Date(t).getTime()}}).then(function(s){200===s.status?(e.completeBeforeDate=t,e.$parent.$parent.updateDBPopup("Limit has been changed","is-success","Success")):e.$parent.$parent.updateDBPopup("Something went wrong","is-danger","Success")})}}}},"2LiO":function(t,e){},"5W1q":function(t,e){},CBJJ:function(t,e,s){"use strict";e.a={props:{propsHide:Boolean,propsMessage:String,propsClass:String,propsHeader:String},data:function(){return{popupHide:!0,popupMessage:"",popupClass:"",popupHeader:""}},watch:{propsHide:function(t){this.popupHide=t},propsMessage:function(t){this.popupMessage=t},propsClass:function(t){this.popupClass=t},propsHeader:function(t){this.popupHeader=t}}}},ESw6:function(t,e){},"H/xb":function(t,e,s){"use strict";var a=s("lfLh"),o=s("hOzd"),n=s("PSDz");e.a={name:"TodoPage",components:{Navbar:a.a,TodoApp:o.a,SavedPopup:n.a},data:function(){return{popupHide:!0,popupType:"",popupMessage:"",popupHeader:""}},methods:{updateDBPopup:function(t,e,s){this.popupHide=!1,this.popupType=e,this.popupMessage=t,this.popupHeader=s,setTimeout(this.closePopup,2e3)},closePopup:function(){this.popupHide=!0}}}},M93x:function(t,e,s){"use strict";function a(t){s("VAD2")}var o=s("xJD8"),n=s("cil4"),i=s("VU/8"),c=a,d=i(o.a,n.a,!1,c,null,null);e.a=d.exports},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),o=s("M93x"),n=s("YaEn");a.a.config.productionTip=!1,new a.a({el:"#app",router:n.a,template:"<App/>",components:{App:o.a}})},OeyT:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"navbar has-shadow",attrs:{role:"navigation","aria-label":"dropdown navigation"}},[a("div",{staticClass:"container is-fluid"},[a("div",{staticClass:"navbar-brand"},[a("div",{staticClass:"navbar-item"},[a("img",{attrs:{src:s("Rk5U"),alt:"Bulma: a modern CSS framework based on Flexbox"}}),t._v("\n          Todo\n      ")]),t._v(" "),a("div",{staticClass:"navbar-burger burger",attrs:{"data-target":"menu"}},[a("span"),t._v(" "),a("span"),t._v(" "),a("span")])]),t._v(" "),a("div",{staticClass:"navbar-menu",attrs:{id:"menu"}},[a("div",{staticClass:"navbar-start"})])])])}],n={render:a,staticRenderFns:o};e.a=n},PSDz:function(t,e,s){"use strict";function a(t){s("wQzj")}var o=s("CBJJ"),n=s("b5my"),i=s("VU/8"),c=a,d=i(o.a,n.a,!1,c,null,null);e.a=d.exports},Ph7K:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"page"}},[s("SavedPopup",{attrs:{propsHide:t.popupHide,propsMessage:t.popupMessage,propsClass:t.popupType,propsHeader:t.popupHeader}}),t._v(" "),s("Navbar"),t._v(" "),s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[t._m(0),t._v(" "),s("div",{staticClass:"container box is-shadowless transparentBG"},[s("TodoApp")],1)])])],1)},o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"hero landingSection"},[s("div",{staticClass:"hero-body"},[s("div",{staticClass:"container"},[s("h1",{staticClass:"title heroText"},[t._v("\n              Online Todo App\n            ")]),t._v(" "),s("h2",{staticClass:"subtitle heroText"},[t._v("\n              Built with VueJS and NodeJS\n            ")])])])])}],n={render:a,staticRenderFns:o};e.a=n},Rk5U:function(t,e){t.exports="data:image/png;base64,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"},TBvb:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"modal",class:{"is-active":t.modalIsActive}},[s("div",{staticClass:"modal-background"}),t._v(" "),s("div",{staticClass:"modal-card"},[s("header",{staticClass:"modal-card-head"},[s("p",{staticClass:"modal-card-title"},[t._v("Add a new todo")]),t._v(" "),s("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:t.turnModalOff}})]),t._v(" "),s("div",{staticClass:"modal-card-body",staticStyle:{height:"480px"}},[s("label",{staticClass:"label"},[t._v("Task to complete")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.taskToAdd,expression:"taskToAdd"}],staticClass:"input",attrs:{type:"text",placeholder:"Task"},domProps:{value:t.taskToAdd},on:{input:function(e){e.target.composing||(t.taskToAdd=e.target.value)}}}),t._v(" "),s("div",{staticClass:"columns"},[s("div",{staticClass:"column is-3"}),t._v(" "),s("div",{staticClass:"column is-6"},[s("label",{staticClass:"label"},[t._v("Needs to be completed before")]),t._v(" "),s("DatePicker",{model:{value:t.limitToAdd,callback:function(e){t.limitToAdd=e},expression:"limitToAdd"}})],1)])]),t._v(" "),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button is-success",on:{click:t.addNewTodo}},[t._v("Add")]),t._v(" "),s("button",{staticClass:"button",on:{click:t.turnModalOff}},[t._v("Cancel")])])])]),t._v(" "),s("div",{staticClass:"box top-rounded-border"},[s("div",{staticClass:"field is-grouped"},[s("p",{staticClass:"control is-expanded"},[s("a",{staticClass:"button is-primary",on:{click:function(e){t.modalIsActive=!0}}},[t._v("Add new todo")])]),t._v(" "),s("p",{staticClass:"control"},[s("a",{staticClass:"button noborder"},[s("a",{staticClass:"has-text-centered",on:{click:function(e){t.completedHidden=!t.completedHidden}}},[t._v("\n            "+t._s(t.toggleMessage)+"\n          ")])])])])]),t._v(" "),t._l(t.todos,function(e){return s("TodoItem",{key:e._id,staticClass:"is-marginless is-radiusless",attrs:{wantCompletedFiltered:t.completedHidden,todoObj:e}})})],2)},o=[],n={render:a,staticRenderFns:o};e.a=n},VAD2:function(t,e){},YaEn:function(t,e,s){"use strict";var a=s("7+uW"),o=s("/ocq"),n=s("blJz");a.a.use(o.a),e.a=new o.a({mode:"history",routes:[{path:"/",name:"Todo",component:n.a}]})},"Yw/y":function(t,e,s){"use strict";function a(t){s("zzcD")}var o=s("+orn"),n=s("+9UT"),i=s("VU/8"),c=a,d=i(o.a,n.a,!1,c,null,null);e.a=d.exports},b5my:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"slider",class:{close:t.popupHide}},[s("article",{staticClass:"message",class:t.popupClass},[s("div",{staticClass:"message-header"},[t._v("\n      "+t._s(t.popupHeader)+"\n    ")]),t._v(" "),s("div",{staticClass:"message-body"},[t._v("\n      "+t._s(t.popupMessage)+"\n    ")])])])},o=[],n={render:a,staticRenderFns:o};e.a=n},blJz:function(t,e,s){"use strict";function a(t){s("yrVR")}var o=s("H/xb"),n=s("Ph7K"),i=s("VU/8"),c=a,d=i(o.a,n.a,!1,c,"data-v-32b79808",null);e.a=d.exports},cil4:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},o=[],n={render:a,staticRenderFns:o};e.a=n},djXH:function(t,e,s){"use strict";var a=s("mtWM"),o=s.n(a),n=s("Yw/y"),i=s("XILU"),c=s.n(i);e.a={data:function(){return{todos:[],baseTodoURL:"https://nodejs-vue-js-todo.herokuapp.com/todos",modalIsActive:!1,taskToAdd:"",limitToAdd:"",completedHidden:!1}},components:{TodoItem:n.a,DatePicker:c.a},created:function(){this.getAllTodos()},computed:{toggleMessage:function(){return this.completedHidden?"Show completed tasks":"Hide completed tasks"}},methods:{turnModalOff:function(){this.modalIsActive=!1,this.taskToAdd="",this.limitToAdd=""},getAllTodos:function(){var t=this;this.todos=[],o.a.get(this.baseTodoURL).then(function(e){for(var s=0;s<e.data.todos.length;s+=1)t.todos.push(e.data.todos[s])})},addNewTodo:function(){var t=this;""!==this.taskToAdd&&""!==this.limitToAdd?(this.modalIsActive=!1,o()({method:"POST",url:this.baseTodoURL,contentType:"application/json; charset=utf-8",dataType:"json",data:{task:this.taskToAdd,completedDateLimit:new Date(this.limitToAdd).getTime()}}).then(function(){t.$parent.updateDBPopup("Task has been added","is-success","Success"),t.taskToAdd="",t.limitToAdd="",t.getAllTodos()})):this.$parent.updateDBPopup("All fields are required","is-danger","Warning")}}}},hOzd:function(t,e,s){"use strict";function a(t){s("ESw6")}var o=s("djXH"),n=s("TBvb"),i=s("VU/8"),c=a,d=i(o.a,n.a,!1,c,null,null);e.a=d.exports},lfLh:function(t,e,s){"use strict";var a=s("OeyT"),o=s("VU/8"),n=o(null,a.a,!1,null,null,null);e.a=n.exports},wQzj:function(t,e){},xJD8:function(t,e,s){"use strict";var a=s("5W1q"),o=(s.n(a),s("2LiO"));s.n(o);e.a={name:"app"}},yrVR:function(t,e){},zzcD:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.ee3d75eea410c0656395.js.map