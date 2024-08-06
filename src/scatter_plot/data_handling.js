import longevityData from './Life_expectancy - Sheet1.csv';
export const DataHandling = () =>{
    //console.log(longevityData)
    const removeComma = (str)=>{
    return typeof(str) === 'string'? +str.replace(',', '') : str
    }
    const y_survivors_f = 'Number of survivors out of 100,000, females'
    const y_survivors_m = 'Number of survivors out of 100,000, males'
    const y_life_exp_f = 'Life expectancy, females'
    const y_life_exp_m = 'Life expectancy, males'
    const y_death_prob_f = 'Death probability, females'
    const y_death_prob_m = 'Death probability, males'
    let cleaned_data = longevityData.reduce((res, el)=>{
    let obj={}
    obj.age = el['Exact age']
    obj.survivors = {
        females:removeComma(el[y_survivors_f]),
        males: removeComma(el[y_survivors_m])}
    obj.life_expectancy = {
      females: el[y_life_exp_f],
      males: el[y_life_exp_m]
    }
    obj.death_probability = {
        females: el[y_death_prob_f],
        males: el[y_death_prob_m]
    }
    res.push(obj)  
    return res
},[])
    return cleaned_data
}
