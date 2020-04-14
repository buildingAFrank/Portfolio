//objet de l'evenement de la souris, une instance generer a chaque fois
// avec des [GET,SET] pour suivre le l'evolution des animations associers aux evenements
function EvToObj(ref) {
  this.ref = ref;
  this.$ref = $(ref.currentTarget);
  this.$item = this.$ref.siblings();
  this.menuId = this.$item.attr('id');
  this.$top = this.$item.find('.tophalf');
  this.$topBack = this.$item.find('.tophalf__back');
  this.$bottom = this.$item.find('.bottomhalf');
  this.$bottomBack = this.$item.find('.bottomhalf__back');
  this.menuName = this.$item
    .find('.tophalf')
    .children('span')
    .html();
}
EvToObj.prototype.setAnimState = function(state) {
  return this.$item.attr('data-state', state);
};
EvToObj.prototype.getAnimState = function() {
  return this.$item.attr('data-state');
};

EvToObj.prototype.setSelectedState = function(state) {
  return this.$item.attr('data-selected', state);
};
EvToObj.prototype.getSelectedState = function() {
  return this.$item.attr('data-selected');
};

EvToObj.prototype.setHoverState = function(state) {
  return this.$item.attr('data-hovering', state);
};
EvToObj.prototype.getHoverState = function() {
  return this.$item.attr('data-hovering');
};

//temps pour l'animation du flipper
const time = 100;

//les classes necessaires au cycle d'animation sur un item menu qui n'est pas actif
const defaultClasses = ['', ''];
const hoverClasses = ['hover-menu', 'hover-menu__bottom'];
//les classes necessaires au cycle d'animation sur un item menu qui est actif
const selectedClasses = ['activeMenu', 'activeMenu__bottom'];
const selectedHoverClasses = ['activeMenuHover', 'activeMenuHover__bottom'];

//garde en memoire l'item du menu qui est actif
let activeMenu;

/**
 * once the page is loaded, start registering events on nav elements
 */
$().ready(function() {
  //menu hover
  $titleCard = $('.flipCard');
  $('.menuOverlay').hover(stateCheck, stateCheck);

  //menu selection
  $('.menuOverlay').click(stateCheck);
});

/**
 * Analyse l'appel d'evenement et appel la fonction necessaire
 *
 * @param {called event} navEvent
 *
 * @case mouseenter set hover state=true, jouer animation hover
 *
 * @case mouseleave set hover state = false, jouer animation reset
 *
 * @case mouse click set selected state true/false, jouer animation selected
 *
 */
function stateCheck(navEvent) {
  //if menu is not active, make regular hover animation
  let userEvent = new EvToObj(navEvent);
  let mouseEvent = userEvent.ref.type;
  //Mouse enter event
  if (mouseEvent == 'mouseenter') {
    userEvent.setHoverState('TRUE');
    if (
      userEvent.getAnimState() === 'INIT' ||
      userEvent.getAnimState() === 'TOINIT'
    ) {
      if (userEvent.getSelectedState() === 'FALSE') {
        flipMenuStart(userEvent, hoverClasses);
      } else {
        flipSelectedMenuStart(userEvent, selectedHoverClasses);
      }
    }
  }
  // Mouse leave event
  if (mouseEvent == 'mouseleave') {
    userEvent.setHoverState('FALSE');

    if (userEvent.getAnimState() === 'TOACTIVE') {
      // console.log('Hdjsahjkhdajkhdjaks');
    } else {
      if (userEvent.getSelectedState() === 'FALSE') {
        flipMenuReset(userEvent, hoverClasses);
      } else {
        flipSelectedMenuReset(userEvent, selectedHoverClasses);
      }
    }
  }
  //Mouse click event
  if (mouseEvent == 'click') {
    //active un item du menu
    if (userEvent.getSelectedState() === 'FALSE') {
      userEvent.setSelectedState('TRUE');
      selectedHoverClassStart(userEvent);
      let ObjChoisi = new TitreSection(userEvent.menuName, userEvent.menuId);
      console.log(userEvent);
      //toute premiere selection de l'internaute
      if (activeMenu === undefined) {
        activeMenu = userEvent;
        openSectionAnim(ObjChoisi, $titleCard);
      } else if (activeMenu !== userEvent) {
        if (activeMenu.getSelectedState() === 'TRUE') {
          // l'item de navigation selectionner precedement
          activeMenu.setSelectedState('FALSE');
          deselectedHoverClassStart(activeMenu);
          closeSectionAnim(ObjChoisi, $titleCard);
          activeMenu = userEvent;
        }
      } else {
        activeMenu = userEvent;
        openSectionAnim(ObjChoisi, $titleCard);
      }
    }
  }
}

