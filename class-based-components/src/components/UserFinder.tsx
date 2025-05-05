import { Fragment, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.css';
import UsersContext from '../store/users-context';

export const DUMMY_USERS = [
    { id: 'u1', name: 'Max' },
    { id: 'u2', name: 'Manuel' },
    { id: 'u3', name: 'Julie' },
];

interface UserFinderState {
    filteredUsers: { id: string; name: string }[];
    searchTerm: string;
}

class UserFinder extends Component<{}, UserFinderState, { users: { id: string; name: string }[] }> {
    static contextType = UsersContext;

    constructor() {
        super({
            filteredUsers: [],
            searchTerm: '',
        });
        this.state = {
            filteredUsers: [],
            searchTerm: '',
        };
    }

    componentDidMount() {
        // Send http request...
        this.setState({ filteredUsers: this.context.users });
    }

    componentDidUpdate(prevState: { searchTerm: string; }) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState({
                filteredUsers: this.context.users.filter((user: { name: string | string[]; }) =>
                    (user.name as string).includes(this.state.searchTerm)
                ),
            });
        }
    }

    searchChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        return (
            <Fragment>
                <div className={classes.finder}>
                    <input type='search' onChange={this.searchChangeHandler.bind(this)} />
                </div>
                <Users users={this.state.filteredUsers} />
            </Fragment>
        );
    }
}

export default UserFinder;