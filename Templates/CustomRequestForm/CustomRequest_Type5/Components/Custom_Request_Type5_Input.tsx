import { __ValidationText } from '@constants/validation.text';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { UploadImage } from '@services/general.service';
import { ErrorMessage, Field, FormikValues, useFormikContext } from 'formik';
import { CSR5_FormField } from '../CustomRequestType_5_Extras';

interface Props {
  label: string;
  required: boolean;
  name: string;
  type:
    | 'text'
    | 'date'
    | 'select'
    | 'checkbox'
    | 'number'
    | 'textarea'
    | 'radio'
    | 'file';
  individual?: boolean;
  rows?: number;
  options?: { label: string; value: string | number | boolean }[];
  dependency?: CSR5_FormField;
}

const Custom_Request_Type5_Input = ({
  label,
  required,
  name,
  type,
  options,
  rows,
  dependency,
}: Props) => {
  const {
    setFieldValue,
    setFieldError,
    values,
    setFieldTouched,
    errors,
  }: FormikValues = useFormikContext();
  const { imageFolderPath } = useTypedSelector_v2((state) => state.store);
  const { setShowLoader } = useActions_v2();

  const fileReader = async (event: any, name: string) => {
    if (event.target?.files === null || !event.target.files?.length) return;
    try {
      setShowLoader(true);
      const logoFileURL = await UploadImage({
        folderPath: imageFolderPath,
        files: event?.target?.files[0],
      });
      setShowLoader(false);
      if (!logoFileURL) {
        event.target.value = null;
        setFieldValue(name, '');
      } else {
        setFieldValue(name, logoFileURL);
      }
    } catch (error) {
      setShowLoader(false);
      event.target.value = null;
      setFieldError(
        name,
        __ValidationText.requestConsultation.somethingWentWrong,
      );
    }
  };
  return (
    <>
      {type === 'radio' ? (
        <div className='w-full lg:w-1/2 px-[12px]'>
          <label htmlFor={name} className='mb-[4px] text-normal-text'>
            {label} {required && <span className='text-rose-500'>*</span>}
          </label>
          <div className='mt-[4px] flex items-center'>
            <div>
              {options?.map((option) => (
                <div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]'>
                  <label
                    className='mt-px inline-block pl-[0.15rem] hover:cursor-pointer'
                    htmlFor={name}
                  >
                    <Field
                      className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type='radio'
                      name={name}
                      id={name}
                      value={`${option.value}`}
                      defaultValue={values[`${name}`]}
                      onChange={(e: any) => {
                        if (e.target.value === 'false' && dependency) {
                          setFieldValue(name, `${e.target.value}`);
                          setFieldValue(dependency.name, '');
                          setFieldTouched(dependency.name, false);
                        } else {
                          setFieldValue(name, `${e.target.value}`);
                        }
                      }}
                    />
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            <div className='flex-1'>
              {values[`${name}`] === 'true' && dependency && (
                <Field
                  as={dependency.type === 'textarea' ? 'textarea' : 'input'}
                  type={dependency.type}
                  id={dependency.name}
                  name={dependency.name}
                  rows={dependency.rows}
                  className='form-input !w-[calc(100%-40px)]'
                />
              )}
            </div>
          </div>
          <ErrorMessage
            className='text-rose-500'
            component={'span'}
            name={name}
          />
          {dependency && (
            <ErrorMessage
              className='text-rose-500'
              component={'span'}
              name={dependency.name}
            />
          )}
        </div>
      ) : type === 'file' ? (
        <div className='w-full lg:w-1/2 px-[12px]'>
          <label htmlFor={name} className='mb-[4px] text-normal-text'>
            {label} {required && <span className='text-rose-500'>*</span>}
          </label>
          <div className='mt-[4px]'>
            <input
              type='file'
              id={name}
              name={name}
              className='form-input !w-[calc(100%-40px)]'
              onChange={(e) => fileReader(e, name)}
            />
          </div>
          <ErrorMessage
            className='text-rose-500'
            component={'span'}
            name={name}
          />
        </div>
      ) : (
        <div className='w-full lg:w-1/2 px-[12px]'>
          <label htmlFor={name} className='mb-[4px] text-normal-text'>
            {label} {required && <span className='text-rose-500'>*</span>}
          </label>
          <div className='mt-[4px]'>
            <Field
              as={type === 'textarea' ? 'textarea' : 'input'}
              type={type}
              id={name}
              name={name}
              rows={rows}
              className='form-input !w-[calc(100%-40px)]'
              onKeyDown={
                type === 'number'
                  ? (event: any) =>
                      ['e', 'E', '+', '-', '.'].includes(event.key) &&
                      event.preventDefault()
                  : null
              }
            />
          </div>
          <ErrorMessage
            className='text-rose-500'
            component={'span'}
            name={name}
          />
        </div>
      )}
    </>
  );
};

export default Custom_Request_Type5_Input;
