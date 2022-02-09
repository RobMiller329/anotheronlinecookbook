import { CognitoUserPool } from "amazon-cognito-identity-js";

/*  required to connect with AWS Cognito  */
const poolData = 
{
    UserPoolId: "us-east-1_wiFU2Kjvp",
    ClientId: "4aavc5s1uvpmmie2t3op50jouu"
}

export default new CognitoUserPool(poolData);
