import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import styled from "styled-components";

// import TopbarItem from "./TopbarItem";

export default function Navigation() {
  const navs =[
    {name: "홈으로", path: "/"},
    {name: "목표관리", path: "/goals"},
    {name: "노트", path: "/note"},
    {name: "편집", path: "/note/edit"},
    {name: "삭제", path: "/note/delete"},
  ]

  // get path value of URL
  const pathName = useLocation().pathname;

  // const handleNavbutton = navs.map((nav, index) => {
  //   return pathName === "/" ? 
  //   <div><p>{nav = "목표 관리"}</p></div> :
  //   pathName === "/goals" ?
  //   <div><p>{nav = "홈으로"}</p></div> :
  //   pathName === "/note" ?
  //   <div><p>{nav = "편집"}</p></div> :
  //   <div><p>{nav = "삭제"}</p></div> 
  // }) 

  return (
    <Container>
      <ul>
        <li> 
          메뉴 1 
        </li>  
      </ul>
    </Container>
  )
}

const Container = styled.nav`
  ul {
    display: flex;
    list-style: none;

    li + li {
      margin-left: 30px;
    }
  }
`