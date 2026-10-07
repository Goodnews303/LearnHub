<?php
require_once __DIR__ . '/config.php';
$topicId = filter_input(INPUT_POST, 'topic_id', FILTER_VALIDATE_INT);
$answers = $_POST['answers'] ?? [];
if (!$topicId) exit('Invalid request.');

$stmt = $pdo->prepare("SELECT id, question, answer FROM exercises WHERE topic_id=?");
$stmt->execute([$topicId]);
$questions = $stmt->fetchAll();

$score = 0;
foreach ($questions as $q) {
    if (isset($answers[$q['id']]) && $answers[$q['id']] === $q['answer']) $score++;
}
$total = count($questions);
?>
<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quiz Result | LearnHub</title><link rel="stylesheet" href="assets/style.css">
</head><body><main class="result wrap">
<div class="result-card"><p class="eyebrow">YOUR RESULT</p><h1><?= $score ?> / <?= $total ?></h1><p><?= $total ? round(($score/$total)*100) : 0 ?>%</p>
<a class="btn" href="javascript:history.back()">Back to Lesson</a></div></main></body></html>