import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

function Login() {
  let navigate = useNavigate();
  const [section, set_section] = React.useState<'login' | 'create' | 'forgot' | 'confirm'>('login'); 

  const [email, set_email] = React.useState('');
  const [password, set_password] = React.useState('');
  const [confirm_password, set_confirm_password] = React.useState('');
  const [code, set_code] = React.useState('');

  return (
    <div className="login_page">
      {/* <h1> Peace Logistic </h1>  */}
      <div className="login_page_inner_wrapper">
        { section == 'login' &&
          <>
            <h1> Welcome Back! </h1>
            <p>ACCOUNT INFORMATION</p> 
            <input type="email" required={true} placeholder="Email" value={email} onChange={(e) => set_email(e.target.value)}/>
            <input type="password" required={true} placeholder="Password" value={password} onChange={(e) => set_password(e.target.value)}/>
            <p className="forgot_password"
              onClick={() => set_section('forgot')}
            > Forgot your password? </p>
            <p className="create_an_account"
              onClick={() => set_section('create')}
            > Create an account </p>
            <button
              onClick={() => {
                window.electron.ipcRenderer.maximize();
                navigate('/schedule');
              }}
            > Login </button>
          </>
        } 

        { section == 'create' &&
          <>
            <h2 className="create_an_account_h2"> Create an account </h2> 
            <p className='go_back_to_sign_in'
              onClick={() => set_section('login')}
            > Go back </p>
            <input type="email" required={true} placeholder="Email" value={email} onChange={(e) => set_email(e.target.value)}/>
            <input type="password" required={true} placeholder="Password" value={password} onChange={(e) => set_password(e.target.value)}/>
            <input type="password" required={true} placeholder="Confirm Password" value={confirm_password} onChange={(e) => set_confirm_password(e.target.value)}/>
            <button
              onClick={() => {
                window.electron.ipcRenderer.maximize();
                navigate('/schedule');
              }}
            > Create Account </button>
          </>
        }

        { section == 'forgot' &&
          <>
            <h2> Create an account </h2> 
            <input type="email" required={true} placeholder="Email" value={email} onChange={(e) => set_email(e.target.value)}/>
            <button
              onClick={() => {
                window.electron.ipcRenderer.maximize();
                navigate('/schedule');
              }}
            > Create Account </button>
          </>
        }

        { section == 'confirm' &&
          <>  
            <h2> Confirmation </h2>
            <p> An code has been sent to your email. </p>
            <input type="code" required={true} placeholder="Enter Code" value={code} onChange={(e) => set_code(e.target.value)}/>
          </>
        }

      </div>
    </div>
  )
}

export default Login