import Input from './Input';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.ts';
import { useInput } from '../hooks/useInput.ts';

export default function Login() {
    const {
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: emailHasError,
    } = useInput('', (value: any) => isEmail(value) && isNotEmpty(value));
    const {
        value: passwordValue,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: passwordHasError,
    } = useInput('', (value: any) => hasMinLength(value, 6));

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        if (emailHasError || passwordHasError) {
            return;
        }

        console.log(emailValue, passwordValue);
    }

    // function handleEmailChange(event) {
    //   setEnteredEmail(event.target.value);
    // }

    // function handlePasswordChange(event) {
    //   setEnteredPassword(event.target.value);
    // }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    onBlur={handleEmailBlur}
                    onChange={handleEmailChange}
                    value={emailValue}
                    error={emailHasError && 'Please enter a valid email!'}
                />

                <Input
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    value={passwordValue}
                    error={passwordHasError && 'Please enter a valid password!'}
                />
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}