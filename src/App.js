import React from 'react';
import './App.scss';
import logo from './images/logo.svg';
import Working from'./images/illustration-working.svg';
import br from "./images/icon-brand-recognition.svg";
import dr from "./images/icon-detailed-records.svg";
import fc from "./images/icon-fully-customizable.svg";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      menu:false,
      placeholder:"Shorten a link here...",
      input:"",
      url:"",
      urlList:[]
    }
    this.handleMenu = this.handleMenu.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }
  componentDidMount(){
    document.addEventListener("keypress", this.handleEnter);
  }
  componentDidUpdate(prevProps, prevStates){
    if(prevStates.url != this.state.url){
      fetch(`https://api.shrtco.de/v2/shorten?url=${this.state.url}`).then(response => response.json()).then(data => {
        if(data.ok){
          this.setState({
            urlList: [...this.state.urlList, <ShortLink originalLink = {this.state.url} shortLink = {data.result.short_link} handleClick = {this.handleCopy}/>]
            })
        }
        else{
          document.getElementById("inputBox").style.border ="1px solid red";
          document.documentElement.style.setProperty("--pHcolor", "#ff000080");
          document.getElementById("error").style.opacity = 1;
        }
      })
    }
  }
  componentWillUnmount(){
    document.removeEventListener("keypress", this.handleEnter);
  }
  handleMenu(){
    this.setState({
      menu:!this.state.menu
    })
  }

  handleInput(e){
    document.getElementById("inputBox").style.border ="1px solid transparent";
    document.documentElement.style.setProperty("--pHcolor", "#999999");
    document.getElementById("error").style.opacity = 0;
    this.setState({
      input: e.target.value
    })
  }
  handleEnter(e){
    if(e.keyCode === 13){
      this.setState({
        url:this.state.input,
        input:""
      })
    }
  }
  handleBtnClick(){
    if(this.state.input.length ===0){
      document.getElementById("inputBox").style.border ="1px solid red";
      document.documentElement.style.setProperty("--pHcolor", "#ff000080");
      document.getElementById("error").style.opacity = 1;
    }
    else{
      this.setState({
        input:"",
        url:this.state.input
      })
    }
  }
  handleCopy(e){
    let link = e.target.getAttribute("shortLink");
    let btn = document.getElementById(link);
    btn.style.backgroundColor ="#3b3054";
    btn.innerHTML = "Copied!"
    navigator.clipboard.writeText(link);
  }
  invalidInput(e){
    e.target.style.border ="1px solid red";
    document.documentElement.style.setProperty("--pHcolor", "#ff000080");
    document.getElementById("error").style.opacity = 1;
  }

  render(){
    return (
      <div>
        {window.innerWidth>=543?
        <nav className ="navBar">
          <div className = "navLeft">
            <img src = {logo} alt="Logo"/>
            <a href ="#" target="_blank">Features</a>
            <a href ="#" target="_blank">Pricing</a>
            <a href ="#" target="_blank">Resources</a>
          </div>
          <div className = "navRight">
            <a href ="#" target="_blank">Login</a>
            <a className = "signup" href ="#" target="_blank">Sign Up</a>
          </div>
        </nav>:
        <nav className ="navMobile">
          <img src = {logo} alt="Logo"/>
          {this.state.menu? <i class="fa-solid fa-x" onClick ={this.handleMenu}></i>
          :<i class="fa-solid fa-bars" onClick ={this.handleMenu}></i>}
          {this.state.menu? 
            <div className ="mobileMenu">
              <div className = "navTop">
              <a href ="#" target="_blank">Features</a>
              <a href ="#" target="_blank">Pricing</a>
              <a href ="#" target="_blank">Resources</a>
              </div>
              <div className = "navBottom">
              <a href ="#" target="_blank">Login</a>
            <a className = "signup" href ="#" target="_blank">Sign Up</a>
              </div>
            </div>:""}
        </nav>}

        <div className = "headerBox">
          <div className="headerText">
            <h1>More than just shorter links</h1>
            <p>Build your brand’s recognition and get detailed insights 
            on how your links are performing.</p>
            <a href="#">Get Started</a>
          </div>
          <div className ="imgBox">
            <img src ={Working} alt ="working" />
          </div>
          
        </div>

        <div className ="contentContainer">
          <div className="formBox">
            <input id ="inputBox" className="inputBox" type="text" placeholder ={this.state.placeholder} onChange = {this.handleInput} value ={this.state.input} required/>
            <p id ="error">please add a link</p>
            <button onClick = {this.handleBtnClick}>Shorten It!</button>
          </div>
          {this.state.urlList}
          <div className ="tagLine">
            <h1>Advanced Statistics</h1>
            <p>Track how your links are performing across the web with our 
            advanced statistics dashboard.</p>
          </div>
          <div className = "infoBoxes">
            <div className = "infoContainer">
              <div className="eachinfo">
                <div className = "imgBox">
                  <img src ={br} alt ="brand recodnition"/>
                </div>
                <h2>Brand Recognition</h2>
                <p>Boost your brand recognition with each click. Generic links don’t 
                mean a thing. Branded links help instil confidence in your content. </p>
              </div>
            </div>

            <div className = "infoContainer">
              <div className="eachinfo">
                <div className = "imgBox">
                  <img src ={dr} alt ="detailed records"/>
                </div>
                <h2>Detailed Records</h2>
                <p>Gain insights into who is clicking your links. Knowing when and where 
                  people engage with your content helps inform better decisions.</p>
              </div>
            </div>

            <div className = "infoContainer">
              <div className="eachinfo">
                <div className = "imgBox">
                  <img src ={fc} alt ="fully customizable"/>
                </div>
                <h2>Fully Customizable</h2>
                <p>Improve brand awareness and content discoverability through customizable 
                links, supercharging audience engagement.</p>
              </div>
            </div>

            <div className ="decobar"></div>
          </div>
        </div>

        <div className = "getStartedContainer">
          <h1>Boost your links today</h1>
          <a href="">Get Started</a>
        </div>

        <div className ="footerBox">
          <img src = {logo} alt="Logo"/>
          <div className ="linkContainer">
            <div className="linkbox">
              <p>Features</p>
              <a href="https://github.com/arthurlee945" target="_blank">Link Shortening</a>
              <a href="https://github.com/arthurlee945" target="_blank">Branded Links</a>
              <a href="https://github.com/arthurlee945" target="_blank">Analytics</a>
            </div>
            <div className="linkbox">
              <p>Reasources</p>
              <a href="https://github.com/arthurlee945" target="_blank">Blog</a>
              <a href="https://github.com/arthurlee945" target="_blank">Developers</a>
              <a href="https://github.com/arthurlee945" target="_blank">Support</a>
            </div>
            <div className="linkbox">
              <p>Company</p>
              <a href="https://github.com/arthurlee945" target="_blank">About</a>
              <a href="https://github.com/arthurlee945" target="_blank">Our Team</a>
              <a href="https://github.com/arthurlee945" target="_blank">Careers</a>
              <a href="https://github.com/arthurlee945" target="_blank">Contact</a>
            </div>
            <div className="socialbox">
              <i className="fa-brands fa-facebook-square"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-pinterest"></i>
              <i className="fa-brands fa-instagram"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ShortLink = (props) =>{
  return(
    <div className = "shortLinkBox">
      <h2>{props.originalLink}</h2>
      <div className ="rightSide">
        <h2>{props.shortLink}</h2>
        <button id={props.shortLink} onClick ={props.handleClick} shortLink = {props.shortLink}>Copy</button>
      </div>
    </div>
  )
}


export default App;
