const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const oddStripes = document.querySelectorAll(".stripe:nth-of-type(odd)");
const stripes = document.querySelectorAll(".stripe");

let tl = gsap.timeline();

tl.paused(true);
tl.to(oddStripes, { top: "50%", duration: 0.1 });
tl.to(stripes, { rotate: "45deg", duration: 0.2 });
tl.to(oddStripes, { rotate: "135deg", duration: 0.2 }, "-=0.1");
tl.to(".menu",{ clipPath: "circle(100%)", ease: "power1.in", duration: 0.4 },"-=.6");
tl.to(".item",{ opacity: 1, y: "-30px", stagger: 0.1, ease: "back.out(2)", duration: 0.6 },"-=.7");

clickOpen();
function clickOpen() {
  burger.addEventListener("click", menuShow);
}
function menuShow() {
  tl.play();
  burger.removeEventListener("click", menuShow);
  burger.addEventListener("click", menuHide);
}
function menuHide() {
  tl.reverse(0.7);
  burger.removeEventListener("click", menuHide);
  clickOpen();
}

window.addEventListener('load', setup);
function setup(){
  getProducts()
}

// let slide = gsap.timeline();

// slide.paused(false);
// slide.to(descr.childNodes,{opacity: 0,})

const endpoint = "http://meekee.me/public.html/SuperGood/wp-json/wp/v2/"

function getProducts(){
  fetch(endpoint+"product?_embed&_fields=title,short_description,tastes_like,long_description,nutritional_label,ingredients,background_color,_links,_embedded")
  .then(res=>res.json())
  // .then(out => console.log(out))
  .then(createProducts)
  .then(setHrefs)
}

function setHrefs(){
  buttonLinks = document.querySelectorAll(".wrapper button");
  console.log(buttonLinks)
  for(let i=0; i<buttonLinks.length; i++){
    console.log(i)
    buttonLinks[i].addEventListener("click", () => {
      console.log("clicked")
      window.location.replace(`http://meekee.me/public.html/SuperGood-website/prod_page.html?id=num${i}`)
      
    })
  }
}

function createProducts(allProducts){
  const parent = document.querySelector(".prod_present");
  const slider = document.querySelector(".productSlider").content;
  
  allProducts.forEach(product => {
    const copy = slider.cloneNode(true);
    
    copy.querySelector(".BGcolor").style.backgroundColor = product.background_color;
    copy.querySelector(".descr h2").textContent = product.title.rendered;
    copy.querySelector(".descr p").textContent = product.short_description;
    copy.querySelector(".prod_holder").style.backgroundImage = `url(${product._embedded['wp:featuredmedia'][0].source_url})`
    
    product.ingredients.forEach(ingre => {
      const whatsInParent = copy.querySelector(".whats_in");
      const whatsIn = copy.getElementById("whatsIn").content;
      const ingred = whatsIn.cloneNode(true);

      ingred.querySelector("p").textContent = ingre.name;
      whatsInParent.appendChild(ingred);
    })
    parent.appendChild(copy);
  })

  const lineUpPar = document.querySelector(".line_up"); //parent
  const lineUp = document.getElementById("line_up").content;

  allProducts.forEach(product => {
    const title = lineUp.cloneNode(true)

    title.querySelector(".prod_title").textContent = product.title.rendered;
    lineUpPar.appendChild(title);
  })
  
  const titles = document.querySelectorAll(".prod_title")
  const array = Array.from(titles);

  const layers =document.querySelectorAll(".wrapper");
  const layersArr = Array.from(layers);
  
  let initSel = () => {
    layersArr[0].dataset.sel = "true";
    marker.style.left = array[0].offsetLeft+"px";
    marker.style.width = array[0].offsetWidth+"px";
    swapClasses();
  }
  initSel();
  
  titles.forEach(title => {
    title.addEventListener("click", (e) =>{
    let findPrevSel = layersArr.find(layer => layer.dataset.sel == "true");
    let prevSelectedIndex = layersArr.indexOf(findPrevSel);
      
    const titleIndex = array.indexOf(e.target);
    indicator(e.target);
    
    if(titleIndex !== prevSelectedIndex){
      findPrevSel.dataset.sel="false";
      layersArr[titleIndex].dataset.sel="true";
    }

    let findSelected = layersArr.find(layer => layer.dataset.sel == "true");
    let selectedIndex = layersArr.indexOf(findSelected);
    console.log(array.indexOf(e.target))
    swapClasses();
    console.log(findSelected)
  }) 
})
const arrows = document.querySelectorAll(".wrapper .arrow")


arrows.forEach(arrow => {
  arrow.addEventListener("click", (e) =>{
  let findSelected = layersArr.find(layer => layer.dataset.sel == "true");
  let selectedIndex = layersArr.indexOf(findSelected);
  //  let next = prevSelectedIndex ++;
  //  let prev = prevSelectedIndex --
  if(e.target.classList.contains("right")){
    if(selectedIndex==layersArr.length-1){
      findSelected.dataset.sel="false";
      layersArr[0].dataset.sel="true";
      indicator(array[0]);
    }else{
      findSelected.dataset.sel="false"
      layersArr[selectedIndex+1].dataset.sel="true"
      indicator(array[selectedIndex+1])
    }
  }else{
    if(selectedIndex === 0){
      findSelected.dataset.sel="false";
      layersArr[layersArr.length-1].dataset.sel="true";
      indicator(array[layersArr.length-1]);
    }else{
      findSelected.dataset.sel="false"
      layersArr[selectedIndex-1].dataset.sel="true"
      indicator(array[selectedIndex-1])
    }
  }
  swapClasses();
})
})

function swapClasses(){
  let findSelected = layersArr.find(layer => layer.dataset.sel == "true");
  layersArr.forEach(layer => {
    if(layer.dataset.sel == "true"){
      layer.classList.add("selected");
      marker.style.backgroundColor = findSelected.querySelector(".BGcolor").style.backgroundColor;
    }else{
      layer.classList.remove("selected");
    }
  })
}
}
const marker = document.querySelector(".marker");
function indicator(e){
  marker.style.left = e.offsetLeft+"px";
  marker.style.width = e.offsetWidth+"px";
}