/*mettre a jour l'etat de l'animation,  est appeler par StateCheck,
 * appel la fonction de debut de l'animation, 
 verifier les etats dans la fonction de retour et defini la prochaine etape */
function flipMenuStart(ref, classes) {
  if (
    //animation is init or toinit, mouse is in hover and item not selected
    (ref.getAnimState() === 'INIT' || ref.getAnimState() === 'TOINIT') &&
    ref.getHoverState() === 'TRUE'
  ) {
    ref.setAnimState('TOACTIVE');
    animateToActive(ref, classes, function() {
      if (ref.getHoverState() === 'FALSE') {
        flipMenuReset(ref, classes);
      } else {
        ref.setAnimState('ACTIVE');
      }
    });
  }
}

//debut du cycle d'animation appeler par flipMenuStart
function animateToActive(ref, classes, cb) {
  const cssClass = classes[0];
  const cssClassBottom = classes[1];

  // change color of top back panel
  ref.$topBack.addClass(cssClass);
  // start animation
  ref.$top.transition(
    {
      perspective: '1000px',
      rotateX: '-90deg',
      duration: time
    },
    function() {
      ref.$top.addClass(cssClass);
      // ANIMATE BOTTOM WHEN TOP IS DONE
      ref.$bottomBack.addClass(cssClassBottom).transition(
        {
          perspective: '1000px',
          rotateX: '0deg',
          duration: time
        },
        function() {
          ref.setAnimState('ACTIVE');

          cb();
        }
      );
    }
  );
}

/* met a jour l'etat de l'animation et appele la fonction qui debute l'animation de reinitialisation
 appeler par flipMenuStart si la souris a quitter le bouton avant la fin de animateToActive
 ou
 est appeler par StateCheck si le curseur a quitter le bouton apres la fin de l'animation AnimateToActive*/
function flipMenuReset(ref, classes) {
  if (ref.getAnimState() === 'ACTIVE' && ref.getHoverState() === 'FALSE') {
    ref.setAnimState('TOINIT');
    animateToInit(ref, classes, function() {
      ref.setAnimState('INIT');
    });
  }
  if (ref.getAnimState() === 'TOACTIVE') {
    ref.setAnimState('ACTIVE');
    flipMenuReset(ref, classes);
  }
}

/*debut du cycle d'animation de reinitialisation, 
appeler par flipMenuReset si le bouton n'etait pas selectionner
ou
par flipSelectedMenuReset si le bouton etait actif mais qu'un autre bouton a ete selectionner par la suite*/
function animateToInit(ref, classes, cb) {
  const cssClass = classes[0];
  const cssClassBottom = classes[1];

  ref.$bottom.addClass(cssClassBottom);
  ref.$topBack.removeClass(cssClass);

  ref.$top.removeAttr('style').transition(
    {
      perspective: '1000px',
      rotateX: '-90deg',
      duration: time
    },
    function() {
      $(this)
        .removeAttr('style')
        .removeClass(cssClass);
      ref.$bottomBack
        .removeClass(cssClassBottom)
        .removeAttr('style')
        .transition(
          {
            perspective: '1000px',
            rotateX: '0deg',
            duration: time
          },
          function() {
            // Reset style
            $(this).removeAttr('style');
            ref.$bottom.removeClass(cssClassBottom);
            cb();
          }
        );
    }
  );
}

