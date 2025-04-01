- Tại file .env.production cập nhật giá trị các biến:
  NEXT_PUBLIC_BASE_API_URL // base apiUrl gọi tới BE
  NEXT_PUBLIC_BASE_SOCKET_URL // base url kết nối socket
  FRONTEND_CLIENT_ID // client_id của keycloak prod
  FRONTEND_CLIENT_SECRET // secret key của client trên keycloak prod
  AUTH_ISSUER // url realms của keycloak
  NEXTAUTH_URL // url redirect về FE khi gọi logout keycloak
  END_SESSION_URL // url end session user theo realms
  REFRESH_TOKEN_URL // url refreshToken user theo realms