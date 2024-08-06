import longevityData from './data/longevity.csv';
export const dataHandling = () => {
  console.log(longevityData)
    //get clean array without unnecessary props
let cleaned_data = longevityData.reduce((res, el)=>{
if(el[2019]){
    let obj={}
    obj.year = el[2019]
    obj.country = el['Country Name']
    res.push(obj)
}
return res
},[])

//console.log(cleaned_data)

//sort array
cleaned_data.sort((a,b)=> b.year - a.year)

//get the top values
const cutoff = cleaned_data.slice(0,10)

cutoff.forEach(d => {
   if(d.country == 'Korea, Rep.') {
       d.country = 'South Korea'
   } else {
//cut off part of the string
    d.country = d.country.split(' SAR')[0]
   }
})
//\b(?: SAR|,)\b
//return cleaned_data  
return cutoff
}