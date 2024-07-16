import { FusionAuthProviderConfig } from "@fusionauth/react-sdk";

export const configTodo1: FusionAuthProviderConfig = {
    clientId: "e9fdb985-9173-4e01-9d73-ac2d60d1dc8a",
    redirectUri: "http://localhost:5173",
    postLogoutRedirectUri: "http://localhost:5173",
    serverUrl: "http://localhost:9011",
    shouldAutoFetchUserInfo: true,
    shouldAutoRefresh: true,
    onRedirect: (state?: string) => {
        console.log(`Redirect happened with state value: ${state}`);
    },
    scope: 'openid email profile offline_access'
};

export const configTodo2: FusionAuthProviderConfig = {
    clientId: "e9fdb985-8675-4e01-9d73-ac2d60d1dc8b",
    redirectUri: "http://localhost:5173",
    postLogoutRedirectUri: "http://localhost:5173",
    serverUrl: "http://localhost:9011",
    shouldAutoFetchUserInfo: true,
    shouldAutoRefresh: true,
    onRedirect: (state?: string) => {
        console.log(`Redirect happened with state value: ${state}`);
    },
    scope: 'openid email profile offline_access'
};