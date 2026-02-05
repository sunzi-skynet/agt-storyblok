/**
 * Basic Auth Middleware für Staging-Schutz
 * Credentials über Environment Variables:
 * - AUTH_USER (default: "agt")
 * - AUTH_PASSWORD (required für Aktivierung)
 * 
 * Ohne AUTH_PASSWORD ist die Auth deaktiviert (für lokale Entwicklung).
 */
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  
  const user = process.env.AUTH_USER || 'agt'
  const password = process.env.AUTH_PASSWORD
  
  // Keine Auth wenn kein Passwort gesetzt (lokale Entwicklung)
  if (!password) {
    return
  }
  
  const authHeader = getHeader(event, 'authorization')
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return sendUnauthorized(event)
  }
  
  const base64Credentials = authHeader.slice(6)
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
  const [inputUser, inputPassword] = credentials.split(':')
  
  if (inputUser !== user || inputPassword !== password) {
    return sendUnauthorized(event)
  }
})

function sendUnauthorized(event: any) {
  setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="AGT Staging"')
  setResponseStatus(event, 401)
  return 'Unauthorized'
}
