// import React from "react";
// import { Link } from "react-router-dom";

// const PageHeading = ({ home, pagename }) => {
//   return (
//     <div className="w-11/12 m-auto">
//       <div className="bg-img relative">
//         <div className="absolute top-1/2 -translate-y-1/2 left-16">
//           <h1 className="text-3xl font-bold">{pagename}</h1>
//           <p>
//             <Link to={"/"} className="hover:text-yellow-500 capitalize">
//               {home}
//             </Link>{" "}
//             / {pagename}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PageHeading;



//===============================================

import React from "react";
import { Link } from "react-router-dom";

const PageHeading = ({ home, pagename }) => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="bg-img relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-16">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-2">
            {pagename}
          </h1>
          <p className="text-sm md:text-base">
            <Link to={"/"} className="hover:text-yellow-500 capitalize">
              {home}
            </Link>{" "}
            / {pagename}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageHeading;
