import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
let styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    overflow: 'hidden',
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

function App() {
  const [link, setLink] = useState(localStorage.getItem('link') || '');
  const [clientId, setClientId] = useState(localStorage.getItem('clientId') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [iscopied, setIscopied] = useState(false);

  function resetisCopied() {
    setTimeout(() => {
      setIscopied(false);
    }, 2000)
  }

  return (
    <>
      <Menu styles={styles}>
        <Link to="/institute">Institute</Link>
      </Menu>
      <div className="container">
        <form onSubmit={e => {
          e.preventDefault();
        }}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="clientId">Client ID</label>
          <input type="text" value={clientId}
            onChange={e => {
              setClientId(e.target.value);
              localStorage.setItem('clientId', e.target.value);
            }} />
          <label htmlFor="link">Link</label>
          <input type="url" name="link" value={link}
            onChange={e => {
              setLink(e.target.value)
              localStorage.setItem('link', e.target.value);
            }}
          />
        </form>

        <GoogleLogin
          clientId={clientId}
          cookiePolicy="single_host_origin"
          scope="profile email"
          onSuccess={(googleUser) => {
            console.log(googleUser);
            setAccessToken(googleUser.getAuthResponse().access_token);
            axios.post(`${link}/login`, {
              access_token: googleUser.accessToken,
              username: "thisusername"
            }).then((res) => {
              console.log(res.data);
              setToken(res.data.token);
              localStorage.setItem('token', res.data.token);
            });

          }}
          onFailure={(error) => {
            console.log(error);
          }}
        />
        <span type="" id="token">
          {token}
        </span>
        <CopyToClipboard text={token} onCopy={() => {
          setIscopied(true);
          resetisCopied();
        }}>
          <button className="btn btn-primary">
            Copy Token
          </button>
        </CopyToClipboard>
        {iscopied &&
          <span>
            Token copied to clipboard
          </span>
        }
        <span type="" id="access_token">
          {accessToken}
        </span>
        <CopyToClipboard text={accessToken} onCopy={() => {
          setIscopied(true);
          resetisCopied();
        }}>
          <button className="btn btn-primary">
            Copy Access Token
          </button>
        </CopyToClipboard>
        {iscopied &&
          <span>
            Access Token copied to clipboard
          </span>
        }
      </div>
    </>
  );
}

export default App;