/*appeler par stateCheck
met a jour l'etat de l'animation
prepare le bouton a jouer l'animation de selection
appel flipMenuStart*/
function selectedHoverClassStart(ref) {
  const { $top, $bottom, $topBack, $bottomBack } = ref;
  $bottom.addClass('hover-menu__bottom');
  $top.removeAttr('style');
  $bottomBack.removeAttr('style');
  ref.setAnimState('INIT');
  flipSelectedMenuStart(ref);
}

/**est appeler par selectedHoverClassStart si le bouton vient d'etre cliquer
 * ou
 * par stateCheck si le bouton etat deja selectionner mais que la souris n'etait pas sur le bouton
 * met a jour l'etat de l'animation et appele la fonction animateToSelectedActive
 * dans le retour verifie l'etat du hover et defini la prochaine etape
 */
function flipSelectedMenuStart(ref) {
  if (
    //animation is init or toinit, mouse is in hover and item not selected
    (ref.getAnimState() === 'INIT' || ref.getAnimState() === 'TOINIT') &&
    ref.getHoverState() === 'TRUE' &&
    ref.getSelectedState() === 'TRUE'
  ) {
    ref.setAnimState('TOACTIVE');
    animateToSelectedActive(ref, function() {
      ref.$top.removeClass('hover-menu');
      ref.$topBack.removeClass('hover-menu');
      ref.$bottom
        .removeClass('hover-menu__bottom')
        .addClass(selectedClasses[1]);
      ref.$bottomBack.removeClass('hover-menu__bottom');
      if (ref.getHoverState() === 'FALSE') {
        flipSelectedMenuReset(ref, selectedHoverClasses);
      } else {
        ref.setAnimState('ACTIVE');
      }
    });
  }
}

/**appeler par flipSelectedMenuStart
 * joue l'animation de selection
 * met a jour l'etat d'animation
 */
function animateToSelectedActive(ref, cb) {
  let { $top, $topBack, $bottomBack } = ref;
  // change color of top back panel
  $topBack.addClass([selectedClasses[0], selectedHoverClasses[0]]);
  // start animation
  $top.transition(
    {
      perspective: '1000px',
      rotateX: '-90deg',
      duration: time
    },
    function() {
      $top.addClass([selectedClasses[0], selectedHoverClasses[0]]);
      // ANIMATE BOTTOM WHEN TOP IS DONE
      $bottomBack
        .addClass([selectedClasses[1], selectedHoverClasses[1]])
        .transition(
          {
            perspective: '1000px',
            rotateX: '0deg',
            duration: time
          },
          function() {
            ref.setAnimState('ACTIVE');

            cb();
          }
        );
    }
  );
}

/* met a jour l'etat de l'animation et appele la fonction qui debute l'animation de reinitialisation
 appeler par flipSelectedMenuStart si la souris a quitter le bouton avant la fin de animateToActive
 ou
 est appeler par StateCheck si le curseur a quitter le bouton apres la fin de l'animation AnimateSelectedToActive
 ou
 est appeler par flipDeselectedMenuStart si un autre bouton a ete activer*/
function flipSelectedMenuReset(ref, classes) {
  if (ref.getAnimState() === 'ACTIVE' && ref.getHoverState() === 'FALSE') {
    ref.setAnimState('TOINIT');
    animateToInit(ref, classes, function() {
      ref.setAnimState('INIT');
    });
  }
  if (ref.getAnimState() === 'TOACTIVE') {
    ref.setAnimState('ACTIVE');
    flipMenuReset(ref, classes);
  }
}

/**appeler par stateCheck lorsqu'un deuxieme bouton du menu a ete clicker
 * prepare le premier bouton activer a executer son animation de retour a l'etat intial non selectionner
 * appele l'animation de reinitialisation du bouton du menu flipDeselectedMenuStart
 */
