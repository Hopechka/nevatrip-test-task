const container = document.getElementById('container');
const route = document.getElementById('route');
const eventTimeAll = document.getElementById('eventTimeAll');
const selectTimeAll = document.getElementById('timeAll');
const eventTimeBack = document.querySelector('.eventTimeBack');
const selectTimeBack = document.getElementById('timeBack');
const num = document.getElementById('num');
const btnTotal = document.querySelector('.btn-total');
const departureTimeA = ['18:00', '18:30', '18:45', '19:00','19:15','21:00'];
const departureTimeB = ['18:30', '18:45', '19:00','19:15','19:35', '21:50','21:55'];
const departureLocalTimeA = departureTimeA.map(time=>getCorrectTime(time))
const departureLocalTimeB = departureTimeB.map(time=>getCorrectTime(time))

class Trip{
  constructor(){
    this.route = 'выбор направления',
    this.time = 'выберите время',
    this.start = '00:00',
    this.finish = '00:00',
    this.timeStampStart = 0,
    this.num = 0,
    this.ticketPrice = 0,
    this.duration = 50
  }

  createElement(){
    let div = document.createElement('div');
      div.className = "alert";
      div.innerHTML = `<p>Вы выбрали <strong>${this.num}</strong> билета по маршруту <strong>${this.route}</strong> стоимостью <strong>${this.num*this.ticketPrice}руб.</strong></p>
      <p>Это путешествие займет у вас <strong>${this.duration}</strong> минут.</p>
      <p>Теплоход отправляется в <strong>${this.start}</strong>, и прибудет в конечный пункт <strong>${this.finish}</strong>.</p>`;
      container.append(div);
  }

  createEventTimeAll(direction){
    let arr
    let valName
    if(direction !== 'из B в A'){
      arr = departureLocalTimeA
      valName = 'из A в B'
    }else{
      arr = departureLocalTimeB
      valName = 'из B в A'
    }

    selectTimeAll.innerHTML = '<option value="выберите время">выберите время</option>'
    arr.forEach(time => {
        let option = document.createElement('option')
        option.setAttribute('value', `${time}`)
        option.innerHTML = `${getStringTime(time)}(${valName})`
        selectTimeAll.append(option)
      })
  }

  createEventTimeBack(timeStart){
    const gapIndex = checkTimeGap(timeStart)
    selectTimeBack.innerHTML = '<option value="выберите время">выберите время обратно</option>'
    departureLocalTimeB.forEach((time,index) => {
      if(index >= gapIndex){
        let option = document.createElement('option')
      option.setAttribute('value', `${time}`)
      option.innerHTML = `${getStringTime(time)}(из B в A)`
      selectTimeBack.append(option)
      } 
    })
  }
}

function getHandleCount(){
  message.innerHTML = `<p>Вы выбрали <strong>${this.num}</strong> билета по маршруту <strong>${this.route}</strong> стоимостью <strong>${this.num*this.ticketPrice}руб.</strong></p>
    <p>Это путешествие займет у вас <strong>${this.duration}</strong> минут.</p>
    <p>Теплоход отправляется в <strong>${this.start}</strong>, и прибудет в конечный пункт <strong>${this.finish}</strong>.</p>`;
  message.classList.add('active')
}

const yourTrip = new Trip()
yourTrip.createElement()

function getStringTime(tourTime){
  const tourHours = new Date(tourTime).getHours() < 10 ? `0${new Date(tourTime).getHours()}`: new Date(tourTime).getHours()
  const tourMinutes = new Date(tourTime).getMinutes() < 10 ? `0${new Date(tourTime).getMinutes()}`: new Date(tourTime).getMinutes()
 return  `${tourHours}:${tourMinutes}`
}

function getCorrectTime(time){
  const hour = +time.slice(0,2)
  const minutes = +time.slice(3,5)
  const today = new Date()
  const timeZoneSpb = today.getTimezoneOffset() + 180
  const tourTimeStart = today.setHours(0,0,0,0)+(hour*3600*1000) + (minutes*60*1000) - (timeZoneSpb/60*3600*1000)
  return new Date(tourTimeStart)
}

function calculateDuringTime(timeOwenWay, roundTrip=false){
  const duringOneTrip = 50;
  const t = new Date(timeOwenWay)
  const roundTripTime = new Date(yourTrip.timeStampStart)
  const tourTimeOneWayTrip =  t.getTime() + (duringOneTrip*60*1000)
  yourTrip.duration = roundTrip ?  (tourTimeOneWayTrip - roundTripTime)/60000 : duringOneTrip
  return getStringTime(tourTimeOneWayTrip)
}

function checkTimeGap(timeStart){
  const duringOneTrip = 50;
  const t = new Date(timeStart);
  const tourTimeStart = t.getTime()+(duringOneTrip*60*1000);
  return departureLocalTimeB.findIndex((item,index)=>{
    if(item.getTime() >= tourTimeStart)
    {return index}
  })
}

function selectRoute(){
  const getValue = this.value;
  yourTrip.route = getValue

  if(getValue === 'из A в B и обратно в А'){
    eventTimeBack.classList.add('active')
    yourTrip.ticketPrice = 1200
  }else{
    eventTimeBack.classList.remove('active')
    yourTrip.ticketPrice = 700
  }

  if(getValue !== 'из B в A'){
    yourTrip.createEventTimeAll('из A в B')
  }else{
    yourTrip.createEventTimeAll('из B в A')
  }
}

function selectTimeAhead(){
  const getValue = this.value;
  yourTrip.start = getStringTime(getValue)
  yourTrip.finish = calculateDuringTime(getValue)
  yourTrip.createEventTimeBack(getValue)
  yourTrip.timeStampStart = getValue
}

function chooseTimeBack(){
  const getValue = this.value;
  yourTrip.finish = calculateDuringTime(getValue, true)
}

function getTicketQuantity(){
  if ( /^\d+$/.test(this.value) ) {
    yourTrip.num = this.value
  }else{alert('Введите цифры')}
}


route.addEventListener('change', selectRoute);
selectTimeAll.addEventListener('change', selectTimeAhead);
selectTimeBack.addEventListener('change', chooseTimeBack);
num.addEventListener('change', getTicketQuantity);

const message = document.querySelector('.alert')
btnTotal.addEventListener('click', getHandleCount.bind(yourTrip))

