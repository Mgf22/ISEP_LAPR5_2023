import { Role } from '../../../mdgt/src/domain/role';
var jwt = require('jsonwebtoken');
var config = require('../../../config')
import express, { Request, Response, NextFunction } from 'express';

// Function to extract role from JWT
function extractRoleFromJWT(token: string): string | null {
    try {
      const decodedToken = jwt.decode(token) as { [key: string]: any };
  
      if (decodedToken && decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
        // Assuming the role is stored in 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      }
  
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
  // Middleware function for role-based authorization
  function authorize(roleToAuthorize: string []) {
    return function(req: Request, res: Response, next: NextFunction) {
      const token = req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      const userRole = extractRoleFromJWT(token);
  
      if (!userRole || !roleToAuthorize.includes(userRole)) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      // User is authorized, proceed to the next middleware or route handler
      next();
    };
  }
  
module.exports = authorize;