//node_modules

var jsdom=require('jsdom')
var urlencode = require('urlencode');
var dbTest=require('./dbTest');
var Nse=require('./models/nseModel');
var async=require('async');

var initial_url='https://www.nseindia.com/products/content/equities/indices/historical_index_data.htm'

var nse={
  index:[]
}
function urlMaker(index,fd,ld){
	nifty=index.toUpperCase();
  //console.log(index,fd,ld)
	urlen=urlencode(nifty)
  //console.log(urlencode);
	url='https://www.nseindia.com/products/dynaContent/equities/indices/historicalindices.jsp?indexType='+urlen+'&fromDate='+fd+'&toDate='+ld
	return url  
}


jsdom.env(
  initial_url,
  ["http://code.jquery.com/jquery.js"],
  function (err, window) {
      window.$("optgroup>option").each(function(){
        var a;
        a=window.$(this).attr('value')
        nse.index.push(a)
      })
      console.log("i am in first")
      playWithIndex(nse)
  }
);

function playWithIndex(nse){
  //console.log(nse)
  async.eachSeries(nse.index,function(index,callback){
    //console.log(index);
    console.log("i am in playWithIndex");
    handleMyIndex(index,callback)  
  },function(err,result){
    if(err){
      console.log(err);
    }else{
      console.log('all data saved');
    }

  })

}

function playWithUrl(all_url,callback,index){
  console.log("i am in playWithUrl")
  async.eachSeries(all_url,function(url,cb){
      jsdom.env(url,["http://code.jquery.com/jquery.js"],function(err,window){
                var el=window.$('tbody tr:gt(2):lt(-1)')
                if(el.length!=0){
                var counter=0
                el.each(function(){
                var date=window.$(this).find('.date nobr').html();
                var numbers=[]
                window.$(this).find('td:gt(0)').each(function(){
                    data=window.$(this).text().trim()
                    numbers.push(data)
                })
                open=numbers[0];
                high=numbers[1];
                low=numbers[2];
                close=numbers[3];
                shares_traded=numbers[4];
                turnover=numbers[5];
                var nse=new Nse({index:index,date:date,open:open,high:high,low:low,close:close,shares_traded:shares_traded,turnover:turnover}) 
                nse.save(function(err){
                  if(err){
                    console.log("calling callback")
                    console.log(err)
                    cb(err)
                  }else{
                    console.log('data saved')
                    if(counter==el.length-1){
                      cb()
                    }else{
                      counter++
                    }
                  }
                })
              })
        }else{
          console.log("callback called")
          cb()
        }
      })    
  },function(err,result){
    if(err){
      console.log("i am in error")
      //console.log(err)
      console.log(err)
      callback(err)
    }else{
      console.log("i am in result callback")
      callback(null)
    }
  })

}

function handleMyIndex(index,callback){
  console.log("i am in handle my index")
  var all_url=[]
  for(i=1990;i<=2016;i++){
    for(j=1;j<=12;j++){
      // console.log(i)
      if(i==2016&&j>9){
        break;
      }else{
        fl=leap(i,j);
       // console.log(fl);
        url=urlMaker(index,fl.fd,fl.ld)
        //console.log(url)
        all_url.push(url);
      }
    }
  }
  playWithUrl(all_url,callback,index)
}

function leap(year,currMo){
 switch(currMo){
  case 1:
    fd='01-01-'+year
    ld="31-01-"+year
    break;
  case 2:
    if(year%4==0){
      fd='01-02-'+year
      ld="29-02-"+year
    }else{
      fd='01-02-'+year
      ld="28-02-"+year
    }
    break;
  case 3:
    fd='01-03-'+year;
    ld='31-03-'+year;
    break;
  case 4:
    fd='01-04-'+year
    ld='30-04-'+year
    break;
  case 5:
    fd='01-05-'+year
    ld='31-05-'+year
    break;
  case 6:
    fd='01-06-'+year
    ld='30-06-'+year
    break;
  case 7:
    fd='01-07-'+year
    ld='31-07-'+year
    break;
  case 8:
    fd='01-08-'+year
    ld='30-08-'+year
    break;
  case 9:
    fd='01-09-'+year
    ld='31-09-'+year
    break;
  case 10:
    fd='01-10-'+year
    ld='31-10-'+year
    break;
  case 11:
    fd='01-11-'+year
    ld='30-11-'+year
    break;
  case 12:
    fd='01-12-'+year
    ld='31-12-'+year
    break;

 }
 return {fd:fd,ld:ld}
}


