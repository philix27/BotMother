import { ApiProperty } from "@nestjs/swagger";

export class Input<T> {
    @ApiProperty()
    public readonly payload?: T;

    public constructor(payload: T) {
        this.payload = payload;
    }
}
