import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styles from './styles.css';
import apostle from 'apostle.io';

apostle.domainKey = "dd487e5521278b8fd8db25e5e69ec24643280c01";

ReactDOM.render(<App />, document.getElementById('root'));
