/*
 * helping counting score when playing darts
 * this is a game use to count darts when
 * you re playing in real darts. 
 * this is free to use and use for demo for the moment
 * please send mail to flottin@gmail.com if you need info
 * 
 * Updated : 2017/02/04
 */
 
/*
 * load game on document load
 */
$(document).ready(function() { 
    oDG = new DG()
    oDG.initSounds(); 
    oDG.buttonFactory();
    oDG.init();
});

/*
 * the dart game class
 */ 
function DG(){
    DG.scoreP1             = 0;
    DG.scoreP2             = 0;
    DG.game                = 301
}

/*
 * initialize game variables
 */
DG.prototype.init = function(){
    DG.buttonEnable        = true;
    DG.numberPlay          = 3;
    DG.isEndGame           = false;
    DG.player1             = true;
    DG.multi               = 1
    DG.lastScore           = 0;
    DG.keyPressed          = 0;
    DG.currentPlayer       = 'player1'
    DG.currentPlayerName   = $(".player1Name")[0].innerText;
    DG.prototype.initColors()
    DG.prototype.initWinnerButtons()
    $('.p1Result').val(DG.game);
    $('.p2Result').val(DG.game);
    $('.playerWinBackground').hide();
    $('.playerWin').hide();
}

/*
 * initialize game Sounds
 */
DG.prototype.initSounds = function(){
    DG.sample              = new RapidSoundsSample('medias/dart2.mp3', 0.2);
    DG.sampleError         = new RapidSoundsSample('medias/error.wav', 0.2);
    DG.sampleChangePlayer  = new RapidSoundsSample('medias/changePlayer.mp3', 0.5);
    DG.sampleplayer1       = new RapidSoundsSample('medias/testoo.mp3', 1);
    DG.sampleplayer2       = new RapidSoundsSample('medias/rouge.low.mp3', 1);
}

/*
 * button factory 
 */
DG.prototype.buttonFactory = function(){
    for (i=0; i<=20 ;i++){
        DG.prototype.createButton(i, 'keyPlayer', 'btn' + i); 
    }
    i=25;
    DG.prototype.createButton(i, 'keyPlayer', 'btn' + i);
    i=50;
    DG.prototype.createButton(i, 'keyPlayer', 'btn' + i);

    for (i=1; i<=7 ;i++){
        DG.prototype.createButtonEmpty(i, 'empty');
    }
    DG.prototype.createButton("x2", 'keyMulti', 2);
    DG.prototype.createButton("x3", 'keyMulti', 3);
    
    $( ".keyPlayer" ).on( "touchstart click", DG.prototype.minusResult );
    $( ".keyMulti" ).on( "touchstart click", DG.prototype.multiScore );
    $( ".startButton" ).on( "touchstart click", DG.prototype.savePlayers );
}

/*
 * create button
 */
DG.prototype.createButton = function (i,  buttonName = '', buttonId = ''){
    newButtonWrapper = $("<span>").attr('class','button');     
    newButtonWrapper.attr('id','ok'+i);     
    newButtonWrapper.appendTo(".numbers");
         
    newButton = $("<button>").attr('class',buttonName);     
    newButton.attr('id', buttonId);     
    newButton.appendTo("#ok"+i).html(  i ).trigger('create'); 
       
    $( "#"+buttonId ).on( "touchstart click", DG.prototype.PlaySound );        
}

/*
 * create empty button
 */
DG.prototype.createButtonEmpty = function (i,buttonName){
    newButtonWrapper = $("<span>").attr('class','button ');     
    newButtonWrapper.attr('id',buttonName+i).appendTo(".numbers");
    
    newButton = $("<button>").attr('disabled','true');
    newButton.appendTo("#"+buttonName+i).html(  "&nbsp;" );
}

/*
 * initialize colors
 */
DG.prototype.initColors = function(){
    DG.p1Color             = '#333333'
    DG.p2Color             = '#cc0099'
    DG.playerColor         = DG.p1Color;
    $('body').css({'background-color' : '#262626'})
    $(".numberPlayLeftP1").css({'color' : 'white'});
    $(".numberPlayLeftP2").css({'color' : 'white'});
    $("button").css({'background-color' : DG.p1Color});
    $(".p1Result").css({'background-color' : 'white'});
    $(".p2Result").css({'background-color' : DG.p1Color}); 
    DG.prototype.initDarts(true);

}

/*
 * repeat a string
 */
DG.prototype.addFullDarts = function(){
    return DG.prototype.strRepeat('.', 3);
}
/*
 * init darts
 */
