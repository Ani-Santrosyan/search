"use strict";

var arrayList = void 0;
var unTimeArray = void 0;
var globalPageCount = void 0;
function createNode(element) {
    return document.createElement(element);
}

var ul = document.getElementById("list");
var pagination = document.getElementById("pageinationList");
fetch('https://raw.githubusercontent.com/boennemann/animals/master/words.json').then(function (response) {
    return response.json();
}).then(function (json) {
    arrayList = json;
    unTimeArray = json;
    addPagination(json);
});

var input = document.getElementById('input');
input.addEventListener('keyup', function (event) {
    var value = event.target.value;
    var filteredArray = void 0;
    filteredArray = arrayList.filter(function (item) {
        return item.toLowerCase().indexOf(value.toLowerCase()) == 0;
    });
    addListGroup(filteredArray);
    addPagination(filteredArray);
});

function addListGroup(array) {
    ul.innerHTML = "<li id='emptyList'>This list is empty</li>";
    var j = 0;
    if (array) {
        if (array.length == 0) {
            document.getElementById('emptyList').style.display = 'block';
            document.getElementById('emptyList').style.width = '100%';
        } else {
            document.getElementById('emptyList').style.display = 'none';
            return array.map(function (author) {
                j++;
                var li = createNode('li');
                var a = createNode('a');
                var span = createNode('div');
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

function addPagination(array, num) {
    if (array.length > 0) {
        (function () {
            var pagArrays = [];
            var newArray = [];
            var lastArray = [];
            var lastObj = { key: 'item', value: [] };
            var pageCount = Math.ceil(array.length / 12);
            globalPageCount = pageCount;
            for (var i = 0; i <= pageCount; i++) {
                if (i !== pageCount) {
                    pagArrays.push(array.slice(i * 12, i * 12 + 12));
                } else {
                    pagArrays.push(array.slice(i * 12, array.length - 1));
                    pagArrays.pop();
                }
            }
            unTimeArray = pagArrays;
            addListGroup(pagArrays[0]);

            // addClassName(1, pageCount);
            pagination.innerHTML = "<span class='pageListItem' id='pageListItem'>0</span>";
            var nullItem = document.getElementById('pageListItem');
            if (pageCount > 0) {
                nullItem.style.display = "none";

                var _loop = function _loop(_i) {
                    var span = createNode('span');
                    span.innerText = ' ' + _i + ' ';
                    span.className = 'pageListItem';
                    span.id = 'elem' + _i;
                    span.setAttribute('data-num', _i);
                    pagination.appendChild(span);
                    span.addEventListener("click", function () {
                        //span.classList.add('active');
                        addListGroup(pagArrays[_i - 1]);
                        removeSpanClasses(_i, pageCount);
                    });
                };

                for (var _i = 1; _i <= pageCount; _i++) {
                    _loop(_i);
                };
                removeSpanClasses(1, pageCount);
                document.getElementById("elem1").classList.add("active");
            } else {
                nullItem.style.display = "inline-block";
            }
        })();
    }
}

function removeSpanClasses(page, pageCount) {
    var startCickl = void 0;
    var endCickl = void 0;
    if (page - 2 > 1) {
        startCickl = page - 1;
    }
    if (page + 2 < pageCount) {
        endCickl = page + 1;
    }
    //  for(let i = 1; i<= pageCount; i++){
    //     if(i != page){
    //         let elem = document.getElementById('elem'+i);
    //         elem.classList.remove('active');
    //     }
    // }
    var array = [];
    if (startCickl && endCickl) {
        array = [1, "..."];
        for (var i = startCickl; i <= endCickl; i++) {
            array.push(i);
        }
        array.push("...");
        array.push(pageCount);
    } else if (startCickl) {
        array = [1, "..."];
        for (var _i2 = startCickl; _i2 <= pageCount; _i2++) {
            array.push(_i2);
        }
    } else if (endCickl) {
        array = [];
        for (var _i3 = 1; _i3 <= endCickl; _i3++) {
            array.push(_i3);
        }
        array.push("...");
        array.push(pageCount);
    } else {
        array = [];
        for (var _i4 = 1; _i4 <= pageCount; _i4++) {
            array.push(_i4);
        }
    }
    pagination.innerHTML = "<span class='pageListItem' style='display:none;' id='pageListItem'>0</span>";

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        var _loop2 = function _loop2() {
            var i = _step.value;

            var span = createNode('span');
            span.innerText = ' ' + i + ' ';
            span.className = 'pageListItem';
            span.id = 'elem' + i;
            span.setAttribute('data-num', i);
            pagination.appendChild(span);
            span.addEventListener("click", function () {
                //span.classList.add('active');
                // addClassName(i, pageCount);
                addListGroup(unTimeArray[i - 1]);
                removeSpanClasses(i, pageCount);
            });
        };

        for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop2();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    ;
    document.getElementById("elem1").classList.add("active");
}

function addClassName(page, pageCount) {
    for (var i = 1; i <= pageCount; i++) {
        if (i != page) {
            var elem = document.getElementById('elem' + i);
            elem.classList.remove('active');
        }
    }
}
function defaultPaginate(page) {
    if (page) {
        console.log(page);
    } else {
        console.log(globalPageCount);
    }
    //addListGroup(unTimeArray[page-1]);
}