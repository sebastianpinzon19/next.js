'use client';
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import Link from "next/link";

// Estilos personalizados para los elementos del sidebar
const SidebarContainer = styled(Box)({
  width: '250px',
  minWidth: '250px',
  background: 'linear-gradient(135deg, #641c8b 0%, #2576fc 100%)',
  height: '100%',
  padding: '20px',
  transition: 'all 0.3s ease-in-out',
});

const SidebarItem = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '10px',
  color: '#fff', // Cambiado a blanco para mejor contraste
});

const SidebarList = styled(List)({
  padding: '15px 10px',
  '& .MuiListItem-root': {
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(3px)',
    },
  },
});

const SidebarDivider = styled(Divider)({
  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Divisor semi-transparente
  margin: '10px 0',
});

const NavbarContainer = styled(AppBar)({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '64px',
  background: 'linear-gradient(135deg, #641c8b 0%, #2576fc 100%)',
  boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)',
  padding: '0',
  zIndex: 1200,
});

const NavItem = styled(ListItem)({
  color: '#fff',
  padding: '12px 24px',
  fontSize: '1rem',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(5px)',
  },
});

const NavText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#fff',
  },
});

// Ajusta el contenido principal
const MainContent = styled('main')({
  marginLeft: '64px', // mismo valor que el ancho del navbar
  width: 'calc(100% - 64px)',
  minHeight: '100vh',
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const sidebarContent = (
    <SidebarContainer role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <SidebarDivider variant="fullWidth" sx={{ width: "100%" }} />
      <List>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem component="button">
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href="/proveedores" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem component="button">
            <ListItemText primary="Proveedores" />
          </ListItem>
        </Link>
        <Link href="/clientes" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem component="button">
            <ListItemText primary="Clientes" />
          </ListItem>
        </Link>
        <Link href="/productos" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem component="button">
            <ListItemText primary="Productos" />
          </ListItem>
        </Link>
      </List>
      <SidebarDivider />
      <Typography variant="caption" sx={{ textAlign: "center", display: "block", margin: "1rem", opacity: 0.7 }}>
        © reservados A 2024
      </Typography>
    </SidebarContainer>
  );

  return (
    <NavbarContainer>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        {sidebarContent}
      </Drawer>
    </NavbarContainer>
  );
};

export default Navbar;
