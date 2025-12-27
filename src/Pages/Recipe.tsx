import { useEffect,useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import {motion} from "framer-motion"
interface DetailsType{
  title:string;
  image:string;
  id:string;
  summary:string;
  instructions:string;
  extendedIngredients:{
id:string;
aisle:string;
image:string;
consistency:string;
name:string;
original:string;
  }[];
}

function Recipe() {
   const { name } = useParams<{ name: string }>();
   const [details,setDetails]=useState<DetailsType | null>(null);
   const [activeTab,setActiveTab]=useState<String>("instructions")
  const fetchDetails=async()=>{

const data=await fetch(`https://api.spoonacular.com/recipes/${name}/information?apiKey=${import.meta.env.VITE_SPOON_KEY}`)
const detailData=await data.json();
setDetails(detailData)
console.log(detailData)

  }
  useEffect(()=>{
if(!name) return
fetchDetails()
console.log(name)
},[name]) 
  return (
    <DetailWrapper  animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    transition={{duration:0.5}}>
    <div>
      <h2>{details?.title}</h2>
      <img src={details?.image} alt={details?.title}/>
    </div>
    <Info>
      <Button className={activeTab==="instructions"? "active" : ""} onClick={()=>setActiveTab("instructions")}>Instructions</Button>
            <Button className={activeTab==="ingredients"? "active" : ""}     onClick={()=>setActiveTab("ingredients")}>Ingredients</Button>
            {activeTab==="instructions" && (

            <div> 
           <h3 dangerouslySetInnerHTML={{__html:details?.summary || ""}}></h3>
            <h3 dangerouslySetInnerHTML={{__html:details?.instructions || ""}}></h3>
            </div>

            )}
           {activeTab==="ingredients"&& (      <ul>
  {details?.extendedIngredients.map((ingredient) => (
    <li key={ingredient.id}>{ingredient.original}</li>
  ))}
</ul>)}

    </Info>
    </DetailWrapper>
  )
}
const DetailWrapper=styled(motion.div)`
margin-top:10rem;
margin-bottom:5rem;
display:flex;
.active{background:linear-gradient(35deg,#494949,#313131);
color:white;
}
h2{margin-bottom:2rem;}
li{font-size:1.2rem;
line-height:2.5rem;}
ul{margin-top:2rem;}
h3{font-size:1.2rem;

}
`
const Button=styled.button`
padding:1rem 2rem;
color:#313131;
background:white;
border:2px solid black;
margin-right:2rem;
font-weight:600;
`
const Info=styled.div`
margin-left:10rem;


`
export default Recipe