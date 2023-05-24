import ElementAccordionDisplay from '@templates/Home/components/ElementAccordionDisplay';

import * as ReactDOMServer from 'react-dom/server';
import * as dynamicFunctions from './DynamicFunction';

export const assignMultipleClass = (classArr, obj) => {
  let tmpVal = classArr.split(' ');

  tmpVal.forEach((el) => {
    obj.classList.add(el);
  });
};

export const getSymbol = (symbol, status) => {
  let returnSymbol = '';
  if (symbol === 'caret') {
    if (status === 'Yes') returnSymbol = 'keyboard_arrow_down';
    else returnSymbol = 'keyboard_arrow_up';
  } else if (symbol === 'addcircle') {
    if (status === 'Yes') returnSymbol = 'remove_circle';
    else returnSymbol = 'add_circle';
  } else {
    if (status === 'Yes') returnSymbol = 'remove_circle_outline';
    else returnSymbol = 'add_circle_outline';
  }
  return returnSymbol;
};

export const updateSetProperties = (element) => {
  let x = document.getElementById('div' + element.no);
  if (element.selectedVal != undefined && element.selectedVal != '') {
    if (element.properties.leftBoxBg) {
      let cArr = ['leftBoxBg', 'centerBoxBg', 'rightBoxBg'];
      cArr.map((cvalue) => {
        let bgValue = '';
        let imageOrColor = '';
        let hBgValue = '';
        let hImageOrColor = '';
        let bLink = '';

        Object.entries(element.selectedVal).map(([key, value]) => {
          if (key == cvalue) {
            bgValue = value.value;
          }
          if (key == cvalue + '_bg_type') {
            imageOrColor = value.value;
          }
          if (key == cvalue + '_hover_option') {
            hBgValue = value.value;
          }
          if (key == cvalue + '_bg_type_hover') {
            hImageOrColor = value.value;
          }
          // if (key == cvalue+"_text_color")
          // {
          //     tmpTextColor =  value;
          // }
          // if (key == cvalue +"_text_color_hover")
          // {
          //     tmpHoverTextColor =  value;
          // }
          if (key == cvalue + '_link') {
            bLink = value.value;
          }
        });

        if (imageOrColor) {
          if (x && x.querySelectorAll('#' + cvalue).length > 0) {
            if (imageOrColor === 'Color')
              x.querySelectorAll('#' + cvalue)[0].style =
                'background: ' + bgValue;
            else
              x.querySelectorAll('#' + cvalue)[0].style =
                "background-image: url('" + bgValue + "')";
          }
        }

        if (hImageOrColor) {
          if (x && x.querySelectorAll('#' + cvalue).length > 0) {
            if (hImageOrColor === 'Color')
              x.querySelectorAll('#' + cvalue + 'Hover')[0].style =
                'background: ' + hBgValue;
            else
              x.querySelectorAll('#' + cvalue + 'Hover')[0].style =
                "background-image: url('" + hBgValue + "')";
          }
        }

        // if(bLink)
        // {
        //   x.querySelectorAll('#'+cvalue+"Link")[0].href = bLink;
        // }
      });
    }
    let elProperties;
    let buttonId = '';
    let className = '';
    let pmClassName = '';
    let count = 0;
    let Button_className = '';
    let Button1_className = '';
    let Button2_className = '';

    let Button_parent;
    let Button1_parent;
    let Button2_parent;
    let btnStyle = '';
    let btn1Style = '';
    let btn2Style = '';

    let btnPadding = false;
    let btn1Padding = false;
    let btn2Padding = false;

    Object.entries(element.selectedVal).map(([key, value]) => {
      if (value.type == 'btn_size') {
        buttonId = key.replace('_size', '');

        if (buttonId === 'Button') Button_className += ' ' + value.value;
        else if (buttonId === 'Button1') Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2') Button2_className += ' ' + value.value;
      }

      if (value.type == 'btn_alignment') {
        buttonId = key.replace('_alignment', '');
        if (buttonId === 'Button') Button_parent += ' ' + value.value;
        else if (buttonId === 'Button1') Button1_parent += ' ' + value.value;
        else if (buttonId === 'Button2') Button2_parent += ' ' + value.value;
      }

      if (value.type == 'btn_transform') {
        buttonId = key.replace('_text_transform', '');
        if (buttonId === 'Button') Button_className += ' ' + value.value;
        else if (buttonId === 'Button1') Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2') Button2_className += ' ' + value.value;
      }

      if (value.type == 'btn_link') {
        buttonId = key.replace('_link', '');
        if (x.querySelectorAll('#' + buttonId).length > 0) {
          x.querySelectorAll('#' + buttonId)[0].href = value.value;
        }
      }

      if (value.type == 'btn_style') {
        buttonId = key.replace('_style', '');

        if (buttonId === 'Button') {
          Button_className += ' ' + value.value;
          btnStyle = value.value;
        } else if (buttonId === 'Button1') {
          Button1_className += ' ' + value.value;
          btn1Style = value.value;
        } else if (buttonId === 'Button2') {
          Button2_className += ' ' + value.value;
          btn2Style = value.value;
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
        if (buttonId === 'Button') {
          btnPadding = true;
          Button_className += ' ' + value.value;
        } else if (buttonId === 'Button1') {
          Button1_className += ' ' + value.value;
          btn1Padding = true;
        } else if (buttonId === 'Button2') {
          btn2Padding = true;
          Button2_className += ' ' + value.value;
        }
      }
      if (value.type == 'btn_top_padding') {
        buttonId = key.replace('_top_padding', '');
        if (buttonId === 'Button') {
          btnPadding = true;
          Button_className += ' ' + value.value;
        } else if (buttonId === 'Button1') {
          Button1_className += ' ' + value.value;
          btn1Padding = true;
        } else if (buttonId === 'Button2') {
          Button2_className += ' ' + value.value;
          btn2Padding = true;
        }
      }
      if (value.type == 'btn_right_padding') {
        buttonId = key.replace('_right_padding', '');
        if (buttonId === 'Button') {
          btnPadding = true;
          Button_className += ' ' + value.value;
        } else if (buttonId === 'Button1') {
          Button1_className += ' ' + value.value;
          btn1Padding = true;
        } else if (buttonId === 'Button2') {
          Button2_className += ' ' + value.value;
          btn2Padding = true;
        }
      }
      if (value.type == 'btn_bottom_padding') {
        buttonId = key.replace('_bottom_padding', '');
        if (buttonId === 'Button') {
          Button_className += ' ' + value.value;
          btnPadding = true;
        } else if (buttonId === 'Button1') {
          Button1_className += ' ' + value.value;
          btn1Padding = true;
        } else if (buttonId === 'Button2') {
          Button2_className += ' ' + value.value;
          btn2Padding = true;
        }
      }
      if (value.type == 'btn_left_margin') {
        buttonId = key.replace('_left_margin', '');
        if (buttonId === 'Button') Button_className += ' ' + value.value;
        else if (buttonId === 'Button1') Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2') Button2_className += ' ' + value.value;
      }
      if (value.type == 'btn_top_margin') {
        buttonId = key.replace('_top_margin', '');
        if (buttonId === 'Button') Button_className += ' ' + value.value;
        else if (buttonId === 'Button1') Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2') Button2_className += ' ' + value.value;
      }
      if (value.type == 'btn_right_margin') {
        buttonId = key.replace('_right_margin', '');
        if (buttonId === 'Button') Button_className += ' ' + value.value;
        else if (buttonId === 'Button1') Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2') Button2_className += ' ' + value.value;
      }
      if (value.type == 'btn_bottom_margin') {
        buttonId = key.replace('_bottom_margin', '');
        if (buttonId === 'Button') Button_className += ' ' + value.value;
        else if (buttonId === 'Button1') Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2') Button2_className += ' ' + value.value;
      }

      if (value.type == 'btn_font_family') {
        buttonId = key.replace('_font_family', '');
        if (buttonId === 'Button') Button_className += ' ' + value.value;
        else if (buttonId === 'Button1') Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2') Button2_className += ' ' + value.value;
      }

      if (value.type == 'btn_font_size') {
        buttonId = key.replace('_font_size', '');
        if (buttonId === 'Button') Button_className += ' ' + value.value;
        else if (buttonId === 'Button1') Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2') Button2_className += ' ' + value.value;
      }

      if (value.type == 'btn_font_weight') {
        buttonId = key.replace('_font_weight', '');
        if (buttonId === 'Button') Button_className += ' ' + value.value;
        else if (buttonId === 'Button1') Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2') Button2_className += ' ' + value.value;
      }

      if (value.type == 'btn_line_height') {
        buttonId = key.replace('_line_height', '');
        if (buttonId === 'Button') Button_className += ' ' + value.value;
        else if (buttonId === 'Button1') Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2') Button2_className += ' ' + value.value;
      }
      
      if (value.type == 'btn_letter_spacing') {
        buttonId = key.replace('_letter_spacing', '');
        if (buttonId === 'Button') Button_className += ' tracking-[' + value.value+']';
        else if (buttonId === 'Button1') Button1_className += ' tracking-[' + value.value+']';
        else if (buttonId === 'Button2') Button2_className += ' tracking-[' + value.value+']';
      }
    });

    if (x.querySelectorAll('#Button').length > 0) {
      if (btnStyle === '') Button_className += ' inline-block custbtn-primary';
      if (!btnPadding) {
        Button_className += ' pt-[10px] pb-[10px] pl-[20px] pr-[20px]';
      }
      x.querySelectorAll('#Button')[0].className = Button_className;
      if (x.querySelectorAll('#ButtonParent').length > 0) {
        x.querySelectorAll('#ButtonParent')[0].className = Button_parent;
      }
    }

    if (x.querySelectorAll('#Button1').length > 0) {
      if (btn1Style === '')
        Button1_className += ' inline-block custbtn-primary';

      if (!btn1Padding) {
        Button1_className += ' pt-[10px] pb-[10px] pl-[20px] pr-[20px]';
      }

      x.querySelectorAll('#Button1')[0].className = Button1_className;
      if (x.querySelectorAll('#Button1Parent').length > 0) {
        x.querySelectorAll('#Button1Parent')[0].className = Button1_parent;
      }
    }

    if (x.querySelectorAll('#Button2').length > 0) {
      if (btn2Style === '')
        Button2_className += ' inline-block custbtn-primary';
      if (!btn2Padding) {
        Button2_className += ' pt-[10px] pb-[10px] pl-[20px] pr-[20px]';
      }
      x.querySelectorAll('#Button2')[0].className = Button2_className;
      if (x.querySelectorAll('#Button2Parent').length > 0) {
        x.querySelectorAll('#Button2Parent')[0].className = Button2_parent;
      }
    }

    //      let elProperties;
    Object.entries(element.selectedVal).map(([key, value]) => {
      if (typeof element.properties === 'string') {
        element.properties = JSON.parse(element.properties);
      }

      if (value.type == 'text') {
        if (x.querySelectorAll('#' + key).length > 0) {
          x.querySelectorAll('#' + key)[0].innerHTML = value.value;
        }
      }

      if (value.type === 'colcount') {
        if (value.value == '3') {
          if (x && x.querySelectorAll('#centerContent').length > 0) {
            x.querySelectorAll('#centerContent')[0].classList.remove('hidden');
            x.querySelectorAll('#leftContent')[0].classList.add('lg:w-1/3');
            x.querySelectorAll('#rightContent')[0].classList.add('lg:w-1/3');

            x.querySelectorAll('#leftContent')[0].classList.remove('lg:w-1/2');
            x.querySelectorAll('#rightContent')[0].classList.remove('lg:w-1/2');
          }
          if (x && x.querySelectorAll('#centerBox').length > 0) {
            x.querySelectorAll('#centerBox')[0].classList.remove('hidden');
            x.querySelectorAll('#leftBox')[0].classList.add('lg:w-1/3');
            x.querySelectorAll('#rightBox')[0].classList.add('lg:w-1/3');

            x.querySelectorAll('#leftBox')[0].classList.remove('lg:w-1/2');
            x.querySelectorAll('#rightBox')[0].classList.remove('lg:w-1/2');
          }
        } else {
          if (x && x.querySelectorAll('#centerContent').length > 0) {
            x.querySelectorAll('#centerContent')[0].classList.add('hidden');
            x.querySelectorAll('#leftContent')[0].classList.add('lg:w-1/2');
            x.querySelectorAll('#rightContent')[0].classList.add('lg:w-1/2');

            x.querySelectorAll('#leftContent')[0].classList.remove('lg:w-1/3');
            x.querySelectorAll('#rightContent')[0].classList.remove('lg:w-1/3');
          }
          if (x && x.querySelectorAll('#centerBox').length > 0) {
            x.querySelectorAll('#centerBox')[0].classList.add('hidden');
            x.querySelectorAll('#leftBox')[0].classList.add('lg:w-1/2');
            x.querySelectorAll('#rightBox')[0].classList.add('lg:w-1/2');

            x.querySelectorAll('#leftBox')[0].classList.remove('lg:w-1/3');
            x.querySelectorAll('#rightBox')[0].classList.remove('lg:w-1/3');
          }
        }
      }

      if (value.type === 'iconclass') {
        let propName = key;
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
        let bgPropertyName = key;
        let imageOrIcon = 'Icon';

        if (Object.keys(element.selectedVal).includes(key)) {
          Object.entries(element.selectedVal).map(([keyq, valueq]) => {
            if (keyq == bgPropertyName) {
              icon = valueq.value;
            }
            if (keyq == bgPropertyName+'_image_or_icon') {
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
          let className = '';
          if(imageOrIcon === 'Icon')
          {
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

          let iconStr = '';
          if(imageOrIcon === 'Icon')
          {
              iconStr = '<span class="'+className+'"';
              if(iconFontColor)
                  iconStr += ' style="color: '+iconFontColor+';"';
              iconStr += '>'+icon+'</span>';    
          }
          else
          {
              iconStr = '<span class="'+className+'"';
              iconStr += '><img src="'+icon+'" /></span>';   
          }
          //let x = ReactDOM.findDOMNode(props.refArray.current[props.currentComponent]);
          if (x && x.querySelectorAll('#' + key).length > 0)
            x.querySelectorAll('#' + key)[0].innerHTML = iconStr;
          if (iconTextAlignment) {
            x.querySelectorAll('#' + propName)[0].className = iconTextAlignment;
          }
        }
      }

      if (!element.properties.leftBoxBg && value.type === 'individualbg') {
        if (x && x.querySelectorAll('#' + key).length > 0) {
          x.querySelectorAll('#' + key)[0].style = 'background: ' + value.value;
        }
      }

      if (value.type === 'sectionbgcolor') {
        if (x && x.querySelectorAll('#' + key).length > 0) {
          x.querySelectorAll('#' + key)[0].style = 'background: ' + value.value;
        }
      }

      if (value.type === 'finalclass') {
        let propName = key.replace('_final_class', '');

        if (
          propName !== 'Button' &&
          propName !== 'Button1' &&
          propName !== 'Button2'
        ) {
          if (
            value.value !== '' &&
            x.querySelectorAll('#' + propName).length > 0
          ) {
            x.querySelectorAll('#' + propName)[0].className = value.value;
          }
        }
      }

      if (value.type == 'fontcolor') {
        let propName = key.replace('_font_color', '');
        if (x.querySelectorAll('#' + propName).length > 0)
          x.querySelectorAll('#' + propName)[0].style = 'color: ' + value.value;
      }

      if (value.type == 'transform') {
        let propName = key.replace('_text_transform', '');
        if (x.querySelectorAll('#' + propName).length > 0) {
          x.querySelectorAll('#' + propName)[0].classList.add(value.value);
        }
      }

      if (value.type == 'image') {
        if (x.querySelectorAll('#' + key).length > 0) {
          let classAlign = '';
          let imageSize = '';
          let effectClass = '';
          let alt = '';
          let link = '';
          let imageStyle = '';
          let imgClass = '';

          let objName = {};

          if (
            Object.keys(element.selectedVal).includes(
              key + '_image_hv_position',
            )
          ) {
            Object.entries(element.selectedVal).map(([keyq, valueq]) => {
              if (keyq == key + '_image_hv_position') {
                if (x.querySelectorAll('#' + key + 'HVPosition').length > 0)
                  x.querySelectorAll('#' + key + 'HVPosition')[0].className =
                    valueq.value;
              }
            });
          }

          Object.entries(element.properties).map(([keyq, valueq]) => {
            if (keyq == key) {
              objName = valueq;
            }
          });

          if (Object.keys(element.selectedVal).includes(key + '_alt')) {
            Object.entries(element.selectedVal).map(([keyq, valueq]) => {
              if (keyq == key + '_alt') {
                alt += valueq.value;
              }
            });
          }

          if (Object.keys(element.selectedVal).includes(key + '_link')) {
            Object.entries(element.selectedVal).map(([keyq, valueq]) => {
              if (keyq == key + '_link') {
                link += valueq.value;
              }
            });
          }

          if (Object.keys(element.selectedVal).includes(key + '_is_centered')) {
            Object.entries(element.selectedVal).map(([keyq, valueq]) => {
              if (keyq == key + '_is_centered') {
                if(x.querySelectorAll('#is_centered').length > 0)
                {
                    if(valueq.value)
                    {
                      x.querySelectorAll('#is_centered')[0].classList.add('items-center');
                      x.querySelectorAll('#right-section')[0].classList.remove('items-center');
                    }
                    else
                    {
                      x.querySelectorAll('#is_centered')[0].classList.remove('items-center');
                      x.querySelectorAll('#right-section')[0].classList.add('items-center');

                    }
                }
              }
            });
          }

          if (
            Object.keys(element.selectedVal).includes(
              key + '_transition_duration',
            )
          ) {
            Object.entries(element.selectedVal).map(([keyq, valueq]) => {
              if (keyq == key + '_transition_duration') {
                effectClass +=
                  'duration-' +
                  valueq.value +
                  ' group-hover:duration-' +
                  valueq.value;
              }
            });
          }
          if (Object.keys(element.selectedVal).includes(key + '_ease_option')) {
            Object.entries(element.selectedVal).map(([keyq, valueq]) => {
              if (keyq == key + '_ease_option') {
                effectClass +=
                  ' ' + valueq.value + ' group-hover:' + valueq.value;
              }
            });
          }
          if (
            Object.keys(element.selectedVal).includes(
              key + '_transition_effect',
            )
          ) {
            let effectType = '';
            Object.entries(element.selectedVal).map(([keyq, valueq]) => {
              if (keyq == key + '_transition_effect') {
                effectType = valueq.value;
              }
            });
            if (effectType === 'scale') {
              if (
                Object.keys(element.selectedVal).includes(
                  key + '_scale_option_start',
                )
              ) {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                  if (keyq == key + '_scale_option_start') {
                    effectClass += ' ' + valueq.value;
                  }
                });
              }
              if (
                Object.keys(element.selectedVal).includes(
                  key + '_scale_option_end',
                )
              ) {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                  if (keyq == key + '_scale_option_end') {
                    effectClass += ' group-hover:' + valueq.value;
                  }
                });
              }
            } else if (effectType === 'fade') {
              if (
                Object.keys(element.selectedVal).includes(
                  key + '_fade_opacity_start',
                )
              ) {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                  if (keyq == key + '_fade_opacity_start') {
                    effectClass += ' ' + valueq.value;
                  }
                });
              }
              if (
                Object.keys(element.selectedVal).includes(
                  key + '_fade_opacity_end',
                )
              ) {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                  if (keyq == key + '_fade_opacity_end') {
                    effectClass += ' group-hover:' + valueq.value;
                  }
                });
              }
            } else if (effectType === 'skew') {
              if (
                Object.keys(element.selectedVal).includes(
                  key + '_skew_position',
                )
              ) {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                  if (keyq == key + '_skew_position') {
                    effectClass += '  group-hover:' + valueq.value;
                  }
                });
              }
            } else if (effectType === 'rotate') {
              if (
                Object.keys(element.selectedVal).includes(
                  key + '_rotate_position',
                )
              ) {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                  if (keyq == key + '_rotate_position') {
                    effectClass += '  group-hover:' + valueq.value;
                  }
                });
              }
            } else if (effectType === 'translate') {
              if (
                Object.keys(element.selectedVal).includes(
                  key + '_translate_position',
                )
              ) {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                  if (keyq == key + '_translate_position') {
                    effectClass += '  group-hover:' + valueq.value;
                  }
                });
              }
            }
          }

          if (effectClass !== '') {
            effectClass =
              'transition-all group-hover:transition-all ' + effectClass;
          }

          if (objName.ImageAsBG !== undefined) {
            x.querySelectorAll('#' + key)[0].innerHTML =
              '<div class="absolute inset-0 bg-cover ' +
              effectClass +
              '" style="background-image: url(\'' +
              value.value +
              '\')"></div>';
          } else {
            if (
              Object.keys(element.selectedVal).includes(key + '_image_position')
            ) {
              Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                if (keyq == key + '_image_position') {
                  classAlign = valueq.value;
                }
              });
            }
            if (
              Object.keys(element.selectedVal).includes(key + '_image_size')
            ) {
              Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                if (keyq == key + '_image_size') {
                  imageSize = valueq.value;
                }
              });
            }

            if (
              Object.keys(element.selectedVal).includes(key + '_image_style')
            ) {
              Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                if (keyq == key + '_image_style') {
                  imageStyle = valueq.value;
                }
              });
              if (imageStyle === 'Round') {
                if (
                  Object.keys(element.selectedVal).includes(
                    key + '_image_roundsize',
                  )
                ) {
                  Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                    if (keyq == key + '_image_roundsize') {
                      imgClass = 'rounded-[' + valueq.value + 'px]';
                    }
                  });
                }
              }
            }
            if (x.querySelectorAll('#' + key + '_img').length > 0) {
              x.querySelectorAll('#' + key + '_img')[0].src = value.value;
            } else {
              if (
                Object.keys(element.selectedVal).includes(
                  key + '_image_position',
                )
              ) {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                  if (keyq == key + '_image_position') {
                    classAlign = valueq.value;
                  }
                });
              }
              if (
                Object.keys(element.selectedVal).includes(key + '_image_style')
              ) {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                  if (keyq == key + '_image_style') {
                    imageStyle = valueq.value;
                  }
                });
                if (imageStyle === 'Round') {
                  if (
                    Object.keys(element.selectedVal).includes(
                      key + '_image_roundsize',
                    )
                  ) {
                    Object.entries(element.selectedVal).map(
                      ([keyq, valueq]) => {
                        if (keyq == key + '_image_roundsize') {
                          imgClass = 'rounded-[' + valueq.value + 'px]';
                        }
                      },
                    );
                  }
                }
              }
              if (
                 Object.keys(element.selectedVal).includes(key + '_image_size')
              ) {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => {
                  if (keyq == key + '_image_size') {
                    imageSize = valueq.value;
                  }
                });
              }
              if (link === '') {
                var starttag = '<div class="inline-block group ';
                var endTag = '/> </div>';
              } else {
                var starttag =
                  '<a href="' + link + '"class="inline-block group ';
                var endTag = '/> </a>';
              }
              if(Object.keys(element.selectedVal).includes(key+"_left_padding"))
              {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => { if(keyq == key+"_left_padding") { classAlign += ' ' + valueq.value; } }) 
              }
              if(Object.keys(element.selectedVal).includes(key+"_right_padding"))
              {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => { if(keyq == key+"_right_padding") { classAlign += ' ' + valueq.value; } }) 
              }
              if(Object.keys(element.selectedVal).includes(key+"_top_padding"))
              {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => { if(keyq == key+"_top_padding") { classAlign += ' ' + valueq.value; } }) 
              }
              if(Object.keys(element.selectedVal).includes(key+"_bottom_padding"))
              {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => { if(keyq == key+"_bottom_padding") { classAlign += ' ' + valueq.value; } }) 
              }
              if(Object.keys(element.selectedVal).includes(key+"_left_margin"))
              {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => { if(keyq == key+"_left_margin") { classAlign += ' ' + valueq.value; } }) 
              }
              if(Object.keys(element.selectedVal).includes(key+"_right_margin"))
              {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => { if(keyq == key+"_right_margin") { classAlign += ' ' + valueq.value; } }) 
              }
              if(Object.keys(element.selectedVal).includes(key+"_top_margin"))
              {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => { if(keyq == key+"_top_margin") { classAlign += ' ' + valueq.value; } }) 
              }
              if(Object.keys(element.selectedVal).includes(key+"_bottom_margin"))
              {
                Object.entries(element.selectedVal).map(([keyq, valueq]) => { if(keyq == key+"_bottom_margin") { classAlign += ' ' + valueq.value; } }) 
              }

              // if(imageSize == '')
              //   imageSize = 'max-w-none';
              x.querySelectorAll('#' + key)[0].className = classAlign;
              
              x.querySelectorAll('#' + key)[0].innerHTML =
                starttag +
                imageSize +
                '" id="' +
                key +
                '_img_link"><img id="' +
                key +
                '_img" class="' +
                effectClass +
                ' ' +
                imgClass +
                '" src="' +
                value.value +
                '" alt="' +
                alt +
                '" title="' +
                alt +
                '"' +
                endTag;
            }
          }
        }
      }

      // if (value.type == 'alt') {
      //   //let propname = key.replace("_alt", "");
      //   if (x.querySelectorAll('#' + key).length > 0) {
      //     if (x.querySelectorAll('#' + key + '_img').length > 0) {
      //       x.querySelectorAll('#' + key + '_img')[0].alt = value.value;
      //       x.querySelectorAll('#' + key + '_img')[0].title = value.value;
      //     } else {
      //       x.querySelectorAll('#' + key)[0].innerHTML =
      //         '<a href="javascript:void(0)" id="' +
      //         key +
      //         '_img_link"><img id="' +
      //         key +
      //         '_img" class="max-w-none" src="" alt="' +
      //         value.value +
      //         '" title="' +
      //         value.value +
      //         '" /> </a>';
      //     }
      //   }
      // }
      if (value.type == 'fontsize') {
        let propname = key.replace('_font_size', '');
        if (
          x.querySelectorAll('#' + propname).length > 0 &&
          isNaN(value.value)
        ) {
          assignMultipleClass(
            value.value,
            x.querySelectorAll('#' + propname)[0],
          );
        }

        // if (element.properties.TextAppearance != null) {

        //   if (element.properties.TextAppearance.fields != undefined) {
        //     let fields = element.properties.TextAppearance.fields.split(',');
        //     let textBgColor = propname.text_bg_color ?? '';
        //     let bgOpacity = propname.bg_opacity ?? '1';
        //     let fontSize = propname.font_size ?? '';
        //     let textPos = propname.text_pos ?? 'center';

        //     fields.forEach((el) => {
        //       if (x.querySelectorAll('#' + el + '_pos').length > 0) {
        //         x.querySelectorAll('#' + el + '_pos')[0].className =
        //           'flex items-center absolute ' +
        //           fontSize +
        //           ' inset-0 p-1 lg:p-4 text-white justify-' +
        //           textPos;
        //         x.querySelectorAll('#' + el + '_bg')[0].style =
        //           'background: rgb(' +
        //           textBgColor +
        //           ', ' +
        //           bgOpacity +
        //           '); padding: 20px';
        //         //x.querySelectorAll('#'+el)[0].className = "pb-2";
        //       }
        //     });
        //   }
        // }
      }

      if (value.type === 'width') {
        if (value.value)
          x.querySelectorAll('#' + key)[0].classList.add(value.value);
      }

      if (value.type == 'appearance') {
        let propname = value.value;
        if (element.properties.TextAppearance?.fields != undefined) {
          let fields = element.properties.TextAppearance.fields.split(',');
          let textBgColor = propname.text_bg_color ?? '';
          let bgOpacity = propname.bg_opacity ?? '1';
          let fontSize = propname.font_size ?? '';
          let textPos = propname.text_pos ?? '';
          let textHPos = propname.text_hpos ?? '';
          let textVPos = propname.text_vpos ?? '';
          let sectionWidth = propname.section_width ?? '';

          fields.forEach((el) => {
            if (x.querySelectorAll('#' + el + '_pos').length > 0) {
              if (textHPos)
                x.querySelectorAll('#' + el + '_pos')[0].className =
                  'flex absolute ' +
                  fontSize +
                  ' inset-0 p-1 lg:p-4 text-white ' +
                  textHPos +
                  ' ' +
                  textVPos;
              else
                x.querySelectorAll('#' + el + '_pos')[0].className =
                  'flex items-center absolute ' +
                  fontSize +
                  ' inset-0 p-1 lg:p-4 text-white justify-' +
                  textPos;

              if (sectionWidth)
                x.querySelectorAll('#' + el + '_bg')[0].classList.add(
                  sectionWidth,
                );
              x.querySelectorAll('#' + el + '_bg')[0].style =
                'background: rgb(' +
                textBgColor +
                ', ' +
                bgOpacity +
                '); padding: 20px';
              x.querySelectorAll('#' + el)[0].className = 'pb-2';
            }
          });
        }
      }

      // if (value.type == 'link') {
      //   if (x.querySelectorAll('#' + key).length > 0) {
      //     if (x.querySelectorAll('#' + key + '_img_link').length > 0) {
      //       x.querySelectorAll('#' + key + '_img_link')[0].href = value.value;
      //     } else {
      //       x.querySelectorAll('#' + key)[0].innerHTML =
      //         '<a href="' +
      //         value.value +
      //         '" id="' +
      //         key +
      //         '_img_link"><img id="' +
      //         key +
      //         '_img" className="max-w-none" src=""/> </a>';
      //     }
      //   }
      // }

      if (value.type == 'Youtube') {
        let iorvideo;
        let kn = key.replace('_video', '');
        Object.entries(element.selectedVal).map(([keyq, valueq]) => {
          if (keyq == kn + '_image_or_video') {
            iorvideo = valueq.value;
          }
        });

        if (iorvideo && iorvideo === 'Video') {
          if (x.querySelectorAll('#' + kn).length > 0) {
            x.querySelectorAll('#' + kn)[0].innerHTML =
              '<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/' +
              value.value +
              '?rel=0" allow="autoplay; encrypted-media" frameborder="0"></iframe>';
          }
        }
      }

      if (value.type == 'Vimeo') {
        let iorvideo;
        let kn = key.replace('_video', '');

        Object.entries(element.properties).map(([keyq, valueq]) => {
          if (keyq == kn + '_image_or_video') {
            iorvideo = valueq.value;
          }
        });
        if (iorvideo && iorvideo === 'Video') {
          if (x.querySelectorAll('#' + kn).length > 0) {
            x.querySelectorAll('#' + kn)[0].innerHTML =
              '<iframe src="https://player.vimeo.com/video/' +
              value.value +
              '?background=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="" style="" class="w-full aspect-video"></iframe>';
          }
        }
      }

      if (value.type == 'text') {
        if (x.querySelectorAll('#' + key).length > 0) {
          x.querySelectorAll('#' + key)[0].innerHTML = value.value;
        }
      }

      // if (value.type == 'btn_size') {
      //   let propName = key.replace('_size', '');
      //   if (x.querySelectorAll('#' + propName).length > 0) {
      //     x.querySelectorAll('#' + propName)[0].classList.add(value.value);
      //   }
      // }

      // if (value.type == 'btn_transform') {
      //   let propName = key.replace('_text_transform', '');
      //   if (x.querySelectorAll('#' + propName).length > 0) {
      //     x.querySelectorAll('#' + propName)[0].classList.add(value.value);
      //   }
      // }

      // if (value.type == 'btn_link') {
      //   let propName = key.replace('_link', '');
      //   if (x.querySelectorAll('#' + propName).length > 0) {
      //     x.querySelectorAll('#' + propName)[0].href = value.value;
      //   }
      // }

      // if (value.type == 'btn_style') {
      //   let propName = key.replace('_style', '');
      //   if (x.querySelectorAll('#' + propName).length > 0) {
      //     x.querySelectorAll('#' + propName)[0].classList.add(value.value);
      //   }
      // }

      // if (value.type == 'btn_size') {
      //   let propName = key.replace('_size', '');
      //   if (x.querySelectorAll('#' + propName).length > 0) {
      //     x.querySelectorAll('#' + propName)[0].classList.add(value.value);
      //   }
      // }

      // if (value.type == 'btn_link_target') {
      //   let propName = key.replace('_window', '');
      //   if (x.querySelectorAll('#' + propName).length > 0) {
      //     x.querySelectorAll('#' + propName)[0].target = value.value;
      //   }
      // }

      // if (value.type == 'btn_display') {
      //   if (value.value == 'No') {
      //     let propName = key.replace('_display', '');
      //     if (x.querySelectorAll('#' + propName).length > 0) {
      //       x.querySelectorAll('#' + propName)[0].remove();
      //     }
      //   }
      // }

      if (value.type == 'accordion' && key != 'FullAccordion') {
        // loop for accordion ittem
        let ourComponetiNString = ReactDOMServer.renderToStaticMarkup(
          <ElementAccordionDisplay
            selected_Values={element.selected_Values}
            acValues={value.value}
          />,
        );
        if (x.querySelectorAll('#' + value.type).length > 0) {
          x.querySelectorAll('#' + value.type)[0].innerHTML =
            ourComponetiNString;
        }
      }

      if (value.type == 'side_change' && key == 'Sidechange') {
        x.querySelectorAll('#left-section')[0].classList.remove('lg:order-2');
        x.querySelectorAll('#left-section')[0].classList.remove('lg:order-1');

        x.querySelectorAll('#right-section')[0].classList.remove('lg:order-2');
        x.querySelectorAll('#right-section')[0].classList.remove('lg:order-1');

        x.querySelectorAll('#left-section')[0].classList.add(
          value.value.left ?? 'lg:order-1',
        );
        x.querySelectorAll('#right-section')[0].classList.add(
          value.value.right ?? 'lg:order-2',
        );

        //console.log(key, value);
      }

      if (value.type == 'carousel') {
        if (
          window.location.href.includes('Page/edit') &&
          !window.location.href.includes('Page/edit/optimize')
        ) {
          let showIndicators = value.value.showIndicators ?? 'On';
          let showArrow = value.value.showArrow ?? 'On';
          let showStatus = value.value.showStatus ?? 'On';
          let showThumb = value.value.showThumb ?? 'On';

          let strHTML = displayCarousel(
            showIndicators,
            showArrow,
            showStatus,
            showThumb,
            value.value,
          );

          x.querySelectorAll('#banner_display')[0].innerHTML = strHTML;
        }
      }
      if (value.type == 'dynamic') {
        if (element.properties[value.type] !== undefined) {
          let functionName = element.properties[value.type].html;

          let strHTML = dynamicFunctions[functionName](value.value, element);
          x.querySelectorAll(
            '#' + element.properties[value.type].html,
          )[0].innerHTML = strHTML;

          // if(element.properties[value.type].html == "boximage")
          // {
          //   let strHTML = boxHTMLDisplay(value.value);
          //   x.querySelectorAll("#"+element.properties[value.type].html)[0].innerHTML = strHTML;
          // }
          // else if(element.properties[value.type].html == "multipleImages")
          // {
          //   let strHTML = multipleImages(value.value);
          //   x.querySelectorAll("#"+element.properties[value.type].html)[0].innerHTML = strHTML;
          // }
        }
      }

      if (key == 'SectionImageText') {
        if (element.properties[key] !== undefined) {
          let finalArr = value.value;
          let classArr = [];
          let column = 0;
          if (!Object.keys(finalArr).includes('Right')) {
            //column = column + 1;
          } else if (finalArr.Right.display == 'Yes') {
            column = column + 1;
          }

          if (!Object.keys(finalArr).includes('Center')) {
            //column = column + 1;
          } else if (finalArr.Center.display == 'Yes') {
            column = column + 1;
          }

          if (!Object.keys(finalArr).includes('Left')) {
            //column = column + 1;
          } else if (finalArr.Left.display == 'Yes') {
            column = column + 1;
          }
          if (column == 3) {
            classArr = ['lg:w-1/3', 'px-3', 'md:w-1/2'];
          } else if (column == 2) {
            classArr = ['lg:w-1/2', 'px-3', 'md:w-1/2'];
          } else if (column == 1) {
            classArr = [];
          }
          // classArr = [];

          if (Object.keys(finalArr).includes('Left')) {
            if (finalArr.Left.display === 'Yes') {
              displayClass('sectionLeft', classArr, x);
              displaySection(finalArr.Left, 'Left', x);
              x.querySelectorAll('#sectionLeft')[0].classList.remove('hidden');
            } else {
              x.querySelectorAll('#sectionLeft')[0].classList.add('hidden');
            }
          } else {
            x.querySelectorAll('#sectionLeft')[0].classList.add('hidden');
            x.querySelectorAll('#sectionLeft')[0].innerHTML =
              '<div class="p-4 lg:p-8 flex w-full items-center"></div>';
          }

          if (Object.keys(finalArr).includes('Center')) {
            if (finalArr.Center.display == 'Yes') {
              displayClass('sectionCenter', classArr, x);
              displaySection(finalArr.Center, 'Center', x);
              x.querySelectorAll('#sectionCenter')[0].classList.remove(
                'hidden',
              );
            } else {
              x.querySelectorAll('#sectionCenter')[0].classList.add('hidden');
            }
          } else {
            x.querySelectorAll('#sectionCenter')[0].classList.add('hidden');
            x.querySelectorAll('#sectionCenter')[0].innerHTML =
              '<div class="p-4 lg:p-8 flex w-full items-center"></div>';
          }
          if (Object.keys(finalArr).includes('Right')) {
            if (finalArr.Right.display == 'Yes') {
              displayClass('sectionRight', classArr, x);
              displaySection(finalArr.Right, 'Right', x);
              x.querySelectorAll('#sectionRight')[0].classList.remove('hidden');
            } else {
              x.querySelectorAll('#sectionRight')[0].classList.add('hidden');
            }
          } else {
            x.querySelectorAll('#sectionRight')[0].classList.add('hidden');
            x.querySelectorAll('#sectionRight')[0].innerHTML =
              '<div class="p-4 lg:p-8 flex w-full items-center"></div>';
          }
        }
      }
      // layout
      // sidechange
      // Here we will copy all properties and write condition to display image/text
      // sequence and layout options
    });

    let imgDisplay = true;
    let textDisplay = true;
    let layoutAdjust = false;

    if (
      Object.keys(element.selectedVal).includes(
        'ElementConfiguration_Image_display',
      )
    ) {
      if (
        element.selectedVal.ElementConfiguration_Image_display.value == 'No'
      ) {
        imgDisplay = false;
        x.querySelectorAll('#left-section')[0].classList.add('hidden');
        x.querySelectorAll('#right-section')[0].classList.remove('lg:w-1/2');
        x.querySelectorAll('#right-section')[0].classList.remove('lg:w-3/5');
        x.querySelectorAll('#right-section')[0].classList.remove('lg:w-2/3');
        x.querySelectorAll('#right-section')[0].classList.remove('lg:w-3/4');
        x.querySelectorAll('#right-section')[0].classList.remove('lg:w-4/5');
        x.querySelectorAll('#right-section')[0].classList.remove('lg:w-5/6');
      }
    }

    if (
      Object.keys(element.selectedVal).includes(
        'ElementConfiguration_final_class',
      )
    ) {
      if (
        element.selectedVal.ElementConfiguration_final_class.value.trim() !== ''
      )
      {
        if(!imgDisplay)
          x.querySelectorAll('#right-section')[0].className =
          element.selectedVal.ElementConfiguration_final_class.value.trim() + ' w-full';
        else
            x.querySelectorAll('#right-section')[0].className =
          element.selectedVal.ElementConfiguration_final_class.value.trim();

      }
    }

    if(Object.keys(element.selectedVal).includes('ElementConfiguration_text_section_bg'))
        {
            if(element.selectedVal.ElementConfiguration_text_section_bg.value)
            {
                x.querySelectorAll('#right-section')[0].style = 'background: ' + element.selectedVal.ElementConfiguration_text_section_bg.value;
            }
        }

    if (
      Object.keys(element.selectedVal).includes(
        'ElementConfiguration_Text_display',
      )
    ) {
      if (
        element.selectedVal.ElementConfiguration_Text_display.value === 'No'
      ) {
        textDisplay = false;
        x.querySelectorAll('#right-section')[0].classList.add('hidden');
        removeWidthClass(x, 'Left');
      }
    }

    if (textDisplay && imgDisplay) {
      if (
        Object.keys(element.selectedVal).includes(
          'ElementConfiguration_Image_position',
        )
      ) {
        // check if image position is Left Right
        x.querySelectorAll('#left-section')[0].classList.remove('lg:order-2');
        x.querySelectorAll('#right-section')[0].classList.remove('lg:order-1');
        x.querySelectorAll('#left-section')[0].classList.remove('lg:order-1');
        x.querySelectorAll('#right-section')[0].classList.remove('lg:order-2');
        if (
          element.selectedVal.ElementConfiguration_Image_position.value ==
          'Left'
        ) {
          layoutAdjust = true;
          x.querySelectorAll('#left-section')[0].classList.add('lg:order-1');
          x.querySelectorAll('#right-section')[0].classList.add('lg:order-2');
        } else if (
          element.selectedVal.ElementConfiguration_Image_position.value ===
          'Right'
        ) {
          layoutAdjust = true;
          x.querySelectorAll('#left-section')[0].classList.add('lg:order-2');
          x.querySelectorAll('#right-section')[0].classList.add('lg:order-1');
        } else if (
          element.selectedVal.ElementConfiguration_Image_position.value ===
          'Bottom'
        ) {
          removeWidthClass(x);

          x.querySelectorAll('#left-section')[0].classList.add('lg:order-2');
          x.querySelectorAll('#right-section')[0].classList.add('lg:order-1');
        } else if (
          element.selectedVal.ElementConfiguration_Image_position.value ===
          'Top'
        ) {
          removeWidthClass(x);

          x.querySelectorAll('#left-section')[0].classList.add('lg:order-1');
          x.querySelectorAll('#right-section')[0].classList.add('lg:order-2');
        }
      }

      if (layoutAdjust || Object.keys(element.selectedVal).includes('Layout')) {
        let layout = 50;
        if (Object.keys(element.selectedVal).includes('Layout')) {
          layout = element.selectedVal.Layout.value;
          removeWidthClass(x);
          x.querySelectorAll('#left-section')[0].classList.remove('w-full');
          x.querySelectorAll('#left-section')[0].classList.add(
            'lg:w-[' + layout + '%]',
          );
          x.querySelectorAll('#right-section')[0].classList.remove('w-full');
          x.querySelectorAll('#right-section')[0].classList.add(
            'lg:w-[' + (100 - layout) + '%]',
          );
        }
      }
    }
  }
};

