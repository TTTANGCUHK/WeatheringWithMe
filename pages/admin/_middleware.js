// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.isAdmin,
  },
})