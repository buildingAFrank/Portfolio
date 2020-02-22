var progressState=[];

$().ready(function(){
    //menu hover
$(".menuOverlay").hover(
    function(event){stateCheck(event);},
    function(event){stateCheck(event)})

$(".flipperContainer").hover(flipStart,flipEnd);

//menu selection

$(".item-menu__accueil").click(function(event){flipStart(event,"activeMenu","activeMenu__bottom");})



})

/**
 * Analyse l'appel d'evenement et appel la fonction necessaire
 * 
 * @param {called event} navEvent 
 */
function stateCheck(navEvent){
    //if menu is not active, make regular hover animation
    $menuState=$(navEvent.currentTarget).siblings().attr('data-state');
    console.log($menuState);
    if(navEvent.type=="mouseenter"){
            switch ($menuState) {
                case "sleep":
                    flipMenuStart(navEvent,"hover-menu","hover-menu__bottom");
                    break;
                case "activeMenuHover":
        
                
                    break;
        
                default:
                    break;
            }
        }
    if(navEvent.type=="click"){
        switch (cssClass) {
            case "hover-menu":
                
            
                break;
            case "activeMenuHover":
    
            
                break;
    
            default:
                break;
        }
    }
    if(navEvent.type=="mouseleave"){
        switch ($menuState) {
            case "wake":
                flipMenuReset(navEvent,"hover-menu","hover-menu__bottom");
            
                break;
            case "activeMenuHover":
    
            
                break;
    
            default:
                break;
        }
    }
    
    //if menu is not active but is selected, make active hover animation
    
    //if menu is active, make active hover animation

}

function flipMenuStart(itemMenu,cssClass,cssClassBottom){
    let $top=$('.tophalf');
        $topBack=$('.tophalf__back');
        $bottomBack=$('.bottomhalf__back');
        $item=$(itemMenu.currentTarget).siblings();

        //si c'est dans son etat initial on peu demarrer l'animation
    if(!$item.hasClass('hovering')){   
        $item.attr('data-state','wake');         
        //ajouter une class pour reference
        
        $item.addClass('hoverPlay');
        console.log('addClass hoverPlay');
        //assigne la classe de hover a l'element cacher derriere la palette du haut
        $item.find($topBack).addClass(cssClass);
        //trouver la palette du haut et appliquer une animation de transition
        $item.find($top).transition(
                {
                    perspective:'1000px',
                    rotateX:'-90deg',
                    duration:150
                }, 
                //ajouter la class representant son etat hover
                function(){
                    $(this).addClass(cssClass);
                   $item.find($bottomBack).addClass(cssClassBottom).transition(
                    {
                        perspective:'1000px',
                        rotateX:'0deg',
                        duration:150
                    },  
                    function(){   
                        $item.addClass("hovering");
                        console.log('top animation done, addclass hovering');
                    }     
                )
                }
            );

        //attends la fin de l'animation du haut avant de declancher l'animation du bas de la palette
        
    }
}

function flipMenuReset(itemMenu,cssClass,cssClassBottom){
    let $top=$('.tophalf'),
        $topBack=$('.tophalf__back'),
        $bottom=$('.bottomhalf'),
        $bottomBack=$('.bottomhalf__back'),
        $item=$(itemMenu.currentTarget).siblings();

         progressState[$item.attr('id')]= setInterval( function() {   

            if ($item.hasClass('hovering') && !$item.hasClass('hoverStop')){

                console.log('item has class hovering but not hoverStop');

                $item.addClass('hoverStop');

                console.log('so we add hoverStop');

                $item.find($bottom).addClass(cssClassBottom);
                $item.find($topBack).removeClass(cssClass);
        
                $item.find($top).removeAttr('style').transition(
                    {
                        perspective:'1000px',
                        rotateX:'-90deg',
                        duration:150
                    },
                    function(){
                        $(this).removeAttr('style').removeClass(cssClass);
                        $item.find($bottomBack).removeClass(cssClassBottom).removeAttr('style').transition(
                            {
                                perspective:'1000px',
                                rotateX:'0deg',
                                duration:150
                            },
                            function(){
                                $(this).removeAttr('style');$item.find($bottom).removeClass(cssClassBottom);
                                $item.removeClass('hovering hoverPlay hoverStop').attr('data-state','sleep');
                                clearInterval(progressState[$item.attr('id')]);
                                console.log('done animating the flip, remove class hovering and hoverPlay');
                            }
                        );
                    }
                );    
            }
        },25);
        
    }   


function flipStart(item){

    const $item=$(item.currentTarget);
    const $top=$item.find($('.topCard'));
    const $bottomBack=$item.find($('.bottomCard__back'));

    console.log('animation de la section');
    $top.transition(
        {
            perspective:'1000px',
            rotateX:'-90deg',
            duration:150
        },
        function(){
            $bottomBack.transition(
                {
                    perspective:'1000px',
                    rotateX:'0deg',
                    duration:150
                }
            );
        }
    );
        
}
    


function flipEnd(item){

    const $item=$(item.currentTarget);
    const $top=$item.find($('.topCard'));
    const $bottomBack=$item.find($('.bottomCard__back'));

    $top.removeAttr('style').transition(
        
        {
            perspective:'1000px',
            rotateX:'-90deg',
            duration:150
        }, 
        function(){
            $(this).removeAttr('style');
            $bottomBack.removeAttr('style').transition(
                {
                    perspective:'1000px',
                    rotateX:'0deg',
                    duration:150
                }, 
                function(){
                    $(this).removeAttr('style')
                }
            );
        }
    );
    
    
}