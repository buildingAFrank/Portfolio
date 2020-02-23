hoverState={
    "accueil":false,
    "apercu":false,
    "design":false,
    "audioV":false,
    "jeux":false,
    "prototype":false,
    "contact":false
}

$().ready(function(){
    //menu hover

$('.menuOverlay').hover(
    function(event){
        hoverState[($(event.currentTarget).siblings().attr('id'))]=true;
        stateCheck(event);
    },
    function(event){
        hoverState[($(event.currentTarget).siblings().attr('id'))]=false;
        stateCheck(event);}
    )

$(".flipperContainer").hover(flipStart,flipEnd);

//menu selection



})

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
function stateCheck(navEvent){
    //if menu is not active, make regular hover animation
    $menuState=getState($(navEvent.currentTarget).siblings());
    console.log(navEvent.type)
    console.log('mouse hovering on '+$(navEvent.currentTarget).siblings().attr('id')+" :", hoverState[($(navEvent.currentTarget).siblings().attr('id'))])
    if(navEvent.type=="mouseenter"){
            switch ($menuState) {
                case "INIT":
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
        console.log($menuState)
        if($menuState === 'TOACTIVE') {
            console.log("Hdjsahjkhdajkhdjaks")
            // setState($(navEvent.currentTarget).siblings(), 'ACTIVE')
        }else {
            flipMenuReset(navEvent)
        }
    }
}

function flipMenuStart(itemMenu,cssClass,cssClassBottom){

    const $ref= $(itemMenu.currentTarget);
    const $item = $(itemMenu.currentTarget).siblings();
    const state = getState($item);

    if(state === 'INIT' && hoverState[$item.attr('id')]){ 
        setState($item, "TOACTIVE");
        console.log("Current state of ",$item.attr('id')+" :",getState($item));
        animateToActive($ref, function() {
            console.log("current state in CB of flipMenuStart:",getState($item));
            if(getState($item) ==='ACTIVE'){
                console.log('about to run flipMenuReset');
                flipMenuReset(itemMenu)
            } else {
                console.log('setting state to ACTIVE')
                setState($item,'ACTIVE')
            }
        })
    }
}
const time = 150

function animateToActive(ref, cb) {
    const $item=ref.siblings();
    const $top=$item.find('.tophalf');
    const $topBack=$item.find('.tophalf__back');
    const $bottomBack=$item.find('.bottomhalf__back');
    const cssClass = "hover-menu";
    const cssClassBottom = "hover-menu__bottom"
    
    console.log("running animateToActive");
    // change color of back panel
    $topBack.addClass(cssClass);
    // start animation
    $top.transition(
        {
            perspective:'1000px',
            rotateX:'-90deg',
            duration:time
        }, 
        function(){
            console.log("Done animating top panel")
            $(this).addClass(cssClass);
            // ANIMATE BOTTOM WHEN TOP IS DONE
            $bottomBack.addClass(cssClassBottom).transition(
                {
                    perspective:'1000px',
                    rotateX:'0deg',
                    duration:time
                },
                console.log('done animating bottom'),  
                function(){
                    console.log("Current state after first animation of ",$item.attr('id')+" :",getState($item));

                    if(!hoverState[$item.attr('id')] && getState($item)==="TOACTIVE"){
                        setState($item, 'ACTIVE');
                    }
                    console.log('running cb');
                        cb();
                    
                    
                }
            )
        }
    );        
}

// check if state is ACTIVE
// set style
// active animation


function flipMenuReset(itemMenu,cssClass,cssClassBottom){
    $item=$(itemMenu.currentTarget).siblings();
    console.log('starting menu Reset')

    // const mouseEnterAnimationIsDone = new Promise(function(resolve) {
    //     const timer = setInterval(() => {
    //         if(getState($item) === 'ACTIVE'){
    //             clearInterval(timer);
    //             resolve(getState($item));
    //         }
    //     }, 10);
    // });
      
    // mouseEnterAnimationIsDone.then(function(value) {
        setState($item, 'TOINIT');
        console.log("Current state of ",$item.attr('id')+" :",getState($item));
        animateToInit($item, function(){
            console.log('call back to INIT')
            setState($item, 'INIT');
        })
    // });        
}

function animateToInit(ref, cb) {
    console.log("animating reset");
    const $top=ref.find('.tophalf');
    const $topBack=ref.find('.tophalf__back');
    const $bottomBack=ref.find('.bottomhalf__back');
    const $bottom = ref.find('.bottomhalf');
    const cssClass = "hover-menu";
    const cssClassBottom = "hover-menu__bottom";

    $bottom.addClass(cssClassBottom);
    $topBack.removeClass(cssClass);

    console.log('reset style and animate top');
    $top.removeAttr('style').transition(
        {
            perspective:'1000px',
            rotateX:'-90deg',
            duration:time
        },
        function(){
            console.log(' reset style and animate bottom')
            $(this).removeAttr('style').removeClass(cssClass);
            $bottomBack.removeClass(cssClassBottom).removeAttr('style').transition(
                {
                    perspective:'1000px',
                    rotateX:'0deg',
                    duration:time
                },
                function(){
                    // Reset style
                    $(this).removeAttr('style');
                    $bottom.removeClass(cssClassBottom);

                    //check if hoverState is still false, if it is, goto callback else, jump back to animate toActive

                    //Callback 
                    cb();
                }
            );
        }
    ); 
}

function setState(ref, state) {
    return ref.attr("data-state", state);
}

function getState(ref) {
    return ref.attr('data-state');
}

function flipStart(item){

    var $item=$(item.currentTarget);
    var $top=$item.find('.topCard');
    var $topBack=$item.find('topCard__back');
    var $bottomBack=$item.find('bottomCard__back');
    
console.log($top);

    console.log("section ,",$item);
    $top.transition(
        {
            perspective:'1000px',
            rotateX:'0deg',
            duration:10000
        },
        console.log('anim section'),
        function(){
            $bottomBack.transition(
                {
                    perspective:'1000px',
                    rotateX:'-90deg',
                    duration:100,
                    
                }
            );    
        }
    );
    
}

function flipEnd(itemMenu,cssClass="",cssClassbottom=""){

    var $top=$('.topCard'),
    $topBack=$('.topCard__back'),
    $bottom=$('.bottomCard'),
    $bottomBack=$('.bottomCard__back'),
    $item=$(itemMenu.currentTarget);

    $item.find($top).removeAttr('style').transition(
        {
            perspective:'1000px',
            rotateX:'-90deg',
            duration:1000
        }, 
        function(){
            $(this).removeAttr('style')
        }
    );
    $item.find($bottomBack).removeAttr('style').transition(
        {
            perspective:'1000px',
            rotateX:'0deg',
            duration:1000,
            delay:150
        }, 
        function(){
            $(this).removeAttr('style')
        }
    );

}

// on hover make animation without interrupting