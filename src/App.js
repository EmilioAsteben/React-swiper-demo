import logo from './logo.svg';
import './App.css';
import {useRef, useEffect, useState} from 'react';





function App() {



    let firstClientX, clientX; //Coordinates. Prevent vertical scroll

    const preventTouch = e => {
    const minValue = 5; // Threshold. Prevent vertical scroll
    
  
    clientX = e.touches[0].clientX - firstClientX;
  
    // Vertical scrolling does not work when you start swiping horizontally.
    if (Math.abs(clientX) > minValue) {
      
      e.preventDefault();
      
  
      return false;
    }
  };
  
  const touchStart = e => {
    firstClientX = e.touches[0].clientX;
  };


  let startSlide = 3;
  let offset = 0;
  let centeredSlides = false;
  let threshHold = 80;
  let spaceBetween = '50px'
  let numberOfSlides;
  let swiperRef = useRef(null);
  let containerRef = useRef(null);
  let [currentSlide, setCurrentSlide] = useState(startSlide);
  let [initialTranslate, setinitialTranslate] = useState(0);
  let [startPos, setStartPos] = useState();
  let [transition, setTransition] = useState('');
  let [transitionEnded, setTransitionEnded] = useState(true); 
  let [translate, setTranslate] = useState(offset);
  let [moveListener, setmoveListener] = useState('');
  let [windowSize, setWindowSize] = useState(window.innerWidth);
  let [minimalTranslate, setMinimalTranslate] = useState(offset);

  useEffect(() => {
    
      containerRef.current.addEventListener("touchstart", touchStart);
      containerRef.current.addEventListener("touchmove", preventTouch, {
        passive: false
        
      });
    
      console.log('hook called')
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("touchstart", touchStart);
        containerRef.current.removeEventListener("touchmove", preventTouch, {
          passive: false
        });
        console.log('hook removed')
      }
    };
  },[initialTranslate]);


  

  


  useEffect(()=>{
    
    let swiperItems = swiperRef.current.childNodes;
    

    function debounce(fn, ms) {
      let timer
      return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
          timer = null
          fn.apply(this, arguments)
        }, ms)
      }}

    
      
 

    let debouncedHandleResize = debounce(   function handleResize(){
      setTransition('300ms');
    
      centeredSlides ?
      setTranslate((swiperRef.current.offsetWidth / 2) - swiperItems[currentSlide].offsetLeft - (swiperItems[currentSlide].offsetWidth / 2 ))
      
       
      //  console.log('centeredslides hook') 
      :
      setTranslate(-swiperRef.current.childNodes[currentSlide].offsetLeft - offset);
      // console.log('not centered slides hook');
       
    
       
      console.log('new hook works')
      
    }, 100)
    window.addEventListener('resize', debouncedHandleResize);

    return () => window.removeEventListener('resize', debouncedHandleResize)
  }
  
  ,[ currentSlide, transition])



  



useEffect(() => {
  //  document.addEventListener('pointerup', logListenerEvent)
  // window.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
  
  let swiperWidth = swiperRef.current.offsetWidth;
  let swiperItems = swiperRef.current.childNodes;
  let centeredPosition = (swiperWidth / 2) - swiperItems[currentSlide].offsetLeft - (swiperItems[currentSlide].offsetWidth / 2 ) ;
  
  if(currentSlide != 0 && !centeredSlides) {
  
    setTranslate(  swiperItems[0].offsetLeft - swiperItems[currentSlide].offsetLeft - offset  ) 
    setMinimalTranslate(-offset)
    
    

  } else if(centeredSlides){

    setTranslate(centeredPosition - offset);
    setMinimalTranslate( swiperWidth / 2 - swiperItems[0].offsetLeft - swiperItems[0].offsetWidth /2 - offset)
    

  }
  
  
  console.log('useeffect')
  console.log(startSlide)
    //  window.addEventListener('resize', handleResize);

  // console.log ('swiper width 1/2', swiperWidth / 2)
  // console.log ('item offset', swiperItems[0].offsetLeft)
  // console.log ('item width'swiperItems[0].offsetWidth)

  
  
    
  // for (let key in swiperItems){
    

  //   if (swiperItems.hasOwnProperty(key)) {
  //     swiperItems[key].style.marginRight = spaceBetween;
  // }
  // }

 
 
}, []);




function logListenerEvent(){
  console.log('LISTENER LOG',translate, initialTranslate, moveListener,currentSlide)
}

  

