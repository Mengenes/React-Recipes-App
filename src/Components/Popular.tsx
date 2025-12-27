import { useEffect,useState } from "react"
import styled from "styled-components"
import {Splide,SplideSlide} from "@splidejs/react-splide"
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";
export interface RecipeType{
title:string,
id:string,
image:string,

}


function Popular() {
const [popular,setPopular]=useState([]);

  useEffect(()=>{

  getPopular();
},[])


  const getPopular=async()=>{
    const check=localStorage.getItem("popular");
    if(check){
      setPopular(JSON.parse(check))
    }else{

   
try {
  const api=await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_SPOON_KEY}&number=9`)
 const data=await  api.json()
 
 localStorage.setItem("popular",JSON.stringify(data.recipes))
 setPopular(data.recipes)
console.log(data)

} catch (error) {
  console.log(error)
}
 }

 }
  return (



    <div>
<Wrapper>
  <h3>Popular Picks</h3>
  <Splide options={{

    perPage:4,
    arrows:false,
    pagination:false,
    drag:"free",
    gap:"3rem",
  }}>   
{popular.map((recipe:RecipeType
)=>{
return(
<SplideSlide key={recipe.id}>
     <Card>
      <Link to={"/recipe/"+recipe.id}>
    <p>{recipe.title}</p>

    <img src={recipe.image} alt={recipe.title}/>
    <Gradient/>
    </Link>
    </Card>
 </SplideSlide>
)

})}
</Splide>  
   </Wrapper>
      
    </div>
  )
}
const Wrapper=styled.main`
margin:4rem 0rem;


`;
const Card=styled.section`
min-height:20rem;
border-radius:2rem;
overflow:hidden;
position:relative;
img{
border-radius:2rem;
position:absolute;
left:0;
width:100%;
height:100%;
object-fit:cover;
}
p{
position:absolute;
z-index:10;
left:50%;
bottom:10%;
transform:translate(-50%,0%);
color:white;
width:100%;
text-align:center;
font-weight:600;
font-size:0.8rem;
height:%40;
display:flex;
justify-content:center;
align-item:center;
}
`;
const Gradient=styled.div`
z-index:3;
position:absolute;
width:100%;
height:100%;
background:linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))

`
export default Popular