DG.prototype.initDarts = function(bBegin = false){
    if(bBegin == true){
        $(".numberPlayLeftP1")[0].innerText = DG.prototype.addFullDarts();
    }else{
        $(".numberPlayLeftP1")[0].innerText = "";
    }
    $(".numberPlayLeftP2")[0].innerText = "";
}

/*
 * initialize winner buttons
 * - click on yes button on win screen
 * - click on no button on win screen
 * - click on play again button on win screen
 */
DG.prototype.initWinnerButtons = function(){

    $('.yes').on( "click", function() {
        DG.prototype.stopSoundWin(DG.currentPlayer);
        DG.prototype.init();
            
    });

    $('.no').on( "click", function() {
        window.location.replace('./')
    });

    $('.playAgain').on( "click touchstart", function() {
        window.location.replace('./')
    });
}

/*
 * manage the button multiply
 */
DG.prototype.multiManage = function(){
   $(".keyMulti").css({'background-color' : DG.p1Color}); 
}

/*
 * manage click on x2 or x3 button
 */
DG.prototype.multiScore = function(evt){
    evt.preventDefault();
    $(".keyMulti").css({'background-color' : DG.p1Color});
    $(".keyMulti").css({'background-color' : DG.p1Color});
    $(this).css({'background-color' : 'white'});
    DG.multi = parseInt($(this)[0].id);
}

/*
 * minus the score
 */
DG.prototype.minusResult = function(ev){
    ev.preventDefault();
    DG.lastMulti = 1
    if ( DG.buttonEnable == true){
        $(this).css({'background-color' : 'white'});
    }else{
        $(this).css({'background-color' : '#333333'});
        return true;
    }   
    if(true == DG.isEndGame) return false;
    
    DG.prototype.multiManage();

    // get the current pressed button score
    DG.keyMark = $(this)[0].innerText;
    
    if ('player1' == DG.currentPlayer){
        DG.playerResult = ".p1Result";
    }else{
        DG.playerResult = ".p2Result";
    }
    if (DG.numberPlay == 3){
        DG.lastScore = $(DG.playerResult).val() ;
    }
    DG.lastMulti = DG.multi 
    DG.result =  $(DG.playerResult).val();
    DG.result -=  (DG.multi * DG.keyMark);
    DG.prototype.saveData();

    // initialize multi
    DG.multi = 1
    if (DG.result==1){
        DG.prototype.endError()
        return false;
    }
    if (DG.result == 0){
        if(DG.lastMulti == 2){
            DG.prototype.endGame();
        }else{
            DG.prototype.endError()
        }
        return true;
    }else if (DG.result < 0 ){
        DG.prototype.endError()
    }else{
        DG.numberPlay--;
        if (DG.result > 0){
            DG.prototype.initDarts();
            if (DG.numberPlay == 0){
                DG.prototype.remainingDarts();
                DG.numberPlay=3;
                DG.buttonEnable = false;
            }else {
                DG.prototype.remainingDarts();
            }
            // remaining darts
            if ( DG.buttonEnable == false){
                setTimeout(DG.prototype.changePlayer, 1000);
            }else {
                $(this).css({'background-color' : 'white'});
            }
        }
    }
    $(DG.playerResult).val(DG.result);
}

/*
 * ucfirst the name
 */
DG.prototype.ucfirst = function(str) {
  var f = str.charAt(0).toUpperCase();
  return f + str.substr(1).toLowerCase();
}

/*
 * ucfirst the name
 */
DG.prototype.hideSplash = function(str) {
    $('.playerStart').hide();
    $('.start').hide();
}

/*
 * save Player name 
 * hide splash
 */
DG.prototype.savePlayers = function(ev){
    if($('.p1ResultBlock').val() =='') DG.p1Name = "Player 1"
    else DG.p1Name = DG.prototype.ucfirst($('.p1ResultBlock').val());
    if($('.p2ResultBlock').val() =='') DG.p2Name = "Player 2"
    else DG.p2Name = DG.prototype.ucfirst($('.p2ResultBlock').val());
    $(".player1Name")[0].innerText = DG.p1Name;
    DG.currentPlayerName = DG.p1Name;
    $(".player2Name")[0].innerText = DG.p2Name;
    setTimeout(DG.prototype.hideSplash, 500);

}

/*
 * change player when a bad score was done
 * score = 1
 * score < 0
 * last score was not multiplied by 2
 */
DG.prototype.endError = function(){
    DG.sampleError.shootRound();
    DG.result=DG.lastScore;
    DG.numberPlay = 3;
    DG.prototype.initDarts();
    DG.buttonEnable = false;
    $(DG.playerResult).val(DG.result);
    setTimeout(DG.prototype.changePlayer, 500);
}

