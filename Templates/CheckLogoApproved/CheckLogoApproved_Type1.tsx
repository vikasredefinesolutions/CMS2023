/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import MyAccountTabs from '@appComponents/common/MyAccountTabsType1';
import NxtImage from '@appComponents/reUsable/Image';
import { logoFeedbackConst } from '@constants/logo.constant';
import { __pagesText } from '@constants/pages.text';
import { LogoDetails } from '@definations/APIs/logo.res';
import {
  approveLogo,
  getLogoDetailsById,
  submitLogoFeedback,
} from '@services/logo.service';
import { Form, Formik } from 'formik';
import getLocation from 'helpers_v2/getLocation';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import _ from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const CheckLogoApproved1 = () => {
  const { showModal } = useActions_v2();
  const router = useRouter();
  const { logoId } = router.query;
  const [logoDetails, setLogoDetails] = useState<null | LogoDetails>(null);
  const userId = useTypedSelector_v2((state) => state.user.id);

  const loadLogoList = () => {
    getLogoDetailsById(+logoId!)
      .then((logoDetails) => {
        setLogoDetails(logoDetails);
      })
      .catch((error) => {
        showModal({
          message: 'Something went Wrong. Please try again!',
          title: 'Try Again',
        });
        router.push('/ManageLogo/ManageLogo');
      });
  };
  useEffect(() => {
    if (logoId && !_.isEmpty(logoId)) {
      loadLogoList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoId]);

  const validationSchema = Yup.object().shape({
    comment: Yup.string().required(''),
  });

  const submitFeedback_Fn = async (
    values: {
      comment: string;
      logoImageName: string;
      logoType: string | number;
      logoSize: string;
      embroideryColor: string;
      parentId: number;
    },
    {
      resetForm,
    }: {
      resetForm: () => void;
    },
  ) => {
    // console.log('submitFeedback_Fn');

    const locationDetail = await getLocation();
    const submitFeedback = {
      ...logoFeedbackConst,
      location: locationDetail.city,
      ipAddress: locationDetail.ip_address,
      customerId: +userId!,
      customerLogoId: +logoId!,
      longDescription: values.comment,
      logoImageName: values.logoImageName || '',
      isApproved: false,
      logoSize: values.logoSize || '',
      embroideryColor: values.embroideryColor || '',
      parentId: values.parentId,
      logoType: values.logoType,
    };

    try {
      await submitLogoFeedback({
        customeradminlogodescriptionrequestmodel: submitFeedback,
      });
      alert('Success');
      loadLogoList();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const Approve_Fn = async (values: {
    logoImageName: string;
    logoType: string | number;
    logoSize: string;
    embroideryColor: string;
    parentId: number;
  }) => {
    const locationDetail = await getLocation();
    // console.log('values' , values);

    const approveFeedback = {
      ...logoFeedbackConst,
      location: locationDetail.city,
      ipAddress: locationDetail.ip_address,
      customerId: +userId!,
      customerLogoId: +logoId!,
      longDescription: '',
      logoImageName: values.logoImageName || '',
      isApproved: true,
      logoSize: values.logoSize || '',
      embroideryColor: values.embroideryColor || '',
      parentId: values.parentId,
      logoType: values.logoType,
    };
    try {
      await approveLogo({
        customeradminlogodescriptionrequestmodel: approveFeedback,
      });
      alert('Success');
      loadLogoList();
    } catch (error) {
      console.log(error);
    }
  };

  const checklogoType = (name: string) => {
    if (name == __pagesText.dst) {
      return 1;
    } else if (name == __pagesText.jpg) {
      return 0;
    } else {
      return 2;
    }
  };
  const reverse = logoDetails && [...logoDetails].reverse();

  return (
    <>
      <MyAccountTabs />
      {reverse?.length
        ? reverse.map((logoDetail, index) => (
            <section
              className='container mx-auto mt-[50px] mb-[50px] text-[#000000]'
              key={`${logoDetail.logoDate}__${index}`}
            >
              <div className='bg-[#ffffff]'>
                <div className='text-sub-text font-[600] text-center p-[20px]'>
                  {logoDetail?.isjpeglogo
                    ? __pagesText.CheckLogoApproved.jpegLogo
                    : __pagesText.CheckLogoApproved.dstLogo}
                </div>
                <div className='border border-gray-border md:grid md:grid-cols-3 md:gap-x-6 mb-[30px] rounded-md'>
                  <div className='left-side-box md:col-span-1 pl-[15px] pr-[15px] pt-[15px] pb-[15px] md:pl-[24px] md:pr-[24px] md:pt-[24px] md:pb-[24px] md:pr-0'>
                    <NxtImage
                      src={logoDetail?.imageUrl}
                      className='w-full'
                      alt=''
                    />
                  </div>
                  <div className='md:col-span-2 bg-light-gray pl-[15px] pr-[15px] pt-[15px] pb-[15px] md:pl-[24px] md:pr-[24px] md:pt-[24px] md:pb-[24px] rounded-r-md text-default-text'>
                    <div>
                      <div className='flex items-center justify-between gap-2 mb-[12px]'>
                        <div className='w-1/3 font-[600]'>
                          {logoDetail?.name}
                        </div>
                      </div>
                      <div className='flex items-center gap-2 mb-[4px]'>
                        <div className='w-1/3 font-[600]'>
                          {__pagesText.CheckLogoApproved.LogoUploadedOn}
                        </div>
                        <div>
                          {moment(logoDetail?.logoDate || '')?.format(
                            'MMM DD, YYYY',
                          )}
                        </div>
                      </div>
                      <div className='flex items-center gap-2 mb-[4px]'>
                        <div className='w-1/3 font-[600]'>
                          {__pagesText.CheckLogoApproved.LogoSize}
                        </div>
                        <div>{logoDetail?.logoSize}</div>
                      </div>
                      <div className='flex items-center gap-2 mb-[4px]'>
                        <div className='w-1/3 font-[600]'>
                          {__pagesText.CheckLogoApproved.EmbroideryColor}
                        </div>
                        {logoDetail?.embroideryColor &&
                          logoDetail?.embroideryColor
                            .split(',')
                            .map((color) => (
                              <div
                                key={'color'}
                                className={`w-8 h-8 border-2 hover:border-secondary p-0.5`}
                                style={{
                                  background: color,
                                }}
                              />
                            ))}
                      </div>
                      <div className='font-[600] mb-[8px]'>
                        {__pagesText.CheckLogoApproved.comment}
                      </div>
                      {/* {logoDetail?.isjpeglogo ? (
                        <>
                          <div className='text-gray-500 text-sm'>
                            {logoDetail?.comments.length > 0
                              ? logoDetail?.comments[0].message
                              : null}
                          </div>
                        </>
                      ) : ( */}
                      <>
                        {' '}
                        <div className='overflow-auto max-h-screen border border-gray-border mb-[16px] rounded-md'>
                          <table
                            className='table-auto w-full text-sm text-[#191919]'
                            data-value={logoDetail?.isjpeglogo}
                          >
                            <tbody className='text-sm divide-y divide-slate-200'>
                              {logoDetail?.comments.map((comment) => (
                                <tr key={comment?.id}>
                                  <td className='px-2 first:pl-5 py-3 font-semibold'>
                                    {comment?.senderName}:
                                  </td>
                                  <td className='px-2 first:pl-5 py-3'>
                                    <div className='font-semibold'>
                                      {moment(comment?.date).format(
                                        'MMM DD, YYYY',
                                      )}
                                    </div>
                                    <div className='text-gray-500'>
                                      {comment?.message}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                      {/* )} */}
                      {!logoDetail?.isApproved && (
                        <>
                          <Formik
                            initialValues={{
                              comment: '',
                              logoImageName: logoDetail?.imageUrl,
                              logoType: checklogoType(logoDetail.name),
                              logoSize: logoDetail?.logoSize,
                              embroideryColor: logoDetail?.embroideryColor,
                              parentId:
                                +logoDetail?.comments[
                                  logoDetail?.comments.length - 1
                                ].id,
                            }}
                            onSubmit={submitFeedback_Fn}
                            validationSchema={validationSchema}
                          >
                            {({ handleChange, handleBlur, errors, values }) => (
                              <Form>
                                <div className=''>
                                  <textarea
                                    rows={3}
                                    name='comment'
                                    className='form-input'
                                    placeholder='Your feedback'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.comment}
                                  ></textarea>
                                  <input
                                    type='hidden'
                                    name='logoImageName'
                                    value={values.logoImageName}
                                  />
                                  <input
                                    type='hidden'
                                    name='logoType'
                                    value={checklogoType(logoDetail.name)}
                                  />
                                  <input
                                    type='hidden'
                                    name='logoSize'
                                    value={values.logoSize}
                                  />
                                  <input
                                    type='hidden'
                                    name='embroideryColor'
                                    value={values.embroideryColor}
                                  />
                                  <p className='error'>{errors.comment}</p>
                                </div>
                                <div className='flex items-center justify-center mt-4'>
                                  <div className='grow'>
                                    <button
                                      className='btn btn-primary !w-full text-center'
                                      type='submit'
                                    >
                                      {
                                        __pagesText.CheckLogoApproved
                                          .submitFeedback
                                      }
                                    </button>
                                  </div>
                                  <div className='mx-2'>
                                    {__pagesText.CheckLogoApproved.or}
                                  </div>
                                  <div className='grow'>
                                    <div
                                      className='btn btn-primary !w-full text-center'
                                      onClick={() =>
                                        Approve_Fn({
                                          logoImageName: logoDetail?.imageUrl,
                                          logoType: checklogoType(
                                            logoDetail.name,
                                          ),
                                          logoSize: logoDetail?.logoSize,
                                          embroideryColor:
                                            logoDetail?.embroideryColor,
                                          parentId:
                                            +logoDetail?.comments[
                                              logoDetail?.comments.length - 1
                                            ].id,
                                        })
                                      }
                                    >
                                      {
                                        __pagesText.CheckLogoApproved
                                          .approveLogo
                                      }
                                    </div>
                                  </div>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))
        : null}
    </>
  );
};

export default CheckLogoApproved1;
