let sun = document.getElementById("sun");
let moon = document.getElementById("moon");
let mode = document.getElementById("mode");
const root_theme = document.querySelector(':root');

sun.onclick = function () {
    mode.style.cssText = "transform: translateX(-65px);"
    root_theme.style.setProperty('--primary_color', '#F4F4F4');
    root_theme.style.setProperty('--third_color', '#333333');
}
moon.onclick = function () {
    mode.style.cssText = "transform: translateX(0px);"
    root_theme.style.setProperty('--primary_color', '#333333');
    root_theme.style.setProperty('--third_color', '#F4F4F4');
}

let menu = document.getElementById("menu");
let span1 = document.getElementsByTagName("span")[0];
let span2 = document.getElementsByTagName("span")[1];
let span3 = document.getElementsByTagName("span")[2];

let header = document.getElementsByTagName("header")[0];
let links = document.getElementsByClassName("links");
if (document.body.clientWidth < 645) {
        for (let i = 0; i < 5; i++) {
            links[i].addEventListener('click', function () {
            links[i].classList.toggle('clicked');
            span1.classList.remove('active-span1');
            span2.classList.remove('active-span2');
            span3.classList.remove('active-span3');
        if (links[i].classList.contains('clicked')) {
            header.style.cssText = `opacity: 0;
                                transition: 2s;`;
        }
        else {
            header.style.cssText = `opacity: 0;
                                transition: 2s;`;
            }
        })
    }

        menu.addEventListener('click', function () {
        span1.classList.toggle('active-span1');
        span2.classList.toggle('active-span2');
        span3.classList.toggle('active-span3');
        
            
            if (span1.classList.contains('active-span1') && span2.classList.contains('active-span2') && span3.classList.contains('active-span3')) {
                header.style.cssText = `opacity: 1;
                                transition: 2s;`;
            }
            else {
                header.style.cssText = `opacity: 0;
                                transition: 2s;`;
            }
        });
}


let to_top = document.getElementById("to_top");
console.log(window.scrollY);
document.body.onscroll = function () {
    if(window.scrollY>100){
        to_top.style.cssText = `top:94%;
                        transition:2s`;
    }
    else {
        to_top.style.cssText = `top:-5%;
                        transition:2s`;
    }
}

window.onresize = function () {
    window.location.reload();
}