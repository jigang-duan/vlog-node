// returned post data structure
export interface IPostResult {
  id: number;
  title: string;
  postContent: string;
  createdTime: Date;
  modifiedTime: Date;
}

// post list service options
export interface IPostListOptions {
  limit: number;
  offset: number;
}

// post list service result
export interface IPostListResult {
  postList: IPostResult[];
  totalCount: number;
}

// post create service options
export interface IPostCreateOptions {
  title: string;
  postContent: string;
}

// post update service avaliable updates
export interface IPostUpdates {
  title: string;
  postContent: string;
}

export interface IPostService {
  list(options: IPostListOptions): Promise<IPostListResult>;
  find(id: number): Promise<IPostResult>;
  create(options: IPostCreateOptions): Promise<number>;
  update(id: number, updates: IPostUpdates): Promise<boolean>;
  softDelete(id: number): Promise<boolean>;
  destroy(id: number): Promise<boolean>;
}

// Category
export interface ICategoryResult {
  id: number;
  title: string;
  desc: string;
  iconUrl: string;
  createdTime: Date;
  modifiedTime: Date;
}

export interface ICategoryListResult {
  categoryList: ICategoryResult[];
  totalCount: number;
}

export interface ICategoryCreateOptions {
  title: string;
  desc: string;
  iconUrl: string;
  userId: string;
}

export interface ICategoryService {
  list(userId?: string): Promise<ICategoryListResult>;
  create(options: ICategoryCreateOptions): Promise<number>;
}

export interface IUserResult {
  id: string;
  avatarUrl?: string;
  nickName?: string;
  gender?: number;
  language?: string;
  country?: string;
  city?: string;
  province?: string;
}

export interface IFoodItemResult {
  id: number;
  type: string;
  title: string;
  desc: string;
  imageUrl: string;
  vid?: string;
  videoUrl?: string;
  createdTime: Date;
  modifiedTime: Date;
}

export interface IFoodCommentResult {
  id: number;
  author: IUserResult;
  content: string;
  createdTime: Date;
  modifiedTime: Date;
}

export interface IFoodResult {
  id: number;
  author: IUserResult;
  category: ICategoryResult;
  type: string;
  tag: string;
  imageUrl: string;
  desc: string;
  isShared: boolean;
  items: IFoodItemResult[];
  comments: IFoodCommentResult[];
  createdTime: Date;
  modifiedTime: Date;
}

export interface IFoodListOptions {
  limit: number;
  offset: number;
  authorId?: string;
  categoryId?: number;
  isShared?: boolean;
}

export interface IFoodListResult {
  offset: number,
  count: number,
  total: number;
  list: IFoodResult[];
}

export interface IFoodCreateOptions {
  authorId: string;
  categoryId: number;
  type: string;
  tag: string;
  imageUrl: string;
  desc?: string;
  isShared?: boolean;
}

export interface IFoodItemAddOptions {
  type: string;
  title: string;
  desc: string;
  imageUrl: string;
  vid?: string;
  videoUrl?: string;
}

export interface IFoodCommentAddOptions {
  authorId: string;
  content: string;
}

export interface IFoodService {
  list(options: IFoodListOptions): Promise<IFoodListResult>;
  create(options: IFoodCreateOptions): Promise<number>;
  shard(id: number): Promise<boolean>;
  addItem(id: number, options: IFoodItemAddOptions): Promise<number>;
  removeItem(id: number, itemId: number): Promise<boolean>;
  addComment(id: number, options: IFoodCommentAddOptions): Promise<number>;
  removeComment(id: number, commentId: number): Promise<boolean>;
}

export interface IUserUpdates {
  avatarUrl: string;
  city: string;
  country: string;
  gender: number;
  language: string;
  nickName: string;
  province: string;
}

export interface IUserService {
  create(openId: string): Promise<string>;
  update(id: string, updates: IUserUpdates): Promise<boolean>;
}

// weapp

export interface IWeappConfig {
  appId: string;
  appSecret: string;
}

export interface IWeappError {
  errcode: number;
  errmsg: string;
}

export interface IWeappService {
}

export class ErrorResult extends Error {
  status?: number;
  message: string;
  errors?: string;

  constructor(message: string, status: number = 500, errors?: string) {
    super(message)
    this.message = message;
    this.status = status
    this.errors = errors
  }
}