function deselectedHoverClassStart(ref) {
  const { $top, $bottom, $topBack, $bottomBack } = ref;
  if (ref.getSelectedState() === 'TRUE' || ref.getHoverState() === 'TRUE') {
    $bottom.addClass('activeMenuHover__bottom');
  }

  $top.removeAttr('style');
  $bottomBack.removeAttr('style');
  ref.setAnimState('INIT');
  flipDeselectedMenuStart(ref);
}

/**appeler par deselectedHoverClassStart
 * met ajout l'etat de l'animation
 * appel l'animation animateToDeselected et ajuste les classes avant de definir la prochaine etape
 */
function flipDeselectedMenuStart(ref) {
  if (
    (ref.getAnimState() === 'INIT' || ref.getAnimState() === 'TOINIT') &&
    ref.getHoverState() === 'TRUE' &&
    ref.getSelectedState() === 'FALSE'
  ) {
    ref.setAnimState('TOACTIVE');
    animateToDeselected(ref, function() {
      ref.$bottom
        .removeClass([selectedClasses[1], selectedHoverClasses[1]])
        .addClass(hoverClasses[1]);
      // ref.$bottomBack.removeClass('hover-menu__bottom');
      if (ref.getHoverState() === 'FALSE') {
        flipSelectedMenuReset(ref, hoverClasses);
      } else {
        ref.setAnimState('ACTIVE');
      }
    });
  }
  if (
    (ref.getAnimState() === 'INIT' || ref.getAnimState() === 'TOINIT') &&
    ref.getHoverState() === 'FALSE' &&
    ref.getSelectedState() === 'FALSE'
  ) {
    ref.setAnimState('TOACTIVE');
    animateToDeselected(ref, function() {
      ref.$bottom.removeClass([selectedClasses[1], selectedHoverClasses[1]]);
      ref.$bottomBack.removeClass('hover-menu__bottom');

      ref.setAnimState('INIT');
    });
  }
}

/** appeler par flipDeselectedMenuStart
 * execute l'animation de retour a l'etat initial
 */
function animateToDeselected(ref, cb) {
  // change color of top back panel
  if (ref.getSelectedState() === 'TRUE') {
    ref.$topBack
      .addClass(hoverClasses[0])
      .removeClass([selectedClasses[0], selectedHoverClasses[0]]);
    // start animation
    ref.$top.transition(
      {
        perspective: '1000px',
        rotateX: '-90deg',
        duration: time
      },
      function() {
        ref.$top
          .removeClass([selectedClasses[0], selectedHoverClasses[0]])
          .addClass(hoverClasses[0]);
        // ANIMATE BOTTOM WHEN TOP IS DONE
        ref.$bottomBack
          .removeClass([selectedClasses[1], selectedHoverClasses[1]])
          .addClass(hoverClasses[1])
          .transition(
            {
              perspective: '1000px',
              rotateX: '0deg',
              duration: time
            },
            function() {
              ref.setAnimState('ACTIVE');

              cb();
            }
          );
      }
    );
  } else {
    ref.$topBack
      .removeClass([selectedClasses[0], selectedHoverClasses[0]])
      .addClass(hoverClasses[0]);
    // start animation
    ref.$top.transition(
      {
        perspective: '1000px',
        rotateX: '-90deg',
        duration: time
      },
      function() {
        ref.$top.removeClass([selectedClasses[0], selectedHoverClasses[0]]);
        // ANIMATE BOTTOM WHEN TOP IS DONE
        ref.$bottomBack
          .removeClass([selectedClasses[1], selectedHoverClasses[1]])
          .addClass(hoverClasses[1])
          .transition(
            {
              perspective: '1000px',
              rotateX: '0deg',
              duration: time
            },
            function() {
              ref.setAnimState('ACTIVE');

              cb();
            }
          );
      }
    );
  }
}
