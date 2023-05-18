import NxtImage from '@appComponents/reUsable/Image';
import { logoFeedbackConst } from '@constants/logo.constant';
import { __pagesText } from '@constants/pages.text';
import { LogoDetails } from '@definations/APIs/logo.res';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  approveLogo,
  getLogoDetailsById,
  submitLogoFeedback,
} from '@services/logo.service';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const CheckLogoApproved2 = () => {
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

  return (
    <>
      <section className='pt-[40px]'>
        <div className='text-2xl-text text-center'>
          {__pagesText.ManageLogo.Heading}
        </div>
      </section>
      <section className='container mx-auto mt-[50px] mb-[50px]'>
        <div className='block lg:flex lg:space-x-10'>
          <div className='w-4/4 lg:w-1/5 pb-10'></div>
          <div className='w-4/4 lg:w-4/5'>
            {logoDetails && (
              <div className='bg-[#ffffff]'>
                <div className='text-sub-text font-[600] text-center p-[20px]'>
                  {__pagesText.CheckLogoApproved.jpegLogo}
                </div>
                <div className='overflow-auto max-h-screen border border-gray-border'>
                  <table className='table table-auto border-gray-border w-full'>
                    <tbody>
                      <tr>
                        <td className='w-15 p-3'>
                          <NxtImage
                            src={logoDetails[0].imageUrl}
                            className='img-responsive'
                            alt=''
                          />
                        </td>
                        <td className='bg-light-gray p-[16px] h-[300px]'>
                          <table className='table table-auto border-gray-border w-full'>
                            <tbody>
                              <tr>
                                <td className='border-b border-gray-border pt-[10px] pb-[10px]'>
                                  <strong>{logoDetails[0].name}</strong>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>
                                    {__pagesText.ManageLogo.LogoUploadedOn}
                                  </strong>
                                  {moment(logoDetails[0].logoDate).format(
                                    'MMM DD, YYYY',
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>
                                    {' '}
                                    {__pagesText.CheckLogoApproved.comment}
                                  </strong>
                                </td>
                              </tr>
                              <tr>
                                {!logoDetails[0].isjpeglogo ? (
                                  <>
                                    <div className='text-gray-500 text-sm'>
                                      {logoDetails[0].comments.length > 0
                                        ? logoDetails[0].comments[0].message
                                        : null}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    {' '}
                                    <div className='overflow-auto max-h-screen border border-gray-border mb-[16px] rounded-md'>
                                      <table
                                        className='table-auto w-full text-sm text-[#191919]'
                                        data-value={logoDetails[0].isjpeglogo}
                                      >
                                        <tbody className='text-sm divide-y divide-slate-200'>
                                          {logoDetails[0].comments.map(
                                            (comment) => (
                                              <tr key={comment.id}>
                                                <td className='px-2 first:pl-5 py-3 font-semibold'>
                                                  {comment.senderName}:
                                                </td>
                                                <td className='px-2 first:pl-5 py-3'>
                                                  <div className='font-semibold'>
                                                    {moment(
                                                      comment.date,
                                                    ).format('MMM DD, YYYY')}
                                                  </div>
                                                  <div className='text-gray-500'>
                                                    {comment.message}
                                                  </div>
                                                </td>
                                              </tr>
                                            ),
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                    {!logoDetails[0].isApproved && (
                                      <>
                                        <Formik
                                          initialValues={{
                                            comment: '',
                                            logoImageName:
                                              logoDetails[0].imageUrl,
                                            logoType: 0,
                                            logoSize: logoDetails[0].logoSize,
                                            embroideryColor:
                                              logoDetails[0].embroideryColor,
                                            parentId:
                                              +logoDetails[0].comments[
                                                logoDetails[0].comments.length -
                                                  1
                                              ].id,
                                          }}
                                          onSubmit={submitFeedback_Fn}
                                          validationSchema={validationSchema}
                                        >
                                          {({
                                            handleChange,
                                            handleBlur,
                                            errors,
                                            values,
                                          }) => (
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
                                                  value={''}
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
                                                <p className='error'>
                                                  {errors.comment}
                                                </p>
                                              </div>
                                              <div className='flex items-center justify-center mt-4'>
                                                <div className='grow'>
                                                  <button
                                                    className='btn btn-primary !w-full text-center'
                                                    type='submit'
                                                  >
                                                    {
                                                      __pagesText
                                                        .CheckLogoApproved
                                                        .submitFeedback
                                                    }
                                                  </button>
                                                </div>
                                                <div className='mx-2'>
                                                  {
                                                    __pagesText
                                                      .CheckLogoApproved.or
                                                  }
                                                </div>
                                                <div className='grow'>
                                                  <div
                                                    className='btn btn-primary !w-full text-center'
                                                    onClick={() =>
                                                      Approve_Fn({
                                                        logoImageName:
                                                          logoDetails[0]
                                                            .imageUrl,
                                                        logoType: 0,
                                                        logoSize:
                                                          logoDetails[0]
                                                            .logoSize,
                                                        embroideryColor:
                                                          logoDetails[0]
                                                            .embroideryColor,
                                                        parentId:
                                                          +logoDetails[0]
                                                            .comments[
                                                            logoDetails[0]
                                                              .comments.length -
                                                              1
                                                          ].id,
                                                      })
                                                    }
                                                  >
                                                    {
                                                      __pagesText
                                                        .CheckLogoApproved
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
                                  </>
                                )}
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckLogoApproved2;
