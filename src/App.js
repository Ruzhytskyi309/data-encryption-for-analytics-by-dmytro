import logo from './logo.svg';
import './App.css';

function App() {
    const crypto = require('crypto');

    function encrypt(data, encryptionKey) {
        if (!data || !encryptionKey) {
            throw new Error('Data and encryption key are required');
        }

        const iv = crypto.randomBytes(16); // Initialization Vector

        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
        let encryptedData = cipher.update(JSON.stringify(data), 'utf-8', 'hex');
        encryptedData += cipher.final('hex');

        return {
            iv: iv.toString('hex'),
            encryptedData,
        };
    }

    function decrypt(encryptedData, encryptionKey, iv) {
        if (!encryptedData || !encryptionKey || !iv) {
            throw new Error('Encrypted data, encryption key, and IV are required');
        }

        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), Buffer.from(iv, 'hex'));
        let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
        decryptedData += decipher.final('utf-8');

        return JSON.parse(decryptedData);
    }

    module.exports = {
        encrypt,
        decrypt,
    };


    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
