// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import '../../bootstrap.css'
import './Dashboard.css'
import money from '../../img/money.png'
import items from '../../img/items.png'
import outofstock from '../../img/outofstock.png'
function Dashboard() {
  
  const [data,Setdata] = useState([]);
   useEffect(()=>{
      fetch('http://localhost:8000/products/get',{
        method: 'GET'
      })
      .then((res)=>res.json())
      .then((products)=>{
        Setdata(products);
      });
  
  
   
   },);

   const totalCost= data.reduce((acc,i)=>{

    const productcost=i.price*i.amount;
     return acc+productcost },0
   )
   const totalamount=data.reduce((acc,i)=>{
    const amounts=i.amount*1
        return acc+amounts;
   },0)
   const outOfStock=data.reduce((acc,i)=>{
    if (i.amount<40){
      const amt=i.amount -(i.amount-1)
      return acc+amt;
    }
    else{
      const amt=0;
      return acc+amt;
    }
   },0)


  
  return (
    <div className='whole-dash-wrapper'>
      <div>     
 <div className='dash-card row'>
 <div className='items  cards card col-9 col-md-7 col-lg-3' >
 <div className='dash-info'>
 <div>
  <h1>{totalamount}</h1>
  <p className='card-amt'>items in stock</p>
  </div>
<div>
<img className='icons' src={items} alt="" />
</div>
 </div>
 {/* <p className='beta'>total amount</p> */}
</div>

<div className='items  cards card col-9 col-md-7 col-lg-4'>
  <div className='dash-info'>
<div>
  <h1>  {totalCost}<p className='card-amt'> Birr</p></h1>
    <p className='card-amt'>total cost</p>
</div>
<div>
<img className='icons' src={money} alt="" />

</div>
  </div>
  {/* <p className='beta'>total cost</p> */}

</div>

<div className='items  cards card col-9 col-md-7 col-lg-3'>
  <div className='dash-info'>
    <div>
    <h1>{outOfStock}<p className='card-amt'> item</p></h1>
  <p className='card-amt'>out of stock</p>
    </div>
    <div>
    <img className='icons' src={outofstock} alt="" />
    </div>
  </div>
  

</div>
 </div>
<hr />
<div className='table-wrapper'>
  <h1>New products</h1>
<table className='summary-table items item-table custom-sm1 custom-md1'>
        <thead className='table-head'>
          <th>Product Name</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Status</th>
          </thead>
         { data.slice().reverse().map((i,index)=>{
          const cardstatus =i.amount>40?' sufficient':'insufficient';
         return(
          <tbody key={index}>
            <tr className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <td>{i.name}</td>
            <td>{i.category}</td>
            <td>{i.amount}</td>
            <td>{i.price}</td>
            <td><p className={`${cardstatus}`}>{cardstatus}</p></td>
            </tr>
          </tbody>
         )})
          }      
        </table>
</div>



       
      
      </div>

    </div>
  );
}

export default Dashboard;