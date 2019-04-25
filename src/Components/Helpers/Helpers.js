import moment from 'moment'

const helpers = {

  iDealConditions( phase, plantType ){
    // Plant type will have values varying from 1 to 3

    // seed - Seeds outside fruit - New Moon
    // fruit - Fruit above ground ( tomatoe cucumber ) - 2nd Quarter Moon
    // root - Root plant (beetroot, carrot) - Full Moon

    if ( phase < 25 ) {
      // New moon
    } else if( phase >= 25 && phase =< 50 ){
      // 2nd quarter
    } else if (phase > 50 && phase =< 75){
      // Full moon
    }


  },
  foo( bar ){

  }
}

export default helpers;
