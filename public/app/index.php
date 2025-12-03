
<?php

session_start();

if (!isset($_SESSION['user'])) {
    header("Location: login/login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/styles/styles.css">
    <title>Impresos Carnelli</title>
</head>
<body>

    <main id="main"> 

    <section>
        
    </section>
    </main>

<script type="module" src="script.js"></script>
</body>
</html>