/*
 * avoid double tap zoom on ipad and iphone
 */
 $(this).bind('touchstart', function preventZoom(e) {
    var t2 = e.timeStamp
      , t1 = $(this).data('lastTouch') || t2
      , dt = t2 - t1
      , fingers = e.originalEvent.touches.length;
    $(this).data('lastTouch', t2);
    if (!dt || dt > 200 || fingers > 1) return; // not double-tap

    e.preventDefault(); // double tap - prevent the zoom
    // also synthesize click events we just swallowed up
    $(this).trigger('click').trigger('click');
});

/*
 * play sound calling lib audio.js
 */
DG.prototype.PlaySound = function() {
    if ( DG.buttonEnable == true){
        DG.sample.shootRound();
    }
}

/*
 * play sound calling lib audio.js
 */
DG.prototype.PlaySoundChangePlayer = function() {
    DG.sampleChangePlayer.shootRound();
}

/*
 * play sound when won
 */
DG.prototype.playSoundWin = function(currentPlayer) {
    DG.playerSample = eval('DG.sample' + currentPlayer)
    DG.playerSample.shootRound()
}

/*
 * stop sound of winner
 */
DG.prototype.stopSoundWin = function(currentPlayer) {
    DG.playerSample = eval('DG.sample' + currentPlayer)
    DG.playerSample.stop()
}

/*
 * display congratulations 
 */
DG.prototype.endGame = function(){
    $('.playerWinBackground').show();
    DG.prototype.playSoundWin(DG.currentPlayer)
    $('.playerWin').show();
    //~ $(DG.playerResult).val('win');
    DG.prototype.saveData();
    DG.isEndGame = true;
    if ('player1' == DG.currentPlayer){
        DG.scoreP1 ++;
        
    }else {
        DG.scoreP2 ++;
    }
    $('.scorePlayer1')[0].innerText =  DG.scoreP1;
    $('.scorePlayer2')[0].innerText =  DG.scoreP2;
    
    if((DG.scoreP2 > 1)||(DG.scoreP1 > 1)){
            $('.yes').hide();
            $('.no').hide();
            $('.gameStyle').hide();
            $('.slash').hide();
            $('.playAgain').show();
    }
    
    if((DG.scoreP2 + DG.scoreP1 == 2)){
        // decider?
        $('.gameStyle')[0].innerText =  'Decider ?';    
    }
    
        if((DG.scoreP2 + DG.scoreP1 == 1)){
        // revenge?
         $('.gameStyle')[0].innerText =  'Revenge ?';  
    }
    //~ DG.prototype.init();
}

/*
 * save data with ajax 
 */
DG.prototype.saveData = function(){
    url="darts_save.php";
    data = 'gameNumber=' + $(".gameNumber")[0].innerText;
    data += '&' + DG.currentPlayer + '=' + DG.currentPlayerName;
    data += '&keyPressed='+ (DG.multi * DG.keyMark);
    data += '&scoreP1=' + $(".p1Result").val();
    data += '&scoreP2=' + $(".p2Result").val();
    dataType = 'json';
    $.ajax({
    type: "POST",
    url: url,
    data: data,
    success:   function (json) {

    }
    ,
    dataType: dataType
    });	
}

/*
 * change the player 
 */
DG.prototype.changePlayer = function(){
    DG.buttonEnable =true;
    DG.prototype.PlaySoundChangePlayer();
    if ('player1' == DG.currentPlayer){
        DG.currentPlayer       = "player2"; 
        DG.currentPlayerName   = $(".player2Name")[0].innerText;
        $(".p1Result").css({'background-color' : '#333333'});
        $(".p2Result").css({'background-color' : 'white'});
        $("button").css({'background-color' : DG.p1Color}); 
    }else {
        DG.currentPlayer       = "player1"; 
        DG.currentPlayerName   = $(".player1Name")[0].innerText;
        $(".p1Result").css({'background-color' : 'white'});
        $(".p2Result").css({'background-color' : '#333333'}); 
        $("button").css({'background-color' : DG.p1Color}); 
    }
    DG.prototype.remainingDarts();
}

/*
 * repeat a string
 */
DG.prototype.strRepeat = function(str, count){
    strOut = '' 
    for (i=1; i<=count; i++){
        strOut = strOut + str;
    }
    return strOut;
}

/*
 * remaining darts
 */
DG.prototype.remainingDarts = function(){
    DG.prototype.initDarts();
    if ('player1' == DG.currentPlayer){
        $(".numberPlayLeftP1")[0].innerText = DG.prototype.strRepeat('.', DG.numberPlay); 
    }else {
        $(".numberPlayLeftP2")[0].innerText = DG.prototype.strRepeat('.', DG.numberPlay);       
    }
}
