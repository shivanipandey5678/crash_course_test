let main_container=document.getElementById("container");
let select_category=document.getElementById('select_category');
let price=document.getElementById("sort_price");
let input_box=document.getElementById('input_box');
let search_btn=document.getElementById("search_btn");
let data=[];

// catching every elements
// fetching all products
async function product(URL){
    // dynamic url
    let response= await fetch(URL);
    let res=await response.json();
    return res;

}
async function getdata(){
     let URL="https://fakestoreapi.com/products";
    let products=await product(URL);
    products.forEach(function(e){
       data.push(e);
    //    saving data in global variable so that i can use it in other functionality
    });
    display_product(products);
}
getdata()
function display_product(arr){
    main_container.innerHTML="";
  arr.forEach(function(e){
    // data.push(e);
    // creating elements and div with the help of js
    let seprate_box=document.createElement("div");
    seprate_box.id="seprate_box";

    let img=document.createElement("img");
    img.src=e.image;

    let title=document.createElement("h3");
    title.innerText=e.title;

    let price=document.createElement("p");
    price.innerText=`Price : ${e.price}`;

    seprate_box.append(img,title,price);
    main_container.append(seprate_box);
//   appending
  })
}
// thsi is a sort by categor functionality
function Sort_by_price(){
    let category=[];
   let select_category_value=select_category.value;
   category.innerHTML=null;
   for(let i=0;i<data.length;i++){
    if((data[i].category)==select_category_value){
        category.push(data[i])
    }else{
        continue
    }
   }
//   calling the display data so that they can display data according to slected element
   display_product(category);
  
   
}
// sort in ascending and des order
function price_function(){
    let price_method=price.value;
    console.log(price_method)
    if(price_method=="A"){
        let sort_A=data.sort(function(a,b){
            return a.price-b.price;
         })
         display_product(sort_A)
    }
    else if(price_method=="D"){
        let sort_D=data.sort(function(a,b){
            return b.price-a.price;
         })
         display_product(sort_D)
    }

}
// searching functionality
function searching(){
    let searched=[];
    let input_box_value=input_box.value;
    searched=[]
    for(let i=0;i<data.length;i++){
        if((data[i].title)==input_box_value){
            searched.push(data[i]);
        }
    }
    display_product(searched)
}




// adding addEventListener  
select_category.addEventListener("change",Sort_by_price);
price.addEventListener("change",price_function);
search_btn.addEventListener("click",searching);