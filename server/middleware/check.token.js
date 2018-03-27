import { Request, Response, NextFunction } from "express";
import * as util from '../libs/util';
import AuthApi from '../apis/auth';
import {isNullOrUndefined} from "util";

export default async function (req, res, next) {
  if (! isNullOrUndefined(req.cookies['Authorization'])) {
      console.log('------ cookies里的token尚未过期 ----');
      console.log(req.cookies['Authorization']);
      req.headers['Authorization'] = req.cookies['Authorization'];
      next();
  } else {
      try {
          const ret = await new AuthApi(req).getClientToken({ grant_type: 'client_credentials' });
          // res设置cookie.Authorization
          const token = util.UpperFirstLetter(ret.data.token_type) + ' ' + ret.data.access_token;
          console.log('------ 获取token成功 ----');
          console.log(token);
          res.cookie('Authorization', token, {
              // domain: cookieDomain,
              // httpOnly: true,
              maxAge: ret.data.expires_in * 1000
          });
          req.headers['Authorization'] = token;
          next();
      } catch (error) {
          next(error);
      }
  }
};