export const displayCarousel = (
  showIndicators,
  showArrow,
  showStatus,
  showThumb,
  dataArr,
) => {
  let strHTML = `<div class="carousel-root">
  <div class="carousel carousel-slider" style="width: 100%;">`;
  if (showIndicators == 'On') {
    strHTML += '<ul class="control-dots">';
    if (dataArr.images != undefined && dataArr.images.length > 0) {
      dataArr.images.map((data, index) => {
        if (index == 0)
          strHTML += `<li class="dot selected" role="button" tabindex="0" aria-label="slide item 1" value="0"></li>`;
        else
          strHTML +=
            `<li class="dot" role="button" tabindex="0" aria-label="slide item 2" value="` +
            index +
            `"></li>`;
        strHTML += `</ul>`;
      });
    }
  }

  if (showArrow == 'On') {
    strHTML += `<button type="button" aria-label="previous slide / item"
      class="control-arrow control-prev control-disabled"></button>`;
  }

  strHTML += `<div class="slider-wrapper axis-horizontal">`;

  strHTML += `<ul class="slider animated" style="transform: translate3d(0px, 0px, 0px); transition-duration: 350ms;">`;

  if (dataArr.images != undefined && dataArr.images.length > 0) {
    dataArr.images.map((data) => {
      strHTML += `
          <li class="slide selected previous">
              <div>`;
      if (data.image_or_video == undefined || data.image_or_video == 'Image') {
        strHTML += `<img src="` + data.image_url + `">`;
      } else {
        if (data.video_type == 'Youtube') {
          strHTML +=
            `<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/` +
            data.video_url +
            `?rel=0" allow="autoplay; encrypted-media" frameBorder="0"></iframe>`;
        } else if (data.video_type == 'Vimeo') {
          strHTML +=
            `<iframe class="w-full aspect-video" src="https://player.vimeo.com/video/` +
            data.video_url +
            `?background=1"></iframe>`;
        }
      }
      strHTML +=
        `<p class="legend">` +
        data.headline +
        `</p>
              </div>
          </li>`;
    });
  }

  strHTML += `</ul>
      </div>`;
  if (showArrow == 'On') {
    strHTML += `<button type="button" aria-label="next slide / item" class="control-arrow control-next"></button>`;
  }

  if (showStatus == 'On') {
    strHTML += `<p class="carousel-status">1 of 3</p>`;
  }
  strHTML += `</div>`;

  if (showThumb == 'On') {
    strHTML += `
              <div class="carousel">
                  <div class="thmbs-wrapper axis-vertical"><button type="button"
                          class="control-arrow control-prev control-disabled" aria-label="previous slide / item"></button>
                      <ul class="thumbs animated" style="transform: translate3d(0px, 0px, 0px); transition-duration: 350ms;">`;
    if (dataArr.images != undefined && dataArr.images.length > 0) {
      dataArr.images.map((data) => {
        strHTML +=
          `
                                  <li class="thumb selected" aria-label="slide item 1" style="width: 80px;" role="button" tabindex="0">
                                      <img
                                          src="` +
          data.image_url +
          `">
                                  </li>`;
      });
    }

    strHTML += `</ul><button type="button" class="control-arrow control-next control-disabled"
                          aria-label="next slide / item"></button>
                  </div>
              </div>`;
  }
  strHTML += `</div>`;
  return strHTML;
};

