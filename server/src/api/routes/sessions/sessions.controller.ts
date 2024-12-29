import type { ULID } from "ulid";
import type { NewSession } from "src/database";
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { SessionsService } from "./sessions.service";

@Controller('sessions')
export class SessionsController {
    constructor(
        private readonly sessionsService: SessionsService
    ) { }

    @Post()
    async createSession(@Body() body: NewSession) {
        return this.sessionsService.createSession(body);
    }

    @Get()
    async fetchAllSessions(@Query('page') page: number, @Query('limit') limit: number) {
        return this.sessionsService.fetchAllSessions(page, limit);
    }

    @Get('/patients/:patientId')
    async fetchAllSessionsByPatientId(@Param('patientId') patientId: ULID, @Query('page') page: number, @Query('limit') limit: number) {
        return this.sessionsService.fetchAllSessionsByPatientId(patientId, page, limit);
    }

    @Get('/therapists/:therapistId')
    async fetchAllSessionsByTherapistId(@Param('therapistId') therapistId: ULID, @Query('page') page: number, @Query('limit') limit: number) {
        return this.sessionsService.fetchAllSessionsByTherapistId(therapistId, page, limit);
    }

    @Get(':id')
    async fetchSessionById(@Param('id') id: ULID) {
        return this.sessionsService.fetchSessionById(id);
    }

    @Put(':id')
    async updateSession(@Param('id') id: ULID, @Body() body: NewSession) {
        return this.sessionsService.updateSession(id, body);
    }

    @Delete(':id')
    async deleteSession(@Param('id') id: ULID) {
        return this.sessionsService.deleteSession(id);
    }
}
