export interface FeedsPayload {
  description: string;
  coverImageUrl: string;
  videoUrl: string;
}

export interface FeedList {
  description: string;
  id: string;
  coverImageUrl: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  updatedById: string;
  likeCount: string;
  liked: boolean;
  saved: boolean;
  createdBy?: CreatedBy;
  _id: string;
}
export interface CreatedBy {
  id: string;
  name: string;
  type: string;
  email: string;
  dutyInTime: number;
  dutyOutTime: number;
  status: string;
  phone: string;
  hospitalId: string;
  branchId: string;
  departmentId: string;
  designationId: string;
  createdAt: string;
  salt: string;
  profile: string;
  profileImageUrl: string;
}

export interface FeedListReducerState {
  isLoading: boolean;
  error: string;
  data?: FeedList[];
}
