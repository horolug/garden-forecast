import moment from 'moment'

const helpers = {
  truncateDecimal(num){
    num = num.toString(); //If it's not already a String
    num = num.slice(0, (num.indexOf("."))+3); //Wi  th 3 exposing the hundredths place
    return Number(num); //If you need it back as a Number
  },
  matchConditions( phase, plantType ){
    let conditionLabel = "not optimal";
    // console.log("plantType", plantType);

    if ( phase <= 0.25 ) {
      // New moon - good for seed type
      if ( plantType === "seed" ){
        conditionLabel = "optimal"
      }
    } else if( (phase > 0.25) && (phase < 0.50) ){
      // 2nd quarter - good for fruit type
      if ( plantType === "fruit" ){
        conditionLabel = "optimal"
      }
    } else if ( (phase >= 0.50) && (phase <= 0.75)){
      // Full moon - good for roots
      if ( plantType === "root" ){
        conditionLabel = "optimal"
      }
    }

    return conditionLabel;
  },

  nextIdealConditions( currentMoonphase,  plantType ){
    // Take current day as start date
    // Loop throug moonphases until ideal conditions are shown
    if( currentMoonphase.length === 0 || plantType === "" ){
      return false;
    }
    let dayList = [];
    let conditionLabel = "not optimal";
    let dayInQuestion = moment().format("YYYY-MM-DD");
    let moonPhase = this.formatMoonPhase( currentMoonphase );
    const startDay = moment().format("YYYY-MM-DD");
    const moonPhaseStep = (1 / 0.295305882)/100; //how moonphase changes on daily basis
    const daysInFuture = 60;

    for ( let i = 0; i<daysInFuture; i++ ){
      conditionLabel = this.matchConditions(moonPhase, plantType);
      moonPhase = this.formatMoonPhase( moonPhase + moonPhaseStep);
      dayInQuestion = moment().add(i, 'days').format("YYYY-MM-DD");
      if (conditionLabel === "optimal"){
        dayList.push({
          phase: moonPhase,
          condition: conditionLabel,
          date: dayInQuestion
        });
      }
    }

    return dayList;
  },

  formatMoonPhase( value ){
    if(value > 1){
      return value-1;
    }
    return value
  },

  moonPhaseCalendar(){
    // Fixme - accept dates as a parameter
    // Fixme - need a dynamic way to determine new moon based on location  (time machne call to API?)
    // A new moon occurs every 29.5 days
    // New moon April 5, 2019 In Vilnius, Lithuania
    const newMoonStart =  2458578.5;

    let yerInQuestion = parseInt( moment().format("YYYY") );
    let monthInQuestion = parseInt( moment().format("MM") );

    if ( monthInQuestion === 1 || monthInQuestion === 2){
      yerInQuestion = yerInQuestion - 1;
      monthInQuestion = monthInQuestion + 12;
    }

    const dayInQuestion = parseInt( moment().format("DD") );
    const yearIndex = Math.trunc( yerInQuestion / 100);
    const monthIndex = Math.trunc( yearIndex / 4);
    const dayIndex = 2-yearIndex+monthIndex;
    const dayLapse = Math.trunc( 365.25 * (yerInQuestion+4716) );
    const cycleLapse = Math.trunc( 30.6001 * (monthInQuestion+1) );
    const julianDays = dayIndex + dayInQuestion + dayLapse + cycleLapse - 1524.5;
    const daySinceNew = julianDays - newMoonStart;
    const newMoons = daySinceNew / 29.5;

    const currentMoonphase = this.truncateDecimal (newMoons - Math.floor(newMoons) );

    console.log("currentMoonphase", currentMoonphase);
    return currentMoonphase;
  },

  foo( bar ){

  }
}

export default helpers;
