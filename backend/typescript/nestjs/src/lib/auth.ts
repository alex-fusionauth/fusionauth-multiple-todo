import { createRemoteJWKSet, jwtVerify, errors } from 'jose';
import { Request } from 'express';
import { Status } from 'src/todo/interfaces/todo.interface';

export const accessTokenStatus = async (request: Request, clientId) => {
    const appAt = request.cookies['app.at'];
    const status: Status = {
        expiration: 'fail',
        signature: 'fail',
        audience: 'fail',
        sub: 'fail',
    }
    try {
        /*
        * Check if signature is valid before anything
        */

        // Update this URL as needed
        const jwksClient = createRemoteJWKSet(
            new URL(`http://localhost:9011/.well-known/jwks.json`)
        );

        // This is going to check the well known key that was 
        // created during the kickstart process, which you 
        // can find within your application. The 'audience'
        // here is the clientId of your application.

        const verifiedJWT = await jwtVerify(appAt, jwksClient, {
            issuer: `http://localhost:9011`,
            audience: clientId,
        });

        console.debug('JWT Signature Verification', verifiedJWT);
        // If it made it this far signature is good.
        status.signature = 'success';

        /*
        * Check if expired
        */
        status.expiration = new Date(verifiedJWT.payload.exp * 1000).getTime() > Date.now() ? 'success' : 'fail';

        /*
        * Check our clientId against the audience provided in the JWT
        */

        status.audience = clientId === verifiedJWT.payload.aud ? 'success' : 'fail';

        /*
        * You could validate more from this sub
        * like hit a database and pass back user details
        * associated with the user. You can think of 'sub'
        * as the User Id in an external system.
        */

        status.sub = verifiedJWT?.payload?.sub ? 'success' : 'fail';

        return {
            verifiedJWT,
            status,
            message: 'success'
        }

    } catch (e) {
        if (e instanceof errors.JOSEError) {
            console.dir({ error: e.message, code: e.code });
        } else {
            console.dir(`Internal server error: ${e}`);
        }

        return {
            status,
            message: e?.message || 'failure'
        }
    }
}