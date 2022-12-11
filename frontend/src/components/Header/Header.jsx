import React, { useRef,useState } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import "../../styles/header.css";
import { RiShutDownLine } from "react-icons/ri";
import logo1 from "../../assets/all-images/logo1.svg";


const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },

  {
    path: "/contact",
    display: "Contact",
  },
];


const Header = ({isLogin, setLogin}) => {
  const [isAdmin, setAdmin] = useState(isLogin);

  const currentPath = useLocation();

  const navigate = useNavigate();

  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const handleSignOut = () => { setLogin(false) ; navigate("/admin/sign-in")}

  if(currentPath.pathname === "/admin/sign-in"){
    return (
      <header className="header">
      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i className="ri-car-line"></i>
                    <span>
                      Smart Power Auto <br />Automotive
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>
            <Col lg="3" md="3" sm="4"> </Col>
            <Col lg="3" md="3" sm="4"> </Col>
            <Col lg="2" md="3" sm="0"> </Col>
          </Row>
        </Container>
      </div>
    </header>
    )
  }
  else if(isAdmin){
    return (
      <header className="header">
        {/* ============ header top ============ */}
        <div className="header__top">
          <Container></Container>
        </div>
  
        {/* =============== header middle =========== */}
        <div className="header__middle">
          <Container style={{height:'100%'}}>
            <Row >
              <Col lg="4" md="3" sm="4">
                <div className="logo" style={{height:'50px', marginTop:'-20px'}}>
                  <h1>
                    <Link to="/home" className=" d-flex align-items-center gap-2">
                      {/* <i className="ri-car-line"></i>
                      <span>
                        Smart Power Auto <br />
                        Automotive : Admin
                      </span> */}
                       <img src={logo1} alt="" />
                    </Link>
                  </h1>
                </div>
              </Col>
  
              <Col lg="3" md="3" sm="4"></Col>
  
              <Col lg="3" md="3" sm="4"></Col>
  
              <Col lg="2" md="3" sm="0" >
              <button className="btnSignout rounded-3" type="button" style={{height:'50px', marginTop:'-20px', float:'right'}} onClick={handleSignOut}>
            <RiShutDownLine />
              {' '}Sign Out 
            </button>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
    );
  }
    else{
      return (
        <header className="header">
        {/* ============ header top ============ */}
        <div className="header__top">
          <Container>
            {/* <Row>
              <Col lg="6" md="6" sm="6">
                <div className="header__top__left">
                  <span>Need Help?</span>
                  <span className="header__top__help">
                    <i className="ri-phone-fill"></i> +1-202-555-0149
                  </span>
                </div>
              </Col>
  
              <Col lg="6" md="6" sm="6">
                <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                  <Link to="#" className=" d-flex align-items-center gap-1">
                    <i className="ri-login-circle-line"></i> Login
                  </Link>
  
                  <Link to="#" className=" d-flex align-items-center gap-1">
                    <i className="ri-user-line"></i> Register
                  </Link>
                </div>
              </Col>s
            </Row> */}
          </Container>
        </div>
  
        {/* =============== header middle =========== */}
        <div className="header__middle">
          <Container>
            <Row>
              <Col lg="4" md="3" sm="4">
                <div className="logo">
                  <h1>
                    <Link to="/home" className=" d-flex align-items-center gap-2">
                      <i className="ri-car-line"></i>
                      <span>
                        Smart Power Auto <br />Automotive
                      </span>
                    </Link>
                  </h1>
                </div>
              </Col>
  
              <Col lg="3" md="3" sm="4">
                {/* <div className="header__location d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-earth-line"></i>
                  </span>
                  <div className="header__location-content">
                    <h4></h4>
                    <h6>Sylhet City, Bangladesh</h6>
                  </div>
                </div> */}
              </Col>
  
              <Col lg="3" md="3" sm="4">
                {/* <div className="header__location d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-time-line"></i>
                  </span>
                  <div className="header__location-content">
                    <h4>Sunday to Friday</h4>
                    <h6>10am - 7pm</h6>
                  </div>
                </div> */}
              </Col>
  
              <Col lg="2" md="3" sm="0" className=" d-flex align-items-center justify-content-end " >
                <button className="header__btn btn ">
                  <Link to="/contact">
                    <i className="ri-phone-line"></i> Request a call
                  </Link>
                </button>
              </Col>
            </Row>
          </Container>
        </div>
  
        {/* ========== main navigation =========== */}
  
        <div className="main__navbar">
          <Container>
            <div className="navigation__wrapper d-flex align-items-center justify-content-between">
              <span className="mobile__menu">
                <i className="ri-menu-line" onClick={toggleMenu}></i>
              </span>
  
              <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                <div className="menu">
                  {navLinks.map((item, index) => (
                    <NavLink to={item.path} className={(navClass) => navClass.isActive ? "nav__active nav__item" : "nav__item" } key={index} >
                      {item.display}
                    </NavLink>
                  ))}
                </div>
              </div>
  
              {/* <div className="nav__right">
                <div className="search__box">
                  <input type="text" placeholder="Search" />
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>
              </div> */}
            </div>
          </Container>
        </div>
      </header>
      )
    }
};

export default Header;
