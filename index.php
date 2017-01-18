<?php
//get the game number
$iGameNumber = file_get_contents('data/gameNumber.txt');
$iGameNumber =  ((int)$iGameNumber + 1 );
$sFileName = 'data/gameNumber.txt';
file_put_contents($sFileName, (int)$iGameNumber);
?>
<!doctype html>
<html>
<head>
     <title>Score flechettes</title>
     <link rel="stylesheet" type="text/css" href="styles/styles.css">
     <script src="js/jquery-3.1.1.min.js"></script>
     
</head>

<body>
<div class=playerStart> </div>
<div class=start> 

 <div id="monbloc">
        <div class=leftBlock>        
            <input type=text class=p1ResultBlock name=p1Name 
            placeholder="Enter Player 1" maxlength="20" size="20">  
            <input type=text class=p2ResultBlock name=p2Name 
            placeholder="Enter Player 2"  maxlength="40" size="40">
        </div>  
        <div class=rightBlock>
            <button class=startButton>start</button>
        </div>
    </div>
</div>

<div class=playerWinBackground> </div>
<div class=playerWin>
<!--
    nice
-->

<!--
congratulation
-->
    <span>Well done </span><br>

    <span> <span class=scorePlayer1></span> : <span class=scorePlayer2></span> </span><br>
<span class=playAgain><a href="#" >Play again</a></span>
    <span><span class=gameStyle></span> <a href="#" class=yes>yes</a><span class=slash> / </span><a href="#" class=no>no</a></span><br>
    <audio id="playerWin"> </audio>

</div>



<form class=form1>
<div class=left>
    <span class=numberPlayLeftP1></span>
    <span class=player1Name></span>
    <input type=text class=p1Result value=301 maxlength="4" size="4">  
</div>

<div class=right>
    <input type=text class=p2Result value=301 maxlength="4" size="4"> 
    <span class=player2Name></span>
    <span class=numberPlayLeftP2></span>
    
</div>
<span class=gameNumber><?= $iGameNumber ?></span>
    
<div class=numbers></div>
</form>

</body>

<script src="js/audio.js"></script>
<script src="js/darts.js"></script>

</html>
