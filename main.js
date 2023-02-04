function resize() {

    var canvas = document.getElementById('canvas');
var windowwidth = window.innerWidth
    var width;
    var height;

    if (windowwidth < 1140) {
        //height = window.innerHeight;
      height = 320;
        width = 320;
    } else {
        width = 500;
        height = 500;
    }

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
};

window.addEventListener('resize', resize, false);
    var options = ["+1 другому", "X2", "X1", "X3",
  "ТЫ ЛОХ", "X4", "Пропуск", "X5"
];
var coloroptions = ["#8D5033", "#E5A464", "#8D5033", "#E5A464", "#8D5033", "#E5A464", "#8D5033", "#E5A464"];
 var imgarray = ["https://www.aniboaz.co.il/Blog/libi/wp-content/uploads/sites/4/2016/04/libi_new_2.png" , "https://www.aniboaz.co.il/Blog/libi/wp-content/uploads/sites/4/2016/04/libi_new_2-02.jpg"];


var startAngle = 110;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 220;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
}

function RGB2Color(r, g, b) {
  return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function drawRouletteWheel() {

  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 150;
    var insideRadius = 40;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);

    ctx.strokeStyle = "Teal";
    ctx.lineWidth = 1;

    ctx.font = "bold 24px Oswald, sans-serif";

    for (var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      //ctx.fillStyle = colors[i] ** getColor(i,options.length) ;
      ctx.fillStyle = coloroptions[i];

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();
      ctx.shadowOffsetX = -10;
      ctx.shadowOffsetY = -10;
      ctx.shadowBlur = 30;
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.save();
       var imageObj = new Image();
           ctx.fillStyle = "white";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,        250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];            
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.drawImage(imageObj, 5, 20, 40, 40);
          ctx.restore();          
    }

    //Arrow

    ctx.beginPath();
    ctx.moveTo(250 - 15, 250 - (outsideRadius + 25));
    ctx.lineTo(250 + 15, 250 - (outsideRadius + 25));
    ctx.lineTo(250 + 15, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 15, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 15, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 15, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 15, 250 - (outsideRadius + 15));
    ctx.shadowOffsetX = +10;
    ctx.shadowOffsetY = 22;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.end;
  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 23;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 200;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 10;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 10);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.font = "bold 30px Oswald, sans-serif";
  var text = options[index];
  // ctx.fillStyle = coloroptions[index];
  ctx.fill();
  ctx.fillText(text, 180, 22);
  ctx.restore(); window.location = linka[index];
}

function easeOut(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}
 window.onload = function () { 
drawRouletteWheel();
    }

document.querySelector('.koleso').addEventListener('click', (e)=>{
  e.preventDefault();
  document.querySelector('.popup-table').style.display = 'flex';
  document.querySelector('.koleso-fortun').style.display = 'block'
  document.querySelector('.closeBtn').addEventListener('click', (e)=>{
    e.preventDefault();
    document.querySelector('.popup-table').style.display = 'none';
    document.querySelector('.koleso-fortun').style.display = 'none';
  });
});

document.querySelectorAll('.question-row a').forEach(item =>{
  item.addEventListener('click', (e)=>{
    e.preventDefault();
    document.querySelector('.popup-table').style.display = 'flex';
    data.forEach(el => {
      if (item.getAttribute('data-id') == el.id){
        document.querySelector('.question').style.display = 'block';
        document.querySelector('.question').insertAdjacentHTML('afterbegin', el.question);
        document.querySelector('.answerLink').style.display = 'block';
        document.querySelector('.answerLink').addEventListener('click', (link)=>{
          link.preventDefault();
          if (item.getAttribute('data-id')<41){
            document.querySelector('.question').innerHTML = '';
            document.querySelector('.answer').style.display = 'block';
            document.querySelector('.answer').innerHTML = ''
            document.querySelector('.answer').insertAdjacentHTML('afterbegin', el.answer);
          } else {
            document.querySelector('.answer').innerHTML = ''
            document.querySelector('.question').innerHTML = '';
            document.querySelector('.question').insertAdjacentHTML('afterbegin', el.answer);
          }
        });
      };
    });
    document.querySelector('.closeBtn').addEventListener('click', (btn)=>{
      btn.preventDefault();
      item.classList.add('done');
      document.querySelector('.question').innerHTML = '';
      document.querySelector('.popup-text.answer').innerHTML = '';
      document.querySelector('.popup-table').style.display = 'none';
      document.querySelector('.answerLink').style.display = 'none';
    });
  });
});


