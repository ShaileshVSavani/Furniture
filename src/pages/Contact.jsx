// import React from 'react'
// import PageHeading from '../common/PageHeading'

// const ContactUs = () => {
//   return (
//     <div>
//       <PageHeading home={"home"} pagename={"ContactUs"} />
//     </div>
//   )
// }

// export default ContactUs


//==============================================


import React from 'react';
import PageHeading from '../common/PageHeading';

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-base-200 p-4">
      <PageHeading home={"home"} pagename={"Contact Us"} />
      <div className="w-full max-w-3xl mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Get in Touch</h2>
        <p className="text-lg mb-4 text-center">
          We would love to hear from you! Please fill out the form below or reach out to us via the provided contact details.
        </p>
        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name:</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Message:</span>
            </label>
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="form-control mt-4">
            <input
              type="submit"
              value="Send Message"
              className="btn btn-outline w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
