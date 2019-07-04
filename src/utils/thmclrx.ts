import * as getColors from 'get-image-colors';
import * as path from 'path';
import { URL } from 'url';

export async function getColor(sourceImage): Promise<Array<any>> {
  const url = new URL(sourceImage)
  const colors = await getColors(path.join(__dirname, '..', 'app', url.pathname))
  return colors.map(color => color.hex());
}
