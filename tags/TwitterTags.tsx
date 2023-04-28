import { _globalStore } from 'store.global';

const TwitterTags = () => {
  return (
    <>
      {_globalStore?.googleTags &&
        _globalStore?.googleTags?.twitterTags?.twitterTagRadio && (
          <code
            dangerouslySetInnerHTML={{
              __html: _globalStore.googleTags?.twitterTags?.twitterTagTextArea,
            }}
          ></code>
        )}
    </>
  );
};

export default TwitterTags;
