import { conditionalLog_V2 } from '@helpers/console.helper';
import { SendAsync } from '@utils/axios.util';

export type _FileUploadAPIs = 'UploadImage';

export type _FileUploadService = {
  service: 'fileUpload';
  api: _FileUploadAPIs;
};

export const UploadImage = async ({
  folderPath,
  files,
}: {
  folderPath: string;
  files: File;
}) => {
  const url = `/upload/image?folderPath=${folderPath}`;

  conditionalLog_V2({
    data: { folderPath, files },
    // show: __console_v2.files.service.UploadImage,
    show: false,
    type: 'API-PAYLOAD',
    name: 'UploadImage',
  });

  try {
    const res: string | null = await SendAsync({
      url: url,
      method: 'POST',
      data: { files },
    });

    conditionalLog_V2({
      data: res,
      show: false,
      // show: __console.files.service.UploadImage,
      type: 'API-RESPONSE',
      name: 'UploadImage',
    });

    return res;
  } catch (error) {
    conditionalLog_V2({
      data: error,
      show: false,
      // show: __console.files.service.UploadImage,
      type: 'API-ERROR',
      name: 'UploadImage',
    });
    return null;
  }
};
