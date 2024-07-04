export interface IPost {
  id: string;
  title: string;
  content: string;
  photoUrls: string;
  videoUrls: string;
  post_view_count: number;
  createdAt: Date;
  publishedAt: Date;
  published: boolean;
  scheduledAt: null;
  tags: [
    {
      id: string;
      name: string;
    }
  ];
  categories: [
    {
      id: string;
      name: string;
      description: string;
    }
  ];
}

export interface IListPosts extends Array<IPost> {
  categories: {
    id: string;
    name: string;
    description: string;
  };
}
