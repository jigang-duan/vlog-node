import { controller, get, post, provide } from 'midway';
import * as fs from 'mz/fs';
import * as path from 'path';
import { pump } from 'mz-modules';

@provide()
@controller('/multipart')
export class MultipartController {

  @get('/home')
  async index(ctx) {
    await ctx.render('index.ejs');
  }

  @get('/ajax')
  async ajaxShow(ctx) {
    await ctx.render('page/ajax.ejs');
  }

  @post('/ajax')
  async ajaxUpload(ctx) {
    const file = ctx.request.files[0];
    if (!file) return ctx.throw(404);

    const filename = encodeURIComponent(ctx.request.body.name) + path.extname(file.filename).toLowerCase();
    const targetPath = path.join(ctx.app.baseDir, 'app/public', filename);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);

    try {
      await pump(source, target);
      ctx.logger.warn('save %s to %s', file.filepath, targetPath);
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }

    ctx.body = { url: '/public/' + filename };
  }

  @post('/upload')
  async upload(ctx) {
    const file = ctx.request.files[0];
    if (!file) return ctx.throw(404);

    // const filename = encodeURIComponent(file.fieldname) + path.extname(file.filename).toLowerCase();
    const targetPath = path.join(ctx.app.baseDir, 'app/public', file.filename);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);

    try {
      await pump(source, target);
      ctx.logger.warn('save %s to %s', file.filepath, targetPath);
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }

    ctx.body = { url: '/public/' + file.filename };
  }

  @get('/form')
  async formOfShow(ctx) {
    await ctx.render('page/form.ejs');
  }

  @post('/form')
  async formOfUpload(ctx) {
    const file = ctx.request.files[0];
    if (!file) return ctx.throw(404);

    const filename = encodeURIComponent(ctx.request.body.name) + path.extname(file.filename).toLowerCase();
    const targetPath = path.join(ctx.app.baseDir, 'app/public', filename);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);

    try {
      await pump(source, target);
      ctx.logger.warn('save %s to %s', file.filepath, targetPath);
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }

    ctx.redirect('/public/' + filename);
  }

  @get('/multiple-file')
  async multipleShow(ctx) {
    await ctx.render('page/multiple.ejs');
  }

  @post('/multiple-file')
  async multipleUpload(ctx) {
    const files = ctx.request.files;
    ctx.logger.warn('files: %j', files);

    try {
      for (const file of files) {
        const filename = file.filename.toLowerCase();
        const targetPath = path.join(ctx.app.baseDir, 'app/public', filename);
        const source = fs.createReadStream(file.filepath);
        const target = fs.createWriteStream(targetPath);
        await pump(source, target);
        ctx.logger.warn('save %s to %s', file.filepath, targetPath);
      }
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }

    const fields = [];
    for (const k in ctx.request.body) {
      fields.push({
        key: k,
        value: ctx.request.body[k],
      });
    }

    await ctx.render('page/multiple_result.ejs', {
      fields,
      files,
    });
  }

}
