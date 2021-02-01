import { gql } from "apollo-boost";

// Login
export const LOG_IN = gql`
    mutation requestSecret($email: String!) {
        requestSecret(email: $email)
    }
`;

// Create
export const CREATE_ACCOUNT = gql`
    mutation createAccount(
        $username: String! 
        $email: String!
        $firstName: String
        $lastName: String
    ) {
        createAccount(
            username: $username
            email: $email
            firstName: $firstName
            lastName: $lastName
        )
    }
`;

// Confirm secret
export const CONFIRM_SECRET = gql`
    mutation confirmSecret(
        $secret: String!
        $email: String!
    ) {
        confirmSecret(
            secret: $secret
            email: $email
        )
    }
`;

// Local Login
// logUserIn은 clinet 때문에 LocalState에서 호출됨
export const LOCAL_LOG_IN = gql`
    mutation logUserIn(
        $token: String!
    ) {
        logUserIn(
            token: $token
        ) @client
    }
`;