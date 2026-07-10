import { SignJWT, jwtVerify } from 'jose'

function getSecret() {
  return new TextEncoder().encode(process.env.CRON_SECRET!)
}

export async function signUnsubscribeToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(getSecret())
}

export async function verifyUnsubscribeToken(token: string): Promise<string> {
  const { payload } = await jwtVerify(token, getSecret())
  if (typeof payload.email !== 'string') throw new Error('Invalid token payload')
  return payload.email
}
