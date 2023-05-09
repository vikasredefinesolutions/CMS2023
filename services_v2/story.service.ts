import { __pageTypeConstant } from '@constants/global.constant';
import { _Story } from '@definations/story';
import { CallAPI_v2 } from '@helpers/api.helper';

export type _StoryAPIs_V2 =
  | 'GetStoryList'
  | 'GetStoriesByCategoryURL'
  | 'GetNextStoryByStoryID';

export type _StoryService_V2 = {
  service: 'story';
  api: _StoryAPIs_V2;
};

export const GetStoryList = async (payload: {
  pageType: __pageTypeConstant.blog;
  storeId: number;
}) => {
  const url = '/CmsTopicsPublish/getstories.json';

  const response = await CallAPI_v2<_Story[]>({
    name: {
      service: 'story',
      api: 'GetStoryList',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

export const GetStoriesByCategoryURL = async (payload: {
  storeId: number;
  pageType: __pageTypeConstant.stories;
  categoryurl: string;
}) => {
  const url = '/CmsTopicsPublish/getstoriesbycategory.json';

  const response = await CallAPI_v2<_Story[]>({
    name: {
      service: 'story',
      api: 'GetStoriesByCategoryURL',
    },
    request: {
      url: url,
      method: 'POST',
      data: payload,
    },
  });

  return response;
};

interface _t_GetNextStoryByStoryID {
  prevNext: {
    prev: string;
    next: string;
  };
  banner: {
    name: string;
    urlType: string;
    url: string;
  }[];
}

export const GetNextStoryByStoryID = async (payload: {
  storiesId: number;
}): Promise<_t_GetNextStoryByStoryID> => {
  const url = `/CmsTopicsPublish/geturl/${payload.storiesId}.json`;

  const response = await CallAPI_v2<
    {
      next: string;
      previous: string;
      getStoriesBannerModels: {
        name: string;
        urlType: string;
        url: string;
      }[];
    }[]
  >({
    name: {
      service: 'story',
      api: 'GetNextStoryByStoryID',
    },
    request: {
      url: url,
      method: 'GET',
    },
  });

  const transformedData: _t_GetNextStoryByStoryID = {
    prevNext: {
      prev: (response && response[0]?.previous) || '',
      next: (response && response[0]?.next) || '',
    },
    banner: (response && response[0]?.getStoriesBannerModels) || [],
  };

  return transformedData;
};
