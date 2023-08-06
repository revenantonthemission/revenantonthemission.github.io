const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function pageTransition() {
    //Button click active class
    for(let i=0; i<sectBtn.length; i++) {
        sectBtn[i].addEventListener('click', function(){
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
            this.className += ' active-btn';
        });
    }

    //Sections active class
    allSections.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if(id) {
            //remove selected from the other btns
            sectBtns.forEach((btn) => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');

            //hide other sections
            sections.forEach((section) => {
                section.classList.remove('active');
            });
            
            const element = document.getElementById(id);
            element.classList.add('active');
        }
    });

    //Toggle Theme
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click', () => {
        let element = document.body;
        element.classList.toggle('light-mode');
    });
}

pageTransition();

//https://viewise.tistory.com/entry/공공데이터포털-nodejs로-일출-일몰-시간-가져오기

import {convert} from 'xml-js';
import {got} from 'got';
import { Date } from 'date-utils';

var url = 'http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getAreaRiseSetInfo';
var queryParams = '?' + encodeURIComponent('serviceKey') + 's6GQlcQuu2Q2%2BSGiaBvg273QRKyAS%2FOkcfLS8Jbq%2BMmbwCuoJJfTDLOMUOtlZvu75bpvBntAZ%2BYni5JLzhFNQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('locdate') + '=' + encodeURIComponent(new Date().toFormat('YYYYMMDD')); /* */
queryParams += '&' + encodeURIComponent('location') + '=' + encodeURIComponent('서울'); /* */

const getData = async () => {
    try {
        const response = await got(url + queryParams);
        /*var json = convert.xml2json(response, {compact: true, spaces: 4});
        var data = JSON.parse(json).response.body.items.item;
        var loc = data['location']._text;
        var locdate = data['locdate']._text;
        var sunrise = data['sunrise']._text;
        var sunset = data['sunset']._text;
    
        console.log('Location: ', loc);
        console.log('Date: ', locdate);
        console.log('Sunrise Time: ', sunrise);
        console.log('Sunset Time: ', sunset);    
    
        let today = new Date();
        let currentHour = today.getHours();
        let currentMinute = today.getMinutes();
        let currentTime = currentHour + currentMinute;
    
        if(currentTime > sunrise && currentTime < sunset) {
            console.log('It is day time');
        } else {
            console.log('It is night time');
        }*/

    } catch (error) {
        console.log(error.response.body);
    }
};

getData();
