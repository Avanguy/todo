import sun from '.././images/icon-sun.svg';
import moon from '.././images/icon-moon.svg';

const Header = ({darkTheme,changeTheme}) => {
  return (
    <div className = "header">
      <h1>T O D O</h1>
      <img src = {darkTheme ? sun:moon} alt = "toggle button" className="toggleMode" onClick ={()=>changeTheme()}/>
    </div>
  )
}

export default Header;