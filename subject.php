<?php
require_once __DIR__ . '/config.php';
$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if (!$id) exit('Invalid subject.');

$stmt = $pdo->prepare("SELECT * FROM subjects WHERE id = ?");
$stmt->execute([$id]);
$subject = $stmt->fetch();
if (!$subject) exit('Subject not found.');

$stmt = $pdo->prepare("SELECT * FROM topics WHERE subject_id = ? ORDER BY sort_order, title");
$stmt->execute([$id]);
$topics = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= htmlspecialchars($subject['name']) ?> | LearnHub</title>
<link rel="stylesheet" href="assets/style.css">
</head><body>
<header class="nav"><a class="logo" href="index.php">Learn<span>Hub</span></a><nav><a href="index.php">Home</a><a href="index.php#subjects">Subjects</a></nav></header>
<section class="subhero"><div class="wrap"><div class="icon big"><?= htmlspecialchars($subject['icon']) ?></div><p class="eyebrow"><?= htmlspecialchars($subject['name']) ?></p><h1><?= htmlspecialchars($subject['name']) ?></h1><p><?= htmlspecialchars($subject['description']) ?></p></div></section>
<main class="wrap section"><div class="center"><h2>Topics</h2><p>Choose a topic to begin the lesson.</p></div>
<div class="topic-grid">
<?php foreach ($topics as $topic): ?>
<a class="topic" href="lesson.php?id=<?= (int)$topic['id'] ?>"><h3><?= htmlspecialchars($topic['title']) ?></h3><p><?= htmlspecialchars($topic['short_description']) ?></p><span>Study lesson →</span></a>
<?php endforeach; ?>
</div></main>
<footer>© 2026 LearnHub</footer>
</body></html>