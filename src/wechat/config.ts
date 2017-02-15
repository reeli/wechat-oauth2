export type grantTypes = {
    AUTHORIZATION_CODE: string
    REFRESH_TOKEN: string
};

interface IConfig {
    APP_SECRET: string,
    APP_ID: string,
    GRANT_TYPES: grantTypes,
}

const config: IConfig = {
    APP_SECRET: '32b208d4226adbc336e428add917de3c',
    APP_ID: 'wxd5fdb27781a67d8e',
    GRANT_TYPES: {
        AUTHORIZATION_CODE: 'authorization_code',
        REFRESH_TOKEN: 'refresh_token',
    },
};

export default config;
