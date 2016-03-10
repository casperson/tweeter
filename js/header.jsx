import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
    render() {
        return  <div className="header-main">
                    <h1 className="text-center">Tweeter</h1>
                    <p className="text-center">So you can, you know, tweet.</p>
                </div>
    }
}

ReactDOM.render(<Header />, document.getElementById('header'));
