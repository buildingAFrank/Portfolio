function EvToObj(ref) {
  this.ref = ref;
  this.$ref = $(ref.currentTarget);
  this.$item = this.$ref.siblings();
  this.menuId = this.$item.attr('id');
  this.$top = this.$item.find('.tophalf');
  this.$topBack = this.$item.find('.tophalf__back');
  this.$bottom = this.$item.find('.bottomhalf');
  this.$bottomBack = this.$item.find('.bottomhalf__back');
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

let activeMenu;

const time = 150;

const defaultClasses = ['', ''];
const hoverClasses = ['hover-menu', 'hover-menu__bottom'];
const selectedClasses = ['activeMenu', 'activeMenu__bottom'];
const selectedHoverClasses = ['activeMenuHover', 'activeMenuHover__bottom'];
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

/* 
  INIT
  TOACTIVE
  ACTIVE
  TOINIT
  
  */

/**
 * Analyse l'appel d'evenement et appel la fonction necessaire
 *
 * @param {called event} navEvent
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
    if (userEvent.getSelectedState() === 'FALSE') {
      if (activeMenu === undefined) {
        activeMenu = userEvent;
      } else if (activeMenu !== userEvent) {
        if (activeMenu.getSelectedState() === 'TRUE') {
          activeMenu.setSelectedState('FALSE');
          deselectedHoverClassStart(activeMenu);
        }
      }
      activeMenu = userEvent;
      let ObjChoisi = new TitreSection(userEvent.menuId);
      placerLettre(ObjChoisi, $titleCard, '__back', function() {
        animateTitle($titleCard, function() {
          placerLettre(ObjChoisi, $titleCard, '', function() {
            clrAnim($titleCard);
          });
        });
      });
      userEvent.setSelectedState('TRUE');
      selectedHoverClassStart(userEvent);
      //fonction animation contenu
    } else {
      userEvent.setSelectedState('FALSE');
      deselectedHoverClassStart(userEvent);
    }
  }
}

function selectedHoverClassStart(ref) {
  const { $top, $bottom, $topBack, $bottomBack } = ref;
  $bottom.addClass('hover-menu__bottom');
  $top.removeAttr('style');
  $bottomBack.removeAttr('style');
  ref.setAnimState('INIT');
  flipSelectedMenuStart(ref);
}
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

function flipSelectedMenuStart(ref) {
  if (
    //animation is init or toinit, mouse is in hover and item not selected
    (ref.getAnimState() === 'INIT' || ref.getAnimState() === 'TOINIT') &&
    ref.getHoverState() === 'TRUE' &&
    ref.getSelectedState() === 'TRUE'
  ) {
    ref.setAnimState('TOACTIVE');
    animateToSelectedActive(ref, function() {
      //**************** */
      //ajouter la fonction pour lanimation du titre de section ici
      //***************************** */
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
      ref.$bottomBack.removeClass('hover-menu__bottom');
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
    ref.$topBack.removeClass([selectedClasses[0], selectedHoverClasses[0]]);
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

function animateToSelectedActive(ref, cb) {
  // change color of top back panel
  ref.$topBack.addClass([selectedClasses[0], selectedHoverClasses[0]]);
  // start animation
  ref.$top.transition(
    {
      perspective: '1000px',
      rotateX: '-90deg',
      duration: time
    },
    function() {
      ref.$top.addClass([selectedClasses[0], selectedHoverClasses[0]]);
      // ANIMATE BOTTOM WHEN TOP IS DONE
      ref.$bottomBack
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
