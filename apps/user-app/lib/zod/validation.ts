import { z } from "zod";

const canadianPhoneNumberRegex = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;

export const signInSchema = z.object({
    phone:z.string().refine((val) => canadianPhoneNumberRegex.test(val), {message: "Invalid Canadian phone number format."}),
    password:z.string().min(5, {message:"password should be minimum 5 characters long."})
});

export const signUpSchema = z.object({
    phone:z.string().refine((val) => canadianPhoneNumberRegex.test(val), {message: "Invalid Canadian phone number format."}),
    password:z.string().min(5, {message:"password should be minimum 5 characters long."}),
    name:z.string().min(1, {message:"name should be minimum 1 characters long."}),
    email:z.string().email({message:"Invalid email."}),
});