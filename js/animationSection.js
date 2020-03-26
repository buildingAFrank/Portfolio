function TitreSection(data) {
  this.nom = data;
  this.longueur = data.length;
  this.nomArray = data.split('');
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
