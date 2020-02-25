/**
*   an array of booleans used to register the mouse enter and mouse leave on each menu items
*/
abNavIsHovering={
    "accueil":false,
    "apercu":false,
    "design":false,
    "audioV":false,
    "jeux":false,
    "prototype":false,
    "contact":false
}

hoverClasses=["hover-menu","hover-menu__bottom"];
selectedClasses=["activeMenu","activeMenu__bottom"];
selectedHoverClasses=["activeMenuHover","activeMenuHover__bottom"]

/**
 * once the page is loaded, start registering events on nav elements
 */
$().ready(function(){
    //menu hover

$('.menuOverlay').hover(stateCheck,stateCheck);

//$(".flipperContainer").hover(flipStart,flipEnd);

//menu selection
$('.menuOverlay').click(stateCheck);

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
    $menuHoverState=getState($(navEvent.currentTarget).siblings());
    $selectedMenu=getActiveState($(navEvent.currentTarget).siblings());
    console.log('selectedMenu :',$selectedMenu);
    //console.log("event type: ",navEvent.type);
    //console.log('Current State: ', $menuState);
    //console.log('mouse hovering on '+$(navEvent.currentTarget).siblings().attr('id')+" :", abNavIsHovering[($(navEvent.currentTarget).siblings().attr('id'))]);
    
    if(navEvent.type=="mouseenter"){
        abNavIsHovering[($(navEvent.currentTarget).siblings().attr('id'))]=true;
        switch ($menuHoverState) {
            case "INIT":
                if($selectedMenu === "FALSE"){
                    flipMenuStart(navEvent,hoverClasses);
                }else{
                    flipMenuStart(navEvent,selectedHoverClasses);
                }
                
                break;
            case "TOINIT":
                if($selectedMenu === "FALSE"){
                    flipMenuStart(navEvent,hoverClasses);
                }else{
                    flipMenuStart(navEvent,selectedHoverClasses);
                }
                break;
            default:
                break;
        }
    }
    if(navEvent.type=="click"){
        console.log('click');
        if($selectedMenu === "FALSE"){
            if($menuHoverState==="TOACTIVE"){
                setState($(navEvent.currentTarget).siblings(),"ACTIVE")
            }
            setActiveState($(navEvent.currentTarget).siblings(),"TRUE");
            selectedMenu(navEvent, function(){
                flipMenuReset(navEvent,selectedClasses)});
        }
    }
    if(navEvent.type=="mouseleave"){
        abNavIsHovering[($(navEvent.currentTarget).siblings().attr('id'))]=false;
        //console.log($menuState)
        if($menuHoverState === 'TOACTIVE') {
            console.log("Hdjsahjkhdajkhdjaks")
            // setState($(navEvent.currentTarget).siblings(), 'ACTIVE')
        }else {
            if($selectedMenu === "FALSE"){
                flipMenuReset(navEvent,hoverClasses);
            }else{
                flipMenuReset(navEvent,selectedHoverClasses);
            }
            
        }
    }
}

function selectedMenu(ref,cb){
    const $ref = $(ref.currentTarget);
    const $item=$ref.siblings();
    const $top=$item.find('.tophalf');
    const $topBack=$item.find('.tophalf__back');
    const $bottom=$item.find('.bottomhalf');
    const $bottomBack=$item.find('.bottomhalf__back');

    $top.removeAttr('style').addClass('tophalf--selected');
    // $topBack.addClass('tophalf__back--selected');
    // $bottom.addClass('bottomhalf--selected');
    $bottomBack.removeAttr('style').addClass('bottomhalf__back--selected');

    cb();
}

function flipMenuStart(itemMenu,classes){

    const $item = $(itemMenu.currentTarget).siblings();
    const state = getState($item);
    const activatedState= getActiveState($item);

    if((state === 'INIT' || state === 'TOINIT' )&& abNavIsHovering[$item.attr('id')]){ 
        setState($item, "TOACTIVE");
        //console.log("Current state of ",$item.attr('id')+" :",getState($item));
        animateToActive(itemMenu,classes, function() {
            //console.log("current state in CB of flipMenuStart:",getState($item));
            if(getState($item) ==='ACTIVE' && !abNavIsHovering[$item.attr('id')]){
                //console.log('mouse is not hovering element, about to run flipMenuReset');
                flipMenuReset(itemMenu,classes)
            }
             else {
                //console.log('setting state to ACTIVE')
                setState($item,'ACTIVE')
            }
        })
    }
}
const time = 150;

function animateToActive(ref,classes, cb) {
    const $ref = $(ref.currentTarget);
    const $item=$ref.siblings();
    const $top=$item.find('.tophalf');
    const $topBack=$item.find('.tophalf__back');
    const $bottomBack=$item.find('.bottomhalf__back');
    const cssClass = classes[0];
    const cssClassBottom = classes[1];
    
   // console.log("running animateToActive");
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
           // console.log("Done animating top panel")
            $(this).addClass(cssClass);
            // ANIMATE BOTTOM WHEN TOP IS DONE
            $bottomBack.addClass(cssClassBottom).transition(
                {
                    perspective:'1000px',
                    rotateX:'0deg',
                    duration:time
                },
               // console.log('done animating bottom'),  
                function(){
                  //  console.log("Current state after first animation of ",$item.attr('id')+" :",getState($item));
                    setState($item, 'ACTIVE');
                  //  console.log('running cb');
                        cb();
                }
            )
        }
    );        
}

