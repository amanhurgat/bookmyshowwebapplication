import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;




function Navbar(){
    const onNavClick=function(e){
      if(e.key=="home"){
        window.location.href="/"
      }
    }
    const navItems = [
        {
            key:"home",
            label: 'Home'
        },
        {
            label:'Aman'
        }]
    return (
        <Layout className='d-flex'>
          <Header className='d-flex' style={{position: 'sticky', top: 0, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3>Book My Show</h3>
            <Menu
              onClick={onNavClick}
              theme="dark"
              mode="horizontal"
              items={navItems}
              className='d-flex'
            />
          </Header>
        </Layout>
      );
}

export default Navbar;