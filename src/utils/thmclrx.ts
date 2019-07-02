import * as thmclrx from 'thmclrx';

export function getColor(sourceImage): Promise<Array<any>> {
  return new Promise((resolve, reject) => {
    thmclrx.octree(sourceImage, (err, colors) => {
      if (err) {
        reject(err);
      } else {
        resolve(colors)
      }
    })
  });
}
