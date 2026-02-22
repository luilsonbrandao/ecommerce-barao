import { HttpInterceptorFn } from '@angular/common/http';

export const ngrokInterceptor: HttpInterceptorFn = (req, next) => {
  // Clona a requisição original e injeta o nosso cabeçalho mágico
  const reqModificada = req.clone({
    setHeaders: {
      'ngrok-skip-browser-warning': 'true'
    }
  });

  // Manda a requisição modificada seguir viagem para o Java
  return next(reqModificada);
};
