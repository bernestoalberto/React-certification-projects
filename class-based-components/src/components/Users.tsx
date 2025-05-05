import { Component } from 'react';
import User from './User.tsx';

import classes from './Users.module.css';

interface IUser {
  id: string | number;
  name: string;
}

interface IUsersProps {
  users: IUser[];
}

interface IUsersState {
  showUsers: boolean;
  more: string;
}
class Users extends Component<IUsersProps, IUsersState> {

  constructor(props: IUsersProps) {
    super(props);
    this.state = {
      showUsers: true,
      more: 'Test',
    };
  }

  componentDidUpdate(): void {
    if (this.props.users.length === 0) {
      throw new Error("No users provided!");

    }
  }
  toggleUsersHandler() {
    this.setState(
      (curState) => {
        return {
          showUsers: !curState.showUsers
        }
      }

    )
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );
    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

export default Users;