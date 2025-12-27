import styled from 'styled-components'
import { BrowserRouter as Router,Link } from 'react-router-dom'

import "./index.css"
import Categories from './Components/Categories'
import Search from './Components/Search'
import { GiKnifeFork } from 'react-icons/gi'
import Pages from './Pages/Pages'

function App() {
 

  return (
    
    <Router>
      <Nav>
        <GiKnifeFork/>
      <Logo to={"/"}>FoodAddict</Logo>
      </Nav>
      <Search/>
      <Categories/> 
      <Pages/>
   
      </Router>


  )
}
const Logo=styled(Link)`
text-decoration:none;
font-size:1.5rem;
font-weight:400;
font-family:"Lobster Two", cursive;
`
const Nav=styled.nav`
padding:4rem 0rem;
display:flex;
justify-content:flex-start;
align-items:center;
svg{font-size:2rem;}
`
export default App
