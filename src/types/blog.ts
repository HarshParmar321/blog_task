export interface BlogPost {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export interface NewsletterSubscription {
  email: string;
}

export interface TagFilter {
  id: string;
  label: string;
  active: boolean;
}