document.querySelector('.supergame').addEventListener('click', (e)=>{
  e.preventDefault();
  document.querySelector('.popup-table').style.display = 'flex';
  document.querySelector('.question').style.display = 'block';
  document.querySelector('.question').insertAdjacentHTML('afterbegin', data[0].question);
  document.querySelector('.closeBtn').addEventListener('click', (e)=>{
    e.preventDefault();
    document.querySelector('.popup-table').style.display = 'none';
    document.querySelector('.question').style.display = 'none';
    document.querySelector('.question').innerHTML = '';
  });
});


const data = [
  {
    id: 0,
    question: "НАЗОВИТЕ НАИБОЛЬШЕЕ КОЛИЧЕСТВО СНГ СТРИМЕРОВ С 900К+ ФОЛОВЕРОВ",
    answer: "",
  },
  {
    id: 1,
    question: "В Древнем Риме фаллос не только олицетворял мужское здоровье, но и использовался как...",
    answer: "Оберег",
  },
  {
    id: 2,
    question: "Все обезьяны смеются, если их...",
    answer: "Пощекотать",
  },
  {
    id: 3,
    question: "В космосе невозможно услышать...",
    answer: "Никаких звуков",
  },
  {
    id: 4,
    question: "В Греции во времена Александра Великого писком моды были светлые...",
    answer: "Волосы",
  },
  {
    id: 5,
    question: "Когда-то ушную серу использовали в качестве...",
    answer: "Бальзама для губ и мази для заживления ран",
  },
  {
    id: 6,
    question: "Грудные импланты способны остановить...",
    answer: "Пулю",
  },
  {
    id: 7,
    question: "Когда-то вместо парков люди отдыхали на...",
    answer: "Кладбищах",
  },
  {
    id: 8,
    question: "Прыщи замедляют...",
    answer: "Старение",
  },
  {
    id: 9,
    question: "Люди, которые постоянно жалуются...",
    answer: "Живут дольше",
  },
  {
    id: 10,
    question: "Некоторым людям достаточно 4 часов, чтобы...",
    answer: "Выспаться",
  },
  {
    id: 11,
    question: "Нет, хоуми, ноу ноу ноу ноу ноу...",
    answer: "Ноу возвращения, только блять вперед, я не оглядываюсь назад, не возвращаюсь к бывшим, это как шаг назад, переехать в деревню и снимать CS:GO (ZLOY)",
  },
  {
    id: 12,
    question: "Пацан не тот, кто много баб ебал...",
    answer: "А тот кто А плэнт защищал. (BUSTER)",
  },
  {
    id: 13,
    question: "Миллион зрителей на прямой трансляции...",
    answer: "У меня столько будет. (Некоглай)",
  },
  {
    id: 14,
    question: "В первые в жизни я отказался бы от пельменей и съел бы...",
    answer: "Твой вареник. (zubarefff)",
  },
  {
    id: 15,
    question: "Слушай, я конечно не Дмитрий Масленников, но...",
    answer: "В твою заброшку я бы залез. (enzzai)",
  },
  {
    id: 16,
    question: "Мне похуй что там делают другие...",
    answer: "Мне не похуй что делают мои ребята. (Bratishkin)",
  },
  {
    id: 17,
    question: "А чтооооо...",
    answer: "Случилоооось???? (rostislav_999)",
  },
  {
    id: 18,
    question: "Я правильно понимаю, что у вас тут штативчики, объективчики...",
    answer: "Ой ой ой ой ой (frametamer666)",
  },
  {
    id: 19,
    question: "Я в моменте поставил 45 тысяч долларов на цвет и...",
    answer: "Проиграл (WHOPLOHOYPAREN)",
  },
  {
    id: 20,
    question: "Я ФУУУУУЛЬ...",
    answer: "ТИЛЬТ (Dmitry_Lixxx)",
  },
  {
    id: 21,
    question: "Оскар твича за номинацию АФК 2022 года получил(а)...",
    answer: "Fruktozka",
  },
  {
    id: 22,
    question: "Оскар твича за номинацию СЫКЛО 2022 года получил(а)...",
    answer: "QUICKHUNTIK",
  },
  {
    id: 23,
    question: "Оскар твича за номинацию ПРОРЫВ 2022 года получил(а)...",
    answer: "zubarefff",
  },
  {
    id: 24,
    question: "Оскар твича за номинацию КРИНЖ 2022 года получил(а)...",
    answer: "MuhanJan",
  },
  {
    id: 25,
    question: "Оскар твича за номинацию БАН 2022 года получил(а)...",
    answer: "Dmitry_Lixxx",
  },
  {
    id: 26,
    question: "Оскар твича за номинацию РЕЙДЖ 2022 года получил(а)...",
    answer: "buster",
  },
  {
    id: 27,
    question: "Оскар твича за номинацию АЛКАШ 2022 года получил(а)...",
    answer: "mazellovvv",
  },
  {
    id: 28,
    question: "Оскар твича за номинацию ШИП 2022 года получили...",
    answer: "shadowkekw + Милана Хаметова",
  },
  {
    id: 29,
    question: "Оскар твича за номинацию ИГРА 2022 года получила...",
    answer: "Dread Hunger",
  },
  {
    id: 30,
    question: "Оскар твича за номинацию СКВАД 2022 года получил...",
    answer: "89squad",
  },
  {
    id: 31,
    question: "Биг бой Абу-Даби",
    answer: "Увезу твою суку в Дубаи (Платина - Abu Dhabi Ba6y)",
  },
  {
    id: 32,
    question: "А горький вкус твоей любви...",
    answer: "Меня убил, теперь без сил, А ты змея пустила яд, Любовный яд, а я так рад (Султан Лагучев - Горький вкус)",
  },
  {
    id: 33,
    question: "Губки бантиком, бровки домиком...",
    answer: "Летят лайки под каждым роликом (Милана Хаметова - УМКА)",
  },
  {
    id: 34,
    question: "Когда меня не станет...",
    answer: "Я буду петь голосами... Моих детей и голосами их детей. (Баста - Сансара)",
  },
  {
    id: 35,
    question: "Да, я богатый уёбок...",
    answer: "У меня денег так много, Моё ебало — коробка, Хули, бля, ты такой робкий? (MORGENSHTERN - ПОСОСИ)",
  },
  {
    id: 36,
    question: "Ice... Ice, ice baby...",
    answer: "Я буду тебя любить, даже когда я буду на небе. (ГУФ - Ice baby)",
  },
  {
    id: 37,
    question: "Я вылез из вагины...",
    answer: "Потом ещё из жопы вылезал полжизни. (OG Buda & Дора - Капли)",
  },
  {
    id: 38,
    question: "Ни одна из этих bitch мне не верила...",
    answer: "Поднял вверх весь свой squad, будто перила. (ЕГОР КРИД - LAMBO URUS)",
  },
  {
    id: 39,
    question: "Все розы погибают без воды...",
    answer: "И нас с тобою тоже не спасти (BUSTER - РОЗЫ)",
  },
  {
    id: 40,
    question: "Опустив ручонки, сын дрожал как лист... За стеной избушки...",
    answer: "Был и плач, и свист (Никитин И.С.)",
  },
  {
    id: 41,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/OUG0SBRKOZg?clip=Ugkx-kq9knMCUQaC-yrfdpI9vsF9nfsJuYuL&amp;clipt=ENbKERje8RE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/OUG0SBRKOZg?clip=UgkxsIXpNxsF6c-coC2B_e1DGTo3nHTnlKTj&amp;clipt=EIbwERiOlxI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 42,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/OUG0SBRKOZg?clip=UgkxvnFyhcwyTUF-op07o9knBmR1uLEG0vda&amp;clipt=EN_ZExjngBQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/OUG0SBRKOZg?clip=Ugkx5riWmOW4NsI9tKsasPyip0c38VzAh-am&amp;clipt=EL2CFBiWsRQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 43,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ALy8ag7WH_s?clip=UgkxaF4qr-v1rGWYkBYsUYf8rc9zWR2FnRLY&amp;clipt=EKOXChirvgo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ALy8ag7WH_s?clip=UgkxzBn1fWzGEFRtFpRT6MsBeyam3tMpC3A5&amp;clipt=EJGxChiZ2Ao" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 44,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/FkgRjuHYzhE?clip=Ugkxnabqh-LpbRDuat8vKwX3Lean2wdD98bg&amp;clipt=EKDIARio7wE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/FkgRjuHYzhE?clip=UgkxfaJl_E6BP8qrPTdO1L9aN64zb21rO56S&amp;clipt=EPHkARjWmAI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 45,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ALy8ag7WH_s?clip=Ugkx7ZkJRGBuBrkPnu9cU3nVIPh7yHvqcu9_&amp;clipt=EILAHBiK5xw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ALy8ag7WH_s?clip=UgkxX3acR1c15dIMfqjJ4pBYhI2YnC1BC7wu&amp;clipt=EMzLHBjU8hw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 46,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/FkgRjuHYzhE?clip=Ugkxky8pwPVAPiUzD_UFdoIxIztqLAFoCSCf&amp;clipt=EKVsGK2TAQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/FkgRjuHYzhE?clip=UgkxK-TB-zFKx1O-M87x7O9J_pljNdlzA1NH&amp;clipt=ELSbARjHxwE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 47,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/7IWeySZceTc?clip=Ugkxx0vyGTnrwuMm5emnLXc-hA1n441NWeTi&amp;clipt=EPCDEhj4qhI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/7IWeySZceTc?clip=UgkxzU-wKi0yQEQ5IwcJwN-9QXtKv2fl7Cng&amp;clipt=EP-wEhiH2BI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 48,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/HU177igQWvQ?clip=Ugkx8za5ZsbRoto_T8saCSjruI2xaKG5_aH9&amp;clipt=EKuyBhiz2QY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/HU177igQWvQ?clip=UgkxLmnMa1aQ9SHXxr5Agxkr3CGX45FLzOSi&amp;clipt=ELznBhjEjgc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 49,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/7IWeySZceTc?clip=Ugkxc-tS3Z-HIysvEaF4OT-qIRnY-82n7UTs&amp;clipt=ELb4BRi-nwY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/7IWeySZceTc?clip=UgkxrrEailLRYngFl3Rc8QY0vcgrUABBuxOB&amp;clipt=EP-rBhiT9AY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 50,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/HU177igQWvQ?clip=UgkxOy0g1zcT48VTxNv5mhRkW-WXaUQY6iAX&amp;clipt=EJ-2AhjLiAM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/HU177igQWvQ?clip=Ugkxd3hTn6Vs8bU_jHRBL7P8-4eQdQRvUsfR&amp;clipt=EKH_AhievQM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 51,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/D3EekXUl0vs?clip=UgkxE_4mD8HNtcvbMeuOoLUCtJy769qF5Ffu&amp;clipt=EKzVMRi0_DE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/D3EekXUl0vs?clip=UgkxO33ZuPnfAahh8HFXQFZHH8B0uZpJDmGH&amp;clipt=EN74MRjxrzI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 52,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mbcwErUtQLU?clip=UgkxhsW4zyKPwHQJSYdWdZ52PUwryXlO5Keb&amp;clipt=EKmwCBix1wg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mbcwErUtQLU?clip=UgkxOsQ4FmpYluAyPJkmjEqZ4rgXmBSQfoOY&amp;clipt=ENzMCBiYgQk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 53,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/6-PVtF2-NqI?clip=UgkxhCSKW0KfE5OIBw6oopnnd83stgoN5ck9&amp;clipt=ELvBmAUY07aZBQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/6-PVtF2-NqI?clip=UgkxWddt7-oBLuu95x3RhgpGLjSCAstOE9_h&amp;clipt=EOf3mgUY_rGbBQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 54,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mbcwErUtQLU?clip=UgkxC4zAc88h4B-IwCFKwJiVOoi_OxOTyJbr&amp;clipt=ENb5IhjeoCM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/mbcwErUtQLU?clip=UgkxOqF_FimTmteBit442TBcTcyhJK6BJOgY&amp;clipt=EPC_Ixj45iM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 55,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/97TNHre32QU?clip=Ugkx0OGmNsEyVyFSkb3sX8ve5gewHaPRjy2I&amp;clipt=EKK-CBjk-gg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/97TNHre32QU?clip=UgkxGl9KnC3bl3Ihkp-cvxe-rPQ6DsDB2dQt&amp;clipt=EJ72CBj9nwk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 56,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/NdBEXJ4d7Sg?clip=UgkxUGni4K1FAOD58z74xe8xnoGWLuIAcVgA&amp;clipt=EPuvBRjx-QU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/NdBEXJ4d7Sg?clip=UgkxHbRWtE4hOkAWT5HfrzxC-48O_WcclTaF&amp;clipt=EO6qDBjo9ww" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 57,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/bOs_C5DoUxk?clip=UgkxRAn3YhO9jPl3QETEVNT2kThzQu2nq6my&amp;clipt=EOqTNxjyujc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/bOs_C5DoUxk?clip=UgkxzuoWcwlR2GihBkUydbP-KvMaWiJvIGJq&amp;clipt=EMPENxjL6zc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 58,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/3-El6v4v-fQ?clip=Ugkx77A8ssXTdA0qP7fR5xdQ6dVKoRFU7kYm&amp;clipt=EJDSBRiY-QU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/3-El6v4v-fQ?clip=UgkxLrdrLU1Aj8JDbY9lC1qWTVF-L_b0NiSv&amp;clipt=EJD1BRiYnAY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 59,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/3-El6v4v-fQ?clip=Ugkxe6uCDAsDKqkQU5oY_OGeyPjcc9aSaqo_&amp;clipt=EIrXGxiS_hs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/3-El6v4v-fQ?clip=UgkxehvkGuzkPUqqm4--90hPGJnQxViWnxT1&amp;clipt=EIHVHBibzx0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 60,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/PkWG7PClyzU?clip=UgkxoelsNRR5Oc0U_iTRdj0XxzkcZEbDSNWZ&amp;clipt=ELb1ChjtsAs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/PkWG7PClyzU?clip=UgkxAdY3OA9symFHQPrPraDM3SoNIKT5gnZV&amp;clipt=ENOsCxjz-Qs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 61,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/486z36DwJLY?clip=Ugkxa4DOZocF_KGJFw3q4O0Em1asSzghAgHB&amp;clipt=EKbkCBizjAo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/486z36DwJLY?clip=UgkxNaxh93m5_dBRts01x0PUfRxAbh2ECh-v&amp;clipt=EPaNDhibwA8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 62,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/NIdQAATC_mM?clip=Ugkxobmk2PzGK5MzHFTLUPPqqSAPkoE0a-lU&amp;clipt=EJeHBBj_5wQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/NIdQAATC_mM?clip=UgkxNdRvRUpSZklsSiDy3H_-xH1V5XSweCA_&amp;clipt=ELfKChjPvws" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 63,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/PaMUKAbG7VE?clip=UgkxmjQcy-rNwkr7qZAXWCaiVz4aE7on5YiI&amp;clipt=EL_JBhjH8AY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/PaMUKAbG7VE?clip=UgkxuEQ6ogGX3C0rHPBjKGXqefnG-Es1TXFC&amp;clipt=EOf5Bhigxgc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 64,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/qBM9RsfjAkM?clip=UgkxWaMZFGHxEXOtHo_-0Xh0fJWvs_TVWkAL&amp;clipt=EIHyCBj3jwo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/qBM9RsfjAkM?clip=UgkxgfOf82mm3VMr9Yn-zLzjLDyGOWHO1orV&amp;clipt=EOKMChipsgs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 65,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/U3R9Z1hOo68?clip=Ugkxu6bMigpJNUijFYXn77v51nuPt2BgGarO&amp;clipt=EIS8QxicsUQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/U3R9Z1hOo68?clip=UgkxTFDPtyNzZ44j5MydqL6tuZrKcOOgup1c&amp;clipt=EKvxRRjD5kY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 66,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/U3R9Z1hOo68?clip=UgkxuZDl2IuTSjQgJ7Mq2QTLOlxldiI35eVX&amp;clipt=EJKJHxip4h8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/U3R9Z1hOo68?clip=UgkxRcslGM3EYj2cD5a0wuW_3V4L-IkXF7dA&amp;clipt=EPHgHxjlxiA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 67,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/L75JrrE_UBg?clip=UgkxEYv-USG-ztFV_72trrscDH5C3x6Rlqqz&amp;clipt=EOLeEhjqhRM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/L75JrrE_UBg?clip=UgkxBkaMQ6ELdBXPnyBhX1J8mky80QerrDyY&amp;clipt=EIOEExiarRQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 68,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RSA0x3vDk0s?clip=Ugkx3oFC9Vvqt_Z6z0FJW8FAcr82arml4i9J&amp;clipt=EPHHAxjv-gM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RSA0x3vDk0s?clip=UgkxKP2qx3n88FXnsbmeqiK0YPE0mtVHmxpp&amp;clipt=EP-vBBiXpQU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 69,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/DtrUtD4rNPg?clip=UgkxeyAQPdgIKcYAPB8D51R_Csp4se7pMWwW&amp;clipt=EM77CRi2wAo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/DtrUtD4rNPg?clip=Ugkxr1YumfIKjzG-axPe-VYdUOAoIMQlAxeH&amp;clipt=EPzxChj83As" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 70,
    question: `<iframe width="560" height="315" src="https://www.youtube.com/embed/cUwFpHSAQz0?clip=Ugkx-YAAsxgSZj24fjmVZ0ibOj5BzBFVfFri&amp;clipt=EMsEGLNl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    answer: `<iframe width="560" height="315" src="https://www.youtube.com/embed/cUwFpHSAQz0?clip=Ugkxl3tVq2uyiMnZJY6Cnc8D1u26m5B1wYlX&amp;clipt=EO5jGPvvAQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  
]