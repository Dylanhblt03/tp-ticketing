# Comment récupérer et utiliser le projet TP-ticketing
## Allumer votre VM Homstead
Ouvrez votre terminal PowerShell et allez dans son dossier correspondant 
```bash
cd .\Desktop\dev\Homestead\
```
Puis lancez la pour qu'elle soit en route et joignable 
```bash
vagrant up
```
## Ou
Si vous n'avez pas relié tous vos chemin a votre dossier .yml
```bash
vagrant up --provision
```
## Aller sur Git Hub et récupérez le clone du projet sur lequel vous voulez travailler
**Vous devez mettre le clone du projet là ou se situe déjà vos projet cela est primordial**
- ici ça sera sur ce lien
```bash
 git clone https://github.com/Dylanhblt03/tp-ticketing
```
Puis déplacez vous dans le dossier 
```bash
cd nomDuProjet
```
## Ensuite ouvrez votre UI pour la base de donnée (DBeaver ou autre selon vos appétences)
Dans le dossier bdd du projet il y a un dump de la base de donnée correspondante ce qui vous permettra de l'importer dans votre UI de base de donnée ce qui évitera toute erreur 
## Récupérer l'API 
Dans le clone du git Hub fait précédemment il y a un fichier ticketing.php qui va vous permettre de faire le lien entre votre projet Angular et votre base de donnée. Cela sera votre API, récupérez la et déplacez vous dans votre dossier exercice_api et collez-le ici
## Dernière étape 
Une fois tout cela fait vous êtes un bon chemin pour pouvoir tester et reprendre le projet toute la mise en place faite vous n'avez plus qu'a lancer le projet comme ceci :
```bash
ng serve --open
```
## Allez sur le site qui vient de s'ouvrir
Tester le si un problèmes survient c'est que vous avez mal fait fait une choses décrite plus haut reprenez cette documentation la ou l'erreur vous semble probable 