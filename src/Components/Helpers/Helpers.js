import moment from 'moment'

const helpers = {

  iDealConditions( phases, plantType){
    // Plant type will have values varying from 1 to 3
    // seed - Seeds outside fruit - New Moon
    // fruit - Fruit above ground ( tomatoe cucumber ) - 2nd Quarter Moon
    // root - Root plant (beetroot, carrot) - Full Moon
    if( phases.length === 0 || plantType === "" ){
      return false;
    }
    let conditionLabel = "not optimal"
    let dayList = [];

    for( let i=0; i < phases.length; i++ ){
      if ( phases[i].phase <= 25 ) {
        // New moon - good for seed type
        if ( plantType === "seed" ){
          conditionLabel = "optimal"
        }
      } else if( (phases[i].phase > 25) && (phases[i].phase < 50) ){
        // 2nd quarter - good for fruit type
        if ( plantType === "fruit" ){
          conditionLabel = "optimal"
        }
      } else if ((phases[i].phase >= 50) && (phases[i].phase <= 75)){
        // Full moon - good for roots
        if ( plantType === "root" ){
          conditionLabel = "optimal"
        }
      }

      dayList.push({
        phase: phases[i].phase,
        condition: conditionLabel,
        date:phases[i].date
      });
    }
    this.moonPhaseCalendar(phases[0].phase, phases[0].date);

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
    const moonPhaseStep = (1 / 0.295)/100;
    console.log('moonPhaseToday', moonPhaseToday);
    console.log('todayDate', todayDate);

    console.log("moonPhase in 7 days", this.formatMoonPhase( moonPhaseToday+(moonPhaseStep*6)) );
    console.log("moonPhase in 8 days", this.formatMoonPhase(moonPhaseToday+(moonPhaseStep*7)) );
  },

  foo( bar ){

  }
}

export default helpers;
