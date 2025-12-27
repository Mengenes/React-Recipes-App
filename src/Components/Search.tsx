import styled from "styled-components"
import {useState} from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
function Search() {
    const navigate=useNavigate();
    const [input,setInput]=useState<string>("")
const submitHandler=(event:React.FormEvent<HTMLFormElement>)=>{
    console.log("hey")
    event.preventDefault();
    navigate("/searched/"+input)
};
    
  return (
    <FormStyle onSubmit={submitHandler}>
        <div>
            <FaSearch/>
<input  onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setInput(event.target.value)}   type="text" value={input}/>
   
</div>
    </FormStyle>
  )
}
const FormStyle=styled.form`
margin:0rem 20rem;
position:relative;
div{width:100%;
position:relative;
}
input{border:none;
background:linear-gradient(35deg,#494949,#313131);
color:white;
padding:1rem 3rem;
border:none;
border-radius:1rem;
outline:none;
width:100%;
}
svg{
position:absolute;
top:50%;
left:0%;
transform:translate(100%,-50%);
color:white;
}
}
`
export default Search