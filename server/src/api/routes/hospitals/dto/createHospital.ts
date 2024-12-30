export type CreateHospital = {
  name: string;
  address: {
    houseNumber?: string;
    blockNumber?: string;
    street?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  phoneNumber: number;
  code: string;
};