function handleStart(e){
  // !e.isPrimary ? handleEnd() : 
  e.preventDefault();
  let container = containerRef.current.getBoundingClientRect();
  let wrapper = swiperRef.current.getBoundingClientRect();
  setTransition('0ms');
  setmoveListener(true);
  setinitialTranslate(translate);
 
   setStartPos(e.clientX - wrapper.x + container.x)
   console.log('handlestart translate', translate)
   console.log('handlestart initial translate', initialTranslate)
   console.log('handleStart')
  
}



function transitionStart(){
  setTransitionEnded(false);
  
}

function handleEnd(e){
  e.preventDefault();
  setmoveListener(false);
  let swipeItem = swiperRef.current.childNodes;
  let maxTranslate = swipeItem[swipeItem.length - 1].offsetLeft - swipeItem[0].offsetLeft - minimalTranslate; 
  let nextSlideDiff = 0;
  let prevSlideDiff = 0;

  if(centeredSlides){
    nextSlideDiff =  currentSlide != swipeItem.length - 1  ?  (swipeItem[currentSlide].nextSibling.offsetWidth -swipeItem[currentSlide].offsetWidth) / 2  : maxTranslate = translate;
    prevSlideDiff = currentSlide != 0  ? (swipeItem[currentSlide].offsetWidth - swipeItem[currentSlide].previousSibling.offsetWidth) / 2 : '';
    console.log(minimalTranslate)
  }


  


  
  let xDiff = initialTranslate - translate;
  
  let swipeLeft = currentSlide != swipeItem.length - 1  ? swipeItem[currentSlide].offsetLeft - swipeItem[currentSlide].nextSibling.offsetLeft - nextSlideDiff : ''
  let swipeRight =  currentSlide != 0  ? swipeItem[currentSlide].offsetLeft - swipeItem[currentSlide].previousSibling.offsetLeft  + prevSlideDiff: ''  ;

  
  let swipeAccess = Math.sign(xDiff) == Math.sign(initialTranslate);
  
  
  

  // left: xDiff > 0   right: xDiff < 0 

  let swipeDirection
  //  = xDiff < 0 ? 
  
  //  110 :
  
  // -110 ;

  if(xDiff < 0 && currentSlide > 0 && Math.abs(xDiff) > threshHold){
    
    swipeDirection = swipeRight;
    setCurrentSlide(currentSlide - 1)
    console.log('set current slide and swipe direction: right')
  } else if(xDiff>0 && currentSlide != swipeItem.length - 1  && Math.abs(xDiff) > threshHold)  {

    swipeDirection = swipeLeft;
    setCurrentSlide(currentSlide + 1)
    console.log('set current slide and swipe direction:left')
    console.log(swipeDirection)
    
  } else  {
    swipeDirection = null;


  }

 
 
 
  if(Math.abs(xDiff) < threshHold  ||
  
  initialTranslate <= -maxTranslate && !swipeAccess ||
  initialTranslate == minimalTranslate && Math.sign(xDiff) < 0 
  
  ) {
  
   setTransition('300ms'); setTranslate(initialTranslate)
   console.log('stay initial')
  }
  else{
    setTransition('300ms'); setTranslate(initialTranslate + swipeDirection)
    console.log('next position')
    console.log('swipedirection', swipeDirection);
  }
  
 console.log('minimal translate', minimalTranslate);
 console.log('max translate',maxTranslate);
 console.log('initial translate', initialTranslate);
 console.log('translate', translate);
  
}








function handleMove(e){
  


  
setTranslate(e.clientX - startPos  )


}


  return (
    <div
    
    onPointerMove ={moveListener ? (e) => {handleMove(e)} : undefined} 
    onPointerUp= {moveListener? (e) => {handleEnd(e)} : undefined}
    onPointerLeave = {moveListener? (e) => {handleEnd(e)} : undefined}
    className="App">
      
      <div
      
      onPointerDown ={(e) => {handleStart(e);}} 
      ref={containerRef}
      className="swiper_container">
        
        <div
        
        ref={swiperRef}

        style ={{
         
          transform: `translate3d(${translate +'px'}, 0px, 0px)`,
          transitionProperty: 'transform',
          transitionDuration: transition,
          

          
        }}
        // onPointerUp= {moveListener? () => handleEnd() : undefined}
        
        // onPointerMove ={moveListener ? (e) => {handleMove(e)} : undefined} 
        
        // onPointerDown ={(e) => {handleStart(e);}} 
        
        
        
        
        
       
        
        className="swiper_wrapper">

          

          <div  className="item_one"></div>
          <div className="item_two"></div>
          <div className="item_three"></div>
          <div className="item_four"></div>

        </div>
      </div>
      <div>{currentSlide}</div>
    </div>
  );
}

export default App;
