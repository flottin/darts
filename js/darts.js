/**
 * 
 * helping counting score when playing darts
 * flottin@gmail.com
 * 
 */
var audioWinP1          = new Audio();
var audioWinP2          = new Audio();
var numberPlay          = null;
var isEndGame           = null;
var player1             = null;
var multi               = null;
var p1Color             = null;
var p2Color             = null;
var playerColor         = null;
var lastScore           = null;
var keyPressed          = null;
var currentPlayer       = null;
var currentPlayerName   = null;
var scoreP1             = 0;
var scoreP2             = 0;
var game                = 301
var buttonEnable = true;
var gameSet             = 1;

/**
* init game
*/
initGame = function(){
    audioWinP1.src      = "medias/testoo.mp3";
    audioWinP2.src      = "medias/rouge.low.mp3";
    buttonEnable        = true;
    gameSet             = 1;
    numberPlay          = 3;
    isEndGame           = false;
    player1             = true;
    multi               = 1
    p1Color             = '#333333'
    p2Color             = '#cc0099'
    playerColor         = p1Color;
    lastScore           = 0;
    keyPressed          = 0;
    currentPlayer       = 'player1'
    currentPlayerName   = $(".player1Name")[0].innerText;
    $(".numberPlayLeftP1")[0].innerText = "..."
    $(".numberPlayLeftP2")[0].innerText = "";
    $(".numberPlayLeftP1").css({'color' : 'white'});
    $(".numberPlayLeftP2").css({'color' : 'white'});
    $("button").css({'background-color' : p1Color});
    $(".p1Result").css({'background-color' : 'white'});
    $(".p2Result").css({'background-color' : p1Color}); 
    $('.p1Result').val(game);
    $('.p2Result').val(game);
    $('.playerWinBackground').hide();
    $('.playerWin').hide();

}

/**
 * load game on document load
 */
$(document).ready(function() {  
    buttonFactory();
    initGame();
    $( ".keyPlayer" ).on( "touchstart click", minusResult );
    $( ".keyMulti" ).on( "touchstart click", multiScore );
    $( ".startButton" ).on( "touchstart click", savePlayers );
    sample              = new RapidSoundsSample(
                                        context, 
                                        'medias/dart2.mp3', 1
                                        );
    sampleChangePlayer  = new RapidSoundsSample(
                                        context, 
                                        'medias/changePlayer.mp3', 0.1
                                        );
});

/**
 * button factory 
 */
buttonFactory = function(){
    for (i=0; i<=20 ;i++){
        createButton(i, 'keyPlayer'); 
    }
    createButton(25, 'keyPlayer');
    createButton(50, 'keyPlayer');

    for (i=1; i<=7 ;i++){
        createButtonEmpty(i, 'empty');
    }
    createButton("x2", 'keyMulti', 2);
    createButton("x3", 'keyMulti', 3);
}

/**
 * create button
 */
createButton = function (i,  buttonName = '', buttonId = ''){
    newButtonWrapper = $("<span>").attr('class','button');     
    newButtonWrapper.attr('id',i);     
    newButtonWrapper.appendTo(".numbers");
         
    newButton = $("<button>").attr('class',buttonName);     
    newButton.attr('id', buttonId);     
    newButton.appendTo("#"+i).html(  i );     
}

/**
 * create empty button
 */
createButtonEmpty = function (i,buttonName){
    newButtonWrapper = $("<span>").attr('class','button ');     
    newButtonWrapper.attr('id',buttonName+i).appendTo(".numbers");
    
    newButton = $("<button>").attr('disabled','true');
    newButton.appendTo("#"+buttonName+i).html(  "&nbsp;" );
}

/**
* ucfirst the name
*/
function ucfirst (str) {
  str += ''
  var f = str.charAt(0).toUpperCase();
  console.log(f)
  return f + str.substr(1).toLowerCase();
}

/**
* save Player name
*/
savePlayers = function(ev){
    if($('.p1ResultBlock').val() =='') p1Name = "Player 1"
    else p1Name = ucfirst($('.p1ResultBlock').val());
    if($('.p2ResultBlock').val() =='') p2Name = "Player 2"
    else p2Name = ucfirst($('.p2ResultBlock').val());
    $(".player1Name")[0].innerText = p1Name;
    currentPlayerName = p1Name;
    $(".player2Name")[0].innerText = p2Name;
    setTimeout(hideSplash, 500);
}

/**
* save Player name
*/
hideSplash = function(ev){
    $('.playerStart').hide();
    $('.start').hide();

} 

/**
* minus the score
*/
minusResult = function(ev){
    ev.preventDefault();

    if ( buttonEnable == true){
        $(this).css({'background-color' : 'white'});
    }else{
        $(this).css({'background-color' : '#333333'});
        return true;
    }
    PlaySound();    
    if(true == isEndGame) return false;
    
    multiManage();

    // get the current pressed button score
    keyMark = $(this)[0].innerText;
    
    if ('player1' == currentPlayer){
        playerResult = ".p1Result";
    }else{
        playerResult = ".p2Result";
    }
    if (numberPlay == 3){
        lastScore = $(playerResult).val() ;
    }
    result =  $(playerResult).val() - (multi * keyMark);
    saveData();

    // initialize multi
    multi = 1
    
    if (result == 0){
        endGame();
        return true;
    }else if (result < 0 ){
        result=lastScore;
        numberPlay = 3;
        initDarts();
        buttonEnable = false;
        setTimeout(changePlayer, 500);
    }else{
        numberPlay--;
        if (result > 0){
            initDarts();
            if (numberPlay == 0){
                remainingDarts();
                numberPlay=3;
                buttonEnable = false;
            }else {
                remainingDarts();
            }
            // remaining darts
            if ( buttonEnable == false){
                setTimeout(changePlayer, 1000);
            }else {
                $(this).css({'background-color' : 'white'});
            }
        }
    }
    $(playerResult).val(result);
    
}

