import {useState,useEffect} from "react"
import type { Cuisine } from "./Cuisine";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import { Link } from "react-router-dom";
function Searched() {
  const [searched,setSearched]=useState<Cuisine[]>([]);

const { search } = useParams<{ search: string }>();



const getSearched=async (name:string)=>{
    const key = `cuisine_${name.toLowerCase()}`;
  const cached = localStorage.getItem(key);

      if(cached){
        setSearched(JSON.parse(cached))
      }else{
try {
  const data=await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_SPOON_KEY}&query=${name}`)
  const recipes=await data.json()
    localStorage.setItem(key, JSON.stringify(recipes.results));

setSearched(recipes.results)
} catch (error) {
  console.log(error)
}
 

      }}
useEffect(()=>{
if(!search) return
getSearched(search)
console.log(search)
},[search]) 
  return (
   <Grid>
{searched.map((item)=>{return(

<Card key={item.id}>
  <Link to={"/recipe/"+item.id}>
<img src={item.image} alt={item.title}/>
<h4>{item.title}</h4>
</Link>
</Card>

)})}

   </Grid>
  )
}
const Grid=styled.div`
display:Grid;
grid-template-columns:repeat(auto-fit,minmax(20rem,1fr));
grid-gap:3rem;

`
const Card=styled.div`
img{width:100%;
border-radius:2rem}
a{text-decoration:none;}
h4{text-align:center;
padding:1rem;
}
`
export default Searched