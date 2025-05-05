
import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
    state = { hasError: false };

    constructor() {
        super({children: null});
        this.state = { hasError: false };
    }

    componentDidCatch(error: any) {
        console.log(error);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <p>Something went wrong!</p>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
