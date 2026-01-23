
<?php

session_start();

if (!isset($_SESSION['user'])) {
    header("Location: ../login/login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/styles/styles.css">
    <link rel="icon" type="image/png" href="../assets/img/ICLogo.jpeg">
    <title>Impresos Carnelli</title>
</head>
<body>

<main id="main" class="content">
  <section id="section-sh"></section>
</main>

<div id="ModalContenedor"></div>


<script>
  window.USER_SESSION = {
    sectores: <?php echo json_encode($_SESSION["sectores"] ?? []); ?>,
    actual: <?php echo json_encode($_SESSION["sector_actual"] ?? null); ?>
  };
</script>


<script type="module" src="script.js"></script>
<script src="/ICSoftware/public/app/utils/chart.umd.js"></script>
</body>
</html>