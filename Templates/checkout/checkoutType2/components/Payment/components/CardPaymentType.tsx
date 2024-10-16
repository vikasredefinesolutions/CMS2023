import NxtImage from '@appComponents/reUsable/Image';
import { cardType } from '@constants/common.constant';
import CheckoutController from '@controllers/checkoutController';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import noImg from '@images/no.png';
import yesImg from '@images/yes.png';
import { useEffect, useState } from 'react';
import { paymentProps } from '..';

const CardPaymentType: paymentProps = ({
  updatePaymentMethod,
  changeHandler,
  detectCardType,
  cardDetails,
  purchaseOrder,
}) => {
  const [checkCard, setcardCheck] = useState(false);
  const [cvv, setcvv] = useState<number | string>(
    cardDetails?.cardVarificationCode ? cardDetails?.cardVarificationCode : '',
  );

  const [showMonthImage, setshowMonthImage] = useState<
    'right' | 'wrong' | 'no'
  >('no');
  const { blockInvalidChar } = CheckoutController();

  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);
  const [cardName, setCardName] = useState<boolean>(false);
  const [cardImage, setCardImage] = useState<boolean>(false);

  const handleCVV = (e: any) => {
    const regex = new RegExp('[0-9]').test(e.currentTarget.value);
    if (!regex) {
      setcvv('');
      setcardValidation({
        ...cardValidation,
        [e.currentTarget.name]: '',
      });
      return;
    } else {
      if (e.currentTarget.value.length < e.currentTarget.maxLength + 1) {
        setcardValidation({
          ...cardValidation,
          [e.currentTarget.name]: e.currentTarget.value,
        });
        setcvv(e.currentTarget.value);
      }
    }
  };

  const handleCard = (e: any) => {
    if (!Number(e.currentTarget.value) || e.currentTarget.value.length == 0) {
      setcardCheck(false);
      setcardValidation({
        ...cardValidation,
        [e.currentTarget.name]: '',
      });
      return;
    } else {
      const type = detectCardType && detectCardType();
      setcardCheck(true);
      if (e.currentTarget.value.length < e.currentTarget.maxLength + 1) {
        setcardValidation({
          ...cardValidation,
          [e.currentTarget.name]: e.currentTarget.value,
        });
      }
    }
  };

  const [cardValidation, setcardValidation] = useState({
    cardExpirationYear: cardDetails?.cardExpirationYear
      ? cardDetails?.cardExpirationYear
      : '',
    cardExpirationMonth: cardDetails?.cardExpirationMonth
      ? cardDetails?.cardExpirationMonth
      : '',
    creditCardHolder: cardDetails?.creditCardHolder
      ? cardDetails?.creditCardHolder
      : '',
    cardVarificationCode: cardDetails?.cardVarificationCode
      ? cardDetails?.cardVarificationCode
      : '',
    cardNumber: cardDetails?.cardNumber ? cardDetails?.cardNumber : '',
  });

  const handledate = () => {
    const date = new Date();
    const givenMonth =
      +cardValidation.cardExpirationMonth < 10
        ? `${cardValidation.cardExpirationMonth}`
        : `${cardValidation.cardExpirationMonth}`;
    const givendate = cardValidation.cardExpirationYear.toString() + givenMonth;
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`;
    const currentdate = date.getFullYear().toString() + month;

    if (+givendate >= +currentdate) {
      setshowMonthImage('right');
    } else if (
      cardValidation.cardExpirationMonth == '' &&
      cardValidation.cardExpirationYear == ''
    ) {
      setshowMonthImage('no');
    } else {
      setshowMonthImage('wrong');
    }
  };

  useEffect(() => {
    if (cardDetails && cardDetails?.cardNumber.length > 14) {
      setcardCheck(true);
    }
  }, []);

  useEffect(() => {
    handledate();
  }, [cardValidation]);

  return (
    <div
      id='PaymentCard'
      className={`${employeeLogin.isPaymentPending ? 'hidden' : ''}`}
    >
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
          <label
            htmlFor='creditCardHolder'
            className='mb-[4px] text-normal-text'
          >
            Name On Card*
          </label>
          <div className='flex flex-wrap justify-between items-center'>
            <input
              type='text'
              autoComplete='cc-name'
              onInput={(e) => {
                setcardValidation({
                  ...cardValidation,
                  [e.currentTarget.name]: e.currentTarget.value,
                });
                changeHandler({
                  name: e.currentTarget.name,
                  value: e.currentTarget.value,
                });
              }}
              onFocus={() => setCardName(true)}
              onBlur={(e) =>
                changeHandler({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
              value={cardValidation.creditCardHolder}
              name='creditCardHolder'
              required={true}
              className='form-input !w-[calc(100%-40px)]'
            />

            {cardValidation.creditCardHolder.length > 0 && (
              <div className='w-8 h-8'>
                <NxtImage
                  src={yesImg}
                  alt=''
                  className={''}
                  height={1}
                  isStatic={true}
                  width={1}
                />
              </div>
            )}
            {cardValidation.creditCardHolder.length == 0 && cardName ? (
              <div className='w-8 h-8'>
                <NxtImage
                  src={noImg}
                  alt=''
                  className={''}
                  height={1}
                  isStatic={true}
                  width={1}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
          <label htmlFor='cardNumber' className='mb-[4px] text-normal-text'>
            Credit Card Number *
          </label>
          <div className='flex justify-between items-center'>
            <input
              id='cardNumber'
              onBlur={(e) => {
                changeHandler({
                  name: e.target.name,
                  value: e.target.value,
                });
              }}
              autoComplete='cc-number'
              onKeyDown={blockInvalidChar}
              onInput={(e) => {
                changeHandler({
                  name: e.currentTarget.name,
                  value: e.currentTarget.value,
                });
                handleCard(e);
              }}
              onFocus={() => setCardImage(true)}
              onContextMenu={(e) => e.preventDefault()}
              name='cardNumber'
              placeholder=' '
              required={true}
              value={cardValidation.cardNumber}
              maxLength={
                +`${detectCardType && detectCardType() === 'AMEX' ? 15 : 16}`
              }
              type='number'
              className='form-input !w-[calc(100%-40px)]'
            />

            {checkCard &&
              cardType.map((res) => (
                <div
                  key={res.name}
                  className={`opacity-${
                    detectCardType && detectCardType() === res.name
                      ? '1 block'
                      : '40 hidden'
                  } ml-[4px] w-[50px] mr-[4px]`}
                >
                  <NxtImage isStatic={true} className='' src={res.url} alt='' />
                </div>
              ))}

            {cardValidation.cardNumber.toString().length > 0 && (
              <div className='w-8 h-8'>
                <NxtImage
                  src={yesImg}
                  alt=''
                  className={''}
                  height={1}
                  isStatic={true}
                  width={1}
                />
              </div>
            )}
            {cardValidation.cardNumber.toString().length == 0 && cardImage ? (
              <div className='w-8 h-8'>
                <NxtImage
                  src={noImg}
                  alt=''
                  className={''}
                  height={1}
                  isStatic={true}
                  width={1}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
        <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
          <label
            htmlFor='creditCardMonth'
            className='mb-[4px] text-normal-text'
          >
            Expiration Date*
          </label>
          <div className='flex items-center justify-start w-full'>
            <div className='flex items-center justify-start w-full'>
              <div className='flex flex-wrap justify-between items-center w-full'>
                <input
                  id='creditCardMonth'
                  type='text'
                  autoComplete='cc-exp-month'
                  onBlur={(e) =>
                    changeHandler({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  }
                  onKeyDown={blockInvalidChar}
                  onInput={(e) => {
                    if (+e.currentTarget.value < 13) {
                      setcardValidation({
                        ...cardValidation,
                        [e.currentTarget.name]: e.currentTarget.value,
                      });
                      changeHandler({
                        name: e.currentTarget.name,
                        value: e.currentTarget.value,
                      });
                    }
                  }}
                  value={cardValidation.cardExpirationMonth}
                  name='cardExpirationMonth'
                  maxLength={2}
                  placeholder='02'
                  className='form-input apperance !w-[calc(100%-40px)]'
                />
                {showMonthImage == 'right' && (
                  <div className='w-8 h-8'>
                    <NxtImage
                      src={yesImg}
                      alt=''
                      className={''}
                      height={1}
                      isStatic={true}
                      width={1}
                    />
                  </div>
                )}
                {showMonthImage == 'wrong' && (
                  <div className='w-8 h-8'>
                    <NxtImage
                      src={noImg}
                      alt=''
                      className={''}
                      height={1}
                      isStatic={true}
                      width={1}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className='ml-[5px] mr-[5px]'>/</div>
            <div className='flex flex-wrap justify-between items-center w-full'>
              <input
                onBlur={(e) =>
                  changeHandler({
                    name: e.target.name,
                    value: e.target.value,
                  })
                }
                onInput={(e) => {
                  setcardValidation({
                    ...cardValidation,
                    [e.currentTarget.name]: `20${e.currentTarget.value}`,
                  });
                  changeHandler({
                    name: e.currentTarget.name,
                    value: e.currentTarget.value,
                  });
                }}
                name='cardExpirationYear'
                autoComplete='cc-exp-year'
                onKeyDown={blockInvalidChar}
                disabled={employeeLogin.isPaymentPending}
                value={cardValidation.cardExpirationYear.slice(2)}
                type='text'
                placeholder='02'
                maxLength={2}
                className='form-input !w-[calc(100%-40px)]'
              />

              {showMonthImage == 'right' && (
                <div className='w-8 h-8'>
                  <NxtImage
                    src={yesImg}
                    alt=''
                    className={''}
                    height={1}
                    isStatic={true}
                    width={1}
                  />
                </div>
              )}
              {showMonthImage == 'wrong' && (
                <div className='w-8 h-8'>
                  <NxtImage
                    src={noImg}
                    alt=''
                    className={''}
                    height={1}
                    isStatic={true}
                    width={1}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='mb-[15px] w-full md:w-6/12 pl-[15px] pr-[15px]'>
          <label htmlFor='SecurityCode' className='mb-[4px] text-normal-text'>
            Security Code(CVV/CVC)*
          </label>
          <div className='flex flex-wrap justify-between items-center'>
            <input
              id='SecurityCode'
              type='number'
              onKeyDown={blockInvalidChar}
              onBlur={(e) =>
                changeHandler({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
              onInput={(e) => {
                handleCVV(e);
                changeHandler({
                  name: e.currentTarget.name,
                  value: e.currentTarget.value,
                });
              }}
              autoComplete='cc-csc'
              name='cardVarificationCode'
              maxLength={
                +`${detectCardType && detectCardType() === 'AMEX' ? 4 : 3}`
              }
              value={cardValidation.cardVarificationCode}
              className='form-input !w-[calc(100%-40px)] appearance-none'
            />
            {cardValidation.cardVarificationCode.length === 3 && (
              <div className='w-8 h-8'>
                <NxtImage
                  src={yesImg}
                  alt=''
                  className={''}
                  height={1}
                  isStatic={true}
                  width={1}
                />
              </div>
            )}
            {cardValidation.cardVarificationCode != '' &&
              cardValidation.cardVarificationCode.length < 3 && (
                <div className='w-8 h-8'>
                  <NxtImage
                    src={noImg}
                    alt=''
                    className={''}
                    height={1}
                    isStatic={true}
                    width={1}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentType;
