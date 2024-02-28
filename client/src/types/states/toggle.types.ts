export interface ToggleTypes {
  toaster: boolean;
  avatarAlert: boolean;
  moreAlert: boolean;
  cropAlert: boolean;
  postAlert: boolean;
  postTypeAlert: boolean;
  postCropAlert: boolean;
  followAlert: {
    valueToAlert: string;
    alert: boolean;
  };
}
