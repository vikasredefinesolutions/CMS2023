import { __domain } from '@configs/page.config';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'next-share';
import { useRouter } from 'next/router';

interface _Props {
  mediaURL: string | null;
}

const ShareIcons: React.FC<_Props> = ({mediaURL}) => {
  const router = useRouter();
  const pinterestImagePath = useTypedSelector_v2(
    (state) => state.product.pinterestImagePath,
  );

  const url = `https://${__domain.localDomain}${router.asPath}`;
  const text = 'Spordle Page BETA';
  return (
    <div
      className='flex items-center justify-center col-span-12 gap-2'
      //   style={{ gridArea: '2 / 10 / 3 / 4' }}
    >
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={text}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <PinterestShareButton
        url={url}
        media={pinterestImagePath || mediaURL || ''}
      >
        <PinterestIcon size={32} round />
      </PinterestShareButton>
      <LinkedinShareButton url={url}>
          <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};
export default ShareIcons;
