<?php 
//save score 
$aPost = array();
$aPost["time"] = date ('H:i:s');
foreach($_POST as $key => $val){
    $aPost[$key] = $val;
 }
$sData = json_encode($aPost) . "\n";

// create file date + hour + .txt
$sFileName = 'data/' . date("Ymd") . '.txt';
file_put_contents($sFileName, $sData, FILE_APPEND);
?>
