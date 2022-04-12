"use strict";function _createForOfIteratorHelper(e,t){var o="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!o){if(Array.isArray(e)||(o=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){o&&(e=o);var a=0,r=function(){};return{s:r,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,c=!0,d=!1;return{s:function(){o=o.call(e)},n:function(){var e=o.next();return c=e.done,e},e:function(e){d=!0,n=e},f:function(){try{c||null==o.return||o.return()}finally{if(d)throw n}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,a=new Array(t);o<t;o++)a[o]=e[o];return a}var themeSwitcher=document.querySelector("[data-theme-toggler]"),body=document.querySelector("body"),theme=JSON.parse(localStorage.getItem("theme"))||"dark-theme";function themeToggler(){"light-theme"==body.className?(body.className="dark-theme")&&localStorage.setItem("theme",JSON.stringify("dark-theme")):(body.className="light-theme")&&localStorage.setItem("theme",JSON.stringify("light-theme"))}body.classList.add(theme),themeSwitcher.addEventListener("click",(function(){themeToggler()}));var form=document.querySelector("[data-form]"),input=document.querySelector("[data-input]"),todoList=document.querySelector("[data-list]"),counterElement=document.querySelector("[data-counter]"),tabs=document.querySelectorAll("[data-tabs]"),clearBtn=document.querySelector("[data-clear]"),todoItems=JSON.parse(localStorage.getItem("todos"))||[];function addTodo(){if(""!=input.value.trim()){var e={id:Math.floor(Math.random()*Date.now()),name:input.value,checked:!1};todoItems.push(e),localStorage.setItem("todos",JSON.stringify(todoItems)),input.value="",input.focus(),showActiveTab(tabs[0]),updateTodos()}}function updateTodos(){todoItems=JSON.parse(localStorage.getItem("todos"))||[],removeAllTodos(todoList),countActiveTodos(),todoItems.forEach((function(e,t){renderTodo(e,t)}))}function removeAllTodos(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function renderTodo(e,t){var o=document.createDocumentFragment(),a=document.createElement("li");a.classList.add("todo-item"),a.setAttribute("id","".concat(e.id)),e.checked&&a.classList.add("completed");var r=document.createElement("input");r.classList.add("todo-item-input"),r.setAttribute("type","checkbox"),r.setAttribute("data-index","".concat(t)),r.setAttribute("id","item_".concat(e.id)),e.checked?r.checked=!0:r.checked=!1;var n=document.createElement("label");n.setAttribute("for","item_".concat(e.id)),n.classList.add("todo-label"),n.innerHTML='<p class="todo-text">'.concat(e.name,"</p>");var c=document.createElement("span");c.classList.add("todo-check");var d=document.createElement("button");d.setAttribute("data-index","".concat(t)),d.setAttribute("data-delete-button",""),d.setAttribute("aria-label","Remove todo"),d.classList.add("todo-delete-button"),d.innerHTML='<img\n    class="todo-delete-button-image"\n    src="./images/icon-cross.svg"\n  />',n.appendChild(c),a.append(r,n,d),o.appendChild(a),todoList.appendChild(o),r.addEventListener("click",(function(){return checkHandler(a)})),d.addEventListener("click",(function(e){return deleteHandler(e)}))}function checkHandler(e){var t=e.querySelector("input[type=checkbox]").dataset.index;todoItems[t].checked=!todoItems[t].checked,todoItems[t].checked?e.classList.add("completed"):e.classList.remove("completed"),countActiveTodos(),localStorage.setItem("todos",JSON.stringify(todoItems))}function deleteHandler(e){var t=e.target.dataset.index;todoItems.splice(t,1),localStorage.setItem("todos",JSON.stringify(todoItems)),updateTodos()}function clearCompletedTodos(){var e=[];todoItems.filter((function(t){return t.checked||e.push(t),e})),localStorage.setItem("todos",JSON.stringify(e)),updateTodos()}function countActiveTodos(){var e;e=todoItems.filter((function(e){return!e.checked})).length,counterElement.innerHTML="".concat(e,1==e?" item left":" items left")}function showActiveTab(e){tabs.forEach((function(e){return e.classList.remove("active")})),e&&e.classList.add("active")}tabs.forEach((function(e){e.addEventListener("click",(function(t){showActiveTab(e);var o,a=todoList.children,r=t.target.value,n=_createForOfIteratorHelper(a);try{for(n.s();!(o=n.n()).done;){var c=o.value;switch(r){case"all":c&&c.classList.remove("disappear");break;case"active":c.classList.contains("completed")?c.classList.add("disappear"):c.classList.remove("disappear");break;case"completed":c.classList.contains("completed")?c.classList.remove("disappear"):c.classList.add("disappear")}}}catch(e){n.e(e)}finally{n.f()}}))})),updateTodos(),form.addEventListener("submit",(function(e){e.preventDefault(),addTodo()})),clearBtn.addEventListener("click",clearCompletedTodos),new Sortable(todoList,{swap:!0,ghostClass:"selected",swapClass:"highlight",animation:500,onSort:function(){var e=todoList.childNodes,t=JSON.parse(localStorage.getItem("todos")),o=[],a=[];e.forEach((function(e){var t=e.id;a.push(t)})),a.forEach((function(e){var a=!1;t.forEach((function(r,n){a||r.id==e&&(o.push(r),t.splice(n,1),a=!0)}))})),localStorage.setItem("todos",JSON.stringify(o))}});
//# sourceMappingURL=script.js.map