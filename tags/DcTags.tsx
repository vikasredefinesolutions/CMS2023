import { _globalStore } from 'store.global';

const DcTags = () => {
  return (
    <>
      {_globalStore?.googleTags &&
        _globalStore?.googleTags?.dcTags?.dcTagRadio && (
          <code
            dangerouslySetInnerHTML={{
              __html: _globalStore.googleTags?.dcTags?.dcTagTextArea,
            }}
          ></code>
        )}
    </>
  );
};

export default DcTags;
