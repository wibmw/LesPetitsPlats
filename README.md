![PetitsPlats](https://wibmw.github.io/LesPetitsPlats/images/logo.png) 



## Contexte
>Après avoir édité des livres de cuisine pendant plusieurs années, l’entreprise a décidé de se lancer dans un nouveau projet : réaliser son propre site de recettes de cuisine à l’instar de Marmiton ou 750g.  

## Objectifs
Les sites offrant des recettes de cuisine sont nombreux et l’équipe a pensé que l’un des éléments qui peuvent faire la différence sur notre site est la fluidité du moteur de recherche. Ce que l’on veut avant tout c’est quelque chose de performant car nos utilisateurs veulent une recherche rapide, presque instantanée !

### Scénario nominal
- **Etape 1 :** Le cas d’utilisation commence lorsque l’utilisateur entre au moins 3 caractères dans la barre de recherche principale.
- **Etape 2 :** Le système recherche des recettes correspondant à l’entrée utilisateur dans : le titre de la recette, la liste des ingrédients de la recette, la description de la recette.
- **Etape 3 :** L’interface est actualisée avec les résultats de recherche
- **Etape 4 :** Les champs de recherche avancée sont actualisés avec les informations ingrédients, ustensiles, appareil des différentes recettes restantes
- **Etape 5 :** L’utilisateur précise sa recherche grâce à l’un des champs : ingrédients, ustensiles, appareil.
- **Etape 6 :** Au fur et à mesure du remplissage les mots clés ne correspondant pas à la frappe dans le champ disparaissent. Par exemple, si l’utilisateur entre “coco” dans la liste d’ingrédients, seuls vont rester “noix de coco” et “lait de coco”
- **Etape 7 :** L’utilisateur choisit un mot clé dans le champ
- **Etape 8 :** Le mot clé apparaît sous forme de tag sous la recherche principale
- **Etape 9 :** Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les champs de recherche avancée
- **Etape 10 :** L’utilisateur sélectionne une recette
  
---
### Scénarios Alternatifs :

Nous devons créer les scénarios suivants pour le prototype :
- **Scénario alternatif A1 :**
○ **A1.** Aucune recette correspondante à la recherche. L'enchaînement A1 commence au point 3 du scénario nomina
○ **3.** L’interface affiche « Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.

- **Scénario alternatif A2 :**
○ **A2.** L’utilisateur commence sa recherche par un tag
L'enchaînement A2 commence au point 1 du scénario nominal et reprend au point 9 du scénario nominal
○ **1.** L’utilisateur commence la recherche par un tag.
○ **2.** Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les
champs de recherche avancée (9 du cas principal)

- **Scénario alternatif A3 :**
○ **A3.** L’utilisateur ajoute d’autres tags pour la recherche avancée
L'enchaînement A3 commence au point 9 du scénario nominal. Cet enchaînement peut se répéter autant que nécessaire 
○ **10.** L’utilisateur précise sa recherche grâce à l’un des champs : ingrédients, ustensiles, appareil.
○ **11.** Au fur et à mesure du remplissage les mots clés ne correspondant pas à la frappe dans le champ disparaissent
○ **12.** L’utilisateur choisit un mot clé dans le champ
○ **13.** Le mot clé apparaît sous forme de tag sous la recherche principale
○ **14.** Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les champs de recherche avancée

___
## Règles de gestion
Ces points doivent absolument être respectés durant le développement :
1. La recherche doit pouvoir se faire via le champ principal ou via les tags (ingrédients,
ustensiles ou appareil)
2. La recherche principale se lance à partir de 3 caractères entrés par l’utilisateur dans la
barre de recherche
3. La recherche s’actualise pour chaque nouveau caractère entré
4. La recherche principale affiche les premiers résultats le plus rapidement possible
5. Les champs ingrédients, ustensiles et appareil de la recherche avancée proposent
seulement les éléments restant dans les recettes présentes sur la page
6. Les retours de recherche doivent être une intersection des résultats. Si l’on ajoute les
tags “coco” et “chocolat” dans les ingrédients, on doit récupérer les recettes qui ont à la
fois de la coco et du chocolat.
7. Comme pour le reste du site, le code HTML et CSS pour l’interface (avec ou sans
Bootstrap) devra passer avec succès le validateur W3C.
8. Aucune librairie ne sera utilisée pour le JavaScript du moteur de recherche
   
  
---
## Technologies

**Autorisés:**
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 

**Linter:**     
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

---
## Notes
### Maquette Figma :

[Figma](https://www.figma.com/file/xqeE1ZKlHUWi2Efo8r73NK/UI-Design-Les-Petits-Plats-FR?node-id=0%3A1)

### Polices :
- Logo & titres: __*Lato*__
- Texte: __*Roboto*__

### Couleurs :
***Primaire :***
-  🟥 __*#ED6454*__
-  🟦 __*#3282F7*__
-  🟩 __*#68D9A4*__

### Contraintes :
- **Approche desktop-first:** oui
- **Maquette desktop :** oui
- **Validation W3C HTML :** à passer, warning autorisés
- **Validation W3C CSS :** à passer, warning autorisés
- **Validation AChecker :** à passer, warning autorisés
- **Compatibilité :** Dernières versions de Chrome et Firefox 
