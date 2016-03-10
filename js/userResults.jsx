import React from 'react';
import ReactDOM from 'react-dom';

let index = 1;
document.onkeydown = (e) => {
    UserResults.staticKeyPressHandler(e);
}

/*******
******* This class contains the userResults table that pulls up the suggested users.
*******/
class UserResults extends React.Component {
    clickHandler(user) {
        document.getElementsByTagName("textarea")[0].focus();
        this.props.onClick(user);
    }
    static staticKeyPressHandler(event, user) {
        if (event.keyCode === 38) {
            let tempIndex = index;

            //blur the textbox so the arrow keys don't move the cursor
            document.getElementsByTagName("textarea")[0].blur();
            if (index > 1) {
                index--;
            }
            document.getElementsByTagName("tr")[index].focus();
            document.getElementsByTagName("tr")[index].classList.add("highlighted");
            document.getElementsByTagName("tr")[tempIndex++].classList.remove("highlighted");

        } else if (event.keyCode === 40) {
            let tempIndex = index;

            //blur the textbox so the arrow keys don't move the cursor
            document.getElementsByTagName("textarea")[0].blur();
            index++;
            document.getElementsByTagName("tr")[index].focus();
            document.getElementsByTagName("tr")[index].classList.add("highlighted");
            document.getElementsByTagName("tr")[tempIndex--].classList.remove("highlighted");
        } else if (event.keyCode === 13) {
            //Ran out of time to get this working.
        }
    }
    render() {
        return <div className="row">
                    <table className="table users-table">
                        <thead></thead>
                        <tbody>
                            { this.props.users.map((user, i) => <tr className="users-row" ref="row" onClick={this.clickHandler.bind(this, user)} key={i}>
                                    <td className="col-xs-1"><img src={user.profile_image_url} className="image"/> </td>
                                    <td className="col-xs-1"><img src="/assets/twitter.png" className="image"/></td>
                                    <td className="col-xs-10 text-left">@<strong>{user.screen_name}</strong> <span className="lesser-text">{user.name}</span></td>
                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
  }
}

export default UserResults
