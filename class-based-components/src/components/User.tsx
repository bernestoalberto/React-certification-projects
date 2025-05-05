import classes from './User.module.css';
import { Component } from 'react';

interface UserProps {
  name: string;
}

class User extends Component<UserProps> {
  componentWillUnmount(): void {
      console.log('User will unmount!');
  }
  render() {
    return <li className={classes.user}>{this.props.name}</li>
  }
}

export default User;
