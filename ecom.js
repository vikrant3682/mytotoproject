let cartbtn = document.getElementsByClassName('cart');
let product_name = document.getElementsByClassName('name');
let product_price = document.getElementsByClassName('price');
let getdata = document.getElementById('data');
let carttodo = document.getElementById('myorder');
let youremail = prompt('Enter you email id');
let appendcount = 0;
for(let i = 0;i<cartbtn.length;i++){
   cartbtn[i].onclick = ()=>{
      let hr = document.createElement('hr');
     let list = document.createElement('div');
     list.classList.add('li');
     let name = document.createElement('div');
     name.innerText = product_name[i].innerText;
     name.classList.add('cname')
     let price = document.createElement('div');
     price.innerText = product_price[i].innerText;
     price.classList.add('cprice')

     let close = document.createElement('div');
     close.classList.add('close');
     close.innerHTML = '\u00D7'
     list.append(name,price,close);
     carttodo.append(hr,list);
     appendcount++;
     document.getElementById('q').innerHTML = appendcount;
   }

  
   let open = false;
let cd = document.getElementById('cd');
 function displaycart() {
   
      if (open === false) {
         cd.style.width = '600px'
         cd.style.height = '500px';
         let od = document.getElementById('od')
         od.style.display = 'block';
         
         //closelist seciton
      let allclose = document.getElementsByClassName('close');
       for(let c = 0;c<allclose.length;c++){
      allclose[c].onclick = function(){
         this.parentElement.remove();
         appendcount--;
         document.getElementById('q').innerHTML = appendcount;
      }
   }
         
        
         open = true;
      }
      else {
         let od = document.getElementById('od')
         od.style.display = 'none';
         cd.style.width = '0'
         cd.style.height = '0';
         open = false;

      }
   }
  
}




   let od = document.getElementById('od');
   od.onclick = async function(){
       let name = document.getElementsByClassName('cname');
       let price = document.getElementsByClassName('cprice');
      let arr = [];
      for(let d = 0;d<name.length;d++){
         arr[d] = {
             name:name[d].innerText,
             price:price[d].innerText
         }
      }
      getdata.innerText = JSON.stringify(arr);
      let data = getdata.innerText;

      let xhr = new XMLHttpRequest();
      xhr.open('POST','/myOrder?data='+data+'&email='+youremail,true);
      xhr.onload = function(){
         alert(this.responseText)
      }
      xhr.send();
   }






