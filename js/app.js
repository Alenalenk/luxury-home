const menuButton = document.querySelector('.menu-button');
const submenuButton = document.querySelector('.header__submenu-btn');
const submenu = document.querySelector('.header-submenu')
const menuBody = document.querySelector('.header__menu');
const backBtn = document.querySelector('.back');


//Menu-burger
if(menuButton) {    
    menuButton.addEventListener("click", function(e) {
    menuButton.classList.toggle('active');
    menuBody.classList.toggle('menu-active');

    if(document.documentElement.classList.contains('submenu-active')){
        document.documentElement.classList.remove('submenu-active');
    }    
});
}

if(submenuButton) {    
    submenuButton.addEventListener("click", function(e) { 
    document.documentElement.classList.add('submenu-active');     
});
}

if(backBtn) {
    backBtn.addEventListener("click", function(e) {        
        if(document.documentElement.classList.contains('submenu-active')){
            document.documentElement.classList.remove('submenu-active');
        }    
    });
}


// moving blocks when changing viewport
const headerBtn = document.querySelector('.header__button');
const headerPhone = document.querySelector('.header__phone');
const parentOriginal = document.querySelector('.header__contacts');
const parent = document.querySelector('.header__list')

window.addEventListener('resize', function(e){
    const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    
    if(viewport_width < 778){
        parent.insertBefore(headerBtn, parent.children[4]);
        parent.insertBefore(headerPhone, parent.children[5])
    } else {
        parentOriginal.insertBefore(headerBtn, parentOriginal.children[0]);
        parentOriginal.insertBefore(headerPhone, parentOriginal.children[2])
    }
})

//Popup
const popupLinks = document.querySelectorAll('.popup-button');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true; 

const timeout = 300;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++){
        const popupLink = popupLinks [index];
        popupLink.addEventListener("click", function (e){
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.popup-close');
if (popupCloseIcon.length > 0){
    for (let index = 0; index < popupCloseIcon.length; index++){
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e){
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
} 

function popupOpen (curentPopup){
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup-open');
        if (popupActive){
            popupClose (popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function(e){
            if (!e.target.closest('.popup__content')){
                popupClose(e.target.closest('.popup'));
            }
        });
        }
    }

    function popupClose (popupActive, doUnlock = true){
        if (unlock){
            popupActive.classList.remove('open');
            if(doUnlock){
                bodyUnlock();
            }
        }
    }

    function bodyLock (){
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        if(lockPadding.length>0){
        for(let index = 0; index < lockPadding.length; index++){
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;

        }
        
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout(function(){
            unlock = true;
        }, timeout);
    }
        

function bodyUnlock() {
    setTimeout(function(){
        for (let index = 0; index < lockPadding.length; index ++){
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }   
        body.style.paddingRight = '0px';
        body.classList.remove('lock');

        }, timeout);

        unlock = false;
        setTimeout(function (){
            unlock = true;
        }, timeout);
    }

   
    
           
// Cards filter
const cards = document.querySelectorAll('.card');
const list = document.querySelector('.head-slider__buttons');

function filter() {

    list.addEventListener ('click', event => {
        const targetEl = event.target;
        const targetId = targetEl.dataset.f;
        const buttons = [...list.querySelectorAll('.head-slider__button')];

        if (buttons.includes(targetEl)){
            buttons.forEach(button => button.classList.remove('head-slider__button--active'));
            targetEl.classList.add('head-slider__button--active');
        }
        

        switch(targetId) {
            case 'all': 
              getItems('card')
              break

            case 'build': 
              getItems(targetId)
              break

            case 'design': 
              getItems(targetId)
              break
        }
        mySwiper.update();
    })
}

filter()

function getItems (className){
   
            cards.forEach(card => {
                if (card.classList.contains(className)){
                    card.classList.remove('hide')
                } else {
                    card.classList.add('hide')
                }
            })
            
}

//Videoplayer
const video = document.querySelector('video');
const playBtn = document.querySelector('.video-start');

function videoPlay (){
    if (video.paused){
        video.play()
        playBtn.classList.add('play')
    } else {
        video.pause()
        playBtn.classList.remove('play')
    }
}
playBtn.addEventListener ('click', videoPlay);


//Main slider
var arr = ['Квартири', 'Будинки', 'Комерція'];
var swiper = new Swiper('.swiper', {
    
    pagination: {
        el: '.swiper-pagination',
        clickable: 'true',
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + 0 + (index + 1) + '<p>' + (arr[index]) + '</p>' + '</span>';
        }

    },
   
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    
});


//Cards slider
var mySwiper = new Swiper('.projects-swiper', {
     spaceBetween: 10,
    loop: false,
    
    observer: true,
    observeSlideChildren: true,
    observeParents: true,
    

    slidesPerView: 4,

    breakpoints: {
        0: {
          slidesPerView: 1,
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        640: {
            slidesPerView: 4,
        }
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: 'true',
    },   
});






