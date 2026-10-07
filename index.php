<?php
require_once __DIR__ . '/config.php';
$subjects = $pdo->query("SELECT * FROM subjects ORDER BY name")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LearnHub — Learn Better</title>
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<header class="nav"><a class="logo" href="index.php">Learn<span>Hub</span></a><nav><a href="index.php">Home</a><a href="#subjects">Subjects</a><a href="#about">About</a></nav></header>

<section class="hero">
<div class="wrap">
<p class="eyebrow">STUDENT LEARNING PLATFORM</p>
<h1>Learn Better.<br>Understand More.</h1>
<p>Simple lessons, worked examples, classwork and exercises for English, Mathematics, Chemistry, Physics and Biology.</p>
<a class="btn" href="#subjects">Start Learning</a>
</div>
</section>

<section class="wrap section" id="subjects">
<div class="center"><p class="eyebrow">EXPLORE</p><h2>Choose a Subject</h2><p>Pick a subject to see its topics.</p></div>
<div class="grid">
<?php foreach ($subjects as $s): ?>
<a class="card" href="subject.php?id=<?= (int)$s['id'] ?>">
<div class="icon"><?= htmlspecialchars($s['icon']) ?></div>
<h3><?= htmlspecialchars($s['name']) ?></h3>
<p><?= htmlspecialchars($s['description']) ?></p>
<span>Explore →</span>
</a>
<?php endforeach; ?>
</div>
</section>

<section class="dark" id="about"><div class="wrap"><p class="eyebrow">ABOUT LEARNHUB</p><h2>Learning made easier.</h2><p>LearnHub is built around clear explanations, examples, practice and feedback so students can learn at their own pace.</p></div></section>
<footer>© 2026 LearnHub</footer>
</body>
</html>