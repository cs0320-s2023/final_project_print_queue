export interface Job {
  uid: string; // Has not been added yet.
  user: string;
  contact: string;
  printTime: string;
  timeQueued: string;
  // status: string;
  // id: string; // This feild hasn't yet been added
  // printer:
}

export interface Printer {
  name: string;
  filament: string;
  status: string;
  timeStarted: string;
  currentJob?: Job;
}

export enum Status {
  AVAILABLE = "available",
  BUSY = "busy",
  PENDING = "pending",
  MAINTENANCE = "maintenance",
  RESERVE = "reserved",
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
