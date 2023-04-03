import { Response, Request, NextFunction } from "express";

export interface ExpressError extends Error {
  details: {
    [key: string]: [{ message: string }];
  };
}

export interface ExpressRequest extends Request {}

export interface ExpressResponse extends Response {}

export interface ExpressNext extends NextFunction {}
