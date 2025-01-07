export type Consultation = {
  id: string;
  diagnosis: string | null;
  status: 'pending' | 'completed' | 'cancelled';
  treatmentPlan: string | null;
  finalReportUrl: string | null;
  details: {
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
  };
  therapist: {
    id: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
  } | null;
  hospital: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
  createdAt: Date;
};
