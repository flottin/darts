<?php 
//save score 
$aPost = array();
if (empty($_POST['gameNumber']))
    $sData = 1;
//~ else
    //~ $sData = (int)$_POST['gameNumber'] + 1;

// create file date + hour + .txt
$sFileName = 'data/gameNumber.txt';
//~ file_put_contents($sFileName, $sData);
?>
