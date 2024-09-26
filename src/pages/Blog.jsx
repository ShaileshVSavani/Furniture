// import React from 'react'
// import PageHeading from '../common/PageHeading'

// const Blog = () => {
//   return (
//       <div>
//           <PageHeading home={"home"} pagename={" Blog "} />
          
//     </div>
//   )
// }

// export default Blog



//========================================

import React from 'react';
import PageHeading from '../common/PageHeading';

const Blog = () => {
  return (
    <div className="container mx-auto p-4">
      <PageHeading home="home" pagename="Blog" />
      {/* Add more content here as needed */}
      <p className="mt-4">Welcome to the Blog page. Here you'll find the latest updates and articles.</p>
    </div>
  );
};

export default Blog;
