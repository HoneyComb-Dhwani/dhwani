import { Inject, Injectable } from "@nestjs/common";
import type { NewTherapist } from "src/database";
import { errors, type ReturnError, type ReturnResponse } from '../../constants';
import { therapistRepository } from "src/database/repositories/therapist.repository";
import type { ULID } from 'ulid';

@Injectable()
export class TherapistService {
    constructor() { }

    async createTherapist(body: NewTherapist): Promise<ReturnResponse | ReturnError> {
        const Therapist = await therapistRepository.insertTherapist(body);

        if (!Therapist) {
            return errors.INTERNAL_SERVER_ERROR;
        }

        return {
            status: 200,
            message: 'OK',
            prettyMessage: 'Therapist created successfully',
        };
    }

    async getAllTherapistsByHopitalId(hospitalId: ULID): Promise<ReturnResponse | ReturnError> {
        const therapists = await therapistRepository.fetchTherapistByHospitalId(hospitalId);

        if (!therapists) {
            return errors.NOT_FOUND;
        }

        return {
            status: 200,
            message: 'OK',
            prettyMessage: 'Therapists fetched successfully',
            data: therapists,
        };
    }




    async getAllTherapistsByNameHospital(
        name: string,
        hospitalName: string
    ): Promise<ReturnResponse | ReturnError> {
        const therapists = await therapistRepository.fetchTherapistsByUserNameAndHospitalName({ username: name, hospitalName: hospitalName });

        if (!therapists) {
            return errors.NOT_FOUND;
        }

        return {
            status: 200,
            message: 'OK',
            prettyMessage: 'Therapists fetched successfully',
            data: therapists,
        };
    }




    async getTherapistById(id: ULID): Promise<ReturnResponse | ReturnError> {
        const Therapist = await therapistRepository.fetchTherapistById(id);

        if (!Therapist) {
            return errors.NOT_FOUND;
        }

        return {
            status: 200,
            message: 'OK',
            prettyMessage: 'Therapist fetched successfully',
            data: Therapist,
        };
    }

    async updateTherapist(
        id: ULID,
        body: NewTherapist,
    ): Promise<ReturnResponse | ReturnError> {
        const updatedTherapist = await therapistRepository.updateTherapist(id, body);

        if (!updatedTherapist) {
            return errors.NOT_FOUND;
        }

        return {
            status: 200,
            message: 'OK',
            prettyMessage: 'Therapist updated successfully'
        };
    }

    async deleteTherapist(id: ULID): Promise<ReturnResponse | ReturnError> {
        const isDeleted = await therapistRepository.deleteTherapist(id);

        if (!isDeleted) {
            return errors.NOT_FOUND;
        }

        return {
            status: 200,
            message: 'OK',
            prettyMessage: 'Therapist deleted successfully',
        };
    }

}
