import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';
import _ from 'underscore';
import Codebird from "codebird";
import twitter from 'twitter-text';
import UserResults from './userResults.jsx';

let app = {};

var cb = new Codebird;
cb.setConsumerKey("fx95oKhMHYgytSBmiAqQ", "0zfaijLMWMYTwVosdqFTL3k58JhRjZNxd2q0i9cltls");
cb.setToken("2305278770-GGw8dQQg3o5Vqfx9xHpUgJ0CDUe3BoNmUNeWZBg", "iEzxeJjEPnyODVcoDYt5MVvrg90Jx2TOetGdNeol6PeYp");

let searchParams = "";
let data = [];

class Tweet extends React.Component {
    constructor() {
        super();
        //bind these methods here so the scoping is right and I don't have to do it all over the place.
        this.handleClick = this.handleClick.bind(this);
        this.onInput = this.onInput.bind(this);
        this.state = {data: [], user: {}, chars: "140 characters"};
    }
    postStatus() {
        //just to retain the correct value of 'this', I set it that.
        let that = this;
        cb.__call(
    	    "statuses_update",
    	    { status: this.refs.textarea.value },
    	    (reply, rate, err) => {
                that.refs.textarea.value = "";
                that.setState({data: [], chars: "140 characters"});
    	    }
    	)
    }
    getUsers() {
        let that = this;
        cb.__call(
        	    "users_search",
        	    searchParams,
        	    (reply, rate, err) => {
                    that.setState({data: reply});
        	    }
        	);
    }
    getCurrentUser() {
        let that = this;
        cb.__call(
        	    "account_verifyCredentials",
        	    (reply, rate, err) => {
                    that.setState({user: reply});
        	    }
        	);
    }
    handleClick(user) {
        let tweet = this.refs.textarea.value;
        let symbolIndex = tweet.search(/[@]/);
        let newTweet = tweet.slice(0, symbolIndex + 1) + user.screen_name;
        this.refs.textarea.value = newTweet;
    }
    onInput(event) {
        if(event.keyCode === 13) {
            this.postStatus();
        }
        else {
            let searchString = event.target.value;
            let charsRemaining = (140 - searchString.length);
            if (charsRemaining > 0) {
                charsRemaining === 1 ? this.setState({chars: charsRemaining + " Character"}) : this.setState({chars: charsRemaining + " Characters"})
                this.refs.textarea.value = searchString
            } else {
                this.setState({chars: charsRemaining + " Characters", data: []})
            }

            let symbolIndex = searchString.search(/[@]/)
            if (symbolIndex != -1) {
                var userHandle = searchString.slice(symbolIndex + 1, searchString.length);
                if (userHandle.substring(0, userHandle.indexOf(' ')) !== '') {
                    userHandle = userHandle.substring(0, userHandle.indexOf(' '));
                }
                if (userHandle.length > 1) {
                    searchParams = "q=" + userHandle + "&count=20";
                    this.getUsers();
                }
                else {
                    this.setState({data: []});
                }
            }
        }
    }
    componentDidMount() {
        this.getCurrentUser();
    }
    render() {
        return  <div className="tweet-box container-fluid">
                    <div className="row">
                        <table className="table">
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td className="col-xs-1"><img src={this.state.user.profile_image_url} className="image"/> </td>
                                    <td className="col-xs-1"><img src="/assets/twitter.png" className="image"/></td>
                                    <td className="col-xs-10 text-left names">@<strong>{this.state.user.screen_name}</strong> <span className="lesser-text">{this.state.user.name}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <textarea className="form-control tweet-area" rows="3" placeholder="Compose Tweet!" onKeyUp={this.onInput} ref="textarea" maxLength="140"></textarea>
                    </div>
                    <div className="row lesser-text">{this.state.chars} Remaining</div>
                    <UserResults onClick={this.handleClick} users={this.state.data}/>
                </div>
    }
}

ReactDOM.render(<Tweet />, document.getElementById('tweet'));