export const displayClass = (divid, classArr, x) => {
  x.querySelectorAll('#' + divid)[0].classList.remove('lg:w-1/3');
  x.querySelectorAll('#' + divid)[0].classList.remove('px-3');
  x.querySelectorAll('#' + divid)[0].classList.remove('md:w-1/2');
  x.querySelectorAll('#' + divid)[0].classList.remove('lg:w-1/2');
  classArr.forEach((value) => {
    x.querySelectorAll('#' + divid)[0].classList.add(value);
  });
};

export const displaySection = (obj, side, x) => {
  let strHTML = '';
  if (obj.contentType == 'Image') {
    strHTML += '<div class="flex">';
    strHTML +=
      '<a title="' +
      obj.image_alt +
      '" href="' +
      obj.image_link +
      '" class="hrefurl no-underline">';
    strHTML +=
      '<img class="w-full" src="' +
      obj.image +
      '" alt="' +
      obj.image_alt +
      '" title="' +
      obj.image_alt +
      '">';
    strHTML += '<div class="text-center w-full bg-gray-50">';
    if (obj.headline != '' && obj.headline != null)
      strHTML +=
        '<div class="' +
        obj?.headline_class +
        '" style="color: ' +
        obj?.fontColor +
        '">' +
        obj.headline +
        '</div>';
    strHTML += '</div>';

    //strHTML += '</div>';
    strHTML += '</a>';
    strHTML += '</div>';
  } else {
    strHTML += '<div class="p-4 lg:p-8 flex w-full items-center">';
    strHTML += '<div class="w-full">';
    strHTML +=
      '<div class="' +
      obj?.headline_class +
      '" style="color: ' +
      obj?.fontColor +
      '">' +
      obj.headline +
      '</div>';
    strHTML +=
      '<div class="text-default-text mt-2">' + obj.description + '</div>';
    strHTML += '</div>';
    strHTML += '</div>';
  }
  x.querySelectorAll('#section' + side)[0].innerHTML = strHTML;
};

export const removeWidthClass = (x, type = 'Both') => {
  if (type == 'Left' || type == 'Both') {
    x.querySelectorAll('#left-section')[0].classList.remove('lg:w-1/2');
    x.querySelectorAll('#left-section')[0].classList.remove('lg:w-1/3');
    x.querySelectorAll('#left-section')[0].classList.remove('lg:w-1/4');
  }
  if (type == 'Left' || type == 'Both') {
    x.querySelectorAll('#right-section')[0].classList.remove('lg:w-1/2');
    x.querySelectorAll('#right-section')[0].classList.remove('lg:w-2/3');
    x.querySelectorAll('#right-section')[0].classList.remove('lg:w-3/4');
  }
};

export const showMsg = () => {
  //  alert('s');
};