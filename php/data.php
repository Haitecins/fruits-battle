<?php
include 'mysql.php';

$uid = $_POST['uid'] ?? null;
$scores = $_POST['scores'] ?? null;
$playtime = $_POST['playtime'] ?? null;
$useSkills = $_POST['useSkills'] ?? null;
$totalFruits = $_POST['totalFruits'] ?? null;
$totalBadFruits = $_POST['totalBadFruits'] ?? null;
$totalAchievements = $_POST['totalAchievements'] ?? null;
$totalMedals = $_POST['totalMedals'] ?? null;
$difficultyLevels = $_POST['difficultyLevels'] ?? null;

if (isset($uid, $scores, $playtime, $useSkills, $totalFruits, $totalBadFruits, $totalAchievements, $totalMedals, $difficultyLevels)) {

    $sql = "INSERT INTO
        fw.data (UserId,
                 Scores,
                 PlayTime,
                 `Use Skills`,
                 `Total Fruits`, 
                 `Total Bad Fruits`, 
                 `Total Achievements`, 
                 `Total Medals`, 
                 `Difficulty Levels`)
        VALUES
        ('$uid',
         '$scores', 
         '$playtime',
         '$useSkills', 
         '$totalFruits', 
         '$totalBadFruits',
         '$totalAchievements',
         '$totalMedals',
         '$difficultyLevels')
    ";

    conn()->prepare($sql)->execute();
    echo json_encode([
        'logger' => 'Player data has been uploaded.',
        'return' => true,
        'nowTime' => date('H:i:s')
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        'logger' => 'Failed to get player data.',
        'return' => false,
        'nowTime' => date('H:i:s')
    ], JSON_UNESCAPED_UNICODE);
}