/**
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

/**
 * play sound calling lib audio.js
 */
function PlaySound() {
    sample.shootRound(0, 1, 1, 1);
}

/**
 * play sound calling lib audio.js
 */
function PlaySoundChangePlayer() {
    sampleChangePlayer.shootRound(0, 1, 1,  0.1 );
}

/**
 * 
 */
function playSoundWin(currentPlayer) {
    if ('player1'==currentPlayer)
    audioWinP1.play();
    else
    audioWinP2.play();
}

/**
 * 
 */
function stopSoundWin(currentPlayer) {
    if ('player1'==currentPlayer)
        audioWinP1.pause();
    else
        audioWinP2.pause();
}

/**
* 
*/
multiScore = function(evt){
    evt.preventDefault();
    multiManage();
    $(".keyMulti").css({'background-color' : p1Color});
    $(this).css({'background-color' : 'white'});
    multi = parseInt($(this)[0].id);
}

/**
* manage the button multiply
*/
multiManage = function(evt){
    $(".keyMulti").css({'background-color' : p1Color});
}


/**
* display congratulations 
*/
endGame = function(){
    $('.playerWinBackground').show();
    playSoundWin(currentPlayer)
    $('.playerWin').show();
    $(playerResult).val('win');
    saveData();
    isEndGame = true;
    gameSet ++;
    if ('player1' == currentPlayer){
        scoreP1 ++;
        
    }else {
        scoreP2 ++;
    }
    $('.scorePlayer1')[0].innerText =  scoreP1;
    $('.scorePlayer2')[0].innerText =  scoreP2;
    
    if((scoreP2 > 1)||(scoreP1 > 1)){
            $('.yes').hide();
            $('.no').hide();
            $('.gameStyle').hide();
            $('.slash').hide();
            $('.playAgain').show();
    }
    
    if((scoreP2 + scoreP1 == 2)){
        // decider?
        $('.gameStyle')[0].innerText =  'Decider ?';    
    }
    
        if((scoreP2 + scoreP1 == 1)){
        // revenge?
         $('.gameStyle')[0].innerText =  'Revenge ?';  
    }
}

/**
* save data with ajax
*/
saveData = function(){
    url="darts_save.php";
    data = 'gameNumber=' + $(".gameNumber")[0].innerText;
    data += '&' + currentPlayer + '=' + currentPlayerName;
    data += '&keyPressed='+ (multi * keyMark);
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

/**
* change the player 
*/
changePlayer = function(){
    buttonEnable =true;
    PlaySoundChangePlayer();
    if ('player1' == currentPlayer){
        currentPlayer       = "player2"; 
        currentPlayerName   = $(".player2Name")[0].innerText;
        $(".p1Result").css({'background-color' : '#333333'});
        $(".p2Result").css({'background-color' : 'white'});
        $("button").css({'background-color' : p1Color}); 
    }else {
        currentPlayer       = "player1"; 
        currentPlayerName   = $(".player1Name")[0].innerText;
        $(".p1Result").css({'background-color' : 'white'});
        $(".p2Result").css({'background-color' : '#333333'}); 
        $("button").css({'background-color' : p1Color}); 
    }
    remainingDarts();
}

/**
* init darts
*/
initDarts = function(){
    $(".numberPlayLeftP1")[0].innerText = "";
    $(".numberPlayLeftP2")[0].innerText = "";
}

/**
* remaining darts
*/
remainingDarts = function(){
    initDarts();
    if ('player1' == currentPlayer){
        if (numberPlay == 3) numberPlayLeftP1= "...";
        if (numberPlay == 2) numberPlayLeftP1= "..";
        if (numberPlay == 1) numberPlayLeftP1= ".";
        if (numberPlay == 0) numberPlayLeftP1= "";
        $(".numberPlayLeftP1")[0].innerText = numberPlayLeftP1 
    }else {
        if (numberPlay == 3) numberPlayLeftP2= "...";
        if (numberPlay == 2) numberPlayLeftP2= "..";
        if (numberPlay == 1) numberPlayLeftP2= ".";
        if (numberPlay == 0) numberPlayLeftP2= "";
        $(".numberPlayLeftP2")[0].innerText = numberPlayLeftP2       
    }
}

/**
 * 
 */
 $('.yes').on( "click", function() {
    stopSoundWin(currentPlayer);
    initGame();
});

/**
 * 
 */
 $('.no').on( "click", function() {
    window.location.replace('./')
});

/**
 * 
 */
 $('.playAgain').on( "click touchstart", function() {
    window.location.replace('./')
});
