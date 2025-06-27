import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please upload an image first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        setLoading(true);
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL,formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPrediction(response.data);
            setError(null);
        } catch (err) {
            setError('An error occurred while uploading the image.');
            setPrediction(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">🥔 PotatoCure</div>
                    <ul className="navbar-links">
                        <li><a href="/">Smart Potato Disease Detection</a></li>
                    </ul>
                </div>
            </nav>


            <main className="main-content">
                <h2>Upload Potato Leaf Image</h2>
                <p className="subtitle">Instant Potato Leaf Health Check</p>


                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                /><br/>
                <button
                    onClick={handleUpload}
                    className="upload-button"
                    disabled={loading}
                >
                    {loading ? 'Analyzing...' : 'Upload and Analyze'}
                </button>

                {prediction && (
                    <div className="result-card">
                        <h3>Prediction Result</h3>
                        <p><strong>Disease:</strong> {prediction.class}</p>
                        <p><strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%</p>
                        <p><strong>Symptoms:</strong> {prediction.symptoms}</p>
                        <p><strong>Treatment:</strong> {prediction.treatment}</p>
                    </div>
                )}

                {error && (
                    <div className="error-message">{error}</div>
                )}
            </main>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} PotatoCure. All rights reserved. |  Developed by <a className="underline" target="_blank" rel="noopener noreferrer" href="https://shahzadali.vercel.app/">Shahzad Ali</a></p>
            </footer>
        </div>
    );
}

export default App;