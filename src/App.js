import GoogleLogin from 'react-google-login';
import axios from 'axios';
function App() {
  return (
    <GoogleLogin
      clientId="323252919231-sjf2nq9v4tr6onvidipdbin1quqh8npr.apps.googleusercontent.com"
      cookiePolicy="single_host_origin"
      scope="profile email"
      onSuccess={(googleUser) => {
        console.log(googleUser);
        axios.post('https://cms-api-pr-31.herokuapp.com/login', {
          access_token: googleUser.accessToken,
          username: "thisusername"
        }).then((res) => {
          console.log(res.data);
        });

      }}
      onFailure={(error) => {
        console.log(error);
      }}
    />
  );
}

export default App;
