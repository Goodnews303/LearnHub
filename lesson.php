<?php
require_once __DIR__ . '/config.php';
$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if (!$id) exit('Invalid topic.');

$stmt = $pdo->prepare("SELECT t.*, s.name AS subject_name, s.icon FROM topics t JOIN subjects s ON s.id=t.subject_id WHERE t.id=?");
$stmt->execute([$id]);
$topic = $stmt->fetch();
if (!$topic) exit('Topic not found.');

$stmt = $pdo->prepare("SELECT * FROM exercises WHERE topic_id=? ORDER BY sort_order, id");
$stmt->execute([$id]);
$exercises = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= htmlspecialchars($topic['title']) ?> | LearnHub</title>
<link rel="stylesheet" href="assets/style.css">
</head><body>
<header class="nav"><a class="logo" href="index.php">Learn<span>Hub</span></a><nav><a href="index.php">Home</a><a href="javascript:history.back()">Back</a></nav></header>
<section class="subhero"><div class="wrap"><p class="eyebrow"><?= htmlspecialchars($topic['subject_name']) ?></p><h1><?= htmlspecialchars($topic['title']) ?></h1><p><?= htmlspecialchars($topic['short_description']) ?></p></div></section>
<main class="wrap lesson">
<section class="lesson-card"><p class="eyebrow">INTRODUCTION</p><div class="prose"><?= $topic['introduction_html'] ?></div></section>
<section class="lesson-card"><p class="eyebrow">OBJECTIVES</p><div class="prose"><?= $topic['objectives_html'] ?></div></section>
<section class="lesson-card"><p class="eyebrow">LESSON</p><div class="prose"><?= $topic['lesson_html'] ?></div></section>
<section class="lesson-card"><p class="eyebrow">WORKED EXAMPLES</p><div class="prose"><?= $topic['examples_html'] ?></div></section>

<section class="lesson-card">
<p class="eyebrow">EXERCISES</p>
<form method="post" action="check_answers.php">
<input type="hidden" name="topic_id" value="<?= (int)$topic['id'] ?>">
<?php foreach ($exercises as $i => $q): ?>
<div class="question"><h3><?= $i+1 ?>. <?= htmlspecialchars($q['question']) ?></h3>
<?php foreach (json_decode($q['options'], true) as $key => $option): ?>
<label class="option"><input type="radio" name="answers[<?= (int)$q['id'] ?>]" value="<?= htmlspecialchars($key) ?>"> <?= htmlspecialchars($option) ?></label>
<?php endforeach; ?></div>
<?php endforeach; ?>
<?php if ($exercises): ?><button class="btn" type="submit">Submit Answers</button><?php else: ?><p>No exercises have been added yet.</p><?php endif; ?>
</form>
</section>
</main>
<footer>© 2026 LearnHub</footer>
</body></html>