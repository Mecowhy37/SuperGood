const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const oddStripes = document.querySelectorAll(".stripe:nth-of-type(odd)");
const stripes = document.querySelectorAll(".stripe");

let tl = gsap.timeline();

tl.paused(true);
tl.to(oddStripes, { top: "50%", duration: 0.1 });
tl.to(stripes, { rotate: "45deg", duration: 0.2 });
tl.to(oddStripes, { rotate: "135deg", duration: 0.2 }, "-=0.1");
tl.to(
  ".menu",
  { clipPath: "circle(100%)", ease: "power1.in", duration: 0.4 },
  "-=.6"
);
tl.to(
  ".item",
  { opacity: 1, y: "-30px", stagger: 0.1, ease: "back.out(2)", duration: 0.6 },
  "-=.7"
);

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

const endpoint = "http://meekee.me/public.html/SuperGood/wp-json/wp/v2/"
getProducts();

function getProducts(){
  fetch(endpoint+"product?_embed&_fields=title,short_description,tastes_like,long_description,nutritional_label,ingredients,_links,_embedded")
  .then(res=>res.json())
  // .then(out => console.log(out))
  .then(createProducts)
}

function createProducts(allProducts){
  console.log(allProducts)
  const template = document.querySelector(".prod_section").content;
  const ingredient = document.querySelector("#ingredients").content;
  const parentElement = document.querySelector("body");
  allProducts.forEach(product =>{
    const copy = template.cloneNode(true);

    copy.querySelector(".intro h1").textContent=product.title.rendered;
    copy.querySelector(".intro p").textContent=product.short_description;
    copy.querySelector(".intro h2").textContent=product.tastes_like;
    copy.querySelector(".showcase div").style.backgroundImage=`url(${product._embedded['wp:featuredmedia'][0].source_url})`;

    
    product.ingredients.forEach(ingre =>{
      const ingrParent = copy.querySelector(".ingredients");
      const whats_in = ingredient.cloneNode(true);
      whats_in.querySelector(".ingre h2").textContent=ingre.name;
      whats_in.querySelector(".ingre_png").style.backgroundImage=`url(${ingre.icon.guid})`;
      ingrParent.appendChild(whats_in);
    })

    parentElement.appendChild(copy);
  })
  setAttr();
}

function setAttr(){
    let products = document.querySelectorAll(".product");
    products[0].setAttribute("id", 'one');
    products[1].setAttribute("id", 'two');
    products[2].setAttribute("id", 'three');
    products[3].setAttribute("id", 'four');
}

