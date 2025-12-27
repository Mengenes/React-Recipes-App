import styled from "styled-components"
import {motion} from "framer-motion"
import {Link,useParams} from "react-router-dom"
import { useEffect, useState } from "react"
export type Cuisine = {
  name: string;
  id: number;
  image:string;
  title:string;
};

function Cuisine() {
  const [cuisine,setCuisine]=useState<Cuisine[]>([]);

  const { type } = useParams<{ type: string }>();


const getCuisine=async (name:string)=>{
    const key = `cuisine_${name.toLowerCase()}`;
  const cached = localStorage.getItem(key);

      if(cached){
        setCuisine(JSON.parse(cached))
      }else{
try {
  const data=await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_SPOON_KEY}&cuisine=${name}`)
  const recipes=await data.json()
    localStorage.setItem(key, JSON.stringify(recipes.results));

setCuisine(recipes.results)
} catch (error) {
  console.log(error)
}

}
}
 useEffect(()=>{
if(!type) return
getCuisine(type)
console.log(type)
},[type]) 
  return (
    <Grid animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
    >
{cuisine.map((item)=>{
  return(
    <Card key={item.id}>
      <Link to={"/recipe/"+item.id}>
<img src={item.image} alt={item.title}/>
<h4>{item.title}</h4>
</Link>
    </Card>
  )
})}

    </Grid>
  )
}
const Grid=styled(motion.main)`
display:Grid;
grid-template-columns:repeat(auto-fit,minmax(20rem,1fr));
grid-gap:3rem;

`
const Card=styled(motion.section)`
img{width:100%;
border-radius:2rem}
a{text-decoration:none;}
h4{text-align:center;
padding:1rem;
}
`
export default Cuisine