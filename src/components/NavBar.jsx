import React, { useState, useRef, useEffect } from 'react';
import './navBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const serviciosList = [
    'Marketing de experiencias',
    'Chatbots',
    'Desarrollo web',
    'Email marketing',
    'Mensajería masiva',
    'Pauta digital',
    'Redes sociales',
    'Posicionamiento SEO',
    'Cosulta el dominio perfecto para ti',
    'Generar código QR',
];

const NavBar = () => {
    const [openServicios, setOpenServicios] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navbarRef = useRef(null);

    // Cierra el menú si se hace click fuera del navbar
    useEffect(() => {
        if (!menuOpen) return;
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    return (
        <>
            {/* Botón hamburguesa siempre visible */}
            {!menuOpen && (
                <button
                    className="navbar-hamburger"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Abrir menú"
                >
                    <FontAwesomeIcon icon={faBars} size="2x" />
                </button>
            )}

            {/* Navbar lateral */}
            <div ref={navbarRef} className={`navbar${menuOpen ? ' open' : ''}`}>
                {/* Botón X solo visible cuando el menú está abierto */}
                {menuOpen && (
                    <button
                        className="navbar-close"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Cerrar menú"
                    >
                        <FontAwesomeIcon icon={faTimes} size="2x" />
                    </button>
                )}

                <div className='navbar-logo'>
                    <img src="https://iglumarketingdigital.com/wp-content/uploads/2025/04/Logo-Iglu-Menu-Lateral.png" alt="" />
                </div>

                <div className={`navbar-links${menuOpen ? ' show' : ''}`}>
                    <a href="https://iglumarketingdigital.com/" className='navbar-link'>Inicio</a>
                    <a href="" className='navbar-link'>Nosotros</a>
                    <div
                        className={`navbar-link navbar-servicios-toggle${openServicios ? ' open' : ''}`}
                        onClick={() => setOpenServicios(!openServicios)}
                        tabIndex={0}
                        onBlur={() => setOpenServicios(false)}
                    >
                        Servicios
                        <span className={`arrow${openServicios ? ' open' : ''}`}>▲</span>
                    </div>
                    {openServicios && (
                        <div className="navbar-servicios-list">
                            {serviciosList.map((servicio, idx) => (
                                <a href="" className='navbar-link servicio-link' key={idx}>{servicio}</a>
                            ))}
                        </div>
                    )}
                    <a href="" className='navbar-link'>Portafolio</a>
                    <a href="" className='navbar-link'>Blog</a>
                </div>

                <div className={`navbar-social${menuOpen ? ' show' : ''}`}>
                    <div className='navbar-icon'>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                    </div>
                    <div className='navbar-icon'>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                    <div className='navbar-icon'>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                    </div>
                    <div className='navbar-icon'>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTiktok} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;