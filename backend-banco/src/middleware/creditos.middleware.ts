
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CreditoMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request body:', req.body);
    console.log('Request query:', req.query);
    console.log('Request params:', req.params);

    // const data = req.body.data;
    // if (data && typeof data === 'string') {
    //   // Decodificar data de Base64 usando atob
    //   const text = atob(data);
    //   console.log('Decoded data:', text);

    //   // Parse the decoded JSON string
    //   try {
    //     const decodedData = JSON.parse(text);
    //     // Asignar los datos decodificados al nuevo cuerpo de la solicitud
    //     req.body = { ...decodedData };
    //   } catch (error) {
    //     console.error('Error parsing decoded data:', error);
    //   }
    // }

    
    // const query = req.query.data;
    // if (query && typeof query === 'string') {
    //   // Decodificar query de Base64 usando atob
    //   const text = atob(query);
    //   console.log('Decoded query:', text);

    //   // Parse the decoded JSON string
    //   try {
    //     req.query = { ...req.query, data:text };
    //   } catch (error) {
    //     console.error('Error parsing decoded query:', error);
    //   }
    // }
    // Add a modified flag to the request body
    // req.body.modified = true;

    next();
  }
}