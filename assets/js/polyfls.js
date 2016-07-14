"use strict";



/*
#                     ARRAYS
#
#  the below functions only containe functions
#  that manipulate Javascript Arrays
#
*/



  /* @desc : iterate on every element of an array
  *  @name : forEach
  */
  if (!Array.prototype.forEach) {

      Array.prototype.forEach = function(callback, thisArg) {

        var T, k;

        if (this == null) {
          throw new TypeError(' this is null or not defined');
        }

        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If isCallable(callback) is false, throw a TypeError exception. 
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== "function") {
          throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        if (arguments.length > 1) {
          T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

          var kValue;

          // a. Let Pk be ToString(k).
          //    This is implicit for LHS operands of the in operator
          // b. Let kPresent be the result of calling the HasProperty
          //    internal method of O with argument Pk.
          //    This step can be combined with c
          // c. If kPresent is true, then
          if (k in O) {

            // i. Let kValue be the result of calling the Get internal
            // method of O with argument Pk.
            kValue = O[k];

            // ii. Call the Call internal method of callback with T as
            // the this value and argument list containing kValue, k, and O.
            callback.call(T, kValue, k, O);
          }
          // d. Increase k by 1.
          k++;
        }
        // 8. return undefined
      };
  }



/*
#                     DOM ELEMENTS
#
#  the below functions only containe functions
#  manipulate the dom elements
#
*/



  /*  @desc     : return an html direct node text. Note the child text 
  *  @name      : get_first_node
  *  @return    : node element
  *  @e.g       : <div> whill be return <span> will not be return </span> </div>
  */
  function get_first_node(elem){
    return elem.childNodes[0].nodeValue ;
  }

  /*  @desc     : return an element parent as jquer parents. But don't return an javascript nodeElement note a jquery one 
  *  @name      : get_parent
  *  @return    : node element
  */
  function get_parent(current_elem, to_find){

    let __current_node = current_elem,
      node_name = to_find.trim().substr(1);

    while (__current_node != null && __current_node.className != undefined){

      if (to_find[0] === '.' && __current_node.className.indexOf(node_name) >= 0)
        break;

      if(to_find[0] === '#' && __current_node.id === node_name)
        break;

      if (__current_node.nodeName === to_find.toUpperCase())
        break;

      __current_node = __current_node.parentNode;
    }

    return (__current_node != current_elem && __current_node != document)? __current_node : null;
  }


/*
#                     STRINGS
#
#  the below functions only containe functions
#  that manipulate Javascript Strings
#
*/



  /* @desc      : copy a text
  *  @name      : copyText
  */
  function copyText(elem){
      let targetId = "_hiddenCopyText_",
          isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA",
          origSelectionStart, origSelectionEnd;
      if (isInput) {
          // can just use the original source element for the selection and copy
          target = elem;
          origSelectionStart = elem.selectionStart;
          origSelectionEnd = elem.selectionEnd;
      } else {
          // must use a temporary form element for the selection and copy
          target = document.getElementById(targetId);

          if (!target) {
              var target = document.createElement("textarea");
              target.style.position = "absolute";
              target.style.left = "-9px";
              target.style.opacity = "0";
              target.style.backgroundColor = "red";
              target.style.zIndex = "-100";
              target.id = targetId;
              document.body.appendChild(target);
          }
          let j = 0,
           elem_nodes = elem.childNodes,
           txt = '';
          for (j; j < elem_nodes.length; j++) {
            if (elem_nodes[j].nodeName == '#text') {
              txt += elem_nodes[j].nodeValue;

            }else{
              if (elem_nodes[j].className.indexOf('copy') >= 0 && elem_nodes[j].className.indexOf('no_copy') == -1)
                continue;
                txt += get_first_node(elem_nodes[j]);
            }
          }
          target.textContent = txt;
          target.style.top = parseInt(elem.offsetTop - elem.scrollTop + elem.clientTop) +'px';
      }
      // select the content
      var currentFocus = document.activeElement;
      target.focus();
      // return;
      target.setSelectionRange(0, target.value.length);
      
      // copy the selection
      var succeed;
      try {
          succeed = document.execCommand("copy");
      } catch(e) {
          succeed = false;
      }
      // restore original focus
      if (currentFocus && typeof currentFocus.focus === "function") {
          currentFocus.focus();
      }
      
      if (isInput) {
          // restore prior selection
          elem.setSelectionRange(origSelectionStart, origSelectionEnd);
      } else {
          // clear temporary content
          target.textContent = "";
      }
      return succeed;
  }

  /* @desc      : trim and contcat a string by a separator
  *  @name      : copyText
  *  @e.g       : 'this example   ' => 'this_example'
  */
  function trimSplitJoin(str, splitParam = ' ', joinParam = ''){
    return str.trim().split(splitParam).join(joinParam);
  }

  /* @desc      : get specificaly the selected part of a text
  *  @name      : selectedText
  *  @return    : return the select string 
  */
  function getSelectionText(){
      var selectedText = "";
      if (window.getSelection){ // all modern browsers and IE9+
          selectedText = window.getSelection().toString();
      }
      return selectedText;
  }

  /* @desc      : uppercase the first letter
  *  @name      : ucfirst
  *  @return    : return the new sting 
  */
  String.prototype.ucfirst = function(){
    return this.charAt(0).toUpperCase() + this.substr(1);
  }



