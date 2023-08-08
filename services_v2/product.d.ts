export interface _SubmitRequestConsultationPayload {
  consultationModel: {
    id: number;
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    storeId: number;
    productId: number;
    firstname: string;
    lastname: string;
    company: string;
    email: string;
    phone: string;
    contactMethod: number;
    desiredQuantity: number;
    inHandsDate: string;
    logoUrl: string;
    message: string;
    recStatus: 'A';
  };
}

export interface _CustomerOrderPayload {
  customerProductRequestModel: {
    id: number;
    storeID: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    inHandDate: Date;
    shipFirstName: string;
    shipLastName: string;
    shipAddress1: string;
    shipZipCode: string;
    shipCity: string;
    shipStateId: number;
    shipCountryId: number;
    requestGiveAway: boolean;
    eventName: string;
    targetAudience: string;
    reason: string;
    budget: number;
    quantity: number;
    color: string;
    ideas: string;
    item2: string;
    item3: string;
    item4: string;
    item5: string;
    specialRequest: string;
    logo: string;
    beforeInHandDate: Date | string;
    organizationName?: string;
    itemName?: string;
    shipAddress2?: string;
    reasonForGiveAwayPurpose?: string;
    additionalCommentsOrRequest?: string;
    ideasParticularItemsOfInterest?: string;
    isDesiredBrandingUnitiLogo?: boolean;
    isDesiredBrandingOtherExistingLogo?: boolean;
    isDesiredBrandingNewLogoOrGraphic?: boolean;
    isBeforeInHand?: boolean;
    message?: string;
    sport?: string;
    brandPreference?: string;
  };
}

export interface _CR5_Payload {
  customerProductRequestModel: {
    id: number;
    storeID: storeId!;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    inHandDate: date | null;
    shipFirstName: string;
    shipLastName: string;
    shipAddress1: string;
    shipZipCode: string;
    shipCity: string;
    shipStateId: number;
    shipCountryId: number;
    requestGiveAway: boolean;
    targetAudience: string;
    reason: string;
    budget: number;
    quantity: number;
    color: string;
    ideas: string;
    item2: string;
    item3: string;
    item4: string;
    item5: string;
    logo: string;
    specialRequest: string;
    beforeInHandDate?: date | null;
    shipAddress2: string;
    reasonForGiveAwayPurpose: string;
    isBeforeInHand: boolean;
  };
}
