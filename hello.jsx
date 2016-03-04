import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';
import _ from 'underscore';

let app = {};

app.UserBase = Backbone.Collection.extend({
    url: 'https://api.twitter.com/1.1/users/search.json?Twitter%20API'
})

let userList = new app.UserBase()

class Hello extends React.Component {
  render() {
    return <h1>Hello</h1>
  }
}

ReactDOM.render(<Hello/>, document.getElementById('hello'));
