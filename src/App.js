import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
  const [link, setLink] = useState(localStorage.getItem('link'));
  const [clientId, setClientId] = useState(localStorage.getItem('clientId'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [iscopied, setIscopied] = useState(false);

  function resetisCopied() {
    setTimeout(() => {
      setIscopied(false);
    }, 2000)
  }

  return (
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
          axios.post(`${link}`, {
            access_token: googleUser.accessToken,
            username: "thisusername"
          }).then((res) => {
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
    </div>
  );
}

export default App;
