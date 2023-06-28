import { __pagesText } from '@constants/pages.text';
import { signupFourFormFields } from '../SU4_Extras';
import SU4_Input from './SU4_Input';

const PersonalSection = () => {
  return (
    <div className='w-full mx-auto'>
      <div className='text-xl md:text-2xl lg:text-sub-title font-sub-title text-color-sub-title pb-2 mb-4 border-b border-b-gray-300'>
        {__pagesText.accountPage.personalInformation}
      </div>
      <div className='flex flex-wrap -mx-3 gap-y-6 mb-8'>
        {signupFourFormFields.personalInformation.map((field) => (
          <SU4_Input
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            label={field.label}
            required={field.required}
            options={field?.options || []}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonalSection;
