import { useTypedSelector_v2 } from '@hooks_v2/index';
import { UploadImage } from '@services/file.service';
import { ErrorMessage, Field, useFormikContext } from 'formik';

export interface Option {
  value: string;
  text: string;
}

interface Props {
  label: string;
  name: string;
  placeholder: string;
  isRequired: boolean;
  type?: 'text' | 'number' | 'password' | 'dropdown' | 'textarea' | 'file';
  options?: Option[];
  key: string;
}
const ConsultationInput = ({
  name,
  label,
  placeholder,
  isRequired,
  type,
  options = [],
  key,
}: Props) => {
  const { imageFolderPath } = useTypedSelector_v2((state) => state.store);
  const { setFieldValue } = useFormikContext();

  const handleFileUpload = async (file: File) => {
    try {
      const url: string | null = await UploadImage({
        folderPath: imageFolderPath,
        files: file,
      });
      if (url) {
        setFieldValue('teamLogo', url);
      }
    } catch (e) {
      console.log('exception -- uploading image -- ', e);
    }
  };
  return (
    <>
      {type === 'file' ? (
        <div className='w-full lg:w-1/3 px-[15px]'>
          <label
            className='text-default-text font-[600] w-full md:w-full md:text-left mb-[8px] block'
            htmlFor=''
          >
            Upload your Team Logo:
          </label>
          <div className='flex items-center justify-between border border-[#a5a5a5] text-medium-text pl-[5px] pr-[5px] pt-[5px] pb-[5px] rounded'>
            <div className=''>
              <label
                htmlFor={name}
                className='btn-primary text-medium-text inline-flex flex-wrap items-center justify-between pl-[12px] pr-[12px] pt-[8px] pb-[8px]'
              >
                <span className='material-icons-round mr-[5px]'>
                  folder_open
                </span>
                <span>Upload</span>
              </label>
              <input
                type='file'
                name={name}
                id={name}
                className='sr-only'
                onChange={(e) => {
                  if (e.target.files) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-full ${
            type === 'textarea' ? 'lg:w-3/3' : 'lg:w-1/3'
          }  px-[15px]`}
          key={key}
        >
          <label
            htmlFor={name}
            className='text-default-text font-[600] w-full md:w-full md:text-left mb-[8px] block'
          >
            {label} {isRequired && <span className='text-red-500'>*</span>}
          </label>
          {type === 'dropdown' ? (
            <div>
              <Field as='select' name={name} className='form-input'>
                {options.map((option: Option) => (
                  <option value={option.value}>{option.text}</option>
                ))}
              </Field>
              <ErrorMessage name={name}>
                {(msg) => (
                  <span className='text-red-500 text-xs mt-1'>{msg}</span>
                )}
              </ErrorMessage>
            </div>
          ) : type === 'textarea' ? (
            <div>
              <Field
                name={name}
                as='textarea'
                id={name}
                placeholder={placeholder}
                rows={4}
                className='form-input'
              />
              <ErrorMessage name={name}>
                {(msg) => (
                  <span className='text-red-500 text-xs mt-1'>{msg}</span>
                )}
              </ErrorMessage>
            </div>
          ) : (
            <div>
              <Field
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                className='form-input'
              />
              <ErrorMessage name={name}>
                {(msg) => (
                  <span className='text-red-500 text-xs mt-1'>{msg}</span>
                )}
              </ErrorMessage>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ConsultationInput;
