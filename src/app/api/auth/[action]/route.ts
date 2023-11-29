/*
    Auth HTTP methods for logging, signing up, activating user, 
    requesting token, reset password and requesting password reset 
*/
import type {NextRequest} from "next/server"; 
import {handler} from "@/backend/controllers/authController"; 

export const GET = async (request: NextRequest, { params }:  { params: {action: string} }) => handler(request, params); 
export const POST = async (request: NextRequest, { params }:  { params: {action: string} }) => handler(request, params); 
export const PATCH = async (request: NextRequest, { params }:  { params: {action: string} }) => handler(request, params); 
