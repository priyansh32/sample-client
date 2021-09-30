import axios from "axios";
import { useState } from "react";
import JSONDisplayer from "./utils/indentJSON";
const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

function Institute() {
  const [data, setdata] = useState({});
  function sendForm(e) {
    e.preventDefault();

    let instiForm = new FormData(document.querySelector("#insti-form"));
    /* axios
      .get("http://localhost:8081")
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err)); */

    axios
      .post("http://localhost:8081/institutes", instiForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setdata(res.data);
      })
      .catch((res) => setdata(res.data));
  }
  return (
    <>
      <div className='container'>
        {/* a multipart form to create institute */}
        <form
          encType='multipart/form-data'
          id='insti-form'
          onSubmit={(e) => sendForm(e)}
        >
          <label htmlFor='insti-logo'>Logo</label>
          <input
            name='logo'
            type='file'
            id='insti-logo'
            accept='image/png, image/jpeg'
          />
          <label htmlFor='insti-bannerImage'>Banner</label>
          <input
            name='bannerImage'
            type='file'
            id='insti-bannerImage'
            accept='image/png, image/jpeg'
          />
          <label htmlFor='insti-it'>Institute Id</label>
          <input type='text' name='instituteId' id='insti-id' />
          <label htmlFor='insti-name'>Institute Name</label>
          <input type='text' name='name' id='insti-name' />
          <label htmlFor='insti-about'>Institute About</label>
          <textarea
            name='about'
            id='insti-about'
            cols='30'
            rows='10'
          ></textarea>
          <label htmlFor='insti-regex'>Institute Address</label>
          <input type='text' name='emailRegex' id='insti-regex' />
          <label htmlFor='insti-externalUrl'>External URL</label>
          <input type='text' name='externalUrl' id='insti-externalUrl' />
          <input type='submit' value='Create Insti' />
        </form>
      </div>
      <JSONDisplayer>{data}</JSONDisplayer>
    </>
  );
}
export default Institute;
