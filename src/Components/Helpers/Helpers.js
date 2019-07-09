import moment from 'moment'

const helpers = {
  averageTemp (){
    // Fixme - this static data for a small specific region
    const tempList = [
      {
        avgMax : "-2",
        avgMin : "-5"
      },
      {
        avgMax : "-2",
        avgMin : "-5"
      },
      {
        avgMax : "+5",
        avgMin : "-2"
      },
      {
        avgMax : "14",
        avgMin : "0"
      },
      {
        avgMax : "15",
        avgMin : "8"
      },
      {
        avgMax : "16.4",
        avgMin : "10"
      },
      {
        avgMax : "17.5",
        avgMin : "11"
      },
      {
        avgMax : "15",
        avgMin : "10"
      },
      {
        avgMax : "13",
        avgMin : "8"
      },
      {
        avgMax : "10",
        avgMin : "2"
      },
      {
        avgMax : "5",
        avgMin : "0"
      },
      {
        avgMax : "0",
        avgMin : "-5"
      },
    ]
    return tempList;
  },

  truncateDecimal(num){
    num = num.toString(); //If it's not already a String
    num = num.slice(0, (num.indexOf("."))+3); //Wi  th 3 exposing the hundredths place
    return Number(num); //If you need it back as a Number
  },

  siutableTemp(plant, date, adjustedTemp){
    const tempList = this.averageTemp();
    const monthNumber = moment(date).format('M')-1; // 0 -> january
    let avgTemp = (tempList[monthNumber].avgMin+tempList[monthNumber].avgMax)/2
    if ( adjustedTemp === "ideal"){
      return true;
    } else if (adjustedTemp ==="plus-ten"){
      avgTemp = avgTemp + 10;
      if ( plant.minTemp > avgTemp){
        return false;
      }
    } else if ( plant.minTemp > avgTemp ){
      return false
    }

    return true;
  },

  harvetTime ( plant, plantingTime ){
    console.log("plant to fruit", plant.plantToFruit);
    let daysPassed = 0;

    if (plant.plantToFruit === daysPassed){
      return true;
    }
    daysPassed++;
    return false;
  },

  matchConditions( phase, plantType, plant, date, adjustedTemp ){
    let conditionLabel = false;

    if ( this.siutableTemp(plant, date, adjustedTemp) ){
      if ( phase <= 0.25 ) {
        // New moon - good for seed type
        if ( plantType === "seed" ){
          conditionLabel = true
        }
      } else if( (phase > 0.25) && (phase < 0.50) ){
        // 2nd quarter - good for fruit type
        if ( plantType === "fruit" ){
          conditionLabel = true
        }
      } else if ( (phase >= 0.50) && (phase <= 0.75)){
        // Full moon - good for roots
        if ( plantType === "root" ){
          conditionLabel = true
        }
      }
    }
    return conditionLabel;
  },

  nextIdealConditions( plantType, date, plant ){
    // Take current day as start date
    // Loop through moonphases until ideal conditions are shown
    if( plantType === "" ){
      return false;
    }
    let dayList = [];
    let conditionLabel = "not optimal";
    let dayInQuestion = moment().format("YYYY-MM-DD");
    let moonPhase = this.moonPhaseCalendar( dayInQuestion );
    const daysInFuture = 60;

    for ( let i = 0; i<daysInFuture; i++ ){
      conditionLabel = this.matchConditions(moonPhase, plantType, plant, date);
      dayInQuestion = moment().add(i, 'days').format("YYYY-MM-DD");
      moonPhase = this.moonPhaseCalendar(dayInQuestion);

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

  isOptimalForPlanting( date, plantType, plant, adjustedTemp ){
    if ( plantType == null ){
      return false;
    }
    const moonPhase = this.moonPhaseCalendar( moment(date).format("YYYY-MM-DD") );
    const conditionLabel = this.matchConditions(moonPhase, plantType, plant, date, adjustedTemp);

    return conditionLabel;
  },

  moonPhaseCalendar( date ){
    // Fixme - need a dynamic way to determine new moon based on location  (time machne call to API?)
    // A new moon occurs every 29.5 days
    // New moon April 5, 2019 In Vilnius, Lithuania
    const newMoonStart =  2458578.5;
    let yerInQuestion = parseInt( moment(date).format("YYYY") );
    let monthInQuestion = parseInt( moment(date).format("MM") );
    if ( monthInQuestion === 1 || monthInQuestion === 2){
      yerInQuestion = yerInQuestion - 1;
      monthInQuestion = monthInQuestion + 12;
    }

    const dayInQuestion = parseInt( moment(date).format("DD") );
    const yearIndex = Math.trunc( yerInQuestion / 100);
    const monthIndex = Math.trunc( yearIndex / 4);
    const dayIndex = 2-yearIndex+monthIndex;
    const dayLapse = Math.trunc( 365.25 * (yerInQuestion+4716) );
    const cycleLapse = Math.trunc( 30.6001 * (monthInQuestion+1) );
    const julianDays = dayIndex + dayInQuestion + dayLapse + cycleLapse - 1524.5;
    const daySinceNew = julianDays - newMoonStart;
    const newMoons = daySinceNew / 29.5;
    const currentMoonphase = this.truncateDecimal (newMoons - Math.floor(newMoons) );

    return currentMoonphase;
  },

  cycleCounter() {
    let count = 0;
    this.up = function() {
       return ++count;
    };
    this.stay = function() {
      return count;
    };
  },


  plantingDays (){

  },

  foo( bar ){

  },

  optimal (){

  }

}

export default helpers;
