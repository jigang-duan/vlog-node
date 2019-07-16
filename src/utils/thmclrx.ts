import * as getColors from 'get-image-colors';
import * as path from 'path';
import * as fs from 'fs';
import * as request from 'request';
import { URL } from 'url';

async function download(sourceImage): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = new URL(sourceImage);
    const tmpImage = path.join('/tmp', path.basename(url.pathname));
    const stream = request(sourceImage).pipe(fs.createWriteStream(tmpImage));
    stream.on('finish', () => {
      resolve(tmpImage);
    });
    stream.on('error', err => {
      reject(err);
    });
  });
}

export async function getColor(sourceImage): Promise<Array<any>> {
  const tmpImage =  await download(sourceImage);
  const colors = await getColors(tmpImage);
  return colors.map(color => color.hex());
}
