export type Patient = {
    id: string;
    hospitalId: string;
    hospitalName: string;
    userId: string;
    userName: string;
    details: {
        firstName: string;
        middleName?: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        dateOfBirth: string;
    };
    address: {
        id: string;
        houseNumber?: string;
        blockNumber?: string;
        street?: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
    };
    emergencyContactName: string;
    emergencyContactPhone: string;
    createdAt: string;
};

