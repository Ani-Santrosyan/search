"use strict";
let arrayList;
let unTimeArray;
let globalPageCount;
function createNode(element) {
    return document.createElement(element);
}

let ul = document.getElementById("list");
let pagination = document.getElementById("pageinationList");
fetch('https://raw.githubusercontent.com/boennemann/animals/master/words.json')
    .then(response => response.json())
    .then(json => {
        arrayList = json;
        unTimeArray = json;
        addPagination(json);
        
        
    });

    let input = document.getElementById('input');
     input.addEventListener('keyup',function(event){
        let value = event.target.value;
        let filteredArray;
        filteredArray = arrayList.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) == 0);
        addListGroup(filteredArray);
        addPagination(filteredArray);
     })

     function addListGroup(array){
        ul.innerHTML = "<li id='emptyList'>This list is empty</li>";
        let j = 0;
        if(array){
            if(array.length == 0) {
                document.getElementById('emptyList').style.display = 'block';
                document.getElementById('emptyList').style.width = '100%';
             }else {
                document.getElementById('emptyList').style.display = 'none';
                return array.map(function (author) {
                    j++;
                    let li = createNode('li');
                    let a = createNode('a');
                    let span = createNode('div');
                    li.className = "list-group-item";
                    span.className = "list-span";
                    ul.appendChild(li);
                    li.setAttribute('data-num', j);
                    li.appendChild(span);
                    li.appendChild(a);
                    a.innerHTML = author;
                    span.innerHTML = j;
                });
             }  
        }
        
     }

     function addPagination(array, num){ 
        if(array.length > 0) {
            let pagArrays = [];
            let pageCount =  Math.ceil(array.length / 12);
            globalPageCount = pageCount;
                for(let i = 0; i <= pageCount; i++) {
                    if(i !== pageCount) {
                        pagArrays.push(array.slice(i*12, (i*12)+12));
                    }else {
                        pagArrays.push(array.slice(i*12, array.length-1));
                        pagArrays.pop();
                    }
                }           
                unTimeArray = pagArrays;
                addListGroup(pagArrays[0]);  
                pagination.innerHTML = "<span class='pageListItem' id='pageListItem'>0</span>";
                let nullItem = document.getElementById('pageListItem');
                if(pageCount>0){
                    nullItem.style.display = "none";
                    for(let i = 1; i <= pageCount; i++) {
                        let span = createNode('span');
                        span.innerText = ' '+ i +' ';
                        span.className = 'pageListItem';
                        span.id = 'elem'+ i;
                        span.setAttribute('data-num', i);
                        pagination.appendChild(span);
                        span.addEventListener("click", function(){
                                addListGroup(pagArrays[i-1]);
                                removeSpanClasses(i, pageCount);
                            });
                        };
                        removeSpanClasses(1,pageCount);
                        document.getElementById("elem1").classList.add("active");
                }else{
                    nullItem.style.display = "inline-block";
                }
                   
        }
     }

     function removeSpanClasses(page,pageCount){
         let startCickl;
         let endCickl;
         if(page - 2 > 1){
             startCickl = page - 1;
         }
         if(page + 2 < pageCount){
            endCickl = page + 1;
         }
        let array = [];
        if(startCickl && endCickl){
            array = [1,"..."];
           for(let i = startCickl; i<= endCickl; i++){
               array.push(i);
           }
           array.push("...");
           array.push(pageCount);
        }else if(startCickl){
             array = [1,"..."];
           for(let i = startCickl; i<= pageCount; i++){
               array.push(i);
           }
        }else if(endCickl){
             array = [];
            for(let i = 1; i<= endCickl; i++){
                array.push(i);
            }
            array.push("...");
            array.push(pageCount);
        }else{
             array = [];
            for(let i = 1; i<= pageCount; i++){
                array.push(i);
            }
        }
        pagination.innerHTML = "<span class='pageListItem' style='display:none;' id='pageListItem'>0</span>";
        
        for(let i of array){
            let span = createNode('span');
            span.innerText = ' '+ i +' ';
            span.className = 'pageListItem';
            span.id = 'elem'+ i;
            span.setAttribute('data-num', i);
            pagination.appendChild(span);
            span.addEventListener("click", function(event){
                let e = event;
                let target = e.target;
                let id = target.id;
                    addListGroup(unTimeArray[i-1]);
                    removeSpanClasses(i, pageCount);
                    main_page.classList.remove("active");
                    main_page = document.getElementById(id);
                    main_page.classList.add("active");
                });
            };
            let main_page = document.getElementById("elem1");
        }
    
function addClassName(page, pageCount){
    for(let i = 4; i<= pageCount; i++){
        if(i != page){
            let elem = document.getElementById('elem'+i);
            elem.classList.remove('active');
        }else{
            let elem = document.getElementById('elem'+i);
            elem.classList.add('active');
        }
    }
}