const httpRequest = new XMLHttpRequest();

window.onload = function () {

    textItalics(localStorage.getItem('blockTwoText'));
    document.getElementById('numericList').innerHTML = localStorage.getItem('numericList');


    let cookie = getCookie('triangle')
    if (cookie != undefined) {
        if (cookie.length > 0) {
            if (confirm("У вас наявні такі кукі - " + cookie + " Після натискання кнопки «ОК» відбудеться видалення даних із куків ")) {
                document.cookie = "triangle=";
                location.reload();
            } else {
                location.reload();
            }
        }

    }

}

function Replacement() {
    let div1 = document.getElementsByClassName('1')[0];
    let div2 = document.getElementsByClassName('6')[0];

    let temp = div1.innerHTML;
    div1.innerHTML = div2.innerHTML;
    div2.innerHTML = temp;
}

function Area() {
    let d1 = 5;
    let d2 = 10;
    let area = (d1 * d2) / 2;
    document.getElementsByClassName('area')[0].innerHTML = 'The rectangle area is (' + d1 + '*' + d2 + ')/2=' + area;
}

function triangleBuild() {
    let a = parseInt(document.forms["triangle"]["firstSide"].value);
    let b = parseInt(document.forms['triangle']['secondSide'].value);
    let c = parseInt(document.forms['triangle']['thirdSide'].value);
    let buildable;
    if (a + b > c & b + c > a & a + c > b) {
        alert('Трикутник із сторонами ' + a + ',' + b + ',' + c + ' побудувати можливо')
        buildable = 'Трикутник із сторонами ' + a + ',' + b + ',' + c + ' побудувати можливо'
        document.cookie = 'triangle=' + buildable
    } else {
        alert('Трикутник із сторонами ' + a + ',' + b + ',' + c + ' побудувати не можливо')
        buildable = 'Трикутник із сторонами ' + a + ',' + b + ',' + c + ' побудувати не можливо'
        document.cookie = 'triangle=' + buildable
    }
    document.getElementById('form').hidden = true;
    return false;
}


function getCookie(name) {
    let cookies = decodeURIComponent(document.cookie);
    let cookiesArray = cookies.split(';')
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookieName = cookiesArray[i].split('=');
        if (name == cookieName[0]) {
            return cookieName[1]
        }
    }
}

function textItalics(a) {
    if (a == 'italics') {
        let text = document.getElementsByClassName('textInBlockTwo')[0];
        text.style.fontStyle = 'italic';
        document.getElementById('italicForm').hidden = false;
    } else {
        let text = document.getElementsByClassName('textInBlockTwo')[0];
        text.style.fontStyle = a;
    }

}

function saveFontStyle(a) {
    if (a == 'yes') {
        localStorage.setItem('blockTwoText', 'italic')
    } else if (a == 'no') {
        localStorage.setItem('blockTwoText', 'normal')
    }

}

function numericForm() {
    document.getElementById("numericForm").hidden = false;
}

function numericListCreator() {
    let numericList = document.getElementById("numericList");
    let elementsArray = document.forms["numericFormCreation"]["list"].value.split(',');
    let listElements = [];
    for (let i = 0; i < elementsArray.length; i++) {
        if (i % 2 == 0) {
            listElements.push("<li class='even'>" + elementsArray[i] + "</li>");
        } else if (i % 2 != 0) {
            listElements.push("<li class='odd'>" + elementsArray[i] + "</li>");
        }
    }

    numericList.innerHTML = listElements.join('');
    document.getElementById("numericForm").hidden = true;
    document.getElementById("saveButton").hidden = false;
    return false;
}

function listSaver() {
    localStorage.setItem('numericList', document.getElementById('numericList').innerHTML)
}

function tabsCreator() {
    let numberOfTubs = document.forms["tabsCreationForm"]["numberOfTubs"].value;
    let tubsNamesArray = document.forms["tabsCreationForm"]["tubsNames"].value.split(',');
    let tubsTextArray = document.forms["tabsCreationForm"]["tubsText"].value.split('%');
    let object = document.getElementById('tabs')
    for (let i = 0; i < numberOfTubs; i++) {
        if (i == 0) {
            object.innerHTML = object.innerHTML + " <input type=\"radio\" name=\"tab-btn\" id=\"tab-btn-" + (i + 1) + "\" value=\"\" checked >\n" +
                " <label for=\"tab-btn-" + (i + 1) + "\">" + tubsNamesArray[i] + "</label>\n"
            
        } else {
            object.innerHTML = object.innerHTML + " <input type=\"radio\" name=\"tab-btn\" id=\"tab-btn-" + (i + 1) + "\" value=\"\">\n" +
                " <label for=\"tab-btn-" + (i + 1) + "\">" + tubsNamesArray[i] + "</label>\n"

        }
    }
    for (let i = 0; i < numberOfTubs; i++) {
        object.innerHTML = object.innerHTML + " <div id=\"content-" + (i + 1) + "\">" + tubsTextArray[i] + "</div>"
    }
    document.getElementById('tabsCreation').hidden = true;

    httpRequest.onreadystatechange = displayServerResult;
    httpRequest.open('POST', 'saveData');
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpRequest.send('numberOfTubs=' + numberOfTubs + '&tubsNamesArray=' + tubsNamesArray + '&tubsTextArray=' + tubsTextArray + '&tubsHtml=' + object.innerHTML);

    return false;
}

function displayServerResult() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
        } else {
            alert('There was a problem with the request.');
        }
    }
}