import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + extname(file.originalname));
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const ext = extname(file.originalname).toLowerCase();
    
    // Auto-convert HEIC/HEIF to JPEG using macOS sips
    if (['.heic', '.heif'].includes(ext)) {
      const jpegFilename = file.filename.replace(ext, '.jpg');
      const jpegPath = path.join('./uploads', jpegFilename);
      
      try {
        execSync(`sips -s format jpeg "${file.path}" --out "${jpegPath}"`);
        fs.unlinkSync(file.path);
        return { url: `/uploads/${jpegFilename}` };
      } catch (e) {
        // If conversion fails, return original
        return { url: `/uploads/${file.filename}` };
      }
    }
    
    return { url: `/uploads/${file.filename}` };
  }
}
