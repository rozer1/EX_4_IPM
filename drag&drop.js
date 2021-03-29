var dragging = null;
var list = document.getElementById('list');
var add = document.getElementById('add');
var listItem = document.getElementById("item");

function contentEditable(node) {
   node.setAttribute("contenteditable", true);
}

function edit(event) {
  var button = event.target,
  li = button.parentNode;
  contentEditable(li);
}

list.addEventListener('mousedown', function(event) {
  var editable = document.querySelectorAll("li.element");
  var target = event.target;
  var id = target.getAttribute("id");

  editable.forEach(function(li){
    li.setAttribute("contenteditable", false);
  })

 if(id == "btn") {edit(event)}
 if(id == "item") {contentEditable(target)}
})

document.addEventListener('dragstart', function(event) {
    var target = getLI( event.target );
    dragging = target;
    event.dataTransfer.setData('text/plain', null);
    event.dataTransfer.setDragImage(self.dragging,0,0);
});

document.addEventListener('dragover', function(event) {
    event.preventDefault();
    var target = getLI( event.target );
    var bounding = target.getBoundingClientRect()
    var offset = bounding.y + (bounding.height/2);
    if ( event.clientY - offset > 0 ) {
       	target.style['border-bottom'] = 'solid 4px blue';
        target.style['border-top'] = '';
    } else {
        target.style['border-top'] = 'solid 4px blue';
        target.style['border-bottom'] = '';
    }
});

document.addEventListener('dragleave', function(event) {
    var target = getLI( event.target );
    target.style['border-bottom'] = '';
    target.style['border-top'] = '';
});

document.addEventListener('drop', function(event) {
    event.preventDefault();
    var target = getLI( event.target );
    if ( target.style['border-bottom'] !== '' ) {
        target.style['border-bottom'] = '';
        target.parentNode.insertBefore(dragging, event.target.nextSibling);
    } else {
        target.style['border-top'] = '';
        target.parentNode.insertBefore(dragging, event.target);
    }
});

function getLI( target ) {
    while ( target.nodeName.toLowerCase() != 'li' && target.nodeName.toLowerCase() != 'body' ) {
        target = target.parentNode;
    }
    if ( target.nodeName.toLowerCase() == 'body' ) {
        return false;
    } else {
        return target;
    }
}

//adding a new element to the list
add.addEventListener('click', function(){
  var newElement = document.createElement('LI');
  list.appendChild(newElement);
  newElement.setAttribute("draggable", "true");
  newElement.setAttribute("contenteditable", "true");
  newElement.innerHTML= "<button class='btn'>X</button>  New list Item ";
});

list.addEventListener('click', function(e){
  if(e.target && e.target.nodeName == "BUTTON") {
        console.log("Button ", e, " was clicked!");
    e.target.parentNode.remove();
    }
});
