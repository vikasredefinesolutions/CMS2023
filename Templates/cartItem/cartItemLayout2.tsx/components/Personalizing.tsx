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
  _CartItem,
} from '@services/cart';
import { updateCartPersonalization } from '@services/cart.service';
import { _CartLinePersonDetailModel } from '@services/product.service.type';
import { FC, useState } from 'react';
import { _globalStore } from 'store.global';

interface _Props {
  availableColor: PersonalizationColor[];
  availableFont: PersonalizationFont[];
  availableLocation: PersonalizationLocation[];
  item: _CartItem;
  setKeepPersonalizing: any;
  personalizationArray: ShoppingCartItemDetailsViewModel[];
  cartLinePersonModels: _CartLinePersonDetailModel[];
  setCartLinePersonModels: any;
  setPersonalizationArray: any;
  shoppingCartItemsId: number;
  earlierSelectedColor: string;
  earlierSelectedFont: string;
  earlierSelectedLocation: string;
}

const Personalizing: FC<_Props> = ({
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
  const [showColorPelette, setShowColorPelette] = useState<boolean>(
    availableColor.find((item) => item.name === earlierSelectedColor) ===
      undefined
      ? true
      : false,
  );
  const [selectedFont, setSelectedFont] = useState<string>(
    earlierSelectedFont !== '' ? earlierSelectedFont : availableFont[0]['name'],
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    earlierSelectedColor !== ''
      ? earlierSelectedColor
      : availableColor[1]['name'],
  );
  const changeLocationForAll = async (value: string, name: string) => {
    // let newArr = personalizationArray;
    // let changedArr: any = [];
    // newArr.forEach(
    //   (element: ShoppingCartItemDetailsViewModel, index: number) => {
    //     element.shoppingCartLineOnePersonViewModel.forEach(
    //       (val: ShoppingCartLinePersonViewModel, ind: number) => {
    //         if (
    //           val.linefont !== '' &&
    //           val.linefont !== value &&
    //           name === 'Font'
    //         ) {
    //           changedArr.push({ ...val, linefont: value });
    //         }
    //         if (
    //           val.linecolor !== '' &&
    //           val.linecolor !== value &&
    //           name === 'color'
    //         ) {
    //           changedArr.push({ ...val, linecolor: value });
    //         }
    //         if (
    //           val.personalizeLocation !== '' &&
    //           val.personalizeLocation !== value &&
    //           name === 'location'
    //         ) {
    //           changedArr.push({ ...val, personalizeLocation: value });
    //         }
    //       },
    //     );
    //     element.shoppingCartLineTwoPersonViewModel.forEach(
    //       (val: ShoppingCartLinePersonViewModel, ind: number) => {
    //         if (
    //           val.linefont !== '' &&
    //           val.linefont !== value &&
    //           name === 'Font'
    //         ) {
    //           changedArr.push({ ...val, linefont: value });
    //         }
    //         if (
    //           val.linecolor !== '' &&
    //           val.linecolor !== value &&
    //           name === 'color'
    //         ) {
    //           changedArr.push({ ...val, linecolor: value });
    //         }
    //         if (
    //           val.personalizeLocation !== '' &&
    //           val.personalizeLocation !== value &&
    //           name === 'location'
    //         ) {
    //           changedArr.push({ ...val, personalizeLocation: value });
    //         }
    //       },
    //     );
    //   },
    // );
    const newPersonalizationArr = personalizationArray.map(
      (p: ShoppingCartItemDetailsViewModel, i: number) => {
        return {
          ...p,
          shoppingCartLineOnePersonViewModel:
            p.shoppingCartLineOnePersonViewModel.map(
              (s: ShoppingCartLinePersonViewModel, i: number) => {
                if (
                  s.linefont !== '' &&
                  s.linefont !== value &&
                  name === 'Font'
                ) {
                  let newArr = cartLinePersonModels;
                  let availableIndex = newArr.findIndex(
                    (item) => item.id === s.id,
                  );

                  if (availableIndex !== -1) {
                    newArr[availableIndex].lineFont = value;
                    setCartLinePersonModels(newArr);
                  } else {
                    setCartLinePersonModels(
                      (prev: _CartLinePersonDetailModel[]) => [
                        ...prev,
                        { ...s, lineFont: value },
                      ],
                    );
                  }
                  return {
                    ...s,
                    linefont: value,
                  };
                } else if (
                  s.linecolor !== '' &&
                  s.linecolor !== value &&
                  name === 'color'
                ) {
                  let newArr = cartLinePersonModels;
                  let availableIndex = newArr.findIndex(
                    (item) => item.id === s.id,
                  );

                  if (availableIndex !== -1) {
                    newArr[availableIndex].lineColor = value;
                    setCartLinePersonModels(newArr);
                  } else {
                    setCartLinePersonModels(
                      (prev: _CartLinePersonDetailModel[]) => [
                        ...prev,
                        { ...s, lineColor: value },
                      ],
                    );
                  }
                  return {
                    ...s,
                    linecolor: value,
                  };
                } else if (
                  s.personalizeLocation !== '' &&
                  s.personalizeLocation !== value &&
                  name === 'location'
                ) {
                  let newArr = cartLinePersonModels;
                  let availableIndex = newArr.findIndex(
                    (item) => item.id === s.id,
                  );

                  if (availableIndex !== -1) {
                    newArr[availableIndex].personalizeLocation = value;
                    setCartLinePersonModels(newArr);
                  } else {
                    setCartLinePersonModels(
                      (prev: _CartLinePersonDetailModel[]) => [
                        ...prev,
                        { ...s, personalizeLocation: value },
                      ],
                    );
                  }
                  return {
                    ...s,
                    personalizeLocation: value,
                  };
                }
                return s;
              },
            ),

          shoppingCartLineTwoPersonViewModel:
            p.shoppingCartLineTwoPersonViewModel.map(
              (s: ShoppingCartLinePersonViewModel) => {
                if (
                  s.linefont !== '' &&
                  s.linefont !== value &&
                  name === 'Font'
                ) {
                  let newArr = cartLinePersonModels;
                  let availableIndex = newArr.findIndex(
                    (item) => item.id === s.id,
                  );

                  if (availableIndex !== -1) {
                    newArr[availableIndex].lineFont = value;
                    setCartLinePersonModels(newArr);
                  } else {
                    setCartLinePersonModels(
                      (prev: _CartLinePersonDetailModel[]) => [
                        ...prev,
                        { ...s, lineFont: value },
                      ],
                    );
                  }
                  return {
                    ...s,
                    linefont: value,
                  };
                } else if (
                  s.linecolor !== '' &&
                  s.linecolor !== value &&
                  name === 'color'
                ) {
                  let newArr = cartLinePersonModels;
                  let availableIndex = newArr.findIndex(
                    (item) => item.id === s.id,
                  );

                  if (availableIndex !== -1) {
                    newArr[availableIndex].lineColor = value;
                    setCartLinePersonModels(newArr);
                  } else {
                    setCartLinePersonModels(
                      (prev: _CartLinePersonDetailModel[]) => [
                        ...prev,
                        { ...s, lineColor: value },
                      ],
                    );
                  }
                  return {
                    ...s,
                    linecolor: value,
                  };
                } else if (
                  s.personalizeLocation !== '' &&
                  s.personalizeLocation !== value &&
                  name === 'location'
                ) {
                  let newArr = cartLinePersonModels;
                  let availableIndex = newArr.findIndex(
                    (item) => item.id === s.id,
                  );

                  if (availableIndex !== -1) {
                    newArr[availableIndex].lineColor = value;
                    setCartLinePersonModels(newArr);
                  } else {
                    setCartLinePersonModels(
                      (prev: _CartLinePersonDetailModel[]) => [
                        ...prev,
                        { ...s, personalizeLocation: value },
                      ],
                    );
                  }
                  return {
                    ...s,
                    personalizeLocation: value,
                  };
                }
                return s;
              },
            ),
        };
        return p;
      },
    );
    setPersonalizationArray(newPersonalizationArr);
    //   if (changedArr.length !== 0) {
    //     setPersonalizationArray(newArr);
    //     let obj = [...changedArr];
    //     await save(obj);
    //   }
    // };
  };

  const save = async (obj?: any) => {
    setShowLoader(true);
    updateCartPersonalization({
      cartLinePersonDetailModel: obj ? obj : cartLinePersonModels,
    })
      .then((res) => {
        if (res) {
          setShowLoader(false);

          if (obj) {
            setKeepPersonalizing(true);
          } else {
            showModal({ message: 'Successfully updated', title: 'Success' });
            setKeepPersonalizing(false);
          }
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
    if (
      e.target.value === '' &&
      personalizationArray[index].shoppingCartLineTwoPersonViewModel[lineIndex]
        .linetext !== ''
    ) {
      alert('Please Delete line Two First');
      return;
    }
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
    id: number,
  ) => {
    let lineObject: ShoppingCartLinePersonViewModel =
      name === 'lineone'
        ? personalizationArray[index].shoppingCartLineOnePersonViewModel[
            lineIndex
          ]
        : personalizationArray[index].shoppingCartLineTwoPersonViewModel[
            lineIndex
          ];
    // if (lineObject.linetext === '') {
    //   return;
    // }

    let newArr: _CartLinePersonDetailModel[] | [] = cartLinePersonModels;

    let availableIndex = newArr.findIndex((item) => item.id === id);

    if (availableIndex !== -1) {
      newArr[availableIndex].lineText = lineObject.linetext;
      setCartLinePersonModels(newArr);
    } else {
      setCartLinePersonModels((prev: _CartLinePersonDetailModel[] | []) => [
        ...prev,
        {
          id: lineObject.id,
          cartLinePersonId: lineObject.cartLinePersonId,
          shoppingCartItemsId: shoppingCartItemsId,
          linePrice:
            lineObject.linetext !== ''
              ? name === 'lineone'
                ? firstLineCharges
                : secondLineCharges
              : 0,
          lineQty: 1,
          lineAboveLogo: 0,
          lineIndividually: 1,
          lineNumber: name === 'lineone' ? 1 : 2,
          lineText: lineObject.linetext,
          lineTotal:
            lineObject.linetext !== ''
              ? name === 'lineone'
                ? firstLineCharges
                : secondLineCharges
              : 0,
          lineFont: lineObject.linetext !== '' ? lineObject.linefont : '',
          lineColor: lineObject.linetext !== '' ? lineObject.linecolor : '',
          linePriceDouble: 0,
          logoCartId: 0,
          personalizeLocation:
            lineObject.linetext !== '' ? selectedLocation : '',
          parentId: lineObject.parentId,
        },
      ]);
    }
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
                        setShowColorPelette(false);
                      }}
                    >
                      <div
                        className={`bg-${item.name.toLowerCase()} w-full h-full`}
                      ></div>
                    </div>
                  );
                },
              )}
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
              <button
                className='h-[32px] btn btn-sm text-sm border-2 btn-primary cursor-pointer'
                onClick={() => setShowColorPelette(!showColorPelette)}
              >
                {showColorPelette ? 'Close Custom Color' : 'Open Custom Color'}
              </button>
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
                                      _item.id,
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
                                      personalizationItem
                                        .shoppingCartLineTwoPersonViewModel[
                                        lineindex
                                      ].id,
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
