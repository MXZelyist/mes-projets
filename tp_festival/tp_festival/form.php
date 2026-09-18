<!DOCTYPE html>
<?php
include 'pays.php';
?>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="tp_5.css">
</head>
<body class="Bform">
<header class="entete">
      <p class="logo">Léman Sound</p>
</header>

      <form action="https://devmob.ictge.ch/~granger/tp_festival/paiement.php" method="post" class="form">
        <label for="nom">Nom:</label>
        <input type="text" id="nom" name="nom" required>

        <label for="prenom">Prénom:</label>
        <input type="text" id="prenom" name="prenom" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <label for="mdp">mot de passe:</label>
        <input type="password" id="mdp" name="mdp" required>

        <label for="ville">pays :</label>
        <select id="ville" name="ville">
          <?php foreach ($pays as $p): ?>
            <option value="<?= $p ?>"><?= $p ?></option>
          <?php endforeach; ?>
        </select>

        <label for="nbBillets">Nombre de billets:</label>
        <input type="number" id="nbBillets" name="nbBillets" min="1" max="10" value="1">

        <label for="billet">Type de billet:</label>
        <select id="billet" name="billet">
          <option value="1jour">Pass 1 jour</option>
          <option value="3jours">Pass 3 jours</option>
          <option value="etudiant">Etudiant</option>
        </select>

        <button type="submit">Acheter</button>
      </form>


    <footer class="pied" id="bfooter">
        &copy; 2024 Léman Sound Festival. Tous droits réservés.
    </footer>
    </body>
</html>