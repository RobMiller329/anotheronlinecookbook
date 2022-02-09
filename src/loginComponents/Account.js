import React from "react";
import { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "./UserPool";

const AccountContext = createContext();

function Account(props)
{
    /*  pulls and stores credentials/account details associated with Cognito account  */
    const getSession = async () =>
    {
        return await new Promise((resolve, reject) =>
        {
            const user = Pool.getCurrentUser();
            if(user)
            {
                user.getSession( async (err, session) =>
                {
                    if(err)
                    {
                        reject();
                    }else
                    {
                        const attributes = await new Promise((resolve, reject) =>
                        {
                            user.getUserAttributes((err, attributes) =>
                            {
                                if(err)
                                {
                                    reject(err);
                                }else
                                {
                                    const results = {};

                                    for(let attribute of attributes)
                                    {
                                        const { Name, Value } = attribute;
                                        results[Name] = Value;
                                    }

                                    resolve(results);
                                }
                            });
                        });

                        resolve( { user, ...session, ...attributes } );
                    }
                });
            }else
            {
                reject();
            }
        });
    };

    //username here is in the context of Cognito (email); it is not the same as the site's username
    const authenticate = async (Username, Password) =>
    {
        return await new Promise((resolve, reject) =>
        {
            const user = new CognitoUser(
            {
                Username,
                Pool
            });

            const authDetails = new AuthenticationDetails(
            {
                Username,
                Password
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) =>
                {
                    console.log("onSuccess: ", data);
                    resolve(data);
                },
                onFailure: (err) =>
                {
                    console.error("onFailure: ", err);
                    reject(err);
                },
                newPasswordRequired: (data) =>
                {
                    console.log("newPasswordRequired: ", data);
                    resolve(data);
                }
            });
        });
    };

    const logout = () =>
    {
        const user = Pool.getCurrentUser();
        if(user)
        {
            user.signOut();
        }
    };

    return(
        <AccountContext.Provider value={ { authenticate, getSession, logout } }>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };
