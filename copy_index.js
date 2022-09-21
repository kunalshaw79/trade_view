#!node
const { EdelweissAPIConnect } = require("api_connect_nodejs");
const { create } = require("domain");
const { Socket } = require("net");
const Feed = EdelweissAPIConnect.feed ;

//ApiIdKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOjAsImZmIjoiVyIsImJkIjoid2ViLXBjIiwibmJmIjoxNjYxNzUzODMzLCJzcmMiOiJlbXRtdyIsImF2IjoiMS4wLjEiLCJhcHBpZCI6IjUxNTk4OGZjNGJhMTM3ZTg2ZTAwM2EwYTBlYjVhNzdhIiwiaXNzIjoiZW10IiwiZXhwIjoxNjYxNzk3ODAwLCJpYXQiOjE2NjE3NTQxMzN9.tPLbbLtdM_W_LkKborGwq4AOJk42Mrp_d4efNuJicP4

//SUBSCRIBE	
// const feed=Feed(symbols, accid, userid, callBack, subscribe_order = True, subscribe_quote = True);
// const feed = new Feed(accid,userid);
const subscribe_quote = true;
const subscribe_order = false;
const symbols =[
    '531716_BSE','535657_BSE',
    '540954_BSE',
  '3530_NSE',
  '6429_NSE',
    '517447_BSE',
    '530899_BSE',
    '511714_BSE',
    '543436_BSE',
  '3493_NSE',
    '504966_BSE',
  '2810_NSE',
   '13656_NSE',
    '531147_BSE',
    '510245_BSE',
    '506196_BSE',
    '511672_BSE',
   '17110_NSE',
    '526071_BSE',
  '2643_NSE',
    '500680_BSE',
    '531640_BSE',
    '539228_BSE',
  '9610_NSE'
]
callBack=(err,data,close)=>{
    console.log(data)
}
__CreateMessage_quote = (symbols) => {
    const symset = symbols.map((sym) => ({ symbol: sym }));

    return {
      request: {
        streaming_type: "quote3", //ini
        data: {
          symbols: symset,
        },
        formFactor: 'N',
        appID: this.__appID,
        response_format: "json",
        request_type: "subscribe",
      },
      echo: {},
    };
  };

subscribe = (
    symbols,
    callBack,
    subscribe_quote
  ) => {
    cb = callBack;
    symbols = symbols;
    // var hostName = configData.hostName;
    // var port = configData.port;
    __appID = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOjAsImZmIjoiVyIsImJkIjoid2ViLXBjIiwibmJmIjoxNjYxNzUzODMzLCJzcmMiOiJlbXRtdyIsImF2IjoiMS4wLjEiLCJhcHBpZCI6IjUxNTk4OGZjNGJhMTM3ZTg2ZTAwM2EwYTBlYjVhNzdhIiwiaXNzIjoiZW10IiwiZXhwIjoxNjYxNzk3ODAwLCJpYXQiOjE2NjE3NTQxMzN9.tPLbbLtdM_W_LkKborGwq4AOJk42Mrp_d4efNuJicP4';

    //Validation
    // const validateResponse = validateSubscribe(
    //   symbols,
    //   subscribe_order,
    //   subscribe_quote
    // );
    // if (validateResponse.error) {
    //   log4js.debug(
    //     "subscribe validation error -" + validateResponse.error.details
    //   );
    //   console.log(validateResponse.error.details);
    //   return;
    // }

    //coonect to server
    var hostName = 'tocstream.edelweiss.in';
    var port = 9443;
    const sock = new Socket()
    sock.connect(port, hostName, () => {
      console.log(`connected to server ${hostName} at port ${port}`);
    //   log4js.debug("connected to server!");
      sock.setKeepAlive(true, 3000);
    });

    if (subscribe_quote) {
        const quote = __CreateMessage_quote(symbols);
        sock.write(JSON.stringify(quote) + "\n");
      }
      sock.on("data", (data) => {
        try {
            cb(null, JSON.parse(data), null);
          } catch (error) {
            return false;
          }
    });
      sock.on("error", (err) => {
        cb(err, null, null);
      });
  
      sock.on("close", (val) => {
        console.log("connection closed");
        cb(null, null, val);
      });
  
       
    //when we get data from the server
 

    // sock.on("close", (val) => {
    //   cb(null, null, val);
    // });

    // sock.on("end", (val) => {
    //   console.log("Connection ended");
    // });
  };
  subscribe(symbols,callBack,true);
 

    // if instument['symbolname'] == 'ITC' and instument['assettype'] == 'EQ':
    //     print(instument) 		   
// {
//     "request":{
//     "streaming_type": "quote3",
//     "data":
//     {
//     "accType": "EQ",
//     "symbols": //token_set
//     },
//     "formFactor": "M",
//     "appID": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOjAsImZmIjoiVyIsImJkIjoid2ViLXBjIiwibmJmIjoxNjE2Mzk3MzMyLCJzcmMiOiJlbXRtdyIsImF2IjoiMS4wLjAiLCJhcHBpZCI6ImQ5MDM1NjFiZTFhYWUyYWY3M2RjZTJjOWJhODFiODViIiwiaXNzIjoiZW10IiwiZXhwIjoxNjE2NDM3ODAwLCJpYXQiOjE2MTYzOTc2MzJ9.iy2c_iialRdLSTLcHMHD0JM81DDUMHwGx9SrreVass8",
//     "response_format": "json",
//     "request_type": "subscribe"
//     },
//     "echo": {}
//     }
// connection = (subscribe_quote, symbols) => {
//     var hostName = 'tocstream.edelweiss.in';
//     var port = 9443;
//     const sock = new Socket()
//     sock.connect(port, hostName, () => {
//       console.log("connected to server!");
//     //   log4js.debug("connected to server!");
//       sock.setKeepAlive(true, 3000);
//     });

//     if (subscribe_quote) {
//         const quote = __CreateMessage_quote(symbols);
//         sock.write(JSON.stringify(quote) + "\n");
//       }
//     sock.on("error", (err) => {
//       cb(err, null, null);
//     });
//     sock.on("close", (val) => {
//       console.log("connection closed");
//       cb(null, null, val);
//     });
//   };