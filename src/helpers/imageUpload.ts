import { serverAPI } from './server';

const server = serverAPI();
const apiKey = import.meta.env.VITE_imgbb_key;

export default async function uploadImageToImgbb(file: File[]) {
  const imageFile = file[0];

  const formData = new FormData();
  formData.append('image', imageFile);

  const {
    data: {
      data: { url },
    },
  } = await server.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData,
  );

  return url as string;
}
