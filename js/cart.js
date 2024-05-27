let label = document.getElementById("label");
 let shoppingCart = document.getElementById("shopping-cart");

 let basket=JSON.parse(localStorage.getItem("data")) || []; 

//  console.log(basket);

let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
  // console.log(cartIcon);
  //  console.log(basket.map((x)=> x.item).reduce((x,y) => x+y , 0));
  //  console.log(basket);
  cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y) => x+y , 0);
}

 calculation(); 
   let createCartItems = () =>{
    if(basket.length !== 0){
        return(shoppingCart.innerHTML = basket.map((x) =>{
          //  console.log(x);
            let {id, item} = x;
            let search = shopItemsData.find((y)=> y.id === id) || [];
            // console.log(search);
             let {img,productName,price} = search;
             return`
            <tr>
               <td><img src=${img}></td>
              <td>${productName}</td>
                <td class="buttons">
               <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
               <div id=${id} class="quantity">${item}</div>
               <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                </td>
               <td>&#x20B9;${price}</td>
              <td>&#x20B9;${item*search.price}</td>
              <td class="buttons">
              <i onclick="deleteItem(${id})" class="fa-solid fa-trash-can"></i>
            </td>
              </div>
             </tr> 
             `
         }).join(""));
     }else{
       shoppingCart.innerHTML = ``
      label.innerHTML = `
       <h2>Cart is Empty</h2>      
       <a href="shopnow.html">
       <button class="HomeBtn">Back to Shop</button>
       </a>
       `
   }
  }
  createCartItems();

  let increment =(id) =>{
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined){
      basket.push({
        id:selectedItem.id,
        item:1,
      })
    }else{
      search.item +=1;
    }
    createCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
  };

  let decrement = (id)=>{
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined)return;
    else if(search.item === 0)return;
    else{
      search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    createCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  
  let update = (id) =>{
    let search = basket.find((x) => x.id === id);
  console.log(search.item); 
  document.getElementById(id).innerHTML = search.item;
  calculation(); 
 TotalCartAmount();
  };

  let deleteItem = (id)=>{
    let selectedItem = id;
    console.log(selectedItem.id);
    basket = basket.filter((x)=> x.id !== selectedItem.id);
    console.log(basket);
    createCartItems();
    calculation();
    TotalCartAmount();
    localStorage.setItem("data", JSON.stringify(basket)); 
  }

 let clearCart=() =>{
  basket = []
  createCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket)); 
 }

  let TotalCartAmount = () =>{
   if(basket.length !== 0){
      let amount = basket.map((x)=>{
       let {item,id} = x;
       let search = shopItemsData.find((y)=> y.id === id) || [];
          return item*search.price; 
       }).reduce((x,y) => x+y,0);
     label.innerHTML = `
    <div class="order_summary">
    <h4>order summary</h4>
    <h2>Total Bill : &#x20B9 ${amount}</h2> 
   <div class="col-2">
    <a href="checkoutform.html">
    <button class="continue_shipping">Proceed to Checkout</button>
    </a>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    </div>
    </div>
    `;
  }else return
};
TotalCartAmount();
