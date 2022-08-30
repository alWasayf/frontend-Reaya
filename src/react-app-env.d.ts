/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />
declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

declare module "rc-rate";

let recaptchaVerifier = window.recaptchaVerifier; // ok now
let confirmationResult = window.confirmationResult; // ok now
