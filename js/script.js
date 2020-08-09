 /* $('div#popup').hide();
 $(document).ready(() => {

     $.getJSON('https://danepubliczne.imgw.pl/api/data/synop/',
         data => {
             for (let element of data) {
                 let divAdd = $(`<div></div>`);
                 divAdd.addClass('content');
                 $(divAdd).attr('id', element.id_stacji);

                 let h1 = $('<h1></h1>').text(element.stacja);
                 divAdd.append(h1);

                 let temp = $('<p></p>').text(`Temperatura: `);
                 temp.append($(`<span>${element.temperatura}°C</span>`))
                 divAdd.append(temp);

                 let wil = $('<p></p>').text(`Wilgotność względna: `);
                 wil.append($(`<span>${element.wilgotnosc_wzgledna}%</span>`))
                 divAdd.append(wil);

                 let press = $('<p></p>').text(`Ciśnienie: `);
                 press.append($(`<span>${element.cisnienie} hPa</span>`))
                 divAdd.append(press);

                 $('div.wrap-box').append(divAdd);
             }


             $('.fas').click(() => {
                 $('div#popup').hide();
             })


             $('div.content').click((e) => {
                 let id = e.currentTarget.id;
                 $('div#popup').hide();
                 $('div#popup').fadeIn();

                 $.getJSON(`https://danepubliczne.imgw.pl/api/data/synop/id/${id}`,
                     data => {
                         $('div#contentContainer').empty();
                         let contentContainer = $('div#contentContainer');
                         contentContainer.append($(`<p>Nazwa stacji: <span>${data.stacja}</span></p>`));

                         contentContainer.append($(`<p>Data pomiaru: <span>${data.data_pomiaru}</span>, godzina <span>${data.godzina_pomiaru}</span></p>`));

                         contentContainer.append($(`<p>Temperatura: <span>${data.temperatura}</span> °C</p>`));

                         contentContainer.append($(`<p>Prędkość wiatru: <span>${data.predkosc_wiatru}</span> km/h</p>`));

                         contentContainer.append($(`<p>Kierunek wiatru: <span>${data.kierunek_wiatru}</span>°</p>`));

                         contentContainer.append($(`<p>Wilgotność względna: <span>${data.wilgotnosc_wzgledna}</span>%</p>`));

                         contentContainer.append($(`<p>Suma opadu: <span>${data.suma_opadu}</span> mm</p>`));

                         contentContainer.append($(`<p>Ciśnienie: <span>${data.cisnienie}</span> hPa</p>`));
                     })
             })
         });

 }); */

 let popup = document.getElementById('popup');

 const basicStyle = () => {
     popup.style.opacity = '0';
     popup.style.visibility = 'hidden';
 }

 basicStyle();


 fetch('https://danepubliczne.imgw.pl/api/data/synop/')
     .then(resp => resp.json())
     .then(data => {
         for (let element of data) {
             let divAdd = document.createElement('div');

             divAdd.classList.add('content');
             divAdd.setAttribute('id', element.id_stacji);

             divAdd.innerHTML = `
             <h1>${element.stacja}</h1>
             <p>Temperatura: <span>${element.temperatura}°C</span></p>
             <p>Wilgotność względna: <span>${element.wilgotnosc_wzgledna}%</span></p>
             <p>Ciśnienie: <span>${element.cisnienie} hPa</span></p>
             `;

             let div = document.getElementById('wrap-box');
             div.appendChild(divAdd);
         }

         let fas = document.getElementsByClassName('fas');

         fas[0].addEventListener('click', (e) => {
             basicStyle();
         })

         let divContent = document.getElementsByClassName('content');
         for (let elem of divContent) {
             elem.addEventListener('click', (e) => {
                 let id = e.currentTarget.id;

                 if (popup.style.visibility == 'visible') {
                     basicStyle();
                 }

                 setTimeout(() => {
                     popup.style.visibility = 'visible';
                     popup.style.opacity = '1';

                     fetch(`https://danepubliczne.imgw.pl/api/data/synop/id/${id}`)
                         .then(resp => resp.json())
                         .then(data => {
                             let contentContainer = document.getElementById('contentContainer');

                             contentContainer.innerHTML = `
                         <p>Nazwa stacji: <span>${data.stacja}</span></p>
                         <p>Data pomiaru: <span>${data.data_pomiaru}</span>, godzina <span>${data.godzina_pomiaru}</span><p>
                         <p>Temperatura: <span>${data.temperatura}</span> °C</p>
                         <p>Prędkość wiatru: <span>${data.predkosc_wiatru}</span> km/h</p>
                         <p>Kierunek wiatru: <span>${data.kierunek_wiatru}</span>°</p>
                         <p>Wilgotność względna: <span>${data.wilgotnosc_wzgledna}</span>%</p>
                         <p>Suma opadu: <span>${data.suma_opadu}</span> mm</p>
                         <p>Ciśnienie: <span>${data.cisnienie}</span> hPa</p>
                         `;
                         })
                 }, 300)
             })
         }
     });