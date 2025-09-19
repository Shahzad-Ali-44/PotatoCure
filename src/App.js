import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setError(null);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please upload an image first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPrediction(response.data);
        } catch (err) {
            setError('An error occurred while uploading the image.');
            setPrediction(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <div className="app">
           
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <img src="/favicon.ico" alt="PotatoCure Logo" className="logo-icon" />
                        <span className="logo-text">PotatoCure</span>
                    </div>
                    
                  
                    <button 
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>

                
                    <nav className="nav desktop-nav">
                        <a href="#home" className="nav-link">Home</a>
                        <a href="#upload" className="nav-link">Upload</a>
                    </nav>
                </div>

              
                <nav className={`nav mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-nav-content">
                        <a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
                        <a href="#upload" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Upload</a>
                    </div>
                </nav>
            </header>
          
            <section id="home" className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Smart Potato Disease Detection
                        </h1>
                        <p className="hero-subtitle">
                            Upload a photo of your potato leaves and get instant AI-powered diagnosis, 
                            symptoms, and treatment recommendations.
                        </p>
                        <div className="hero-stats">
                            <div className="stat">
                                <div className="stat-number">95%</div>
                                <div className="stat-label">Accuracy</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number">2s</div>
                                <div className="stat-label">Analysis Time</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number">10+</div>
                                <div className="stat-label">Diseases Detected</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

         
            <section id="upload" className="upload-section">
                <div className="container">
                    <div className="upload-container">
                        <h2 className="section-title">Upload Potato Leaf Image</h2>
                        <p className="section-subtitle">Drag & drop or click to select an image</p>

                        <div 
                            className={`upload-area ${dragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <div className="upload-content">
                                {selectedFile ? (
                                    <div className="file-preview">
                                        <div className="file-icon">📄</div>
                                        <div className="file-name">{selectedFile.name}</div>
                                        <div className="file-size">
                                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                        </div>
                                    </div>
                                ) : (
                                    <div className="upload-placeholder">
                                        <div className="upload-icon">📸</div>
                                        <div className="upload-text">Click or drag image here</div>
                                        <div className="upload-hint">Supports JPG, PNG, GIF formats</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleUpload}
                            className="analyze-btn"
                            disabled={loading || !selectedFile}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner"></div>
                                    Analyzing...
                                </>
                            ) : (
                                'Analyze Image'
                            )}
                        </button>

                        {prediction && (
                            <div className="result-container">
                                <h3 className="result-title">Analysis Result</h3>
                                <div className="result-grid">
                                    <div className="result-item">
                                        <div className="result-label">Disease</div>
                                        <div className="result-value disease">{prediction.class}</div>
                                    </div>
                                    <div className="result-item">
                                        <div className="result-label">Confidence</div>
                                        <div className="result-value confidence">
                                            {(prediction.confidence * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                    <div className="result-item full-width">
                                        <div className="result-label">Symptoms</div>
                                        <div className="result-value">{prediction.symptoms}</div>
                                    </div>
                                    <div className="result-item full-width">
                                        <div className="result-label">Treatment</div>
                                        <div className="result-value">{prediction.treatment}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="error-container">
                                <div className="error-icon">⚠️</div>
                                <div className="error-text">{error}</div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

          
            <footer className="footer">
                <div className="container">
                    <div className="footer-main">
                        <div className="footer-section">
                            <div className="footer-logo">
                                <img src="/favicon.ico" alt="PotatoCure Logo" className="footer-logo-icon" />
                                <span className="footer-logo-text">PotatoCure</span>
                            </div>
                            <p className="footer-description">
                                AI-powered potato disease detection for farmers. 
                                Get instant diagnosis, symptoms, and treatment recommendations 
                                for healthier crops and better yields.
                            </p>
                        </div>

                        <div className="footer-section">
                            <h4 className="footer-title">Navigation</h4>
                            <ul className="footer-links">
                                <li><a href="#home" className="footer-link">Home</a></li>
                                <li><a href="#upload" className="footer-link">Upload Image</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <div className="footer-copyright">
                            © {new Date().getFullYear()} PotatoCure. All rights reserved.
                        </div>
                        <div className="footer-developer">
                            Developed by <a href="https://shahzadali.vercel.app/" target="_blank" rel="noopener noreferrer">Shahzad Ali</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;