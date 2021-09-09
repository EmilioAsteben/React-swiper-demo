import { useState, useRef, useEffect } from "react";

function Swiper(props) {
  let startSlide = 0; // first slide

  let transitionMs =
    props.transitionMs === undefined ? "300ms" : props.transitionMs;

  // wrapper offset
  let offset = props.offset === undefined ? 0 : props.offset;

  // swipestep threshold
  let threshold = props.threshold === undefined ? 80 : props.threshold;

  console.log("offset", offset);
  let centeredSlides = false || props.centeredSlides; // centered slides
  let swiperRef = useRef(null);
  let containerRef = useRef(null);
  let [currentSlide, setCurrentSlide] = useState(startSlide);
  let [initialTranslate, setinitialTranslate] = useState(0); // translate at the first touch
  let [startPos, setStartPos] = useState(); // first touch coordinates
  let [transition, setTransition] = useState("");
  let [translate, setTranslate] = useState(offset); // wrapper current translate
  let [moveListener, setmoveListener] = useState(""); // add/remove moveListener
  let [minimalTranslate, setMinimalTranslate] = useState(offset);
  let [paddingLeft, setPaddingLeft] = useState();
  let firstClientX, clientX; //Coordinates. Prevent vertical scroll

  const touchStart = (e) => {
    firstClientX = e.touches[0].clientX; // Initial touch. Prevent vertical scroll.
  };

  const preventTouch = (e) => {
    const minValue = 4; // Threshold. Prevent vertical scroll

    clientX = e.touches[0].clientX - firstClientX;

    // Vertical scrolling does not work when you start swiping horizontally.
    if (Math.abs(clientX) > minValue) {
      e.preventDefault();

      return false;
    }
  };

  // Prevent vertical scroll.
  useEffect(() => {
    containerRef.current.addEventListener("touchstart", touchStart);
    containerRef.current.addEventListener("touchmove", preventTouch, {
      passive: false,
    });

    console.log("hook called");
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("touchstart", touchStart);
        containerRef.current.removeEventListener("touchmove", preventTouch, {
          passive: false,
        });
        console.log("hook removed");
      }
    };
  }, [initialTranslate]);

  // Resize event

  useEffect(() => {
    let swiperItems = swiperRef.current.childNodes;
    console.log('SWIPER REF', swiperRef.current);

    function debounce(fn, ms) {
      let timer;
      return (_) => {
        clearTimeout(timer);
        timer = setTimeout((_) => {
          timer = null;
          fn.apply(this, arguments);
        }, ms);
      };
    }

    let debouncedHandleResize = debounce(function handleResize() {
      setTransition(transitionMs);

      centeredSlides
        ? setTranslate(
            swiperRef.current.offsetWidth / 2 -
              swiperItems[currentSlide].offsetLeft -
              swiperItems[currentSlide].offsetWidth / 2
          )
        : //  console.log('centeredslides hook')
          setTranslate(
            -swiperRef.current.childNodes[currentSlide].offsetLeft - offset
          );
      // console.log('not centered slides hook');

      console.log("new hook works");
    }, 100);
    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, [currentSlide, transition]);

  // Set first slide

  useEffect(() => {
    

    setPaddingLeft(
      0 || parseInt(window.getComputedStyle(containerRef.current).paddingLeft)
    );
    let swiperWidth = swiperRef.current.offsetWidth;
    let swiperItems = swiperRef.current.childNodes;
    let centeredPosition =
      swiperWidth / 2 -
      swiperItems[currentSlide].offsetLeft -
      swiperItems[currentSlide].offsetWidth / 2;

    if (currentSlide !== 0 && !centeredSlides) {
      setTranslate(
        swiperItems[0].offsetLeft -
          swiperItems[currentSlide].offsetLeft -
          offset
      );
      setMinimalTranslate(-offset);
    } else if (centeredSlides) {
      setTranslate(centeredPosition - offset);
      setMinimalTranslate(
        swiperWidth / 2 -
          swiperItems[0].offsetLeft -
          swiperItems[0].offsetWidth / 2 -
          offset
      );
    }

  }, []);

  

  function addCurrentClass() {
    setTimeout(() => {
      swiperRef.current.childNodes[currentSlide].classList.add(
        "current__slide"
      );
      console.log("CURRENT SLIDE", currentSlide);
    }, 0);
  }

  useEffect(() => {
    addCurrentClass();
  }, [currentSlide]);

  // First touch

  function handleStart(e) {
    function removeCurrentClass() {
      swiperRef.current.childNodes[currentSlide].classList.remove(
        "current__slide"
      );
    }
    !e.isPrimary ? handleEnd() : e.preventDefault();
    let container = containerRef.current.getBoundingClientRect();
    let wrapper = swiperRef.current.getBoundingClientRect();
    setTransition("0ms");
    setmoveListener(true);
    setinitialTranslate(translate);

    setStartPos(e.clientX - wrapper.x + container.x + paddingLeft);
    removeCurrentClass();

  }

  //End Touch

  function handleEnd(e) {
    e.preventDefault();
    setmoveListener(false);
    let swipeItem = swiperRef.current.childNodes;
    let maxTranslate =
      swipeItem[swipeItem.length - 1].offsetLeft -
      swipeItem[0].offsetLeft -
      minimalTranslate;
    let nextSlideDiff = 0;
    let prevSlideDiff = 0;

    if (centeredSlides) {
      nextSlideDiff =
        currentSlide !== swipeItem.length - 1
          ? (swipeItem[currentSlide].nextSibling.offsetWidth -
              swipeItem[currentSlide].offsetWidth) /
            2
          : (maxTranslate = translate);
      prevSlideDiff =
        currentSlide !== 0
          ? (swipeItem[currentSlide].offsetWidth -
              swipeItem[currentSlide].previousSibling.offsetWidth) /
            2
          : "";

    }

    let xDiff = initialTranslate - translate;

    let swipeLeft =
      currentSlide !== swipeItem.length - 1
        ? swipeItem[currentSlide].offsetLeft -
          swipeItem[currentSlide].nextSibling.offsetLeft -
          nextSlideDiff
        : "";
    let swipeRight =
      currentSlide !== 0
        ? swipeItem[currentSlide].offsetLeft -
          swipeItem[currentSlide].previousSibling.offsetLeft +
          prevSlideDiff
        : "";

    let swipeAccess = Math.sign(xDiff) === Math.sign(initialTranslate);

    let swipeDirection;

    // left: xDiff > 0   right: xDiff < 0

    if (xDiff < 0 && currentSlide > 0 && Math.abs(xDiff) > threshold) {
      swipeDirection = swipeRight;
      setCurrentSlide(currentSlide - 1);
      console.log("current slide -1", currentSlide);

   
    } else if (
      xDiff > 0 &&
      currentSlide !== swipeItem.length - 1 &&
      Math.abs(xDiff) > threshold
    ) {
      swipeDirection = swipeLeft;
      setCurrentSlide(currentSlide + 1);
      console.log("current slide +1", currentSlide);

      
    } else {
      swipeDirection = null;
    }

    // Keep initial

    if (
      Math.abs(xDiff) < threshold ||
      (initialTranslate <= -maxTranslate && !swipeAccess) ||
      (initialTranslate === minimalTranslate && Math.sign(xDiff) < 0)
    ) {
      setTransition(transitionMs);
      setTranslate(initialTranslate);
      addCurrentClass();

 
    }

    // Next/Perv slide
    else {
      setTransition(transitionMs);
      setTranslate(initialTranslate + swipeDirection);


    }

    
  }

  function handleMove(e) {
    setTranslate(e.clientX - startPos);
  }

  return (
    <div
      onPointerMove={
        moveListener
          ? (e) => {
              handleMove(e);
            }
          : undefined
      }
      onPointerUp={
        moveListener
          ? (e) => {
              handleEnd(e);
            }
          : undefined
      }
      onPointerLeave={
        moveListener
          ? (e) => {
              handleEnd(e);
            }
          : undefined
      }
      className={
        `Swiper` +
        (props.additionalClassName !== undefined
          ? " " + props.additionalClassName
          : "")
      }
    >
      <div
        onPointerDown={(e) => {
          handleStart(e);
        }}
        ref={containerRef}
        className="swiper_container"
      >
        <div
          ref={swiperRef}
          style={{
            transform: `translate3d(${translate + "px"}, 0px, 0px)`,
            transitionProperty: "transform",
            transitionDuration: transition,
          }}
          className="swiper_wrapper"
        >
          {props.children}
        </div>
      </div>
      {/* <div>{currentSlide}</div> */}
    </div>
  );
}

export default Swiper;
