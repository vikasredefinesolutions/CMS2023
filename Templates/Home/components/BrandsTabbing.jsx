/*Component Name: ElementCarousel
Component Functional Details: Element for Component ElementCarousel  
Created By: Vikas Patel
Created Date: 17th September 2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */
import { useState } from 'react';

const BrandsTabbing = ({ componentValue }) => {
  const selectedVal = componentValue.selectedVal;
  
let className = '';
let icon;
let iconFontSize;
let iconFontWeight;
let iconTextAlignment;
let iconFontColor;
let iconLeftMargin;
let iconRightMargin;
let iconTopMargin;
let iconBottomMargin;
let iconLeftPadding;
let iconRightPadding;
let iconTopPadding;
let iconBottomPadding;
let iconType;

let imageOrIcon = 'Icon';
let element = componentValue;
let key = "Icon";
let propName = key;
let bgPropertyName = "Icon";
let iconStr = '';

if (Object.keys(element.selectedVal).includes(key)) {
    Object.entries(element.selectedVal).map(([keyq, valueq]) => {
    if (keyq == bgPropertyName) {
        icon = valueq.value;
    }
    if (keyq == bgPropertyName + '_image_or_icon') {
        imageOrIcon = valueq.value;
    }
    if (keyq == bgPropertyName + '_type') {
        iconType = valueq.value;
    }
    if (keyq == bgPropertyName + '_font_color') {
        iconFontColor = valueq.value;
    }
    if (keyq == bgPropertyName + '_font_size') {
        iconFontSize = valueq.value;
    }
    if (keyq == bgPropertyName + '_font_weight') {
        iconFontWeight = valueq.value;
    }
    if (keyq == bgPropertyName + '_text_alignment') {
        iconTextAlignment = valueq.value;
    }
    if (keyq == bgPropertyName + '_left_margin') {
        iconLeftMargin = valueq.value;
    }
    if (keyq == bgPropertyName + '_right_margin') {
        iconRightMargin = valueq.value;
    }
    if (keyq == bgPropertyName + '_top_margin') {
        iconTopMargin = valueq.value;
    }
    if (keyq == bgPropertyName + '_bottom_margin') {
        iconBottomMargin = valueq.value;
    }
    if (keyq == bgPropertyName + '_left_padding') {
        iconLeftPadding = valueq.value;
    }
    if (keyq == bgPropertyName + '_right_padding') {
        iconRightPadding = valueq.value;
    }
    if (keyq == bgPropertyName + '_top_padding') {
        iconTopPadding = valueq.value;
    }
    if (keyq == bgPropertyName + '_bottom_padding') {
        iconBottomMargin = valueq.value;
    }
    });
    // console.log(element.selected_Values, 'KE', iconType);
    
    if (imageOrIcon === 'Icon') {
    if (iconType == 'fontawesome') {
        className += '';
    } else if (iconType == 'googlematerial') {
        className += 'material-icons-outlined';
    } else if (iconType == 'googlesymbol') {
        className += 'material-symbol-outlined';
    }
    if (iconFontSize) {
        className += ' ' + iconFontSize;
    }
    if (iconFontWeight) {
        className += ' ' + iconFontWeight;
    }
    }

    if (iconLeftPadding) {
    className += ' ' + iconLeftPadding;
    }
    if (iconRightPadding) {
    className += ' ' + iconRightPadding;
    }
    if (iconTopPadding) {
    className += ' ' + iconTopPadding;
    }
    if (iconBottomPadding) {
    className += ' ' + iconBottomPadding;
    }
    if (iconLeftMargin) {
    className += ' ' + iconLeftMargin;
    }
    if (iconRightMargin) {
    className += ' ' + iconRightMargin;
    }
    if (iconTopMargin) {
    className += ' ' + iconTopMargin;
    }
    if (iconBottomMargin) {
    className += ' ' + iconBottomMargin;
    }

    
    if (imageOrIcon === 'Icon') {
    iconStr = '<span class="' + (icon === 'local_offer' ? className.replace('-outlined', '') : className) + '"';
    if (iconFontColor)
        iconStr += ' style="color: ' + iconFontColor + ';"';
    iconStr += '>' + icon + '</span>';
    } else {
    iconStr = '<span class="' + className + '"';
    iconStr += '><img src="' + icon + '" /></span>';
    }
}

let headline = '';
let startHeadlineTag = '';
let endHeadlineTag = '';
let headlineClass = '';
let descriptionClass = 'text-medium-text text-center mx-auto max-w-3xl pb-[30px] pt-[50px]';
if(componentValue.selectedVal.Description_final_class)
{
    descriptionClass = componentValue.selectedVal.Description_final_class.value;
}

if(componentValue.selectedVal.Headline_final_class)
{
    headlineClass = componentValue.selectedVal.Headline_final_class.value;
}
if(componentValue.selectedVal.Headline_header_tag)
{
    startHeadlineTag = '<'+componentValue.selectedVal.Headline_header_tag+'>';
    endHeadlineTag = '</'+componentValue.selectedVal.Headline_header_tag+'>';
}


    let buttonId = '';
    let btnClassName = '';
    let pmClassName = '';
    let count = 0;
    let Button_className = '';
    let Button_parent;
    let btnStyle = '';
    let btnPadding = false;

    Object.entries(componentValue.selectedVal).map(([key, value]) => {
      if (value.type == 'btn_size') {
        buttonId = key.replace('_size', '');
        if (buttonId === 'Button1') Button_className += ' ' + value.value;
      }

      if (value.type == 'btn_alignment') {
        buttonId = key.replace('_alignment', '');
        if (buttonId === 'Button1') Button_parent += ' ' + value.value;
      }

      if (value.type == 'btn_transform') {
        buttonId = key.replace('_text_transform', '');
        if (buttonId === 'Button1') Button_className += ' ' + value.value;
      }

      if (value.type == 'btn_link') {
        buttonId = key.replace('_link', '');
        if (x.querySelectorAll('#' + buttonId).length > 0) {
          x.querySelectorAll('#' + buttonId)[0].href = value.value;
        }
      }

      if (value.type == 'btn_style') {
        buttonId = key.replace('_style', '');

        if (buttonId === 'Button1') {
          Button_className += ' ' + value.value;
          btnStyle = value.value;
        }
      }

      if (value.type == 'btn_link_target') {
        buttonId = key.replace('_window', '');
        if (x.querySelectorAll('#' + buttonId).length > 0) {
          x.querySelectorAll('#' + buttonId)[0].target = value.value;
        }
      }

      if (value.type == 'btn_display') {
        if (value.value == 'No') {
          buttonId = key.replace('_display', '');
          if (x.querySelectorAll('#' + buttonId).length > 0) {
            x.querySelectorAll('#' + buttonId)[0].remove();
          }
        }
      }

      /* Padding & Margin Code for Button Text */
      if (value.type == 'btn_left_padding') {
        buttonId = key.replace('_left_padding', '');
        if (buttonId === 'Button1') {
          btnPadding = true;
          Button_className += ' ' + value.value;
        }
      }
      if (value.type == 'btn_top_padding') {
        buttonId = key.replace('_top_padding', '');
        if (buttonId === 'Button1') {
          btnPadding = true;
          Button_className += ' ' + value.value;
        }
      }
      if (value.type == 'btn_right_padding') {
        buttonId = key.replace('_right_padding', '');
        if (buttonId === 'Button1') {
          btnPadding = true;
          Button_className += ' ' + value.value;
        }
      }
      if (value.type == 'btn_bottom_padding') {
        buttonId = key.replace('_bottom_padding', '');
        if (buttonId === 'Button1') {
          Button_className += ' ' + value.value;
          btnPadding = true;
        }
      }
      if (value.type == 'btn_left_margin') {
        buttonId = key.replace('_left_margin', '');
        if (buttonId === 'Button1') Button_className += ' ' + value.value;
      }
      if (value.type == 'btn_top_margin') {
        buttonId = key.replace('_top_margin', '');
        if (buttonId === 'Button1') Button_className += ' ' + value.value;
      }
      if (value.type == 'btn_right_margin') {
        buttonId = key.replace('_right_margin', '');
        if (buttonId === 'Button1') Button_className += ' ' + value.value;
      }
      if (value.type == 'btn_bottom_margin') {
        buttonId = key.replace('_bottom_margin', '');
        if (buttonId === 'Button1') Button_className += ' ' + value.value;
      }

      if (value.type == 'btn_font_family') {
        buttonId = key.replace('_font_family', '');
        if (buttonId === 'Button1') Button_className += ' ' + value.value;
      }

      if (value.type == 'btn_font_size') {
        buttonId = key.replace('_font_size', '');
        if (buttonId === 'Button1') Button_className += ' ' + value.value;
      }

      if (value.type == 'btn_font_weight') {
        buttonId = key.replace('_font_weight', '');
        if (buttonId === 'Button1') Button_className += ' ' + value.value;
      }

      if (value.type == 'btn_line_height') {
        buttonId = key.replace('_line_height', '');
        if (buttonId === 'Button1') Button_className += ' ' + value.value;
      }

      if (value.type == 'btn_letter_spacing') {
        buttonId = key.replace('_letter_spacing', '');
        if (buttonId === 'Button1')
          Button_className += ' tracking-[' + value.value + ']';
      }
    });

    
    if (btnStyle === '') Button_className += ' inline-block custbtn-primary';
      if (!btnPadding) {
        Button_className += ' pt-[10px] pb-[10px] pl-[20px] pr-[20px]';
      }
      
    const [activeTabColor, setActiveTabColor] = useState(componentValue.selectedVal?.brandtabbing?.value[0].color);
    const [activeTab, setActiveTab] = useState(componentValue.selectedVal?.brandtabbing?.value[0].title);
  return (
    <>
<div class="mainsection">
    <div class="overflow-x-hidden">
        <div class="w-full">
            <div class="mt-[12px] mb-[12px] text-center" id="Icon">{iconStr}</div>
            {(componentValue.selectedVal?.Button1_display && componentValue.selectedVal?.Button1_display.value === 'Yes') && 
                <div className={Button_parent} id="Button1Parent"><a href="javascript:void(0);" className={Button_className} id="Button1">{componentValue.selectedVal?.Button1.value}</a></div>
            }
            
            {componentValue.selectedVal?.Headline?.value && 
                <div class="mb-[12px] text-large-text font-[600] mt-[12px] text-center" id="Headline">
                    {startHeadlineTag}{componentValue.selectedVal.Headline.value}{endHeadlineTag}
                </div>
            }

            
            <div class="flex flex-col md:flex-row md:-mr-px text-default-text" id="tabbingArea">
            	<div class="w-full">
            		<ul class="w-full flex justify-center max-w-4xl mx-auto flex-wrap" id="topBorder">
                        <li className=''>
                            <div
                                className={`inline-block ${activeTabColor} h-[8px] w-[96px] mt-[8px] mb-[8px]`}
                            />
                        </li>
            		</ul>
            		<ul class="w-full flex justify-center max-w-4xl mx-auto flex-wrap" id="topTabbing">
                        {componentValue.selectedVal?.brandtabbing?.value.map((category, index) => {
                            const activeClass =
                                activeTab === category.title
                                ? 'text-anchor hover:text-anchor-hover border-[#006CD1] border-b-[2px]'
                                : 'rounded-sm';

                            return (
                                <li key={index} className='mr-[2px] md:mr-0 font-[600]'>
                                <button
                                    onClick={() => {setActiveTab(category.title); setActiveTabColor(category.color);}}
                                    className={
                                    `tab pt-[8px] pb-[8px] pl-[8px] pr-[8px] mr-[4px] block hover:text-anchor focus:outline-none font-[600] border-anchor ` +
                                    activeClass
                                    }
                                >
                                    {category.title}
                                </button>
                                </li>
                            );
                            })}
            		</ul>

            		<div class="ml-[16px] mr-[16px]">
            			<div class='w-full max-w-6xl  text-center mx-auto pt-[30px]' id="tabContent">
                        {componentValue.selectedVal?.brandtabbing?.value.map((category, index) => {
                                return (<>
                                    <div className={`panel-01 tab-content pb-[16px] ${activeTab === category.title ? "" : "hidden"}`}>
                                        <div className='w-full'>
                                            <div className='flex flex-wrap ml-[-12px] mr-[-12px] mt-[-12px]'>
                                                {category.contents && category.contents.map((tabContent) => {
                                                    return (<>
                                                            <div className={`w-full lg:w-1/${category.perRow} px-3 mt-3 mb-3`}>
                                                                <div className={`border border-gray-border relative font-light ${category.color} hover:${category.color}`}>
                                                                    <div className="flex justify-center items-center cursor-pointer">
                                                                        <a href={tabContent.link} title={tabContent.alt}>
                                                                            <img src={tabContent.image} alt={tabContent.alt} class="w-full mx-auto" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    </>)
                                                })}

                                            </div>
                                        </div>
                                    </div>
                                </>)
                            })
                        }
            			</div>
                        {componentValue.selectedVal?.Description?.value && 
                            <div className='container mx-auto'>
                			    <div className={`${descriptionClass} max-w-3xl mx-auto`} dangerouslySetInnerHTML={{ __html:componentValue.selectedVal?.Description?.value}}>
                			    </div>
                            </div>
                        }
            		</div>

            		<ul className=" w-full flex justify-center flex-wrap" id="bottomTabbing">
                        {componentValue.selectedVal?.brandtabbing?.value.map((category, index) => {
                            return (
                                <li key={index} className='lg:w-1/5 w-full'>
                                <button
                                    onClick={() => {setActiveTab(category.title); setActiveTabColor(category.color);}}
                                    className={
                                    `${category.color.replace('bg-', 'custbtn-')} hover:${category.color.replace('bg-', 'custbtn-')} block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center font-[600] w-full`}
                                >
                                    {category.title}
                                </button>
                                </li>
                            );
                            })}

            		</ul>
            	</div>
                
            </div>
        </div>
    </div>
</div>
    </>
  );
};

export default BrandsTabbing;