function flipMenuReset(itemMenu,classes){
    $item=$(itemMenu.currentTarget).siblings();
    if(getState($item) === 'ACTIVE' && !abNavIsHovering[$item.attr('id')]){
        //console.log('starting menu Reset')

        setState($item, 'TOINIT');
       // console.log("Current state of ",$item.attr('id')+" :",getState($item));
       if(getActiveState($item)==="TRUE"){
        $item.find(".tophalf__back").removeClass("hover-menu").addClass('tophalf__back--selected');
        $item.find(".tophalf").removeClass("hover-menu").addClass('tophalf--selected');
        $item.find(".bottomhalf").removeClass("hover-menu__bottom").addClass('bottomhalf--selected');
        $item.find(".bottomhalf__back").removeClass("hover-menu__bottom");
    }
        animateToInit($item, classes, function(){
            //console.log('call back to INIT')
            setState($item, 'INIT');
        })
    }
    if(getState($item) === 'ACTIVE' && abNavIsHovering[$item.attr('id')]){
        setState($item, 'TOACTIVE');
        animateToActive(itemMenu,classes,function() {
            //console.log("current state in CB of flipMenuStart:",getState($item));
            if(getState($item) ==='ACTIVE' && !abNavIsHovering[$item.attr('id')]){
                //console.log('about to run flipMenuReset');
                if(getActiveState($item)==="TRUE"){
                    $item.find(".tophalf__back").removeClass("hover-menu").addClass('tophalf__back--selected');
                    $item.find(".tophalf").removeClass("hover-menu").addClass('tophalf--selected');
                    $item.find(".bottomhalf").removeClass("hover-menu__bottom").addClass('bottomhalf--selected');
                    $item.find(".bottomhalf__back").removeClass("hover-menu__bottom");
                }
                flipMenuReset(itemMenu,classes)
            } else {
               // console.log('setting state to ACTIVE')
                setState($item,'ACTIVE')
            }
        })
    }
    if(getState($item) === 'TOACTIVE' && getActiveState($item) === "TRUE"){
        
        flipMenuReset(itemMenu,classes)
    }
           
}

function animateToInit(ref,classes, cb) {
    //console.log("animating reset");
    const $top=ref.find('.tophalf');
    const $topBack=ref.find('.tophalf__back');
    const $bottomBack=ref.find('.bottomhalf__back');
    const $bottom = ref.find('.bottomhalf');
    const cssClass = classes[0];
    const cssClassBottom = classes[1];

    $bottom.addClass(cssClassBottom);
    $topBack.removeClass(cssClass);

    //console.log('reset style and animate top');
    $top.removeAttr('style').transition(
        {
            perspective:'1000px',
            rotateX:'-90deg',
            duration:time
        },
        function(){
            //console.log(' reset style and animate bottom')
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

function setActiveState(ref,state){
    return ref.attr("data-selected",state);
}

function getActiveState(ref){
    return ref.attr("data-selected");
}