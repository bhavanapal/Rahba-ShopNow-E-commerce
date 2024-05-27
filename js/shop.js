let shop = document.getElementById("shops");

//  selected item store the basket and get the item from the local storage.
let basket= JSON.parse(localStorage.getItem("data")) || [];

let createShop = () => {
    return (shop.innerHTML = shopItemsData.map((x)=>{
     let { id, productName, price, desc, img } = x;
     let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${id} class="products">
        <img src=${img} alt="img">
        <div class="product-content">
            <h2 class="p-name">${productName}</h2>
            <p>${desc}</p>
            <div class="price-quantity">
            <h4 class="p-price">&#x20B9;${price}</h4>
            <div class="buttons">
            <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
            <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
            </div>
            <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
            </div>
            </div>
            <button class="p-button"><i onclick="additem(${id})"class="fa-solifa-cart-shopping">Add to Cart</i></button>
        </div>
      </div>`;
    }).join(""));
  };
  createShop(); 


  let increment = (id) =>{
     let selectedItem = id;
    //  console.log(selectedItem.id);

     let search = basket.find((x)=> x.id === selectedItem.id );

     if(search === undefined){
       basket.push({
        id:selectedItem.id,
        item:1,
       })
     }else{
      search.item += 1;
     }
    //  console.log(basket);
    //  console.log(search);
    update(selectedItem.id);
        //  set the data in local storage
        localStorage.setItem("data",JSON.stringify(basket));
  };

  let decrement = (id) =>{
       let selectedItem = id;
       let search = basket.find((x) => x.id === selectedItem.id);

       if(search === undefined) return;
       else if(search.item === 0) return;
       else{
        search.item -= 1;
       }
       update(selectedItem.id);
       basket = basket.filter((x) => x.item !== 0);
      //  console.log(basket);
            //  set the data in local storage
    localStorage.setItem("data",JSON.stringify(basket));
  };
  
  let update = (id) =>{
  let search = basket.find((x) => x.id === id);
  // console.log(search);
  // console.log(search.item);
      document.getElementById(id).innerHTML = search.item;
      calculation();
  };

  let additem = (id)=>{
    let selectedItem = id;
    // console.log(selectedItem.id);
     let search = basket.find((x) => x.id === selectedItem.id);
    // console.log(search);
     
     if(search === undefined){
      basket.push({
      id:selectedItem.id,
       item:1,
      })
   }
     else{
     search.item += 1;
   }
 
   update(selectedItem.id);
   // set the data in local storage
   localStorage.setItem("data",JSON.stringify(basket));
     calculation(); 
  };

   let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
    // console.log(basket.map((x)=> x.item).reduce((x,y) => x+y , 0));
    // console.log(basket);
   cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y) => x+y , 0);
    }
   calculation(); 