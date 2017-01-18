<?php
/*
 * 
 * 
 * 
 * 
object(stdClass)#1 (6) {
  ["time"]=>
  string(8) "05:44:27"
  ["gameNumber"]=>
  string(2) "29"
  ["player1"]=>
  string(8) "Player 1"
  ["keyPressed"]=>
  string(3) "150"
  ["scoreP1"]=>
  string(3) "301"
  ["scoreP2"]=>
  string(3) "301"
}
* 
* 
* */
$handle = fopen('data/20170115.txt', "r");
if ($handle) {
    while (($line = fgets($handle)) !== false) {
        //~ echo $line = str_replace("\n", "", $line);
        //~ echo $line ;
        
        
        $aLine = (json_decode($line));
        ?>
        
        <div class=block>
            <span>Game n° <?= $aLine->gameNumber ?></span> - 
            <span><?= $aLine->scoreP1 ?></span> - 
            <span><?= $aLine->scoreP2 ?></span>
        </div>
        
        
        <?php
        
    }
    fclose($handle);
}
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
    <span>Well done <?= $sPlayer1; ?></span><br>

    <span> <span class=scorePlayer1></span> : <span class=scorePlayer2></span> <?= $sPlayer1; ?></span><br>
<span class=playAgain><a href="#" >Play again</a></span>
    <span><span class=gameStyle></span> <a href="#" class=yes>yes</a><span class=slash> / </span><a href="#" class=no>no</a></span><br>
    <audio id="playerWin"> </audio>

</div>



</body>

<script src="js/audio.js"></script>
<script src="js/darts.js"></script>

</html>

