/*Component Name: ElementAccordionDisplay
Component Functional Details: User can create or update ElementAccordionDisplay master details from here.
Created By: Vikas Patel
Created Date: 16th September 2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */
//import { useEffect, useState } from 'react';
import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import * as helper from '@templates/Home/components/Helper';
import { useTypedSelector_v2 } from 'hooks_v2';
import { useState } from 'react';


const ElementAccordionDisplay = ({ selected_Values, acValues }) => {
  const iconArr = {
    keyboard_arrow_up: 'keyboard_arrow_down',
    keyboard_arrow_down: 'keyboard_arrow_up',
    remove_circle_outline: 'add_circle_outline',
    add_circle_outline: 'remove_circle_outline',
    add_circle: 'remove_circle',
    remove_circle: 'add_circle',
    add: 'remove',
    remove: 'add'
  };
  const [showModal, setShowModal] = useState(null);

  const { id: loggedIn } = useTypedSelector_v2((state) => state.user);
  const toggleLoginModal = (event) => {
  
    setShowModal('login');
  };


  const showHideAccordion = (event) => {
    const parentselector = document.querySelectorAll('.ac-description');
    parentselector.forEach((el) => {
      if (!el.classList.contains('hidden')) {
        el.classList.add('hidden');
      }
      // else
      // {
      //   el.classList.remove('hidden');
      // }
    });
    let symbolobj = event.target.querySelector('.pointer-class');
    let existH = symbolobj.innerHTML;
    const accordionButtons = document.querySelectorAll('.pointer-class');
    accordionButtons?.forEach((el) => {
      if (symbolobj && symbolobj != el) {
        
        if (el.innerHTML === 'remove_circle_outline') {
          el.innerHTML = iconArr.remove_circle_outline;
        }
        // else if (el.innerHTML === 'add_circle_outline') {
        //   el.innerHTML = iconArr.add_circle_outline;
        // } else if (el.innerHTML === 'add_circle') {
        //   el.innerHTML = iconArr.add_circle;
        // }
        else if (el.innerHTML === 'remove_circle') {
          el.innerHTML = iconArr.remove_circle;
        }
        else if (el.innerHTML === 'remove') {
          el.innerHTML = iconArr.remove;
        }
        // else if (el.innerHTML === 'add') {
        //   el.innerHTML = iconArr.add;
        // }
         else if (el.innerHTML === 'keyboard_arrow_down') {
          el.innerHTML = iconArr.keyboard_arrow_down;
        }
        //  else {
        //   el.innerHTML = iconArr.keyboard_arrow_up;
        // }
      }

      // if (el !== symbolobj) el.innerHTML = iconArr.remove_circle_outline;
    });

    if (symbolobj) {
      if (existH === iconArr.remove_circle_outline) {
        event.target.querySelector('.ac-description').classList.remove('hidden');
        symbolobj.innerHTML = iconArr.add_circle_outline;
      } else if (existH === iconArr.remove_circle) {
        event.target.querySelector('.ac-description').classList.remove('hidden');
        symbolobj.innerHTML = iconArr.add_circle;
      } else if (existH === iconArr.add_circle) {
        event.target.querySelector('.ac-description').classList.add('hidden');
        symbolobj.innerHTML = iconArr.remove_circle;
      }
      else if (existH === iconArr.add) {
        event.target.querySelector('.ac-description').classList.add('hidden');
        symbolobj.innerHTML = iconArr.remove;
      }else if (existH === iconArr.remove) {
        event.target.querySelector('.ac-description').classList.remove('hidden');
        symbolobj.innerHTML = iconArr.add;
      }
      else if (existH === iconArr.keyboard_arrow_up) {
        event.target.querySelector('.ac-description').classList.add('hidden');
        symbolobj.innerHTML = iconArr.keyboard_arrow_down;
      }else if (existH === iconArr.keyboard_arrow_down) {
        event.target.querySelector('.ac-description').classList.remove('hidden');
        symbolobj.innerHTML = iconArr.keyboard_arrow_up;
      } else {
        event.target.querySelector('.ac-description').classList.add('hidden');
        symbolobj.innerHTML = iconArr.remove_circle_outline;
      }
    }
  };

  return (
    <>
      {acValues.length > 0 && (
        <>
          {acValues.map((acValue, index) => {
            let tmpTitleBg;
            let tmpTitleBgOption;
            let tmpTitleBorderType;
            let tmpTitleBorderColor;
            let tmpTitleBorderSize;
            let titleClass;
            let descClass;
            let liClass;
            let titleColor;
            let descColor;
            let tmpBorderRadius;
            if (selected_Values !== undefined) {
              Object.entries(selected_Values).map(([key, value]) => {
                if (key == 'FullAccordion_title_bg') {
                  tmpTitleBg = value.value;
                }
                if (key == 'FullAccordion_title_bg_option') {
                  tmpTitleBgOption = value.value;
                }
                if (key == 'FullAccordion_title_border_type') {
                  tmpTitleBorderType = value.value;
                }
                if (key == 'FullAccordion_title_border_color') {
                  tmpTitleBorderColor = value.value;
                }
                if (key == 'FullAccordion_title_border_size') {
                  tmpTitleBorderSize = value.value;
                }
                if (key == 'AccordionTitle_final_class') {
                  titleClass = value.value;
                }
                if (key == 'AccordionDescription_final_class') {
                  descClass = value.value;
                }
                if (key == 'AccordionContainer_final_class') {
                  liClass = value.value;
                }
                if (key == 'AccordionDescription_font_color') {
                  descColor = value.value;
                }
                if (key == 'AccordionTitle_font_color') {
                  titleColor = value.value;
                }
                if (key == 'FullAccordion_border_radius') {
                  tmpBorderRadius = value.value;
                }
              });
            }

            let liStyle = '';
            let titleStyle = '';
            if (tmpTitleBorderType === 'box')
              liClass += ' border-[' + tmpTitleBorderSize + 'px]';
            else if (tmpTitleBorderType === 'single')
              liClass += ' border-b-[' + tmpTitleBorderSize + 'px]';

            if (tmpBorderRadius !== '')
              liClass += ' rounded-[' + tmpBorderRadius + 'px]';

            if (tmpTitleBgOption === 'Color')
              titleStyle += 'background: ' + tmpTitleBg + '; ';
            if (tmpTitleBorderColor !== '')
              liStyle += 'border-color: ' + tmpTitleBorderColor + '; ';

            return (
              <li
                key={index}
                className={`mb-4 overflow-hidden last:mb-0 cursor-pointer ${liClass}`}
                style={{ borderColor: tmpTitleBorderColor }}
                onClick={(acValue.secure === 'Yes' && !loggedIn) ? toggleLoginModal : showHideAccordion}
              >
                {
                  (acValue.secure === 'Yes' && !loggedIn) ? <> 
                    <button
                        className={`w-full flex justify-between items-center ${titleClass} pointer-events-none`}
                        style={{
                          background: tmpTitleBgOption === 'Color' ? tmpTitleBg : '',
                          color: titleColor,
                        }}
                      >
                            {/* <div className='text-defaule-text'> */}
                            {acValue?.titleheadtag ?
                             <div dangerouslySetInnerHTML={{ __html: `<${acValue.titleheadtag}>${acValue.title}</${acValue.titleheadtag}>`}} className='text-defaule-text pointer-events-none'></div>
                            : 
                            <div className='text-defaule-text pointer-events-none'>{acValue?.title}</div>
                          }
\                            {/* </div> */}
                           
                      </button>
                  </>
                  :
                  <>
                      <button
                      className={`w-full flex justify-between items-center ${titleClass} pointer-events-none`}
                      style={{
                        background: tmpTitleBgOption === 'Color' ? tmpTitleBg : '',
                        color: titleColor,
                      }}
                    >
                          {/* <div className='text-defaule-text'> */}
                          
                          {acValue?.titleheadtag ?
                             <div dangerouslySetInnerHTML={{ __html: `<${acValue.titleheadtag}>${acValue.title}</${acValue.titleheadtag}>`}} className='text-defaule-text pointer-events-none'></div>
                            : 
                            <div className='text-defaule-text pointer-events-none'>{acValue?.title}</div>
                          }
                          {/* </div> */}
                          <span className='material-icons-outlined ml-3 pointer-class pointer-events-none'>
                            {helper.getSymbol(acValue.icon, acValue.openstatus)}
                          </span>
                    </button>
                  </>
                }
                
                <div
                  className={`ac-description ${
                    acValue.openstatus != 'Yes' ? 'hidden' : ''
                  } ${descClass}`}
                  style={{ color: descColor }}
                >
                  <div
                    className='text-descrition'
                    dangerouslySetInnerHTML={{ __html: acValue.desc }}
                  ></div>
                </div>
              </li>
            );
          })}
        </>
      )}

{showModal === 'login' && <LoginModal modalHandler={setShowModal} />}
        {showModal === 'forgot' && <ForgotModal modalHandler={setShowModal} />}
    </>
  );
};

export default ElementAccordionDisplay;
