export type Session = {
  id: string;
  patientId: string;
  therapistId: string;
  consultationId: string;
  therapistNotes: string | null;
  documentUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  therapist: {
    firstName: string;
    lastName: string;
    email: string;
  };
};
