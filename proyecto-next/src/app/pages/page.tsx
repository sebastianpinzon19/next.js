'use client'
import React from "react"
import type { AppProps } from "next/app"
import ProveedorLista from "./proveedores/lista/ListaProveedores";
import styled from "../page.module.css";


export default function HomePage()  {
    return (
        <div className={styled.page}>

            {/*Aqui colocamos el navbar para que aparezca en la pagina de Home*/}


            <main className={styled.main}>
                <h1>bienvenido a mi pagina de inicio</h1>
                {/*agrega el contenido de tu pagina aqui */}
            </main>

            <footer className={styled.footer}>
                <p>2024 &copy; Todos los derechos reservados</p>
            </footer>

            <ProveedorLista />
        </div>
    );
}
