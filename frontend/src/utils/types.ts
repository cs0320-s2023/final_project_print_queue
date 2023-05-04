export interface Job {
  uid: string; // Has not been added yet.
  user: string;
  contact: string;
  printTime: string;
  timeQueued: string;
  // status: string;
  JobID: string; // This feild hasn't yet been added
  // printer:
}

export interface Printer {
  name: string;
  filament: string;
  status: Status;
  timeStarted: string;
  currentJob?: Job;
}

export enum Status {
  AVAILABLE = "AVAILABLE",
  BUSY = "BUSY",
  PENDING = "PENDING",
  MAINTENANCE = "MAINTENANCE",
  RESERVE = "RESERVE",
}

/**
 * ServerErrorResponse Type and corresponding type gaurd funciton for
 * checking if a given object is a ServerErrorResponse
 */
export interface ServerErrorResponse {
  result: string;
  message: string;
}

export function isServerErrorResponse(
  rjson: any
): rjson is ServerErrorResponse {
  if (!("result" in rjson)) return false;
  if (!("message" in rjson)) return false;
  return true;
}

/**
 * EnqueueServerResponse Type and corresponding type gaurd funciton for
 * checking if a given object is a EnqueueServerResponse
 */

export interface EnqueueServerResponse {
  user: string;
  contact: string;
  duration: string;
  result: string;
}

export function isEnqueueServerResponse(
  rjson: any
): rjson is EnqueueServerResponse {
  if (!("user" in rjson)) return false;
  if (!("contact" in rjson)) return false;
  if (!("duration" in rjson)) return false;
  if (!("result" in rjson)) return false;
  return true;
}

/**
 * GetStateServerResponse Type and corresponding type gaurd funciton for
 * checking if a given object is a GetStateServerResponse
 */

export interface GetStateServerResponse {
  printQ: Job[];
  printers: Printer[];
  result: string;
}

export function isGetStateServerResponse(
  rjson: any
): rjson is GetStateServerResponse {
  if (!("printQ" in rjson)) return false;
  if (!("printers" in rjson)) return false;
  if (!("result" in rjson)) return false;
  return true;
}

/**
 * rejectPrinterServerResponse Type and corresponding type gaurd funciton for
 * checking if a given object is a rejectPrinterServerResponse
 */
export interface RejectPrinterServerResponse {
  result: string;
  message: string;
}

export function isRejectPrinterServerResponse(
  rjson: any
): rjson is RejectPrinterServerResponse {
  if (!("result" in rjson)) return false;
  if (!("message" in rjson)) return false;
  return true;
}

/**
 * rejectJobServerResponse Type and corresponding type gaurd funciton for
 * checking if a given object is a rejectPrinterServerResponse
 */
export interface RejectFromQueueServerResponse {
  result: string;
  message: string;
}

export function isRejectFromQueueServerResponse(
  rjson: any
): rjson is RejectFromQueueServerResponse {
  if (!("result" in rjson)) return false;
  if (!("message" in rjson)) return false;
  return true;
}

/**
 * ClaimPrinterServerResponse Type and corresponding type gaurd funciton for
 * checking if a given object is a rejectPrinterServerResponse
 */
export interface ClaimPrinterServerResponse {
  result: string;
  message: string;
}

export function isClaimPrinterServerResponse(
  rjson: any
): rjson is RejectFromQueueServerResponse {
  if (!("result" in rjson)) return false;
  if (!("message" in rjson)) return false;
  return true;
}
