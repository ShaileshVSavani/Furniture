// import React from 'react'
// import PageHeading from '../common/PageHeading'

// const AboutUs = () => {
//   return (
//     <div>
//       <PageHeading home={"home"} pagename={"AboutUs"} />
//     </div>
//   )
// }

// export default AboutUs


//=============================================

import React from 'react';
import PageHeading from '../common/PageHeading';

const AboutUs = () => {
  return (
    <div className="py-8 px-4 md:px-8">
      <PageHeading home={"home"} pagename={"About Us"} />

      <section className="mt-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="text-gray-700">
          Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
