import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import './Login.scss';


function Login() {
  let navigate = useNavigate();
  const [section, set_section] = React.useState<'login' | 'create' | 'forgot' | 'confirm'>('confirm'); 

  const [email, set_email] = React.useState('');
  const [password, set_password] = React.useState('');
  const [confirm_password, set_confirm_password] = React.useState('');
  const [code, set_code] = React.useState('');
  const [incorrect_login_info_status, set_incorrect_login_info_status] = React.useState(false);
  const [loader_status, set_loader_status] = React.useState<boolean>(false);
  const [incorrect_code_status, set_incorrect_code_status] = React.useState(false);

  const [test, set_test] = React.useState(true);

  async function sign_in() {
    try {
      set_loader_status(true);
      set_incorrect_login_info_status(false);
      console.log(email, password)
      const user = await Auth.signIn(email, password);
      console.log(user);
      navigate('/schedule');
      window.electron.ipcRenderer.maximize();
    } catch (error) {
      set_loader_status(false);
      set_incorrect_login_info_status(true);
      console.log('error signing in', error);
    }
  }

  async function sign_up() {
    try {
      set_loader_status(true);
      set_incorrect_login_info_status(false);
      const { user } = await Auth.signUp({
        username: email,
        password
      })
      set_section('confirm');
      // navigate('/schedule');
      // window.electron.ipcRenderer.maximize();
    } catch (error) {
      set_loader_status(false);
      set_incorrect_login_info_status(true);
      console.log('error signing in', error);
    }
  }

  async function confirm_signup() {
    try {
      set_incorrect_code_status(false);
      await Auth.confirmSignUp(email, code);
    } catch (error) {
      set_incorrect_code_status(true);
      console.log('Error confirming sign up: ', error);
    }
  }

  async function resend_confirmation_code() {
    try {
      await Auth.resendSignUp(email);
    } catch (error) {
      console.log('Error resending code: ', error);
    }
  }

  return (
    <div className="login_page">
      {/* <h1> Peace Logistic </h1>  */}
      <div className="login_page_inner_wrapper">
        { section == 'login' &&
          <>
            <h1> Welcome Back! </h1>
            <p>ACCOUNT INFORMATION</p> 
            <div className="input_wrapper_div">
              <input type="email" required={true} placeholder="Email" value={email} onChange={(e) => set_email(e.target.value)}/>
            </div>
            <div className="input_wrapper_div">
              <input type="password" required={true} placeholder="Password" value={password} onChange={(e) => set_password(e.target.value)}/>
            </div>
            <p className="forgot_password"
              onClick={() => {
                set_section('forgot')
                set_loader_status(false);
                set_incorrect_login_info_status(false);
              }}
            > Forgot your password? </p>
            <p className="create_an_account"
              onClick={() => {
                set_section('create')
                set_loader_status(false);
                set_incorrect_login_info_status(false);
              }}
            > Create an account </p>
            <button
              className="login_button"
              onClick={() => {
                sign_in();
              }}
            >
              { (loader_status == false) ?  'Login' : 
                <div className="loader"></div>
              }
            </button>
            { incorrect_login_info_status && <p className="incorrect_login_info"> Incorrect email or password</p> }
            
          </>
        } 

        { section == 'create' &&
          <>
            <h2 className="create_an_account_h2"> Create an account </h2> 
            <p className='go_back_to_sign_in'
              onClick={() => set_section('login')}
            > Go back </p>
            <div className="input_wrapper_div">
              <input type="email" required={true} placeholder="Email" value={email} onChange={(e) => set_email(e.target.value)}/>
            </div>
            <div className="input_wrapper_div">
              <div className="password_div_wrapper">
                <input type="password" 
                  required={true} 
                  placeholder="Password" 
                  value={password}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  onChange={(e) => set_password(e.target.value)}/>
                <div className={`create_account_password_tooltip ${ test ? 'hide_create_account_password_tooltip' : ''}`}
                  onFocus={() => set_test(true)}
                  onBlur={() => set_test(false)}
                >
                  Hello World
                </div>
              </div>
            </div>
            <div className="input_wrapper_div">
              <input type="password" required={true} placeholder="Confirm Password" value={confirm_password} onChange={(e) => set_confirm_password(e.target.value)}/>
            </div>
            <button
              className="create_account_button"
              onClick={() => {
                sign_up();
              }}
            > 
              { (loader_status == false) ?  'Create Account' : 
                <div className="loader"></div>
              }
            </button>
            { incorrect_login_info_status && <p className="incorrect_login_info"> Create Account</p> }
          </>
        }

        { section == 'forgot' &&
          <>
            <h2> A code will be sent to your email. </h2>
            <p className='go_back_to_sign_in'
              onClick={() => set_section('login')}
            > Go back </p>
            <input type="email" required={true} placeholder="Email" value={email} onChange={(e) => set_email(e.target.value)}/>
            <button
              onClick={() => {
                window.electron.ipcRenderer.maximize();
                navigate('/schedule');
              }}
            > Send </button>
          </>
        }

        { section == 'confirm' &&
          <>  
            <h2> Confirm Code </h2>
            <p className='p_go_back_to_confirm_email'
              onClick={() => {
                set_section('forgot');
              }}
            > Back </p>
            <input type="code" required={true} placeholder="Enter Code" value={code} onChange={(e) => set_code(e.target.value)}/>
            <p className="p_resend_code"
              onClick={() => {
                resend_confirmation_code();
              }}
            > Resend code </p>
            <button
              onClick={() => {
                confirm_signup();
              }}
            > Confirm </button>
            { incorrect_code_status && 
              <p className="incorrect_code"> Incorrect Code </p>
            }
          </>
        }

      </div>
    </div>
  )
}

export default Login