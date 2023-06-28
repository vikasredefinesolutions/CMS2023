// import Price from '@appComponents/Price';
// import NxtImage from '@appComponents/reUsable/Image';
// import { _CartItem } from '@services/cart';
// import Link from 'next/link';
// import React from 'react';

// interface _Props {
//   item: _CartItem;
// }

// const CO6_Product: React.FC<_Props> = ({ item }) => {
//   const deleteProductHandler = () => {};
//   const deleteSizeHandler = () => {};

//   return (
//     <li className='pl-[15px] pr-[15px] border-b border-gray-border mb-[10px] last:mb-0 pb-[10px]'>
//       <div className='flex flex-wrap justify-between items-center mb-[10px] pb-[10px] border-b border-gray-border'>
//         <div className='text-sub-text font-semibold'>
//           <Link
//             href={`/${item.seName}.html`}
//             className='text-black hover:text-secondary'
//           >
//             {item.productName}
//           </Link>
//         </div>
//         <div className=''>
//           <button onClick={() => deleteProductHandler()} className=''>
//             <span className='material-icons-outlined'>delete</span>
//           </button>
//         </div>
//       </div>
//       <div className='flex flex-wrap text-default-text font-semibold items-start'>
//         <div className='lg:w-3/4 hidden lg:block pb-[10px] mb-[10px] border-b border-gray-border'>
//           PRODUCT(S)
//         </div>
//         <div className='lg:w-1/4 hidden lg:block pb-[10px] mb-[10px] border-b border-gray-border text-right'>
//           PRICING
//         </div>
//       </div>
//       <div className='flex flex-wrap py-[10px] -mx-[10px] items-start'>
//         <div className='w-full md:w-1/4 px-[10px] md:mb-0 mb-[10px]'>
//           <Link href={item.seName} title=''>
//             <a>
//               <NxtImage
//                 src={
//                   item.colorImage || '/assets/images/image_not_available.jpg'
//                 }
//                 alt={item.productName}
//                 className=''
//                 isStatic={!Boolean(item.colorImage)}
//               />
//             </a>
//           </Link>
//         </div>
//         <div className='w-full md:w-3/4 px-[10px] flex flex-wrap lg:justify-between'>
//           <div className='text-default-text font-semibold'>
//             <Link
//               href={item.seName}
//               className='text-black hover:text-secondary'
//             >
//               {item.productName}
//             </Link>
//           </div>
//           <div className='w-full flex flex-wrap'>
//             <div className='lg:w-2/3 w-full mt-0'>
//               <div className='mt-[5px] flex'>
//                 <div className='text-default-text'>
//                   <span className=''>Color :</span> Stonewash
//                 </div>
//               </div>
//               <div className='flex justify-between'>
//                 <div className='text-default-text'>
//                   <span className=''>Price :</span>{' '}
//                   {item.totalPrice / item.totalQty}
//                 </div>
//               </div>
//               <div className='flex justify-between'>
//                 <div className='text-default-text'>
//                   <span className=''>Quantity :</span> {item.totalQty}
//                 </div>
//               </div>
//               <div className='border border-gray-border mt-[20px]'>
//                 {item.shoppingCartItemDetailsViewModels.map((product) => {
//                   return (
//                     <div className='flex items-center justify-between'>
//                       <div className='text-default-text py-[5px] px-[10px] w-28'>
//                         {product.attributeOptionValue}
//                       </div>
//                       <div className='text-default-text py-[5px] px-[10px] w-16 text-center'>
//                         <input
//                           className='form-input h-[30px]'
//                           value={product.qty}
//                         />
//                       </div>
//                       <div className='text-default-text py-[5px] px-[10px] w-10 text-right'>
//                         <button
//                           onClick={() => deleteSizeHandler()}
//                           className=''
//                         >
//                           <span className='material-icons-outlined'>
//                             delete
//                           </span>
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//             <div className='mt-[10px] lg:w-1/3 w-full'>
//               <div className='text-default-text text-right border-b border-gray-border pb-[10px] mb-[10px]'>
//                 <Price value={item.totalPrice} />
//               </div>
//               <div className='font-bold text-medium-text text-right'>
//                 <Price value={item.totalPrice} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </li>
//   );
// };

// export default CO6_Product;

export {};
