function TitreSection(data) {
  this.nom = data;
  this.longueur = data.length;
  this.nomArray = data.split('');
}

function openSectionAnim(obj, card) {
  placerLettre(obj, card, '__back', function() {
    animateTitle(card, function() {
      placerLettre(obj, card, '', function() {
        clrAnim(card);
        animateCardsOut(card, () => {
          openSection();
        });
      });
    });
  });
}

function closeSectionAnim(obj, card) {
  closeSection(() => {
    animateCardsIn(card, () => {
      openSectionAnim(obj, card);
    });
  });
}

function placerLettre(obj, containersArray, enfant = '', cb) {
  let cartesLength = containersArray.length;
  let char = '';
  for (i = 0; i < cartesLength; i++) {
    char = ' ';
    if (i < obj.longueur) {
      char = obj.nomArray[i];
    }
    $(containersArray[i])
      .children('.topCard' + enfant)
      .children('span')
      .html(char);
    $(containersArray[i])
      .children('.bottomCard' + enfant)
      .children('span')
      .html(char);
  }
  cb();
}

function animateTitle(cardContainers, cb) {
  $(cardContainers).each((index, card) => {
    let delais = index * 50;
    $(card)
      .children('.topCard')
      .transition(
        {
          delay: delais,
          perspective: '1000px',
          rotateX: '-90deg',
          duration: time
        },
        function() {
          $(card)
            .children('.bottomCard__back')
            .transition(
              {
                perspective: '1000px',
                rotateX: '0deg',
                duration: time
              },
              () => {
                if (index == 11) {
                  cb();
                }
              }
            );
        }
      );
  });
}

function clrAnim(cardContainers) {
  $(cardContainers).each((index, card) => {
    $(card)
      .children('.topCard')
      .removeAttr('style');
    $(card)
      .children('.bottomCard__back')
      .removeAttr('style');
  });
}

function animateCardsOut(cardContainers, cb) {
  $(cardContainers).each((index, card) => {
    let delais = index * 50;
    $(card)
      .parent()
      .transition(
        {
          delay: delais,
          y: index % 2 == 0 ? '800px' : '-800px',
          duration: time * 2
        },
        'in'
      )
      .transit(
        {
          // delay: delais,
          opacity: 0
        },
        () => {
          $(card)
            .parent()
            .toggle();
          index == 11 && cb();
        }
      );
  });
}

function openSection() {
  $('.board').attr('style', 'justify-content:flex-start;');
  $('.sectionContent')
    .show()
    .transition({
      height: '79vh',
      duration: 200
    })
    .transition({
      width: 'inherit',
      duration: 300
    });
}

function animateCardsIn(cardContainers, cb) {
  $(cardContainers).each((index, card) => {
    let delais = index * 50;
    $(card)
      .parent()
      .toggle()
      .transition({ opacity: 1 })
      .transition(
        {
          delay: delais,
          y: '0px',
          duration: time * 2
        },
        () => {
          index == 11 && cb();
        }
      );
  });
}

function closeSection(cb) {
  $('.sectionContent')
    .transition({
      width: '0',
      duration: 300
    })
    .transition(
      {
        height: '0',
        duration: 200
      },
      1000,
      () => {
        $('.sectionContent').toggle();
        $('.board').attr('style', 'justify-content:space-evenly;');

        console.log('call cb');
        cb();
      }
    );
}
