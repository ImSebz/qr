import React, { useRef, useState } from 'react';
import './qrChecker.css';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';

// Necesitas instalar jsPDF para exportar a PDF:
// npm install jspdf
import jsPDF from 'jspdf';

const QrChecker = () => {
    const [qrValue, setQrValue] = useState('');
    const [canvasSize, setCanvasSize] = useState(500);
    const svgRef = useRef(null);
    const canvasRef = useRef(null);

    // Descargar SVG
    const downloadSVG = () => {
        const svg = svgRef.current;
        if (svg) {
            const serializer = new XMLSerializer();
            const source = serializer.serializeToString(svg);
            const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'QR.svg';
            link.click();
            URL.revokeObjectURL(url);
        }
    };

    // Descargar PNG
    const downloadPNG = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = url;
            link.download = 'QR.png';
            link.click();
        }
    };

    // Descargar PDF
    const downloadPDF = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: [canvasSize + 40, canvasSize + 40] // Ajusta el tamaño del PDF al tamaño del QR
            });
            pdf.addImage(imgData, 'PNG', 20, 20, canvasSize, canvasSize);
            pdf.save('QR.pdf');
        }
    };

    return (
        <>
            <div className='checker-container'>
                <div className='main-logo'>
                    <a href="https://iglumarketingdigital.com/">
                        <img src="https://iglumarketingdigital.com/consulta-dominios/assets/iglu-1-B9ghqDFl.png" alt="Iglú Logo" />
                    </a>
                </div>

                <h1 className='checker-title'>Genera tu QR en segundos</h1>
                <p className='checker-description'>
                    Ingresa el enlace o texto que deseas convertir en QR y descárgalo en PDF, PNG o SVG.
                </p>

                <input
                    type="text"
                    className="qr-input"
                    placeholder="Ingresa tu enlace o texto aquí"
                    value={qrValue}
                    maxLength={1000}
                    onChange={e => setQrValue(e.target.value)}
                />

                {qrValue && (
                    <div className="qr-output">
                        {/* Canvas para PNG y PDF */}
                        <div style={{ display: 'none' }}>
                            <QRCodeCanvas
                                value={qrValue}
                                size={canvasSize}
                                includeMargin={true}
                                ref={canvasRef}
                            />
                        </div>
                        {/* SVG para mostrar y descargar */}
                        <div className='qr-container'>
                            <QRCodeSVG
                                value={qrValue}
                                size={350}
                                includeMargin={true}
                                ref={svgRef}
                            />
                        </div>
                        <div className='qr-options-container'>
                            <div className="qr-buttons">
                                <button onClick={downloadPNG}>Descargar PNG</button>
                                <button onClick={downloadSVG}>Descargar SVG</button>
                                <button onClick={downloadPDF}>Descargar PDF</button>
                            </div>
                            <div className='qr-select-slider'>
                                {/* Slider desde 200px que sube de 25 en 25 */}
                                <label htmlFor="canvas-size-slider">
                                    Tamaño PNG/PDF: {canvasSize}px
                                </label>
                                <input
                                    id="canvas-size-slider"
                                    type="range"
                                    min={200}
                                    max={2000}
                                    step={25}
                                    value={canvasSize}
                                    onChange={e => setCanvasSize(Number(e.target.value))}
                                />
                            </div>
                            
                        </div>

                    </div>
                )}
            </div>
        </>
    );
};

export default QrChecker;