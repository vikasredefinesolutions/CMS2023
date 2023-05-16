/* eslint-disable no-unused-vars */
import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { addReviewMessages } from '@constants/validation.text';
import { _ProductColor } from '@definations/APIs/colors.res';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { UploadImage } from '@services/file.service';
import { FetchColors } from '@services/product.service';
import { AddProductReview } from '@services/review.service';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import * as Yup from 'yup';
import { ReviewFormValues } from './WriteReview';

const WriteReviewTemplate_1 = () => {
  const { setShowLoader, showModal } = useActions_v2();
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const customerName = useTypedSelector_v2(
    (state) => state.user.customer?.firstname,
  );
  const productName = useTypedSelector_v2(
    (state) => state.product.product.name,
  );
  const productNamedeatils = useTypedSelector_v2(
    (state) => state.product.product,
  );
  const selectedImage = useTypedSelector_v2(
    (state) => state.product.selected.image,
  );

  const [files, setFilesFn] = useState<Array<{ file: File; preview: string }>>(
    [],
  );
  const [star, setStar] = useState(5);
  const [comment, setComment] = useState('');
  const [commentHeading, setCommentHeading] = useState('');
  // const [searchParam] = useSearchParams();
  // const productId = searchParam.get('ProductId');
  const { query, back } = useRouter();
  const productId = query.ProductId;
  const attributeId = query.attributeId;
  const [productcolorDetail, setProductcolorDetail] = useState<
    _ProductColor[] | null
  >();
  useEffect(() => {
    if (storeId && productId) {
      FetchColors({
        productId: +productId,
        storeId: storeId,
        isAttributeSaparateProduct: false,
      }).then((res) => setProductcolorDetail(res));
    }
  }, [productId, storeId, attributeId]);

  const productdata = productcolorDetail?.filter((color) => {
    if (attributeId && color.attributeOptionId == +attributeId) {
      return color;
    }
  });

  const validationSchema = Yup.object().shape({
    comment: Yup.string()
      .min(3, addReviewMessages.comment.min)
      .max(200, addReviewMessages.comment.max)
      .required(addReviewMessages.comment.required),
    commentHeading: Yup.string()
      .min(3, addReviewMessages.commentHeading.min)
      .max(60, addReviewMessages.commentHeading.max)
      .required(addReviewMessages.commentHeading.required),
  });

  const fileChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputFiles: FileList | null = event.target.files;
    const files = [];
    if (inputFiles) {
      for (let i = 0; i < inputFiles.length; i++) {
        const file = inputFiles[i];
        const src = URL.createObjectURL(file);
        files.push({ file, preview: src });
      }
      setFilesFn(files);
    }
  };

  const submitHandler = async (values: ReviewFormValues) => {
    setShowLoader(true);
    const images = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i].file;
        const ext = file.name.split('.').at(-1);
        const folderPath = `temp/1/Store/${storeId}/writereview/${uuid()}.${ext}`;
        const image = await UploadImage({ folderPath, files: file });
        images.push(image);
      }
    }

    const data = await getLocation();
    const imagesA = images.map((url) => ({
      id: 0,
      rowVersion: '',
      location: `${data.city}, ${data.region}, ${data.country}, ${data.postal_code}`,
      ipAddress: data.ip_address,
      macAddress: '00-00-00-00-00-00',
      reviewId: 0,
      imageName: `${url}`,
      displayOrder: 0,
      recStatus: 'A',
    }));

    const submitObject = {
      reviewModel: {
        id: 0,
        rowVersion: '',
        location: `${data.city}, ${data.country}, ${data.postal_code}`,
        ipAddress: data.ip_address,
        macAddress: '00-00-00-00-00-00',
        productId: (productId && +productId) || 0,
        customerId: customerId || 0,
        storeId: storeId || 0,
        commentHeading: values.commentHeading,
        comment: values.comment,
        rating: star,
        helpFullCount: 0,
        notHelpFullCount: 0,
        recStatus: 'A',
        images: imagesA,
      },
    };

    AddProductReview(submitObject)
      .then(() => {
        setShowLoader(false);
        showModal({
          message: 'Review added successfully',
          title: 'Thank You',
        });
        setTimeout(() => {
          back();
        }, 1000);
      })
      .catch(() => {
        setShowLoader(false);
        showModal({
          message: __pagesText.review.someThingWrong,
          title: __pagesText.review.titleError,
        });
      });
  };

  const getRatingText = () => {
    if (star === 1) {
      return __pagesText.review.hateIt;
    } else if (star === 2) {
      return __pagesText.review.DontLike;
    } else if (star === 3) {
      return __pagesText.review.ok;
    } else if (star === 4) {
      return __pagesText.review.likeIt;
    } else if (star === 0) {
      return __pagesText.review.blank;
    } else {
      return __pagesText.review.loveIt;
    }
  };

  return (
    <>
      <section id='' className='mt-[12px] mb-10'>
        <div className='bg-[#ffffff]'>
          <div className='container mx-auto'>
            <div className='flex flex-wrap mt-[-12px] relative mx-[-15px]'>
              <div className='w-full mt-[12px]'>
                <div className='items-center w-full pl-[15px] pr-[15px] pt-[16px] pb-[16px] mb-[20px]'>
                  <div className='text-title-text mr-[12px] font-semibold text-center'>
                    {__pagesText.review.writeReview}
                  </div>
                </div>
                <ul className='overflow-hidden' role='list'>
                  <li className='flex flex-wrap px-[15px] py-[36px] border border-gray-300'>
                    <div className='w-full lg:w-2/6 pl-[15px] pr-[15px] mb-[30px]'>
                      <div className='w-full'>
                        {productdata && (
                          <Link
                            href={`/${productdata[0].productSEName}.html`}
                            className=''
                          >
                            <div className='w-3/4 cursor-pointer'>
                              <NxtImage
                                src={productdata[0]?.imageUrl || ''}
                                alt={''}
                                className={''}
                                title={productdata[0].name}
                              />
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className='w-full lg:w-4/6 pl-[15px] pr-[15px] lg:justify-between'>
                      <div className='w-full flex flex-wrap mt-[5px]'>
                        <div className='lg:w-2/3 w-full'>
                          <div className='text-title-text font-semibold mb-[10px]'>
                            {productdata && (
                              <Link
                                href={`/${productdata[0].productSEName}.html`}
                                className=''
                              >
                                <a className='cursor-pointer underline hover:no-underline'>
                                  {productdata[0]?.productName}
                                </a>
                              </Link>
                            )}
                          </div>
                        </div>
                        <div className='lg:w-1/3 w-full'>
                          <div className='font-[600] text-normal-text md:text-right text-left md:my-0 my-4'>
                            <div className='flex items-center md:justify-end justify-start'>
                              {Array(5)
                                .fill('')
                                .map((_, index) => {
                                  return (
                                    <svg
                                      key={index}
                                      className={`h-5 w-5 flex-shrink-0 text-${
                                        index < star
                                          ? 'primary-500'
                                          : 'gray-300'
                                      }`}
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                      aria-hidden='true'
                                      onClick={() => setStar(index + 1)}
                                    >
                                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                                    </svg>
                                  );
                                })}
                            </div>
                            <br />
                            <div className=''>{getRatingText()}</div>
                          </div>
                        </div>
                      </div>
                      <div className='w-full flex flex-wrap mt-[5px]'>
                        <div className='flex justify-between'>
                          <div className='text-normal-text'>
                            <span className='font-semibold'>
                              {' '}
                              {__pagesText.review.postPublicly}
                            </span>
                            <span className='capitalize'>{customerName}</span>
                            <span> | </span>
                            <button
                              className='!text-anchor hover:!text-anchor-hover text-default-text'
                              onClick={() => {
                                setStar(0);
                                setComment('');
                                setCommentHeading('');
                                setFilesFn([]);
                              }}
                            >
                              {__pagesText.review.clear}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex flex-wrap md:mt-[5px] mt-8 pl-[15px] pr-[15px]'>
                      <Formik
                        onSubmit={submitHandler}
                        validationSchema={validationSchema}
                        initialValues={{ comment, commentHeading }}
                        enableReinitialize
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleSubmit,
                          handleBlur,
                          // handleChange,
                        }) => (
                          <form onSubmit={handleSubmit} className='w-full'>
                            <div className='w-full flex justify-between mb-8'>
                              <div className='w-full px-3'>
                                <label
                                  htmlFor='First Name'
                                  className='block text-base font-medium text-gray-700 hidden'
                                >
                                  {__pagesText.review.form.description}
                                </label>
                                <div className='mt-2'>
                                  <textarea
                                    placeholder={
                                      __pagesText.review.form.description
                                    }
                                    className='form-input'
                                    name='comment'
                                    onChange={(e) => {
                                      (values.comment = e.target.value),
                                        setComment(e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.comment}
                                    rows={4}
                                  />
                                  <div className='text-red-500 text-s mt-1'>
                                    {touched.comment && errors.comment}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='w-full flex justify-between mb-8'>
                              <div className='w-full px-3'>
                                <label
                                  htmlFor='First Name'
                                  className='block text-base font-medium text-gray-700 hidden'
                                >
                                  {__pagesText.review.form.description}
                                </label>
                                <div className='mt-2'>
                                  <input
                                    type='text'
                                    placeholder={
                                      __pagesText.review.form.headline
                                    }
                                    className='form-input'
                                    name='commentHeading'
                                    onChange={(e) => {
                                      (values.commentHeading = e.target.value),
                                        setCommentHeading(e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                    value={values.commentHeading}
                                  />
                                  <div className='text-red-500 text-s mt-1'>
                                    {touched.commentHeading &&
                                      errors.commentHeading}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='w-full flex justify-between mb-8'>
                              <div className='w-full px-3'>
                                <label
                                  htmlFor='file_upload'
                                  className='block text-base font-medium text-gray-700 form-input  text-sub-text border border-gray-400 border-dashed cursor-pointer'
                                >
                                  <span className='block text-base font-medium text-gray-700 mb-2 hidden'>
                                    {__pagesText.review.form.fileupload}
                                  </span>
                                  <div className='w-full flex flex-wrap h-full items-center bg-center bg-no-repeat bg-contain my-3 mx-2'>
                                    <div className='w-full text-center justify-center inset-0'>
                                      <div className='text-sm lg:text-lg text-black'>
                                        <p className='pt-10 lg:pt-20 text-center pb-10 lg:pb-20'>
                                          <svg
                                            className='w-6 h-6 text-current-50 mx-auto'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                          >
                                            <path
                                              stroke-linecap='round'
                                              stroke-linejoin='round'
                                              stroke-width='2'
                                              d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                                            ></path>
                                          </svg>
                                          <p
                                            style={{
                                              fontSize: '18px',
                                            }}
                                          >
                                            {
                                              __pagesText.review.form
                                                .dragAndDrop
                                            }
                                          </p>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </label>
                                <div className='mt-2'>
                                  <input
                                    type='file'
                                    placeholder='Select files to upload'
                                    value=''
                                    className='hidden'
                                    multiple
                                    onChange={fileChangeHandler}
                                    id='file_upload'
                                  />
                                </div>
                                <div className='flex flex-wrap'>
                                  {files.map((file, index) => (
                                    <div key={index} className='h-24 w-24 m-2'>
                                      <NxtImage
                                        src={file.preview}
                                        alt='preview'
                                        className=''
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className='w-full flex justify-end'>
                              <button className='btn btn-secondary btn-md'>
                                {__pagesText.review.form.submit}
                              </button>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WriteReviewTemplate_1;
