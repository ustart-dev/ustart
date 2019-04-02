/**
 * Exporta las consultas GraphQL para ser utilizadas en múltiples test
*/

export const loginMutation = `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id,
      email,
      jwt,
      roles,
      accountVerified,
      accountSuspended
    }
  }
`;

export const signupMutation = `
  mutation signup($email: String!, $password: String!, $role: String!) {
    signup(email: $email, password: $password, role: $role) {
      id,
      email,
      roles,
      jwt,
      accountVerified,
      accountSuspended
    }
  }
`;
