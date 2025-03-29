import'./login.css';

const Login = () => {
    return(
        <div>
            <form className='custom-form'>
                <label className="custom-label">Username:</label>
                <input className="custom-input" type='text'/>
                <label className="custom-label">Password:</label>
                <input className="custom-input" type="password" />
                <button className="custom-button">Login</button>
            </form>
        </div>
    );
}

export default Login;