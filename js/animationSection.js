function TitreSection(data, id) {
  this.nom = data;
  this.id = id;
  this.longueur = data.length;
  this.nomArray = data.split('');
}

function openSectionAnim(obj, card) {
  if ($(window).width() < 551) {
    openSection(obj);
  } else {
    placerLettre(obj, card, '__back', function() {
      animateTitle(card, function() {
        placerLettre(obj, card, '', function() {
          clrAnim(card);
          animateCardsOut(card, () => {
            openSection(obj);
          });
        });
      });
    });
  }
}

function closeSectionAnim(obj, card) {
  if ($(window).width() < 551) {
    closeSection(() => {
      openSection(obj);
    });
  } else {
    closeSection(() => {
      animateCardsIn(card, () => {
        openSectionAnim(obj, card);
      });
    });
  }
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
              500,
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

function openSection(obj) {
  $('.board').attr('style', 'justify-content:flex-start;');
  $('.sectionContent')
    .show()
    .transition({
      height: 'inherit',
      duration: 200
    })
    .transition(
      {
        width: 'inherit',
        duration: 300
      },

      function() {
        chargerContenu(obj);
      }
    );
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
        $('.sectionPrograms').html('');
        $('.contentPresentation').html('');
        $('.board').attr('style', 'justify-content:space-evenly;');
        cb();
      }
    );
}

function chargerContenu(obj) {
  $.getJSON('./js/dataCall.json', function(data) {
    console.log(obj.nom);
    let programs = '';
    let visual = '<div class="program-visual">';
    let sectionContent = '';
    let contentVisual = '<div class="content-visual">';

    switch (obj.id) {
      case 'home':
        programs =
          '<h2 style="font-size:3em; color:#bebebe">François-Xavier</h2>';
        sectionContent =
          contentVisual +
          '<img src="/public/medias/' +
          data[obj.id].avatar +
          ' "></div>' +
          '<p>' +
          data[obj.id].content +
          '</p>';
        break;

      case 'design':
        $.each(data[obj.id].programs, (i, v) => {
          programs +=
            visual + '<img src="/public/medias/icons/' + v + ' "></div>';
        });

        $.each(data[obj.id].content, (i, v) => {
          sectionContent +=
            contentVisual +
            '<img src="/public/medias/' +
            data[obj.id].path +
            v +
            ' "></div>';
        });
        break;

      case 'av':
        $.each(data[obj.id].programs, (i, v) => {
          programs +=
            visual + '<img src="/public/medias/icons/' + v + ' "></div>';
        });

        $.each(data[obj.id].content, (i, v) => {
          sectionContent +=
            contentVisual +
            '<video controls width="' +
            $(window).width() / 4 +
            '" height="' +
            $(window).height() / 4 +
            '"><source src="/public/medias/' +
            data[obj.id].path +
            v +
            ' " type="video/mp4"></video></div>';
        });
        $.each(data[obj.id].urls, (i, v) => {
          sectionContent +=
            contentVisual +
            '<iframe width="' +
            $(window).width() / 4 +
            '" height="' +
            $(window).height() / 4 +
            '" src="' +
            v +
            '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
        });
        break;

      case 'games':
        $.each(data[obj.id].programs, (i, v) => {
          programs +=
            visual + '<img src="/public/medias/icons/' + v + ' "></div>';
        });
        break;

      case 'prog':
        $.each(data[obj.id].programs, (i, v) => {
          programs +=
            visual + '<img src="/public/medias/icons/' + v + ' "></div>';
        });
        break;
      case 'Contact':
        sectionContent +=
          contentVisual +
          '<img src="/public/medias/' +
          data[obj.id].content +
          ' "></div>';
        break;
    }

    $('.sectionPrograms').html(programs);
    $('.contentPresentation').html(sectionContent);
  });
}
