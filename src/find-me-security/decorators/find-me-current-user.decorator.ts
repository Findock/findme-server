import { createParamDecorator,ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (_data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
