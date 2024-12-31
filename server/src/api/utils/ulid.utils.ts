import { z } from 'zod';
import { ulid, decodeTime, type ULID } from 'ulid';

const isULID = (value: string): boolean => {
    if (typeof value !== 'string') return false;
    if (value.length !== 26) return false;
    return /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/.test(value);
};

export const createULIDSchema = () =>
    z.string()
        .refine(isULID, {
            message: 'Invalid ULID format',
        })
        .refine((val) => {
            const timestamp = decodeTime(val);
            return timestamp <= Date.now();
        }, {
            message: 'ULID timestamp cannot be in the future',
        }) as unknown as z.ZodType<ULID>;
