import moment from 'moment'

const helpers = {

  iDealConditions( phases, plantType){
    console.log("iDealConditions called");
    // Plant type will have values varying from 1 to 3
    // seed - Seeds outside fruit - New Moon
    // fruit - Fruit above ground ( tomatoe cucumber ) - 2nd Quarter Moon
    // root - Root plant (beetroot, carrot) - Full Moon
    if( phases.length === 0 || plantType ==="" ){
      console.log("no data, dropping the ball");
      return false;
    }
    let conditionLabel = "not optimal"
    let dayList = [];

    for( let i=0; i < phases.length; i++ ){
      if ( phases[i] <= 25 ) {
        // New moon - good for seed type
        if ( plantType === "seed" ){
          conditionLabel = "optimal"
        }
      } else if( (phases[i] > 25) && (phases[i] < 50) ){
        // 2nd quarter - good for fruit type
        if ( plantType === "fruit" ){
          conditionLabel = "optimal"
        }
      } else if ((phases[i] >= 50) && (phases[i] <= 75)){
        // Full moon - good for roots
        if ( plantType === "root" ){
          conditionLabel = "optimal"
        }
      }

      dayList.push( { phase: phases[i], condition: conditionLabel } );
    }
    // console.log("returning", dayList);
    return dayList;
  },

  foo( bar ){

  }
}

export default helpers;
