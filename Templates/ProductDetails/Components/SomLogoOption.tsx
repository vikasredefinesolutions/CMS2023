/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import LoginModal from '@appComponents/modals/loginModal';
import NxtImage from '@appComponents/reUsable/Image';
import { logoLocation } from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import { ApprovedLogoItem } from '@definations/APIs/logo.res';
import { UploadImage } from '@services/file.service';
import { getApprovedLogoWithPosition } from '@services/logo.service';
import { _SOMLogoOptionProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { IndexLabels } from 'mock_v2/startModal.mock';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const dummyLogoImage = '/assets/images/logo-to-be-submitted.webp';

const SomLogoOption: React.FC<_SOMLogoOptionProps> = ({
  title,
  id,
  name,
  index,
  textIndex,
  editDetails,
  price: logoPrice,
  onRemove: removeHandler,
}) => {
  const { totalQty } = useTypedSelector_v2((state) => state.product.toCheckout);
  const [showLogoLibrary, setShowLogoLibrary] = useState<boolean>(false);
  const [availableLogos, setAvailableLogos] = useState<ApprovedLogoItem[]>([]);
  const { sewOutCharges, isSewOutEnable } = useTypedSelector_v2(
    (state) => state.store,
  );
  const [setmodal, setShowModal] = useState<string | null>(null);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { id: storeId, imageFolderPath } = useTypedSelector_v2(
    (state) => state.store,
  );

  const {
    setShowLoader,
    showModal,
    product_updateLogoDetails,
    product_updateSewOutCharges,
  } = useActions_v2();

  const [logoStatus, setLogoStatus] = useState<null | 'submitted' | 'later'>(
    null,
  );
  const [selectedLocation, setSelectedLocation] = useState<null | {
    label: string;
    value: string;
    image: {
      url: string;
      alt: string;
    };
    show: boolean;
    price: number;
    cost: number;
  }>(null);
  const [logoToBeSubmitted, setLogoToBeSubmitted] =
    useState<ApprovedLogoItem | null>(null);
  const { mediaBaseUrl } = useTypedSelector_v2((state) => state.store);
  const [fileToUpload, setFileToUpload] = useState<{
    name: string;
    type: string;
    previewURL: string;
  } | null>(null);
  const [option, setOption] = useState<
    {
      image: {
        url: string;
        alt: string;
      };
      value: string;
      price: number;
      show: boolean;
      cost: number;
      label: string;
    }[]
  >([]);

  const { som_logos } = useTypedSelector_v2((state) => state.product);

  useEffect(() => {
    if (som_logos?.details?.length && som_logos.details[index]) {
      const constructedLocation: any = som_logos.details[index];
      setLogoStatus(constructedLocation?.status);
      setSelectedLocation({
        price: constructedLocation?.price,
        cost: constructedLocation?.price,
        label: constructedLocation?.location?.name,
        value: constructedLocation?.location?.value,
        show: !!constructedLocation?.status,
        image: {
          url: constructedLocation?.location?.imageUrl,
          alt: constructedLocation?.location?.name,
        },
      });
      setFileToUpload({
        name: constructedLocation?.title,
        previewURL: constructedLocation?.filePath?.includes('http')
          ? constructedLocation?.filePath?.replace('blob:', '')
          : mediaBaseUrl + constructedLocation?.filePath,
        type: constructedLocation?.location?.name,
      });
    }
  }, [index]);

  const availableOptions = useTypedSelector_v2(
    (state) => state.product.som_logos.availableOptions,
  );

  const fetchLogoLibrary = async () => {
    try {
      if (storeId && customerId && selectedLocation?.value) {
        await getApprovedLogoWithPosition({
          customerid: customerId,
          storeid: storeId,
          LogoPosition: selectedLocation.value,
        }).then((res) => {
          if (res && res?.length > 1) {
            setAvailableLogos(res);
            setShowLogoLibrary(true);
          } else {
            setShowLogoLibrary(true);
            setTimeout(() => {
              setShowLogoLibrary(false);
            }, 2000);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const options = availableOptions?.map((item) => ({
      image: {
        url: item.image.url,
        alt: item.image.url,
      },
      value: item.value,
      price: item.price,
      cost: item.cost,
      show: false,
      label: (
        <div className='flex items-center '>
          {/*  TODO - ABHISHEK - ANKIT ??? */}
          <img
            alt={item?.image?.alt}
            src={
              item?.image?.url?.startsWith('assets')
                ? item.image.url
                : `${mediaBaseUrl}${item?.image?.url}`
            }
            height='60px'
            width='60px'
            className='mr-2 border border-gray-200'
          />
          {item.value}
        </div>
      ) as unknown as string,
    }));
    if (options) {
      setOption(options);
    }
  }, [availableOptions]);

  const submitFromLibrary = (logo: ApprovedLogoItem) => {
    product_updateLogoDetails({
      type: 'Upload_Logo',
      logo: {
        status: logoLocation.submitted,
        location: {
          imageUrl: selectedLocation?.image.url ?? '',
          name: selectedLocation?.label ?? '',
          value: selectedLocation?.value ?? '',
        },
        title: logo.logoName,
        filePath: logo.logo,
        date: JSON.stringify(new Date()),
        price: logoPrice === 'FREE' ? 0 : logoPrice,
        quantity: totalQty,
        isSewOut: false,
        sewOutAmount: 0,
        reUsableCustomerLogo: logo.id,
      },
    });
    setLogoToBeSubmitted(logo);
    setLogoStatus('submitted');
    setShowLogoLibrary(false);
  };
  const fileReader = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files &&
      !['image/png', 'image/jpeg', 'image/jpg'].includes(
        event.target.files[0].type,
      )
    ) {
      alert('Please select an image file.');
      return;
    }
    if (event.currentTarget?.files === null) return;
    setShowLoader(true);

    try {
      const file = {
        name: event.currentTarget.files[0].name,
        type: event.currentTarget.files[0].type,
        previewURL: URL.createObjectURL(event.currentTarget.files[0]),
      };

      var idxDot = file.name.split('.');
      const type = idxDot[idxDot.length - 1];

      if (type == 'jpg' || type == 'jpeg' || type == 'png') {
        //TO DO

        const logoFileURL: string | null = await UploadImage({
          folderPath: imageFolderPath,
          files: event.currentTarget?.files[0],
        });
        product_updateLogoDetails({
          type: 'Upload_Logo',
          logo: {
            status: logoLocation.submitted,
            location: {
              imageUrl: selectedLocation?.image.url ?? '',
              name: selectedLocation?.label ?? '',
              value: selectedLocation?.value ?? '',
            },
            title: file.name,
            filePath: logoFileURL ? logoFileURL : '',
            date: JSON.stringify(new Date()),
            price: logoPrice === 'FREE' ? 0 : logoPrice,
            quantity: totalQty,
            isSewOut: false,
            sewOutAmount: 0,
            reUsableCustomerLogo: 0,
          },
        });
        product_updateLogoDetails({
          type: 'Update_TotalPrice_ByLogo',
          logo: {
            addOrSubtract: 'add',
            price: logoPrice,
            index,
            logoStatus,
          },
        });

        setFileToUpload(file);
        setLogoStatus('submitted');
      } else {
        alert('Only jpg/jpeg and png files are allowed!');
      }
    } catch (error) {
      showModal({
        title: 'Error',
        message: 'Something Went Wrong. Try again, later!!!',
      });
    }
    setShowLoader(false);
  };

  const DisplayActions = () => {
    let text = <></>;

    const actionHandler = (action: null | 'later' | 'submitted' | '') => {
      if (!selectedLocation?.value) return;

      if (action === 'later') {
        setLogoStatus('later');
        product_updateLogoDetails({
          type: 'Upload_Logo',
          logo: {
            status: logoLocation.submitLater,
            location: {
              imageUrl: selectedLocation?.image.url ?? '',
              name: selectedLocation?.label ?? '',
              value: selectedLocation?.value ?? '',
            },
            quantity: totalQty,
            price: logoPrice === 'FREE' ? 0 : logoPrice,
            date: JSON.stringify(new Date()),
            sewOutAmount: 0,
            isSewOut: false,
            reUsableCustomerLogo: 0,
          },
        });
        product_updateLogoDetails({
          type: 'Update_TotalPrice_ByLogo',
          logo: {
            addOrSubtract: 'add',
            price: logoPrice,
            index,
            logoStatus,
          },
        });
        return;
      }
      if (action === 'submitted') {
        setLogoStatus('submitted');

        return;
      }
      if (action === null) {
        setSelectedLocation(null);
        setLogoStatus(null);
        setFileToUpload(null);
        return;
      }
    };

    switch (logoStatus) {
      case null:
        text = (
          <div
            className='cursor-pointer w-full text-anchor font-[600]'
            onClick={() => actionHandler('later')}
          >
            {__pagesText.productInfo.somLogoOption.addLogoLater}
          </div>
        );
        break;
      case 'later':
        text = (
          <div className='flex items-center'>
            <div className=''>
              <NxtImage
                isStatic={true}
                src={dummyLogoImage}
                useNextImage={false}
                alt=''
                className=''
              />
            </div>
            <div className='cursor-pointer w-full font-[600] ml-5'>
              <div>{__pagesText.productInfo.somLogoOption.logoToBe}</div>
              <div>{__pagesText.productInfo.somLogoOption.submitted}</div>
            </div>
          </div>
        );
        break;
      case 'submitted':
        text = (
          <div
            className='cursor-pointer w-full text-anchor font-[600] underline'
            onClick={() => actionHandler(null)}
          >
            X {__pagesText.productInfo.somLogoOption.remove}
          </div>
        );
        break;
      default:
        text = (
          <div
            className='cursor-pointer w-full text-anchor font-[600] '
            onClick={() => actionHandler('later')}
          >
            {__pagesText.productInfo.somLogoOption.addLogoLater}
          </div>
        );
        break;
    }

    return text;
  };

  useEffect(() => {
    if (logoStatus === 'later' || logoStatus === 'submitted') {
      product_updateLogoDetails({
        type: 'Update_Location_Options',
        location: {
          addOrRemove: 'REMOVE',
          price: selectedLocation!.price,
          cost: selectedLocation!.cost,
          value: selectedLocation!.value,
          label: selectedLocation!.label,
          image: selectedLocation!.image,
        },
      });

      setSelectedLocation((opt) => {
        if (opt === null) return null;
        return { ...opt, show: true };
      });
    }
    return () => {
      if (logoStatus === 'later' || logoStatus === 'submitted') {
        product_updateLogoDetails({
          type: 'Location_Update_Pending',
          pending: null,
        });

        product_updateLogoDetails({
          type: 'Update_Location_Options',
          location: {
            addOrRemove: 'ADD',
            price: selectedLocation!.price,
            cost: selectedLocation!.cost,
            value: selectedLocation!.value,
            label: selectedLocation!.label,
            image: selectedLocation!.image,
          },
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoStatus]);

  // useEffect(() => {
  //   return () => {
  //     product_updateLogoDetails({
  //       type: 'Update_TotalPrice_ByLogo',
  //       logo: {
  //         addOrSubtract: 'subtract',
  //         price: logoPrice,
  //         index,
  //       },
  //     });
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <div className='p-2 mb-2 border bg-gray-50 border-slate-200'>
      <div className='flex items-center justify-between mb-2 gap-2'>
        <div className='font-semibold text-lg '>{title}</div>
        {index !== 0 && (
          <div className=''>
            <button
              className='text-rose-600'
              type='button'
              onClick={() => {
                product_updateLogoDetails({
                  type: 'Remove_SOM_logo',
                  logoIndex: index,
                  logoStatus,
                });
                product_updateLogoDetails({
                  type: 'Allow_Next_Logo',
                  allow: true,
                });
                product_updateLogoDetails({
                  type: 'Update_TotalPrice_ByLogo',
                  logo: {
                    addOrSubtract: 'subtract',
                    price: logoPrice,
                    index,
                    logoStatus,
                  },
                });
                if (som_logos.details && som_logos.details.length - 1 > index) {
                  const constructedLocation: any = som_logos.details[index + 1];
                  setLogoStatus(constructedLocation?.status);
                  setSelectedLocation({
                    price: constructedLocation?.price,
                    cost: constructedLocation?.price,
                    label: constructedLocation?.location?.name,
                    value: constructedLocation?.location?.value,
                    show: !!constructedLocation?.status,
                    image: {
                      url: constructedLocation?.location?.filePath,
                      alt: constructedLocation?.location?.name,
                    },
                  });
                  setFileToUpload({
                    name: constructedLocation?.title,
                    previewURL: mediaBaseUrl + constructedLocation?.filePath,
                    type: constructedLocation?.location?.name,
                  });
                } else {
                  setLogoStatus(null);
                  setSelectedLocation({
                    price: 0,
                    cost: 0,
                    label: '',
                    value: '',
                    show: false,
                    image: {
                      url: '',
                      alt: '',
                    },
                  });
                  setFileToUpload(null);
                }

                removeHandler.remove(index);
              }}
            >
              {__pagesText.productInfo.somLogoOption.remove}
            </button>
          </div>
        )}
      </div>
      <div className='mb-4 last:mb-0'>
        <label htmlFor={name} className='block mb-2'>
          {__pagesText.productInfo.somLogoOption.selectALocationToPrintLogo}
        </label>
        <Select
          isDisabled={selectedLocation?.show}
          value={selectedLocation}
          onChange={(e: any) => {
            product_updateLogoDetails({
              type: 'Location_Update_Pending',
              pending: IndexLabels[textIndex - 1].label,
            });
            setSelectedLocation({
              price: e.price,
              cost: e.cost,
              label: e.label.props.children[1],
              value: e.value,
              show: false,
              image: availableOptions
                ? availableOptions?.find((opt) => opt.value === e.value)!.image
                : {
                    url: '',
                    alt: '',
                  },
            });
          }}
          options={Array.isArray(option) && option.length ? option : []}
        />
      </div>
      <div className='mb-4 last:mb-0'>
        <label htmlFor='' className='block mb-2'>
          {__pagesText.productInfo.somLogoOption.selectYourLogo}
        </label>
        {selectedLocation && (
          <div className='flex flex-wrap items-center justify-between border border-gray-600 shadow-sm text-sm p-2'>
            {logoStatus === null && <div className=''>Upload Your Logo</div>}
            {/* {logoStatus === 'later' && (
              <div className=''>
                <NxtImage src={dummyLogoImage} alt='' />
              </div>
            )} */}
            {logoStatus === 'submitted' && (
              <div className=''>
                <NxtImage
                  key={fileToUpload?.previewURL}
                  className='w-14 max-h-14'
                  useNextImage={false}
                  src={
                    fileToUpload?.previewURL || logoToBeSubmitted?.logo || ''
                  }
                  isStatic={
                    fileToUpload?.previewURL
                      ? fileToUpload?.previewURL.includes('http')
                      : logoToBeSubmitted?.logo.includes('http')
                  }
                  alt=''
                />
              </div>
            )}
            <div>{DisplayActions()}</div>
            {logoStatus === null && (
              <div className=''>
                <button
                  className='cursor-pointer inline-block bg-primary border-0 py-2 px-3 text-white'
                  onClick={() =>
                    customerId ? fetchLogoLibrary() : setShowModal('login')
                  }
                >
                  {__pagesText.productInfo.somLogoOption.uploadFromLibrary}
                </button>
              </div>
            )}

            <div className=''>
              <label
                htmlFor={id}
                className='cursor-pointer inline-block bg-primary border-0 py-2 px-3 text-white'
              >
                {fileToUpload?.previewURL
                  ? __pagesText.productInfo.somLogoOption.edit
                  : __pagesText.productInfo.somLogoOption.upload}
              </label>
              <input
                type='file'
                name={id}
                id={id}
                value={''}
                className='sr-only'
                onChange={fileReader}
                accept={'.png, .jpg, .jpeg'}
              />
            </div>
          </div>
        )}
      </div>
      {showLogoLibrary ? (
        availableLogos.length > 0 ? (
          <div className='relative border-2 border-gray-border w-full p-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2'>
            {availableLogos?.map((val: ApprovedLogoItem) => (
              <div
                key={val.id}
                onClick={() => submitFromLibrary(val)}
                className='flex items-center justify-center border border-gray-border p-1 h-[80px]'
              >
                <NxtImage
                  className='max-h-full cursor-pointer'
                  src={val.logo}
                  useNextImage={false}
                  alt={val.logo}
                />
              </div>
            ))}
            <div className='absolute top-0 right-0 z-5'>
              <button
                onClick={() => setShowLogoLibrary(false)}
                className='cursor-pointer btn btn-primary btn-sm'
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className='border-2 border-black w-full p-2 text-center'>
            Sorry.No Approved logo Available for this Position
          </div>
        )
      ) : (
        <></>
      )}
      {(logoStatus === 'later' || logoStatus === 'submitted') &&
        isSewOutEnable &&
        totalQty > 0 && (
          <label className='block mb-2'>
            <input
              type='checkbox'
              onChange={(e: any) => {
                if (e.target.checked) {
                  product_updateSewOutCharges({
                    type: 'Add_Charges',
                    logo: {
                      sewOutCharges: sewOutCharges,
                      isSewOut: e.target.checked,
                      index: index,
                    },
                  });
                } else {
                  product_updateSewOutCharges({
                    type: 'Subtract_Charges',
                    logo: {
                      sewOutCharges: sewOutCharges,
                      isSewOut: e.target.checked,
                      index: index,
                    },
                  });
                }
              }}
              checked={
                som_logos?.details ? som_logos?.details[index]?.isSewOut : false
              }
              className='mr-1 '
            />
            SewOut (Extra ${sewOutCharges.toFixed(2)} per Piece)
          </label>
        )}
      {setmodal === 'login' && (
        <div className='z-100'>
          {' '}
          <LoginModal modalHandler={setShowModal} />{' '}
        </div>
      )}
    </div>
  );
};

export default SomLogoOption;
