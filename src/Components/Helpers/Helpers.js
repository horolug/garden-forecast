import moment from 'moment'

const helpers = {

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

  moonPhaseCalendar( moonPhaseToday, todayDate ){
    // A new moon occurs every 29.5 days
    // Dark Sky API returns 0-100 values for lunar phases
    // 0.01 point represents 0.295 days
    // 1 day is approximately 0.0338983050 points

    // Fixme - need to update formula, to match API response
    const moonPhaseStep = (1 / 0.295305882)/100;
    console.log('moonPhaseToday', moonPhaseToday);
    console.log('todayDate', todayDate);

    console.log("moonPhase in 7 days", this.formatMoonPhase( moonPhaseToday+(moonPhaseStep*6)) );
    console.log("moonPhase in 8 days", this.formatMoonPhase(moonPhaseToday+(moonPhaseStep*7)) );
  },

  foo( bar ){

  }
}

export default helpers;