/*
#                     REGEXS | QUERYS
#
#  the below functions only containe functions
#  that manipulate Javascript Find or Replace
#
*/



  /* @desc      : find set_db keys in App and replace the html value by his values
  *  @name      : findAndReplace
  */
  function findAndReplace(selector = '#container', template){

    let val = $(selector).html(),
        app = App.db(),
        i = 0;
    for (let key in app){

      let re = new RegExp(key,"g");
      if (app[key]) {
        let newHtml = '<span class="info_bule" id="info_'+(i++)+'">'+key+template_info_bule( template || app[key])+'</span>';
        val = val.replace(re, newHtml);
      }
    }
    $(selector).html(val);
  }

  /* @desc      : find and replace html < by &amp and > by &gt 
  *  @name      : htmlEntities
  */
  function htmlEntities(str) {
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }



/*
#                     TEMPLATES
#
#  the below functions only containe templates
#  function. They are intended to be call and
#  return the html
*/



  /* @desc      : display the info bule
  *  @name      : template_info_bule
  */
  function template_info_bule(val){
    return `
      <div class="hide no_copy">
        <div>
          <form>
            <button type="button" class="btn glyphicon glyphicon-pencil"></button>
          </form>
          <p> ${ val }</p>
        </div>
      </div>
    `;
  }

  /* @desc      : retrieve and display the nav menu menu and sub-elemnts depending on sections h2 and h3
  *  @name      : template_menu
  */
  function template_menu(_anchors){

    function the_loop(_sections){
      
      let results = [],
          i = 0,
          j = 0;

      for (i; i < _sections.length; i++) {
        let _elem_h2 = $(_sections[i]).find('h2'),
            _elem_h3 = $(_sections[i]).find('h3'),
            anchor,
            second_anchor;
        
        // retrive h2 and manipulate it
        $(_elem_h2).text($(_elem_h2).text().trim().ucfirst()); // upperCase the first letter
        anchor = $(_elem_h2).text().split(' ').join('_'),
        results.push('<li><a href="#'+anchor+'">'+anchor.split('_').join(' ')+'</a>');
        $(_elem_h2).attr('id', anchor);
        
        // retrive h3 and manipulate it
        if (_elem_h3.length <= 0)
          continue;
        anchor = '<ul>';

        j = 0;
        for (j; j < _elem_h3.length; j++){
          $(_elem_h3[j]).text($(_elem_h3[j]).text().trim().ucfirst()); // upperCase the first letter
          second_anchor = $(_elem_h3[j]).text().split(' ').join('_');
          anchor += '<li><a href="#'+second_anchor+'">'+second_anchor.split('_').join(' ')+'</a></li>';
          $(_elem_h3[j]).attr('id', second_anchor);
        }

        anchor += '</ul>';
        results.push(anchor);
      }
      results.push('</li>')
      return results.join('');
    }

    return `
      <ul id='nav'>
          ${ the_loop(_anchors) }
      </ul>
    `;
  }

  /* @desc      : display the #nav_info
  *  @name      : template_nav_info
  */
  function template_nav_info(the_balises, the_classes){

    function the_loop(elem){
      
      let variable = '',
      i = 0;

      for (i; i < elem.length; i++) 
        variable += '<li><span>' + htmlEntities(elem[i]['title']) + ' :</span>'+
                   '<span>' + elem[i]['description'].ucfirst() +'</span></li>';
      return variable;
    }

    return `
      <ul id="nav_info">
        <li>
          <h3>Balises html</h3>
          <ul class="${trimSplitJoin('Balises html', ' ', '_')}"> ${ the_loop(the_balises) } </ul>
        </li>
        <li>
          <h3>Classes html</h3>
          <ul class="${trimSplitJoin('Classes html', ' ', '_')}"> ${ the_loop(the_classes) } </ul>
        </li>
      </ul>
    `;
  }