import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";

export const FindMeStorageCommentPhotoInterceptor = FileInterceptor("file", {
    storage: diskStorage({
        destination: "./storage/comment-photos",
        filename: (_req, file, callback) => {
            const fileExtName = extname(file.originalname);
            const fileName = uuidv4();
            callback(null, `${fileName}-comment-photo${fileExtName}`);
        },
    }),
});
