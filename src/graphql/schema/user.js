import {UserType} from '../type/user';


export const UserSchema =`

   ${UserType}
   schema {
      query:Query
      mutation:Mutation
   }
`;