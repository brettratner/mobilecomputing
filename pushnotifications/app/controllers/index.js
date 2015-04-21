// set android-only options
var androidOptions={
    focusAppOnPush:false,
    showAppOnTrayClick:true,
    showTrayNotification:true,
    showTrayNotificationsWhenFocused:false,
    singleCallback:true
};

// set blackberry-only options
var blackberryOptions={
    appId : "4427-7h6l37627mrr0I3956a74om7643M17l7921",
    ppgUrl : "http://cp4427.pushapi.eval.blackberry.com",
    usePublicPpg : true,
    launchApplicationOnPush : true
};

// set cross-platform event
var onReceive=function(evt){
    alert('A push notification was received!');
    console.log('A push notification was received!' + JSON.stringify(evt));
};

// set android-only event
var onLaunched=function(evt){
    alert('A push notification was received - onLaunched');
    console.log('A push notification was received!' + JSON.stringify(evt));
};

// set android-only event
var onFocused=function(evt){
    alert('A push notification was received - onFocused');
    console.log('A push notification was received!' + JSON.stringify(evt));
};

// load library
var ACSP=require('acspush');

// create instance with your own or the user's username and password
//var ACSPush=new ACSP.ACSPush('zzz','zzz');

// or make it as guest
var ACSPush=new ACSP.ACSPush();

// set the channel to subscribe to
var channel='All users';

// register this device
ACSPush.registerDevice(channel,onReceive,onLaunched,onFocused,androidOptions,blackberryOptions);

// unregister this device
//ACSPush.unsubscribeFromChannel(channel,token,onSuccess,onFail);

$.index.open();
