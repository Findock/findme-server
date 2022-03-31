import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";

export const FindMeStorageProfileImageInterceptor = FileInterceptor("file", {
    storage: diskStorage({
        destination: "./storage/profile-images",
        filename: (req, file, callback) => {
            const fileExtName = extname(file.originalname);
            const fileName = uuidv4();
            callback(null, `${fileName}-profile-image${fileExtName}`);
        },
    }),
});
