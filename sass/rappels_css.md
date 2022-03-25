quatre piliers de la spécificité
Un navigateur distingue quatre catégories de règles CSS.

1) Le style inline, défini directement dans le HTML
Lorsque vous écrivez du CSS dans du HTML, c’est ce qu’on appelle du style inline.

<div style="background-color:#15DEA5;">Click Here!</div>
2) Les id
Les id sont uniques et s’appliquent à un object unique. Vous ne pouvez pas utiliser plusieurs fois un id dans votre HTML.

<style> #submit-button { background-color: #15DEA5; } </style>
<div id="submit-button">Click Here!</div>
3) Les classes, pseudoclasses et attributs
Une pseudoclasse est un mot clé ajouté à un sélecteur qui permet de spécifier un état comme  :hover, par exemple, qui indique que l’on passe la souris au-dessus du sélecteur. Les attributs permettent de sélectionner un sélecteur précis.

<style> .button { background-color: #DB464B; } </style>
<div class="button">Click Here!</div>
4) Les éléments et pseudoéléments
<style> div { background-color: #DB464B; } </style>
<div>Click Here!</div>

Lorsqu'il y a plusieurs sélecteurs, c'est le plus spécifique qui l'emporte dans l'ordre suivant :
inline style, id, classe, élément

S'il y a plusieurs classes, .button et .button2 par exemple (<div class="button button2">), alors 
c'est la dernière ds le fichier css qui va l'emporter (surcharge)

Si on veut appliquer un style pour une balise contenant les 2 classes, alors ds le css il faut
indiquer .button.button2 {background-color: red;} C'est tjrs cette double classe qui prendra le dessus. 

Si on indique .button .button2 (avec l'espace), cela joue le rôle d'un combinateur descendant : l'ensemble des règles s'appliquent aux éléments enfants de la 1ère classe (ici .button) étant eux-mêmes de la 2nde classe (.button2)

On peut aussi utiliser #submit-button.button pour spécifier qu'on adresse un element disposant d'un id précid ET d'une classe précise

Bloc Element Modificateur :

Avec un exemple c'est + clair

Bloc de prévisu d'un projet 
.proj-preview {
    color: #fff;
    margin-bottom: .25rem;
}

Elément de titre du projet => on utilise 2 underscores (dunders)
.proj-preview__heading {}
    font-size: 4rem;
    padding-left: 2.5rem;
    margin: 0;
    line-height: 6rem;
}

Modificateurs = sélecteurs qui créent différentes versions d'un bloc ou élément de bloc
=> on utilise 2 tirets
.proj-preview--mint {
    color : #15DEA5;
}

html :

<section class="proj-prev proj-prev--mint">
    <div class="proj-prev__image">
        <img src="/public/img/photography_1280w.jpg" alt="project title goes here" >
    </div>
    <h1 class="proj-prev__heading">
        Project Title
    </h1>
    <p class="proj-prev__byline">
        project keywords would go here
    </p>
</section>

voir fichiers test.html et exemple.css

Un exemple de menu déroulant :
https://codepen.io/pen/?template=xxgjEee

Un exemple d'info-bulles :
https://developer.mozilla.org/fr/docs/Web/CSS/::after

Cocher les éléments d'une liste :
https://developer.mozilla.org/fr/docs/Web/CSS/::before

clipping and masking in css :
https://css-tricks.com/clipping-masking-css/

menu accordéon :
https://www.w3schools.com/howto/howto_js_accordion.asp
https://codyhouse.co/demo/multi-level-accordion-menu/index.html

Jouer avec le js :
https://www.javascripttutorial.net/javascript-dom/javascript-style/
https://reactgo.com/select-element-data-attribute-js/

sliders :
https://onaircode.com/javascript-slider-examples/
https://codepen.io/rendro/pen/ajhrn


https://developer.mozilla.org/fr/docs/Web/CSS/flex-basis

menu tel mobile en css avec picto menu full css :
https://blog.lapasserelle.school/tutoriels/creer-un-menu-mobile-avec-css-et-javascript/
https://codepen.io/lapasserelle/pen/VwwRgKO


fenêtre modale, z-index :
https://coder-coder.com/z-index-isnt-working/#:~:text=What%20is%20z%2Dindex%3F,set%20z%2Dindex%20to%20999999!




















