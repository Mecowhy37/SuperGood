const burger = document.querySelector('.burger')
const menu = document.querySelector('.menu')
const oddStripes = document.querySelectorAll('.stripe:nth-of-type(odd)')
const stripes = document.querySelectorAll('.stripe')

let tl = gsap.timeline()

tl.paused(true);
tl.to(oddStripes, {top: '50%', duration: .1})
tl.to(stripes, {rotate: "45deg", duration: .2})
tl.to(oddStripes, {rotate: "135deg", duration: .2}, "-=0.1")
tl.to(".menu", {clipPath: 'circle(100%)', ease: "power1.in", duration: .4}, "-=.6")
tl.to(".item", {opacity: 1, y: '-30px', stagger: 0.1, ease: "back.out(2)", duration: .6}, "-=.7")

clickOpen();
function clickOpen(){
    burger.addEventListener("click", menuShow);
}
function menuShow(){
    tl.play()
    burger.removeEventListener("click", menuShow)
    burger.addEventListener("click", menuHide)
}
function menuHide(){
    tl.reverse(.7);
    burger.removeEventListener("click", menuHide);
    clickOpen();
}
