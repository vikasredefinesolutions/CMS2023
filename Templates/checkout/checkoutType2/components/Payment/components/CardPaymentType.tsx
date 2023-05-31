import noImg from '@images/no.png';
import yesImg from '@images/yes.png';
import NxtImage from '@appComponents/reUsable/Image';
import { cardType } from '@constants/common.constant';
import { paymentMethodCustom } from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import { useState, useEffect } from 'react';
import { paymentProps } from '..';
import CheckoutController from '@controllers/checkoutController';
import { useTypedSelector_v2 } from '@hooks_v2/index';

const CardPaymentType: paymentProps = ({
  updatePaymentMethod,
  changeHandler,
  detectCardType,
  cardDetails,
  purchaseOrder,
}) => {
  const [showCardHelp, setShowCardHelp] = useState(false);
  const [checkCard, setcardCheck] = useState(false);
  const [input, setInput] = useState<number | string>(
    cardDetails?.cardNumber ? cardDetails?.cardNumber : '',
  );
  const [cvv, setcvv] = useState<number | string>(
    cardDetails?.cardVarificationCode ? cardDetails?.cardVarificationCode : '',
  );
  const [showMonthImage, setshowMonthImage] = useState<
    'right' | 'wrong' | 'no'
  >('no');
  const { blockInvalidChar } = CheckoutController();

  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );
  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);
  const [cardName, setCardName] = useState<boolean>(false);
  const [cardImage, setCardImage] = useState<boolean>(false);

  const handleCVV = (e: any) => {
    if (!Number(e.target.value)) {
      setcvv('');
      return;
    } else {
      if (e.target.value.length < e.target.maxLength + 1) {
        setcardValidation({
          ...cardValidation,
          [e.target.name]: e.target.value,
        });
        setcvv(e.target.value);
      }
    }
  };

  const handleCard = (e: any) => {
    if (!Number(e.target.value) || e.target.value.length == 0) {
      setcardCheck(false);
      setInput('');

      return;
    } else {
      if (e.target.value.length < e.target.maxLength + 1) {
        setInput(e.target.value);
        setcardCheck(true);
      }
    }
  };

  const [cardValidation, setcardValidation] = useState({
    cardExpirationYear: '',
    cardExpirationMonth: '',
    creditCardHolder: '',
    cardVarificationCode: '',
  });

  const handledate = () => {
    const date = new Date();
    const currentdate = date.getFullYear().toString() + (date.getMonth() + 1);
    const givendate =
      cardValidation.cardExpirationYear.toString() +
      cardValidation.cardExpirationMonth;

    if (givendate >= currentdate) {
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
    <div id='PaymentCard'>
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
              onChange={(e) =>
                setcardValidation({
                  ...cardValidation,
                  [e.target.name]: e.target.value,
                })
              }
              onFocus={() => setCardName(true)}
              onBlur={changeHandler}
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
              onBlur={changeHandler}
              onKeyDown={blockInvalidChar}
              onChange={handleCard}
              onFocus={() => setCardImage(true)}
              name='cardNumber'
              placeholder=' '
              required={true}
              value={input}
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

            {input.toString().length > 0 && (
              <div className='w-[40px] h-8'>
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
            {input.toString().length == 0 && cardImage ? (
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
            htmlFor='creditCardHolder'
            className='mb-[4px] text-normal-text'
          >
            Expiration Date*
          </label>
          <div className='flex items-center justify-start w-full'>
            <div className='flex items-center justify-start w-full'>
              <div className='flex flex-wrap justify-between items-center w-full'>
                <input
                  type='text'
                  onBlur={changeHandler}
                  onKeyDown={blockInvalidChar}
                  onChange={(e) => {
                    console.log(+e.target.value < 13);

                    if (+e.target.value < 13) {
                      setcardValidation({
                        ...cardValidation,
                        [e.target.name]: e.target.value,
                      });
                    }
                  }}
                  value={cardValidation.cardExpirationMonth}
                  name='cardExpirationMonth'
                  data-value={cardValidation.cardExpirationMonth}
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
                onBlur={changeHandler}
                onChange={(e) => {
                  setcardValidation({
                    ...cardValidation,
                    [e.target.name]: `20${e.target.value}`,
                  });
                }}
                name='cardExpirationYear'
                onKeyDown={blockInvalidChar}
                disabled={employeeLogin.isPaymentPending}
                data-value={cardValidation.cardExpirationYear}
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
              type='number'
              onKeyDown={blockInvalidChar}
              onBlur={changeHandler}
              onChange={handleCVV}
              name='cardVarificationCode'
              maxLength={3}
              value={cvv}
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
