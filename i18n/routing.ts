import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['es', 'en'],
 
  // Used when no locale matches
  defaultLocale: 'es',
  pathnames: {
    "/contact": {
      "es": "/contacto",
      "en": "/contact"
    },
    "/promotions": {
      "es": "/promociones",
      "en": "/promotions"
    },    
    "/login": {
      "es": "/iniciar-sesion",
      "en": "/login"
    },
    "/register": {
      "es": "/registrarse",
      "en": "/register"
    },
    "/forgot-password": {
      "es": "/olvido-contraseña",
      "en": "/forgot-password"
    }
  }
});