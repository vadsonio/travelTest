export function filterLeads(filters, fullArray){
 let filteredList = fullArray;

 if(filters.country.length>0 && filters.country!=''){
   let filteredByCountry = filteredList.filter(listItem=>{
     return listItem.country === filters.country;
   });
   filteredList = filteredByCountry;
 };

 if(filters.type.length>0 && filters.type!=''){
    let filteredByType = filteredList.filter(listItem=>{
      return listItem.type === filters.type;
    });
   filteredList = filteredByType;
 }

 if(filters.rate.length>0){
   let filteredByRate = [];

   filters.rate.forEach(rateItem=>{
     let newArr = filteredList.filter(listItem=>{
       return listItem.stars === rateItem;
     });
     filteredByRate.push(...newArr);
   });

   filteredList = filteredByRate;
 }

 if(filters.reviews.length > 0){
   let filterdByReviews = filteredList.filter(listItem=>{
     return listItem.reviews_amount > filters.reviews;
   });
   filteredList = filterdByReviews;
 }

  if(Number(filters.price) > 0){
    let filterdByPrice = filteredList.filter(listItem=>{
      return listItem.min_price < filters.price;
    });
    filteredList = filterdByPrice;
  }


 return filteredList;
}