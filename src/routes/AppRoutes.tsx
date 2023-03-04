import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cadastro from '../pages/Cadastro/Cadastro';
import Error from '../pages/Error/Error';
import Home from '../pages/Home/Home';
import NovoRecado from '../pages/NovoRecado/NovoRecado';
import Recados from '../pages/Recados/Recados';

export const AppRoutes = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/recados" element={<Recados />} />
                <Route path="/recados/:id" element={<Recados />} />
                <Route path="/recados/novorecado" element={<NovoRecado />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )  
}