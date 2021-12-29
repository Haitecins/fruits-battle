<?php
include 'mysql.php';

date_default_timezone_set('Asia/Shanghai');
$uid = $_POST['uid'] ?? null;
$addr = $_SERVER['REMOTE_ADDR'] ?? null;

if (isset($uid)) {

    $sql = "INSERT INTO
        fw.user
        (UserId, Addr, Date)
        VALUES
        ('$uid', '$addr', DATE_FORMAT(NOW(),'%Y/%m/%d %k:%i:%s'))
    ";

    conn()->prepare($sql)->execute();
    echo json_encode([
        'logger' => 'UserID already uploaded.',
        'return' => true,
        'nowTime' => date('H:i:s')
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        'logger' => 'Unable to get UserId.',
        'return' => false,
        'nowTime' => date('H:i:s')
    ], JSON_UNESCAPED_UNICODE);
}
