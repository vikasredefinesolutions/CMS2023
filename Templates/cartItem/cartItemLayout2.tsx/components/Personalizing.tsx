import {
  maximumWordsUnderChestLogo,
  maximumWordsUnderSleeveLogo,
} from '@constants/common.constant';
import { __pagesText } from '@constants/pages.text';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  PersonalizationColor,
  PersonalizationFont,
  PersonalizationLocation,
  ShoppingCartItemDetailsViewModel,
  ShoppingCartLinePersonViewModel,
} from '@services/cart';
import { updateCartPersonalization } from '@services/cart.service';
import { _CartLinePersonDetailModel } from '@services/product.service.type';
import { FC, useState } from 'react';
import { _globalStore } from 'store.global';

const Personalizing: FC<any> = ({
  availableColor,
  availableFont,
  availableLocation,
  item,
  setKeepPersonalizing,
  personalizationArray,
  cartLinePersonModels,
  setCartLinePersonModels,
  setPersonalizationArray,
  shoppingCartItemsId,
  earlierSelectedColor,
  earlierSelectedFont,
  earlierSelectedLocation,
}) => {
  let mediaBaseUrl = _globalStore.blobUrl; // for server side
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  const { showModal, setShowLoader, fetchCartDetails } = useActions_v2();
  const { id } = useTypedSelector_v2((state) => state.user);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );
  const { firstLineCharges, secondLineCharges } = useTypedSelector_v2(
    (state) => state.store,
  );
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;
  const [selectedLocation, setSelectedLocation] = useState<string>(
    earlierSelectedLocation !== ''
      ? earlierSelectedLocation
      : availableLocation[0]['name'],
  );
  const [showColorPelette, setShowColorPelette] = useState<boolean>(false);
  const [selectedFont, setSelectedFont] = useState<string>(
    earlierSelectedFont !== '' ? earlierSelectedFont : availableFont[0]['name'],
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    earlierSelectedColor !== ''
      ? earlierSelectedColor
      : availableColor[1]['name'],
  );
  const changeLocationForAll = (value: string, name: string) => {
    let newArr = personalizationArray;
    let changedArr: any = [];
    newArr.forEach((element: ShoppingCartItemDetailsViewModel) => {
      element.shoppingCartLineOnePersonViewModel.forEach(
        (val: ShoppingCartLinePersonViewModel) => {
          if (
            val.linefont !== '' &&
            val.linefont !== value &&
            name === 'Font'
          ) {
            changedArr.push({ ...val, linefont: value });
          }
          if (
            val.linecolor !== '' &&
            val.linecolor !== value &&
            name === 'color'
          ) {
            changedArr.push({ ...val, linecolor: value });
          }
          if (
            val.personalizeLocation !== '' &&
            val.personalizeLocation !== value &&
            name === 'location'
          ) {
            changedArr.push({ ...val, personalizeLocation: value });
          }
        },
      );
      element.shoppingCartLineTwoPersonViewModel.forEach((val) => {
        if (val.linefont !== '' && val.linefont !== value && name === 'Font') {
          changedArr.push({ ...val, linefont: value });
        }
        if (
          val.linecolor !== '' &&
          val.linecolor !== value &&
          name === 'color'
        ) {
          changedArr.push({ ...val, linecolor: value });
        }
        if (
          val.personalizeLocation !== '' &&
          val.personalizeLocation !== value &&
          name === 'location'
        ) {
          changedArr.push({ ...val, personalizeLocation: value });
        }
      });
    });
    setCartLinePersonModels((prev: _CartLinePersonDetailModel[]) => [
      ...prev,
      ...changedArr,
    ]);
  };

  const save = async () => {
    setShowLoader(true);
    updateCartPersonalization({
      cartLinePersonDetailModel: cartLinePersonModels,
    })
      .then((res) => {
        if (res) {
          setShowLoader(false);
          showModal({ message: 'Successfully updated', title: 'Success' });
          setKeepPersonalizing({
            show: false,
            index: 0,
          });
          setCartLinePersonModels([]);
          fetchCartDetails({
            customerId: id ? id : 0,
            isEmployeeLoggedIn,
          });
        }
      })
      .catch((err) => {
        showModal({ message: 'Something Went Wrong', title: 'failed' });
        setShowLoader(false);
      });
  };

  const lineOneChangeHandler = (e: any, index: number, lineIndex: number) => {
    const newPersonalizationArr = personalizationArray.map(
      (p: ShoppingCartItemDetailsViewModel, i: number) => {
        if (i === index) {
          return {
            ...p,
            shoppingCartLineOnePersonViewModel:
              p.shoppingCartLineOnePersonViewModel.map(
                (s: ShoppingCartLinePersonViewModel, i: number) => {
                  if (i === lineIndex) {
                    return {
                      ...s,
                      linetext: e.target.value,
                      linefont: selectedFont,
                      linecolor: selectedColor,
                    };
                  }
                  return s;
                },
              ),
          };
        }
        return p;
      },
    );
    setPersonalizationArray(newPersonalizationArr);
  };
  const lineTwoChangeHandler = (e: any, index: number, lineIndex: number) => {
    if (
      personalizationArray[index].shoppingCartLineOnePersonViewModel[lineIndex]
        .linetext === ''
    ) {
      alert('Please enter line one');
    } else {
      const newPersonalizationArr = personalizationArray.map(
        (p: ShoppingCartItemDetailsViewModel, i: number) => {
          if (i === index) {
            return {
              ...p,
              shoppingCartLineTwoPersonViewModel:
                p.shoppingCartLineTwoPersonViewModel.map(
                  (s: ShoppingCartLinePersonViewModel, i: number) => {
                    if (i === lineIndex) {
                      return {
                        ...s,
                        linetext: e.target.value,
                        linefont: selectedFont,
                        linecolor: selectedColor,
                      };
                    }
                    return s;
                  },
                ),
            };
          }
          return p;
        },
      );
      setPersonalizationArray(newPersonalizationArr);
    }
  };

  const createCartLineModelPayload = (
    name: string,
    index: number,
    lineIndex: number,
  ) => {
    let lineObject: ShoppingCartLinePersonViewModel =
      name === 'lineone'
        ? personalizationArray[index].shoppingCartLineOnePersonViewModel[
            lineIndex
          ]
        : personalizationArray[index].shoppingCartLineTwoPersonViewModel[
            lineIndex
          ];
    if (lineObject.linetext === '') {
      return;
    }
    setCartLinePersonModels((prev: _CartLinePersonDetailModel[] | []) => [
      ...prev,
      {
        id: lineObject.id,
        cartLinePersonId: lineObject.cartLinePersonId,
        shoppingCartItemsId: shoppingCartItemsId,
        linePrice: name === 'lineone' ? firstLineCharges : secondLineCharges,
        lineQty: 1,
        lineAboveLogo: 0,
        lineIndividually: 1,
        lineNumber: name === 'lineone' ? 1 : 2,
        lineText: lineObject.linetext,
        lineTotal: name === 'lineone' ? firstLineCharges : secondLineCharges,
        lineFont: lineObject.linefont,
        lineColor: lineObject.linecolor,
        linePriceDouble: 0,
        logoCartId: 0,
        personalizeLocation: selectedLocation,
        parentId: lineObject.parentId,
      },
    ]);
  };
  return (
    <>
      <div className='w-full pl-[12px] pr-[12px]'>
        <div className='pt-[20px]'>
          <div className='mb-[4px] flex items-center gap-2'>
            <div className='text-default-text'>
              Name Personalization Font Examples :
            </div>
            <div className='text-default-text' x-text='fontname'>
              {selectedFont}
            </div>
            <span
              data-modal-toggle='NamePersonalizeModal'
              className='material-icons-outlined text-xl leading-none cursor-pointer'
            >
              search
            </span>
          </div>
          <div className='flex flex-wrap -mx-3 gap-y-6 max-w-xl'>
            {availableFont.map((item: PersonalizationFont, index: number) => (
              <>
                <div
                  key={`${item.name}_${index}`}
                  className='w-full lg:w-1/3 pl-[12px] pr-[12px] cursor-pointer'
                  onClick={() => {
                    setSelectedFont(item.name);
                    changeLocationForAll(item.name, 'Font');
                  }}
                >
                  <div
                    className={`border-2 ${
                      selectedFont === item.name ? 'border-secondary' : ''
                    }`}
                  >
                    <img src={`${mediaBaseUrl}${item.image}`} alt='' />
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[20px] mb-[20px]'></div>
        <div className='pt-5 flex flex-wrap gap-2 gap-x-8 '>
          <div className='w-[80px] h-[80px]'>
            <img
              src={
                item.shoppingCartLogoPersonViewModels[0].logoImagePath !== ''
                  ? `${mediaBaseUrl}${item.shoppingCartLogoPersonViewModels[0].logoImagePath}`
                  : '/assets/images/logolater.png'
              }
              alt=''
            />
          </div>
          <div className=''>
            <div className='mb-[4px] text-default-text'>
              PMS thread colors :
            </div>
            <div className='flex flex-wrap gap-2'>
              {availableColor.map(
                (item: PersonalizationColor, index: number) => {
                  return (
                    <div
                      key={`${item.name}_${index}`}
                      className={`w-[32px] h-[32px] border-2 pl-[4px] pr-[4px] pb-[4px] pt-[4px] ${
                        selectedColor === item.name ? 'border-secondary' : ''
                      } cursor-pointer`}
                      onClick={() => {
                        changeLocationForAll(item.name, 'color');
                        setSelectedColor(item.name);
                      }}
                    >
                      <div
                        className={`bg-${item.name.toLowerCase()} w-full h-full`}
                      ></div>
                    </div>
                  );
                },
              )}
              <div
                className='h-[32px] border-2 pl-[4px] pr-[4px] pb-[4px] pt-[4px] text-default-text cursor-pointer'
                onClick={() => setShowColorPelette(!showColorPelette)}
              >
                Custom
              </div>
              {showColorPelette && (
                <div
                  className={`w-[32px] h-[32px] border-2 pl-[4px] pr-[4px] pb-[4px] pt-[4px] ${
                    selectedColor.startsWith('#') ? 'border-secondary' : ''
                  }`}
                >
                  <input
                    className='w-full h-full'
                    value={selectedColor}
                    type='color'
                    onChange={(e) => {
                      setSelectedColor(e.target.value);
                    }}
                    onBlur={(e) =>
                      changeLocationForAll(e.target.value, 'color')
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='pt-[20px] text-default-text'>
          <div className='font-semibold mb-[4px]'>Personalization Location</div>
          <div className='flex gap-4'>
            {availableLocation.map(
              (item: PersonalizationLocation, index: number) => {
                return (
                  <div key={`${item.name}_${index}`}>
                    <label>
                      <input
                        type='radio'
                        name='personalize_location'
                        value={item.name}
                        checked={selectedLocation === item.name}
                        className='p-2'
                        onChange={(e) => {
                          changeLocationForAll(item.name, 'location');
                          setSelectedLocation(e.target.value);
                        }}
                      />
                      {item.name}
                    </label>
                  </div>
                );
              },
            )}
          </div>
          <div className=''>{__pagesText.cart.chestLineLimit}</div>
          <div className=''>{__pagesText.cart.sleeveLineLimit}</div>
        </div>
        <div className='pt-[20px]'>
          <div className='font-semibold mb-1'>Personalization Text</div>
          <div className='overflow-auto'>
            <table className='w-full border border-gray-border text-default-text'>
              <tbody className='divide-x divide-y border-gray-border'>
                <tr className='divide-x border-gray-border bg-light-gray'>
                  <th className='pl-[8px] pr-[8px] pb-[8px] pt-[8px]'>
                    Item #
                  </th>
                  <th className='pl-[8px] pr-[8px] pb-[8px] pt-[8px]'>
                    Description
                  </th>
                  <th className='pl-[8px] pr-[8px] pb-[8px] pt-[8px]'>Color</th>
                  <th className='pl-[8px] pr-[8px] pb-[8px] pt-[8px]'>Size</th>
                  <th className='pl-[8px] pr-[8px] pb-[8px] pt-[8px]'>
                    Line 1
                  </th>
                  <th className='pl-[8px] pr-[8px] pb-[8px] pt-[8px]'>
                    Line 2
                  </th>
                </tr>
                {personalizationArray.map(
                  (
                    personalizationItem: ShoppingCartItemDetailsViewModel,
                    index: number,
                  ) =>
                    personalizationItem.shoppingCartLineOnePersonViewModel.map(
                      (
                        _item: ShoppingCartLinePersonViewModel,
                        lineindex: number,
                      ) => {
                        return (
                          <>
                            <tr
                              className='divide-x border-gray-border'
                              key={`${personalizationItem.attributeOptionValue}_${index}`}
                            >
                              <td className='pl-[8px] pr-[8px] pb-[8px] pt-[8px]'>
                                {item.sku}
                              </td>
                              <td className='pl-[8px] pr-[8px] pb-[8px] pt-[8px]'>
                                {item.productName}
                              </td>
                              <td className='pl-[8px] pr-[8px] pb-[8px] pt-[8px]'>
                                {item.attributeOptionValue}
                              </td>
                              <td className='pl-[8px] pr-[8px] pb-[8px] pt-[8px]'>
                                {personalizationItem.attributeOptionValue}
                              </td>

                              <td className='pl-[8px] pr-[8px] pb-[8px] pt-[8px]'>
                                <input
                                  className='form-input inline-block w-40'
                                  placeholder='Line one text'
                                  value={_item.linetext}
                                  onChange={(e) =>
                                    lineOneChangeHandler(e, index, lineindex)
                                  }
                                  maxLength={
                                    selectedLocation === 'Chest - Under Logo'
                                      ? maximumWordsUnderChestLogo
                                      : maximumWordsUnderSleeveLogo
                                  }
                                  onBlur={() =>
                                    createCartLineModelPayload(
                                      'lineone',
                                      index,
                                      lineindex,
                                    )
                                  }
                                />
                              </td>
                              <td className='pl-[8px] pr-[8px] pb-[8px] pt-[8px]'>
                                <input
                                  className='form-input inline-block w-40'
                                  placeholder='Line Two text'
                                  value={
                                    personalizationItem
                                      .shoppingCartLineTwoPersonViewModel[
                                      lineindex
                                    ].linetext
                                  }
                                  onChange={(e) =>
                                    lineTwoChangeHandler(e, index, lineindex)
                                  }
                                  maxLength={
                                    selectedLocation === 'Chest - Under Logo'
                                      ? maximumWordsUnderChestLogo
                                      : maximumWordsUnderSleeveLogo
                                  }
                                  onBlur={() =>
                                    createCartLineModelPayload(
                                      'linetwo',
                                      index,
                                      lineindex,
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          </>
                        );
                      },
                    ),
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className='mt-[16px]'>
          <button onClick={() => save()} className='btn btn-lg btn-secondary'>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Personalizing;
