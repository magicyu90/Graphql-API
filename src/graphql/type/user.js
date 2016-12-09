export const UserType = `

    type User{
       name:String,
       password:String,
       email:String,
       level:Int
    }
    
    type Token{
       token:String
    }
    
    type Query {
        login(email:String,password:String):Token
    }
    
    type Mutation{
       register(
          name:String!
          email:String!
          password:String!
          level:Int!
       ):Token
    }
`;

