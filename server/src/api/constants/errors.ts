export type ReturnError = {
  status: number;
  message: string;
  prettyMessage: string;
};

export const errors: Record<string, ReturnError> = {
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized',
    prettyMessage: 'You are not authorized to access this resource.',
  },
  FORBIDDEN: {
    status: 403,
    message: 'Forbidden',
    prettyMessage: 'You are forbidden from accessing this resource.',
  },
  NOT_FOUND: {
    status: 404,
    message: 'Not Found',
    prettyMessage: 'The resource you are looking for does not exist.',
  },
  CONFLICT: {
    status: 409,
    message: 'Conflict',
    prettyMessage: 'The resource you are trying to create already exists.',
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'Internal Server Error',
    prettyMessage: 'An unexpected error occurred.',
  },
  BAD_REQUEST: {
    status: 400,
    message: 'Bad Request',
    prettyMessage: 'The request you made was invalid.',
  },
  INVALID_CREDENTIALS: {
    status: 401,
    message: 'Invalid Credentials',
    prettyMessage: 'The email or password you entered is incorrect.',
  },
  NO_DATA_FOUND: {
    status: 404,
    message: 'No Data Found',
    prettyMessage: 'No data found for the requested resource.',
  },
  CONSULTATION_DOES_NOT_EXIST: {
    status: 404,
    message: 'Consultation does not exist',
    prettyMessage: 'The consultation does not exist.',
  },
};
