<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Paiement</h1>
    <p><?php
        echo "bonjour " . $_POST['nom'] . " " . $_POST['prenom'] . ", vous avez choisi le billet : " . $_POST['billet'] . " pour " . $_POST['nbBillets'] . " personne(s).";
        if ($_POST['billet'] == "1jour") {
            $prix = 110;
        } elseif ($_POST['billet'] == "3jours") {
            $prix = 270;
        } elseif ($_POST['billet'] == "etudiant") {
            $prix = 200;
        }
        echo "<br>Le prix total est de : " . $prix * $_POST['nbBillets'] . " CHF";
        ?></p>
    <form class="form">
        <div>
        <label for="carte">carte de crédit</label>
        <input type="text" name="carte" required><br>
        </div>
        <div>
        <label for="expiration">date d'expiration</label>
        <input type="text" name="expiration" required><br>
        </div>
        <div>  
        <label for="code">code de sécurité</label>
        <input type="text" name="code" required><br>
        </div>
        <button type="submit">Payer</button>
    </form>
</body>
</html>