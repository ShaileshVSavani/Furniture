// import React from 'react'
// import PageHeading from '../common/PageHeading'

// const NotFoundPage = () => {
//   return (
//     <div>
//       <PageHeading home={"home"} pagename={" Page Not Found "} />
//     </div>
//   )
// }

// export default NotFoundPage



//==============================================


import React from 'react';
import PageHeading from '../common/PageHeading';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200 p-4">
      <PageHeading home={"home"} pagename={"Page Not Found"} />
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl">Oops! The page you are looking for does not exist.</p>
        <p className="mt-4">
          <a href="/" className="text-blue-500 hover:underline">Return to Home</a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
