export type Therapist = {
    id: string;
    userId: string;
    userRole: string;
    hospitalId: string;
    hospitalName: string;
    hospitalCode: string;
    userCode: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: {
        houseNumber?: string;
        blockNumber?: string;
        street?: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
    };
    createdAt: string;
};
