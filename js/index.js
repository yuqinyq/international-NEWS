/**
 * Created by Mr.Ren on 2017/5/4.
 */

var li = topUl.children;
var $ = new Get();
user.onclick =  function () {
    userbox.style.top = "0";
    backup.onclick = function () {
        userbox.style.top = "-120%";
    }
}
liOne();
liClick(li)
function liClick(li){
    for (var i = 0 ; i<li.length ; i++) {
        function removeClass(lili) {
            for (var j = 0; j < li.length; j++) {
                if (li[j].classList.contains("select")) {
                    li[j].classList.remove("select");
                }
            }
            lili.classList.add("select");
        }
        (function (i, callback) {
            li[i].onclick = function () {
                switch (i) {
                    case 0 :
                        liOne();
                        break;
                    case 1 :
                        liTwo();
                        break;
                    case 2 :
                        liThree();
                        break;
                    case 3 :
                        liFour();
                        break;
                }
                callback(this);
            }
        })(i, removeClass)
    }
}

 function liOne() {
     article.innerHTML = "";
     var ul = document.createElement("ul");
     $.getData("json/Data/topStoryData.json" ,function (topStoryData) {
         var dataArray = JSON.parse(topStoryData)
         for(var v  in dataArray){
             var li = document.createElement("li");
             article.appendChild(ul)
             ul.appendChild(li)
             li.innerHTML += `
              <div class="content">
                  <img src="images/topStory/${dataArray[v].pic}">
                  <h2>${dataArray[v].headline}</h2>
                  <p class="btm-span">
                  <span>${dataArray[v].time}</span>
                  <span>${dataArray[v].state}</span>
                  </p></div>`
         }
         var  content = document.getElementsByClassName("content");
         //click content to load the data
         for(var i = 0 ; i < content.length; i++){
             contentClick(content[i] , dataArray[i].html)
             title.innerHTML = topUl.children[0].innerText;
         }
     })
 }

function liTwo () {
    article.innerHTML = "";
    var dl = document.createElement("dl");
    article.appendChild(dl);
    $.getData("json/Data/popular.json" ,function (popular) {
        var popArray = JSON.parse(popular);
        for(var i in popArray){
            var dt = document.createElement(`dt`);
            dl.appendChild(dt);
            dt.innerHTML = `
            <h1 class="pop">${i}</h1> `;
            for(var s in popArray[i]){
                var dd = document.createElement(`dd`);
                dt.appendChild(dd);
                dd.innerHTML = `
                 <div class="content"id="popNew">
                   <i class="num">${parseInt(s)+1}</i>
                    <img src="images/topStory/${popArray[i][s].pic}" alt="">
                    <h2>${popArray[i][s].headline}</h2>
                    <p class="btm-span">
                        <span>${popArray[i][s].time}</span><span>${popArray[i][s].state}</span>
                    </p>
                 </div>`;
                (function (p1 , p2) {
                       contentClick(p1 , p2);
                   })(dd ,  popArray[i][s].html);
                title.innerHTML = topUl.children[1].innerText;
            }
        }
    })
}

 function liThree () {
    article.innerHTML = "";
    var ul = document.createElement("ul");
    $.getData("json/Data/video.json" ,function (videoData) {
            var dataArray = JSON.parse(videoData);
            dataArray.forEach(function (val , i) {
                var li = document.createElement("li");
                article.appendChild(ul)
                ul.appendChild(li);
                li.innerHTML += `
              <div class="content" id="video">
                  <img src="images/video/${val.pic}">
                  <h2>${val.headline}</h2>
                  <p class="btm-span">
                  <span>${val.time}</span>
                  <span>${val.singer}</span>
                  </p></div>`
                var  content = document.getElementsByClassName("content");
                content[i].addEventListener("click", function (e) {
                    if (e.target.nodeName == "IMG" || e.target.nodeName == "H2") {
                        nav.style.display = "none";
                        aside.style.right = 0;
                        title.innerHTML = topUl.children[2].innerText;
                        section.innerHTML = `
            <video id="video" width="100%" src="${val.src}" poster="images/video/${val.pic}" controls="controls">
            </video>
            <div id="singerInfo">
                <img src="images/video/${val.avatar}">
                <p>英文名：${val.singer}</p>
                <p>昵称：${val.nickname}</p>
                <p>出生日期：${val.born}</p>
                <p>职业：${val.profession}</p>
                <p>音乐类型：${val.style}</p>
                <p>介绍：${val.info}</p>
            
</div>`
                    }
                    back();
                })
            })
    })
}
    function liFour(){
    article.innerHTML = "";
    article.innerHTML =`
    <video width="100%" src="http://cdn.livestream.com/embed/bbcworldnews"  controls="controls"></video>`
}

//add class

// back to home
function back() {
    bk.onclick = function () {
        nav.style.display = "block";
       aside.style.cssText= "right:-100%;";
        section.innerHTML = "";
    }
}
// Top Story click event
function contentClick(content , url) {
    //Event Agent
    content.addEventListener("click" ,function (e) {
        if (e.target.nodeName == "IMG" ||e.target.nodeName =="H2" ){
            nav.style.display = "none";
            //Request Document
            $.getData(url ,function (doc) {
                aside.style.right = 0;
                section.innerHTML = doc;
                back();
            })
        }else {return}
    } )
}

/*
AJAX
 */
function Get() {
    function getData(url , callback) {
        var xhr = new XMLHttpRequest;
        xhr.open("GET", url , true);
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200){
                    var dataSrt =  xhr.responseText;
                    // var dataJSON = JSON.parse(dataSrt);
                    callback(dataSrt);
            }
        }
    }
    return { getData:getData}
}
